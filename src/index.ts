import fetch from 'cross-fetch';
import AbortControllerPolyfill from 'abort-controller';
import { AuthGenerator, AuthOptions } from './auth';
import { GuardrailRequest, SafetyClientOptions } from './models';
import { APIException, ChuangSiAiSafetyException } from './exceptions';

const DEFAULT_BASE_URL = 'https://api.chuangsiai.com';
const INPUT_API = '/api/v1/llm/check-input-safety';
const OUTPUT_API = '/api/v1/llm/check-output-safety';
const DEFAULT_TIMEOUT = 10000;

const AbortControllerClass = typeof AbortController !== 'undefined' ? AbortController : AbortControllerPolyfill;

export class ChuangsiaiClient {
    private auth: AuthGenerator;
    private baseUrl: string;
    private timeout: number;
    private headers: Record<string, string> = {};

    /**
     * 初始化安全客户端，根据参数自动选择认证方式
     * 
     * 认证方式选择规则:
     * 1. 如果提供了 apiKey，则使用 API_KEY 认证
     * 2. 如果提供了 accessKey 和 secretKey，则使用 ACCESS_KEY 签名认证
     * 
     * @param authOptions 
     * @param options 
     */
    constructor(
        authOptions: AuthOptions,
        options?: SafetyClientOptions
    ) {
        this.auth = new AuthGenerator(authOptions);
        this.baseUrl = options?.baseUrl ?? DEFAULT_BASE_URL;
        this.timeout = options?.timeout ?? DEFAULT_TIMEOUT;
        this.headers = options?.headers ?? {};
    }

    private async request(method: 'POST', path: string, payload: GuardrailRequest) {
        const url = `${this.baseUrl}${path}`;
        const headers = this.auth.generateHeaders(method, path, payload);

        try {
            const controller = new AbortControllerClass()

            const timeout = setTimeout(() => controller.abort(), this.timeout);
            const res = await fetch(url, {
                method,
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                    ...this.headers,
                },
                body: JSON.stringify(payload),
                signal: controller.signal as AbortSignal,
            });
            clearTimeout(timeout);
            if (!res.ok) {
                const text = await res.text();
                throw new APIException(res.status, text);
            }

            return await res.json();
        } catch (err: any) {
            if (err.name === 'AbortError') {
                throw new ChuangSiAiSafetyException(`请求超时（${this.timeout}ms）`);
            }
            throw new ChuangSiAiSafetyException(`请求失败: ${err.message}`);
        }
    }
    /**
     *  输入安全检测
     */
    inputGuardrail(payload: GuardrailRequest) {
        return this.request('POST', INPUT_API, payload);
    }

    /**
     * 输出安全检测
     */
    outputGuardrail(payload: GuardrailRequest) {
        return this.request('POST', OUTPUT_API, payload);
    }
}
