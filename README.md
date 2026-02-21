# My SaaS App Next

基于 Next.js (App Router) 构建的全栈 SaaS 应用模板，通过 [OpenNext](https://opennext.js.org/cloudflare) 部署到 Cloudflare Workers。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | [Next.js](https://nextjs.org/) 16 (App Router) |
| 部署 | [Cloudflare Workers](https://workers.cloudflare.com/) via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare) |
| 数据库 | PostgreSQL + [Drizzle ORM](https://orm.drizzle.team/) + [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) |
| 认证 | [Better Auth](https://www.better-auth.com/)（Email OTP、GitHub、Google） |
| UI | [Tailwind CSS](https://tailwindcss.com/) v4 + [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| 内容 | [Fumadocs](https://fumadocs.vercel.app/) MDX（博客、法律页面） |
| 邮件 | [Resend](https://resend.com/) + [React Email](https://react.email/) |
| 安全 | [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) 人机验证 |

## 项目结构

```
├── config/              # 站点配置、SEO 元数据
├── content/             # MDX 内容（博客、法律条款）
├── public/              # 静态资源
├── src/
│   ├── app/
│   │   ├── (site)/      # 公开页面（首页、博客）
│   │   ├── (auth)/      # 认证页面（登录、OTP）
│   │   ├── (protected)/ # 需登录页面（个人设置）
│   │   ├── (legal)/     # 法律页面（隐私政策、服务条款）
│   │   └── api/         # API 路由（auth、turnstile）
│   ├── actions/         # Server Actions
│   ├── components/      # React 组件
│   ├── db/              # Drizzle ORM 配置、Schema、迁移
│   ├── emails/          # 邮件模板
│   ├── hooks/           # 自定义 React Hooks
│   └── lib/             # 工具库（auth、email、utils）
├── open-next.config.ts  # OpenNext 配置
├── wrangler.jsonc       # Cloudflare Workers 配置
└── source.config.ts     # Fumadocs MDX 集合配置
```

## 前置条件

- [Node.js](https://nodejs.org/) >= 18
- [PostgreSQL](https://www.postgresql.org/) 数据库（本地开发）
- [Cloudflare 账号](https://dash.cloudflare.com/)（部署用）
- 已创建 [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) 配置（连接远程数据库）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.development` 并填入你自己的值：

```bash
cp .env.development .env.local
```

主要环境变量：

| 变量 | 说明 |
|------|------|
| `DATABASE_URL` | PostgreSQL 连接字符串（仅 drizzle-kit 使用） |
| `BETTER_AUTH_SECRET` | Better Auth 密钥 |
| `BETTER_AUTH_URL` | 应用 URL |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `RESEND_API_KEY` | Resend 邮件 API Key |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile |

### 3. 初始化数据库

```bash
npm run db:generate
npm run db:migrate
```

### 4. 本地开发

```bash
npm run dev
```

访问 http://localhost:3000

## 数据库管理

```bash
npm run db:generate   # 根据 schema 生成迁移文件
npm run db:migrate    # 执行迁移
npm run db:push       # 直接推送 schema 到数据库（跳过迁移文件）
npm run db:studio     # 打开 Drizzle Studio 可视化管理
```

## 部署到 Cloudflare Workers

### 前置配置

1. 在 Cloudflare 控制台创建 Hyperdrive 配置，连接你的 PostgreSQL 数据库
2. 更新 `wrangler.jsonc` 中的 Hyperdrive `id`
3. 在 Cloudflare Workers 控制台设置环境变量（Secrets）

### 部署命令

```bash
# 构建并部署
npm run deploy

# 构建并预览（本地模拟 Workers 环境）
npm run preview

# 仅上传（不触发部署）
npm run upload
```

### 生成 Cloudflare 类型定义

```bash
npm run cf-typegen
```

## 注意事项

### Cloudflare Workers 中的数据库连接

在 Workers 环境中，Hyperdrive 的连接字符串是**请求作用域**的，TCP 连接在请求间可能被回收。因此：

- 不要在模块顶层缓存数据库连接
- 每次请求通过 `getDb()` 获取新的连接
- 使用 `prepare: false` 以兼容 Hyperdrive 的事务池模式

详见 [Hyperdrive 文档](https://developers.cloudflare.com/hyperdrive/)。
