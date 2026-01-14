# Yellow Airlines Backend (API Only)

此目錄為 **後端 API 專案**（API-only Next.js），只提供 `/api/*`，不提供任何頁面渲染。

## 本機啟動

```bash
cd backend
npm install
npx prisma generate
PORT=3001 npm run dev
```

## 需要的環境變數（範例）

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# JWT
NEXTAUTH_SECRET="yellow-airlines-secret-key-change-in-production"

# 用於寄信/連結（若有用到）
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 生產部署（伺服器）

```bash
cd backend
npm install
npx prisma generate
npm run build
PORT=3001 npm run start
```

> 建議用 PM2 / systemd 管理進程，並放在反向代理（Nginx）後方。

