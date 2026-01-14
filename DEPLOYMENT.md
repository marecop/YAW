# 部署指南

## 架构说明

本项目已拆分为：
- **前端（Frontend）**：部署到 Vercel，只包含页面和组件
- **后端（Backend）**：部署到服务器，只运行 API

## 前端部署到 Vercel

### 1. 部署内容

**部署根目录**（不是 `backend/` 目录）

Vercel 会自动：
- ✅ 部署 `app/` 目录下的所有页面
- ✅ 部署 `components/` 目录
- ✅ 部署 `public/` 静态资源
- ✅ 部署 `lib/` 中的前端工具函数（如 `dbVersion.ts`, `seatOccupancy.ts`, `airports.ts`）
- ❌ **不会**部署 `backend/` 目录（已在 `.vercelignore` 中排除）

### 2. Vercel 设置步骤

#### 方法一：通过 Vercel Dashboard

1. **连接仓库**
   - 在 Vercel Dashboard 中导入你的 Git 仓库
   - Vercel 会自动检测到 Next.js 项目

2. **设置环境变量**
   - 进入项目 Settings → Environment Variables
   - 添加以下环境变量：
     ```
     API_BASE_URL=https://你的后端API域名
     ```
     例如：`API_BASE_URL=https://api.yellowairlines.com` 或 `http://localhost:3001`（开发环境）

3. **构建设置**（通常自动检测，无需修改）
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **部署**
   - 点击 "Deploy" 按钮
   - Vercel 会自动构建并部署前端

#### 方法二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 在项目根目录部署
vercel

# 设置环境变量
vercel env add API_BASE_URL
# 输入你的后端 API 地址，例如：https://api.yellowairlines.com

# 部署到生产环境
vercel --prod
```

### 3. 前端部署后的行为

- ✅ 所有页面路由正常工作（`/`, `/flights`, `/booking` 等）
- ✅ 所有 `/api/*` 请求会自动通过 `rewrites` 转发到后端 API
- ✅ Cookie 和认证状态会正常传递（因为 rewrites 是同源请求）
- ✅ 静态资源（图片、CSS）正常加载

### 4. 验证部署

部署完成后，访问你的 Vercel 域名，检查：
- [ ] 首页正常加载
- [ ] 可以搜索航班
- [ ] 可以登录（会调用后端 `/api/auth/login`）
- [ ] 可以查看航班状态（会调用后端 `/api/flight-status`）

## 后端部署到服务器

### 1. 部署内容

**部署 `backend/` 目录**

### 2. 服务器设置步骤

```bash
# 1. 进入后端目录
cd backend

# 2. 安装依赖
npm install

# 3. 设置环境变量
# 创建 .env 文件
cat > .env << EOF
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key-change-in-production"
NODE_ENV="production"
PORT=3001
EOF

# 4. 生成 Prisma Client
npx prisma generate

# 5. 运行数据库迁移（如果需要）
npx prisma migrate deploy

# 6. 构建项目
npm run build

# 7. 启动服务
npm run start
# 或使用 PM2
pm2 start npm --name "yellow-airlines-api" -- run start
```

### 3. 使用 Nginx 反向代理（推荐）

```nginx
server {
    listen 80;
    server_name api.yellowairlines.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. 后端部署后的行为

- ✅ 所有 API 端点正常工作（`/api/auth/login`, `/api/flights`, `/api/bookings` 等）
- ✅ 数据库连接正常
- ✅ JWT 认证和 Cookie 设置正常
- ✅ CORS 已配置（允许前端域名访问）

## 开发环境运行

### 同时运行前端和后端

```bash
# 终端 1：运行前端（端口 3000）
npm run dev

# 终端 2：运行后端（端口 3001）
npm run dev:api
```

### 设置本地环境变量

**前端 `.env.local`**：
```env
API_BASE_URL=http://localhost:3001
```

**后端 `backend/.env`**：
```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="yellow-airlines-secret-key"
NODE_ENV="development"
PORT=3001
```

## 常见问题

### Q: Vercel 构建失败，提示找不到 `@prisma/client`？

**A:** 这是因为前端 `package.json` 中包含了 Prisma 依赖。虽然前端代码不使用它，但 Next.js 构建时可能会检查。解决方案：
- 确保 `.vercelignore` 中排除了 `backend/` 和 `prisma/`
- 或者在前端构建时跳过 Prisma：修改 `package.json` 的 `postinstall` 脚本

### Q: API 请求返回 CORS 错误？

**A:** 检查后端 `next.config.ts` 中的 CORS 配置，确保允许前端域名。

### Q: Cookie 无法设置？

**A:** 确保：
1. 前端和后端使用相同的域名（或子域名）
2. Cookie 的 `domain` 设置正确
3. 使用 HTTPS（生产环境）

### Q: 前端页面显示正常，但 API 调用失败？

**A:** 检查：
1. `API_BASE_URL` 环境变量是否正确设置
2. 后端服务是否正常运行
3. 网络连接是否正常（防火墙、端口等）

## 总结

- **前端部署到 Vercel**：部署**根目录**，设置 `API_BASE_URL` 环境变量
- **后端部署到服务器**：部署 `backend/` 目录，运行在独立端口（如 3001）
- **开发环境**：前端 `localhost:3000`，后端 `localhost:3001`
