# Yellow Airlines Backend API

純 Node.js + Express 後端 API 服務器，用於 Yellow Airlines 應用。

## 特性

- ✅ 純 Node.js + Express（無 Next.js 開銷）
- ✅ 內存優化（限制堆內存為 512MB）
- ✅ TypeScript 支持
- ✅ Prisma ORM
- ✅ CORS 配置
- ✅ Cookie 認證
- ✅ JWT Token 支持

## 快速開始

### 安裝依賴

```bash
npm install
```

### 環境變數

創建 `.env` 文件：

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key"
NODE_ENV="production"
PORT=3001
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

### 開發模式

```bash
npm run dev
```

服務器將在 `http://localhost:3001` 啟動。

### 構建

```bash
npm run build
```

### 生產模式

```bash
npm start
```

## 使用 PM2 部署

```bash
# 使用部署腳本
bash deploy.sh

# 或手動部署
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

## API 路由

- `/api/auth/*` - 認證相關（登錄、註冊、忘記密碼等）
- `/api/flights/*` - 航班查詢
- `/api/flight-status/*` - 航班狀態
- `/api/bookings/*` - 預訂管理
- `/api/admin/*` - 管理員功能
- `/api/notifications/*` - 通知
- `/api/special-assistance/*` - 特殊協助
- `/api/check-in/*` - 值機
- `/api/rewards/*` - 積分獎勵
- `/api/immigration/*` - 入境要求
- `/api/boarding-pass/*` - 登機證
- `/api/users/*` - 用戶信息
- `/api/send-booking-email` - 發送預訂郵件
- `/api/cron/*` - 定時任務

## 健康檢查

```bash
curl http://localhost:3001/health
```

## 內存優化

後端已配置內存限制：
- Node.js 堆內存：512MB
- PM2 自動重啟閾值：700MB

詳見 `MEMORY_OPTIMIZATION.md`。

## 從 Next.js API 遷移

所有 API 路由已從 Next.js 遷移到 Express。詳見 `MIGRATION_GUIDE.md`。