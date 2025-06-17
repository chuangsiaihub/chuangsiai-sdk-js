# DEVELOPMENT.md

# 开发指南（Development Guide）

欢迎贡献和维护 `chuangsiai-sdk-js` 项目！本指南介绍本项目的开发环境搭建、依赖安装、代码规范、构建打包和发布流程。

---

## 1. 环境准备

- Node.js >= 14（建议用 Node 16+）
- npm 或 yarn（推荐 npm 8+）
- 推荐使用 VSCode 编辑器，并安装 TypeScript 插件

---

## 2. 克隆仓库

```bash
git clone https://github.com/chuangsiaihub/chuangsiai-sdk-js.git
cd chuangsiai-sdk-js
```

## 3. 安装依赖

```bash
yarn install
# 或者 npm install

```

## 4. 代码规范

- 使用 TypeScript 编写
- 代码风格遵循 ESLint/Prettier（如果项目配置了）
- 所有新功能或修复请在 src/ 目录下开发
- 严格遵循类型定义和接口规范

## 5. 构建项目

构建命令基于 tsup，会生成 ESM 和 CommonJS 两种格式的代码和类型声明文件。

```
npm run build
# 或者 yarn build
```

构建产物输出到 `dist/` 目录。

## 6. 运行测试

<!-- 暂时没有-->

## 7. 发布到 npm

1. 更新版本号（遵循 semver）

```
npm version patch  # 修复bug
npm version minor  # 新功能，向后兼容
npm version major  # 不兼容变更
```

2. 重新构建

```bash
npm run build
# 或者 yarn build
```

3. 登录 npm 账号（只需首次执行）

```bash
npm login
```

> **注意：** <br/>
> 由于国内大部分开发者默认将 npm registry 设置为淘宝镜像，npmlogin 在切换回官方 npm registry 时可能会遇到认证失败或网络错误。<br/>
> 建议执行登录前，确保当前 registry 是官方 npm registry：
>
> ```bash
> npm config set registry https://registry.npmjs.org/
> ```
>
> 登录完成后，如果需要可以切回淘宝镜像：
>
> ```bash
> npm config set registry https://registry.npmmirror.com/
> ```
>
> 或使用命令 `npm login --registry=https://registry.npmjs.org/` 直接指定官方 registry 进行登录。

4. 发布到 npm

```bash
npm publish --access public
```

## 8. 代码示例

你可以参考 examples/ 目录下的示例用法。

## 9. 常见问题

- **Node 版本支持**

  代码目标是 es2017，兼容 Node 12 及以上，但建议 Node 14+，且 Node 12-14 需要 AbortController polyfill。

- **AbortController Polyfill**

  使用 abort-controller 包支持请求超时功能。

## 10. 其他

- 如有问题，请提交 Issue 或联系维护人。

- 欢迎贡献代码和建议！
