# Cloudflare 部署

## 项目配置

- Cloudflare Workers 项目名：`xiaoya-zaojiao`
- workers.dev 域名：`https://xiaoya-zaojiao.qiaozai-zaojiao.workers.dev`
- 静态站点目录：`out/`
- 构建与索引：`npm run build`（先执行 `next build`，再对静态导出结果运行 Pagefind）
- 发布：`npm run deploy`
- 404：Wrangler 配置为 `404-page`，静态导出包含自定义 `out/404.html`。
- Workers 兼容日期：`2026-05-03`（与本项目 Wrangler 内置运行时支持的最新日期一致）。
- 已发布版本：`f4bf8269-6d88-402c-898f-95d70e8621f7`
- 构建环境：Node.js 22。

## 首次发布

1. 安装依赖并运行 `npm run build`。
2. 使用 `npx wrangler login` 登录 Cloudflare。
3. 运行 `npm run deploy`，按 Wrangler 提示确认项目。
4. 发布后，可在 Cloudflare Dashboard 的 Workers & Pages 中为 `xiaoya-zaojiao` 配置自定义域名。域名必须已添加到同一 Cloudflare 账户；选择项目的 Settings → Domains & Routes → Add → Custom Domain，按界面完成 DNS 配置。

## 回滚

在 Cloudflare Dashboard 打开 `xiaoya-zaojiao` → Deployments，选择已知正常的历史部署并执行 Rollback。也可以从对应 Git 提交重新运行部署流程。

当前已部署到 workers.dev，且 `app/layout.tsx`、`app/sitemap.ts` 和 `app/robots.ts` 已使用线上地址。

## 发布验证

- `npm run build`：静态生成 42 个页面，并生成 Pagefind 搜索索引。
- `npm run typecheck`、`npm run lint`、`npm run test`、`npm run content:check` 均通过。
- Wrangler 本地预览：首页、活动列表、活动详情和搜索页返回 200；不存在的路由返回 404。
- 线上验证：首页、活动列表、活动详情、搜索、Pagefind 脚本、robots.txt 和 sitemap.xml 返回 200；不存在的路由返回 404。
