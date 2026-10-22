import type { NextConfig } from "next";

// 纯静态导出：构建产物在 out/，由 Cloudflare 托管。
const config: NextConfig = {
  output: "export",
  trailingSlash: true,        // /activities/ 形式，静态托管下最稳
  images: { unoptimized: true }, // 静态导出不支持 Next 图片优化
  reactStrictMode: true,
  turbopack: { root: process.cwd() },
};

export default config;
