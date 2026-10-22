# 小芽早教：项目说明（给 AI 开发者）

面向 2–3 岁宝宝家长的早教内容网站。手机优先，简体中文。开工前先读本文件，再读 `docs/SPEC.md` 和 `docs/TASKS.md`。

> 若使用 Claude Code，可将本文件复制或链接为 `CLAUDE.md`。

## 技术栈（已定，不要擅自更换）

- **Next.js（App Router）+ React + TypeScript（strict）**
- **纯静态导出**：`next.config.ts` 中 `output: "export"`，产物在 `out/`
- 样式：纯 CSS（全局 `src/styles/tokens.css` + CSS Modules），不使用 Tailwind 或 UI 组件库
- 内容：`content/` 下的 Markdown（frontmatter）和 JSON，构建期用 `gray-matter` 读取、`zod` 校验，见 `src/lib/content/`
- Markdown 渲染：`react-markdown`（构建期在服务端组件中渲染）
- 字体：`next/font/google`（构建时下载并自托管 ZCOOL KuaiLe、Noto Sans SC）
- 搜索：Pagefind（对 `out/` 建索引）
- 测试：Vitest + Testing Library
- **部署：Cloudflare**，用 Wrangler 部署静态资源（`wrangler.jsonc`）。也可改用 Cloudflare Pages 的 Git 集成，构建命令 `npx next build`，输出目录 `out`。
- MVP 无后端、无登录、无数据库

## 静态导出的限制（必须遵守）

- 不使用 Route Handlers、Server Actions、Middleware、ISR/`revalidate`、`next/image` 的服务端优化（已设 `images.unoptimized`）。
- 所有动态路由必须提供 `generateStaticParams`，并设置 `dynamicParams = false`。
- 读取内容的代码（`src/lib/content/loader.ts`）只能在服务端组件和构建期使用，不能被客户端组件 import。
- 依赖 URL 查询参数的页面（如活动库筛选）用客户端组件 + `useSearchParams`，并包在 `<Suspense>` 中。
- 如果以后需要登录、数据库等服务端能力，再评估 `@opennextjs/cloudflare`，当前不要引入。

## 目录结构

```
app/                 路由（见 SPEC 的路由表）
src/
  components/        通用组件（Tag、Note、Chip、Details、ActivityCard 等）
  lib/content/       schema.ts（zod）与 loader.ts（读取并校验内容）
  lib/draw.ts        抽取与筛选的纯函数（有单元测试）
  styles/tokens.css  设计令牌与手绘风基础样式
content/             活动、文章、里程碑等内容
prototype/home.html  首页可交互原型，视觉与交互的参考标准
docs/                SPEC.md、TASKS.md
next.config.ts       静态导出配置
wrangler.jsonc       Cloudflare 部署配置
```

## 常用命令（package.json 中需包含）

```
"dev":           "next dev"
"build":         "next build && pagefind --site out"
"typecheck":     "tsc --noEmit"
"lint":          "next lint"          // 若所用 Next 版本已移除该命令，改用 eslint .
"test":          "vitest run"
"content:check": "tsx scripts/check-content.ts"   // 校验 content/ 下全部内容
"preview":       "wrangler dev"       // 本地预览 out/
"deploy":        "npm run build && wrangler deploy"
```

## 工作方式

1. 一次只做 `docs/TASKS.md` 里的一个任务，按顺序。
2. 做完后运行 `typecheck`、`lint`、`test`、`content:check`、`build`，逐条对照该任务的验收标准，再在 TASKS.md 中勾选。
3. 范围只限 SPEC.md 的 MVP。不要加登录、评论、支付、后端接口、统计脚本。
4. 需求不清楚或和本文件冲突时，先提问，不要自行猜测。
5. 每个任务结束时说明：改了哪些文件、怎么验证、有哪些遗留问题。
6. 涉及 Next.js、Cloudflare、Wrangler、Pagefind 的配置，以官方最新文档为准，不要凭记忆写版本号和参数。

## React 约定

- 默认使用服务端组件；只有需要状态或浏览器 API 的部分才加 `"use client"`，并尽量缩小范围。
- 组件用函数组件 + TypeScript，props 显式声明类型，不使用 `any`。
- 抽取、筛选、月龄计算等业务逻辑写成纯函数放在 `src/lib/`，组件只负责展示。
- 首屏 JS ≤ 150KB（压缩后），新增依赖前先评估体积。

## 视觉规则（手绘风）

- 颜色、字号、圆角、阴影只能用 `tokens.css` 中的变量，不要硬编码颜色。
- 边框：2.5px 实线 `--ink`；圆角使用 `.w1` / `.w2` / `.w3` 三种不规则圆角交替，避免整站同一形状。
- 阴影：偏移硬阴影（`4px 4px 0 var(--ink)`），不用模糊阴影，不用渐变装饰。
- 便签（`.note`）只用于“抽取结果”和“小贴士”，不要滥用。
- 动效只保留用户触发的反馈，遵循 `prefers-reduced-motion`。
- 必须支持深色模式（跟随系统）。
- 以 `prototype/home.html` 为视觉参考，组件拆分时保持一致的观感。

## 文案与内容规则

- 简体中文，平实语言，一句话讲一件事。
- 禁用词：错过关键期、赢在起跑线、落后、不合格、天才、必须（用于要求家长时）。
- 页面中的活动、文章数据不要写死在组件里，全部来自 `content/`，且必须通过 schema；校验失败要让构建失败。
- 医疗或发育相关内容不要自行编写结论。需要时用占位文字，并设置 `reviewer: PENDING`，页面显示“待专家审核”。
- 每个活动必须评估并填写安全提醒（噎食、误吞、跌落、溺水等），没有风险时留空而不是编造。

## 隐私与安全

- 不收集个人信息，不引入第三方追踪脚本。
- 月龄选择存在 `localStorage`，所有读写包在 `try/catch` 中，读不到时按默认值（28 个月）渲染。注意服务端渲染阶段没有 `window`，初始渲染必须用默认值，挂载后再读取。
- 不引入未经确认的新依赖；新增依赖需在任务说明中写明理由。

## 无障碍与性能

- 可点击区域不小于 44×44px，正文对比度 ≥ 4.5:1，所有交互可用键盘操作，焦点可见。
- 图片必须有 `alt`；筛选按钮用 `aria-pressed`；动态结果区用 `aria-live="polite"`。
- 移动端 LCP ≤ 2.5s，Lighthouse 移动端性能分 ≥ 90。

## 完成的定义

`typecheck`、`lint`、`test`、`content:check`、`build` 全部通过；对应任务的验收标准逐条满足；没有硬编码颜色；没有控制台报错；`out/` 目录可被 `wrangler dev` 正常预览。
