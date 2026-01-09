# Yellow Airlines 黄色航空官方网站

一个功能完整的航空公司网站，使用 Next.js 15、TypeScript、Tailwind CSS 和 SQLite 构建。

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

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 设置数据库

数据库已经配置好，运行以下命令生成 Prisma Client 并填充示例数据：

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

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

## 项目结构

```
/app
  /api              # API 路由
    /auth           # 认证 API
    /flights        # 航班 API
    /bookings       # 预订 API
  /auth             # 认证页面
  /flights          # 航班相关页面
  /member           # 会员中心
  layout.tsx        # 根布局
  page.tsx          # 首页
/components         # 可复用组件
  Header.tsx        # 导航栏
  Footer.tsx        # 页脚（含语言切换器）
  FlightSearchForm.tsx  # 航班搜索表单
/contexts           # React Context
  LanguageContext.tsx   # 多语言管理
/lib                # 工具函数
  prisma.ts         # Prisma 客户端
  /utils
    auth.ts         # 认证工具
/locales            # 翻译文件（public/locales）
  de.json           # 德语
  en.json           # 英语
  zh-cn.json        # 简体中文
  zh-hk.json        # 粤语繁体
/prisma             # 数据库
  schema.prisma     # 数据库模型
  seed.ts           # 种子数据
/types              # TypeScript 类型
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

## 环境变量

`.env` 文件已配置：

```env
DATABASE_URL="file:./dev.db"
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
