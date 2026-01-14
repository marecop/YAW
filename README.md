# Yellow Airlines 黃色航空官方網站

一個功能完整的航空公司網站，使用 Next.js、TypeScript、Tailwind CSS 和 SQLite + Prisma 構建。

## 架構（前後端拆分）

為避免在自架伺服器上直接跑完整 Next.js（SSR / 靜態資源 / 記憶體壓力），本專案已拆分為：

- **Frontend（Vercel）**：本 repo 根目錄（`/app` 只保留頁面，不再包含 `/app/api`）
- **Backend（Server / API only）**：`/backend`（API-only Next.js，僅提供 `/api/*`，不提供頁面）

Frontend 透過 `next.config.ts` 的 **rewrite** 把所有 `/api/*` 代理到後端（由 `API_BASE_URL` 控制）。

## 主要功能

- ✈️ 航班搜索和预订
- 🌍 多语言支持（德语、英语、简体中文、粤语繁体）
- 👤 用户认证和会员系统
- 🎫 预订管理（数据隔离）
- 💳 会员等级和积分系统
- 📱 响应式设计（移动端优先）
- 🎨 简约现代的 UI 设计

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **数据库**: SQLite + Prisma ORM
- **认证**: JWT (jsonwebtoken)
- **图标**: Lucide React
- **日期处理**: date-fns

## 安裝與執行（本機開發）

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定資料庫

数据库已经配置好，运行以下命令生成 Prisma Client 并填充示例数据：

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### 3. 啟動後端 API（backend）

```bash
cd backend
npm install
npx prisma generate
PORT=3001 npm run dev
```

### 4. 啟動前端（root / Vercel）

```bash
API_BASE_URL=http://localhost:3001 npm run dev
```

訪問 `http://localhost:3000` 查看網站（前端會把 `/api/*` 代理到 `http://localhost:3001`）。

## 示例账户

登录时可以使用以下测试账户：

- **邮箱**: john@example.com
- **密码**: password123
- **会员等级**: 金卡会员
- **积分**: 5,000

或

- **邮箱**: sarah@example.com
- **密码**: password123
- **会员等级**: 白金卡会员
- **积分**: 15,000

## 数据库

数据库包含：
- 21 个示例航班（覆盖全球主要城市）
- 3 个促销活动
- 2 个政策条款
- 3 个会员权益等级
- 2 个测试用户

## 專案結構（重點）

```txt
/app                 # 前端頁面（已不再包含 /app/api）
/backend             # 後端（API-only Next.js）
  /app/api           # 後端 API 路由（/api/*）
  /lib               # 後端使用的共用邏輯（已複製一份）
  /prisma            # Prisma schema / migrations
  package.json
  next.config.ts
  tsconfig.json
/lib                 # 前端使用的共用邏輯
/prisma              # 本機開發 DB / schema（仍保留）
```

## 主要页面

- **首页** (`/`): 航班搜索、特色内容、热门目的地
- **登录** (`/auth/login`): 用户登录
- **注册** (`/auth/register`): 用户注册
- **搜索结果** (`/flights/search`): 显示搜索到的航班
- **会员中心** (`/member`): 用户资料、会员卡、积分
- **我的预订** (`/member/bookings`): 查看和管理预订

## 特色功能

### 1. 多语言系统
- 自定义实现（不使用 i18n 库，避免常见 bug）
- 语言切换器位于 Footer
- 支持 4 种语言无缝切换

### 2. 用户数据隔离
- 每个用户只能查看和管理自己的预订
- API 层面强制验证 userId
- JWT token 认证保护

### 3. 会员系统
- 三个会员等级：银卡、金卡、白金卡
- 积分累积和兑换
- 专属权益和优惠

### 4. 简约现代设计
- 黄色主色调（#FFC107）
- 深蓝辅助色（#0F172A）
- 大量留白和清晰的视觉层次
- 流畅的动画和过渡效果

## 環境變數

Frontend（root）需要額外設定：

```env
API_BASE_URL="http://localhost:3001"
```

Backend（`/backend`）沿用原本的：

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="yellow-airlines-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

⚠️ **生产环境请务必更改 NEXTAUTH_SECRET！**

## 开发命令

```bash
# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# Lint 检查
npm run lint

# 数据库种子
npm run db:seed

# Prisma Studio（数据库 GUI）
npx prisma studio
```

## 数据库管理

查看和编辑数据库：

```bash
npx prisma studio
```

这将在 `http://localhost:5555` 打开 Prisma Studio。

## 未来扩展

以下功能可以进一步开发：
- ✈️ 在线值机和选座功能
- 🎫 登机牌生成（PDF）
- 📊 航班状态实时查询
- 🏆 积分兑换商城
- 🎁 促销活动页面
- 📜 政策中心
- 🌏 目的地指南
- ❓ FAQ 页面
- ⚙️ 用户设置页面

## 许可

© 2025 Yellow Airlines. All rights reserved.
