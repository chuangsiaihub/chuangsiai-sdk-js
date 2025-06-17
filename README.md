# 创思大模型安全工具 SDK 使用说明

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/node/v/chuangsiai-sdk-js?color=green&label=Node.js%20Version)](https://nodejs.org/en/download/)  
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/chuangsiaihub/chuangsiai-sdk-js)  
[![npm Version](https://img.shields.io/npm/v/chuangsiai-sdk-js)](https://www.npmjs.com/package/chuangsiai-sdk-js)

## 简介

`chuangsiai-sdk` 创思大模型安全工具是一款面向大语言模型的内容安全防护 SDK，致力于识别和拦截潜在的输入输出风险，确保大模型的使用安全、合规、可信。

## 主要特性

- 支持输入内容和输出内容的安全检测
- 支持 Node.js 和浏览器环境（通过 `cross-fetch`）
- 支持请求超时（兼容 Node 14+，Node 12-14 需 polyfill）
- 提供完整的 TypeScript 类型定义
- 同时输出 CommonJS 和 ESM 格式，灵活支持各种项目

## 安装

```bash
npm install chuangsiai-sdk

```

## 快速开始

```js
import { ChuangsiaiClient } from "chuangsiai-sdk";

// 初始化客户端，支持 API Key 或 AccessKey/SecretKey 认证
const client = new ChuangsiaiClient({
  apiKey: "你的API密钥",
  // 或者 accessKey: 'xxx',
  // secretKey: 'xxx'
});

// 调用输入安全检测
client
  .inputGuardrail({ content: "需要检测的文本内容" })
  .then((result) => {
    console.log("输入安全检测结果:", result);
  })
  .catch((err) => {
    console.error("请求失败:", err);
  });

client
  .outputGuardrail({ content: "模型生成的回复内容" })
  .then((result) => {
    console.log("输出安全检测结果:", result);
  })
  .catch((err) => {
    console.error("请求失败:", err);
  });
```

## API 参考

#### `new ChuangsiaiClient(authOptions: AuthOptions, options?: SafetyClientOptions)`

创建客户端实例。

- authOptions：认证参数，支持 apiKey 或 accessKey + secretKey
  - apiKey（可选）：API 密钥
  - accessKey（可选）：访问密钥
  - secretKey（可选）：密钥
- options（可选）：
  - baseUrl - API 服务地址，默认 `https://api.chuangsiai.com`
  - timeout - 请求超时时间（毫秒），默认 10000

#### 方法

- `inputGuardrail(payload: GuardrailRequest): Promise<any>`
  - 输入安全检测
  - GuardrailRequest：
    ```ts
    interface GuardrailRequest {
      content: string;
      strategyKey: string;
    }
    ```
- `outputGuardrail(payload: GuardrailRequest): Promise<any>`
  - 输出安全检测
  - GuardrailRequest：
    ```ts
    interface GuardrailRequest {
      content: string;
      strategyKey: string;
    }
    ```

## 注意事项

- Node.js 12 - 14 版本需要安装并使用 abort-controller polyfill 支持请求超时功能

## 兼容性

- 目标代码标准为 ES2017，兼容 Node.js 12 及以上版本
- 浏览器环境支持通过 cross-fetch

## 依赖

- [cross-fetch](https://github.com/github/fetch)
- [abort-controller](https://github.com/mysticatea/abort-controller)

## 开发与贡献

欢迎提交 PR 和 Issue。

## 许可证

本项目基于 MIT 协议开源。

## 📬 联系我们

如需技术支持、企业合作或 API 接入，请联系：

- 邮箱: service@chuangsiai.com
- 官网: https://chuangsiai.com
- 控制台: https://console.chuangsiai.com
