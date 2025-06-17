import { defineConfig } from 'tsup';

// 根据环境变量区分浏览器和 Node 构建配置
const isBrowser = process.env.BROWSER === 'true';
// const isNode = process.env.NODE === 'true';

export default defineConfig(() => {
    if (isBrowser) {
        // 浏览器构建（UMD/IIFE，依赖打包进去）
        return {
            entry: ['src/index.ts'],
            format: ['iife'],       // 浏览器用
            globalName: 'ChuangSIAISDK',// 浏览器挂载全局变量
            dts: false,             // 浏览器不需要类型声明
            outDir: 'dist',         // 输出目录（区分 Node 和浏览器版本）
            minify: false,           // true 压缩  false 不压缩，便于调试
            sourcemap: false,       // 不生成 source map
            clean: true,            // 构建前清理 dist 目录
            platform: 'browser',    // 浏览器平台
            noExternal: ['cross-fetch', 'crypto-js', 'abort-controller'],// 必须内联打包
        }
    }

    // 默认 Node 构建
    return {
        // Node 构建（CJS/ESM）
        entry: ['src/index.ts'],
        format: ['esm', 'cjs'], // 支持 ESM 和 CommonJS 格式
        dts: true,              // 生成类型声明 .d.ts 文件
        minify: true,           // true 压缩  false 不压缩，便于调试
        sourcemap: true,        // 生成 source map
        clean: true,            // 构建前清理 dist 目录
        target: 'es2017',       // 支持的最低 Node.js 版本
    };
});


