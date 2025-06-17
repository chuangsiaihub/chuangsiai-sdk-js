import HmacSHA256 from 'crypto-js/hmac-sha256';
import { AuthenticationException } from './exceptions';
import { uuidV4 } from './utils';

export type AuthOptions = {
    /** apiKey 认证所需的密钥 */
    apiKey?: string;
    /** accessKey 认证所需的访问密钥 */
    accessKey?: string;
    /** secretKey 认证所需的秘密密钥 */
    secretKey?: string;
};

// 导出 AuthGenerator 类
export class AuthGenerator {
    // 定义认证类型
    private authType: 'API_KEY' | 'ACCESS_KEY';
    // 定义 API_KEY
    private apiKey?: string;
    // 定义 ACCESS_KEY
    private accessKey?: string;
    // 定义 SECRET_KEY
    private secretKey?: string;

    // 构造函数，接收 AuthOptions 参数
    constructor({ apiKey, accessKey, secretKey }: AuthOptions) {
        // 如果存在 apiKey，则将 authType 设置为 'API_KEY'，并将 apiKey 赋值给 this.apiKey
        if (apiKey) {
            this.authType = 'API_KEY';
            this.apiKey = apiKey;
            // 如果存在 accessKey 和 secretKey，则将 authType 设置为 'ACCESS_KEY'，并将 accessKey 和 secretKey 赋值给 this.accessKey 和 this.secretKey
        } else if (accessKey && secretKey) {
            this.authType = 'ACCESS_KEY';
            this.accessKey = accessKey;
            this.secretKey = secretKey;
            // 如果不存在 apiKey 和 accessKey+secretKey，则抛出 AuthenticationException 异常
        } else {
            throw new AuthenticationException('必须提供 apiKey 或 accessKey+secretKey');
        }
    }

    /**
     *  生成请求头
     * @param method HTTP 方法
     * @param path  请求路径
     * @param body 请求体
     * @returns 
     */
    generateHeaders(method: string, path: string, body?: object): Record<string, string> {
        // 定义请求头
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };

        // 如果 authType 为 'API_KEY'，则将 Authorization 和 X-Referer 添加到请求头中
        if (this.authType === 'API_KEY') {
            headers['Authorization'] = `Bearer ${this.apiKey}`;
            headers['X-Referer'] = 'js-sdk-apikey';
            return headers;
        }

        // 生成 timestamp 和 nonce
        const timestamp = Date.now().toString();
        const nonce = uuidV4();
        const signature = this._generateSignature(method, path, body || {}, timestamp, nonce);
        return {
            ...headers,
            'Authorization': `${this.accessKey}:${signature}`,
            'X-Timestamp': timestamp,
            'X-Nonce': nonce,
            'X-Referer': 'js-sdk-accesskey',
        };
    }


    /**
     * 生成签名（内部方法）
     * @param {string} method - HTTP 方法（如 POST）
     * @param {string} path - 请求路径（如 /api/verify）
     * @param {object} body - 请求体对象（需严格 JSON 格式化）
     * @param {string} timestamp - 时间戳（毫秒）
     * @param {string} nonce - 随机字符串（10-40 位）
     * @returns {string} 签名字符串
     */
    _generateSignature(method: string, path: string, body: object, timestamp: string, nonce: string): string {
        // 1. 确保 JSON 无多余空格并 URL 编码
        const bodyString = encodeURIComponent(JSON.stringify(body)).replace(/[!'()*~]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
        // 2. 拼接待签名字符串（严格按顺序）
        const stringToSign = `${method}\n${path}\n${bodyString}\n${timestamp}\n${nonce}`;
        // 3. 使用 crypto-js 计算 HMAC-SHA256
        const hash = HmacSHA256(stringToSign, this.secretKey || '');
        return hash.toString(); // 默认输出十六进制字符串
    }
}
