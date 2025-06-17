/**
 *  SDK基础异常
 */
export class ChuangSiAiSafetyException extends Error {
    constructor(message: string, public cause?: Error) {
        super(message);
    }
}

/**
 * 认证异常
 */
export class AuthenticationException extends ChuangSiAiSafetyException { }

/*
 * API调用异常
 */
export class APIException extends ChuangSiAiSafetyException {
    constructor(public statusCode: number, message: string) {
        super(`[${statusCode}] ${message}`);
    }
}
