/** 请求输入模型 */
export interface GuardrailRequest {
    /** 策略标识 */
    strategyId: string;
    /** 请求内容 */
    content: string;
}

/** 响应结果模型 */
export interface GuardrailResponse {
    code: number;
    suggestion: string;
    // 可拓展字段
    [key: string]: any;
}

/** SDK 初始化配置 */
export interface SafetyClientOptions {
    /** API 域名地址 */
    baseUrl?: string;
    /** API 请求超时时间 */
    timeout?: number;
    /** API 请求头 */
    headers?: Record<string, string>;
}
