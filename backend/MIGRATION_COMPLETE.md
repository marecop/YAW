# 後端遷移完成報告

## ✅ 遷移狀態：100% 完成

所有後端文件已從 Next.js API 路由遷移到純 Node.js + Express。

## 📋 已遷移的文件

### 路由文件（14個）
- ✅ `routes/auth.ts` - 認證相關（登錄、註冊、忘記密碼等）
- ✅ `routes/flights.ts` - 航班查詢
- ✅ `routes/flight-status.ts` - 航班狀態
- ✅ `routes/bookings.ts` - 預訂管理
- ✅ `routes/admin.ts` - 管理員功能（包含分頁、搜索、刪除）
- ✅ `routes/notifications.ts` - 通知
- ✅ `routes/special-assistance.ts` - 特殊協助
- ✅ `routes/check-in.ts` - 值機
- ✅ `routes/rewards.ts` - 積分獎勵
- ✅ `routes/immigration.ts` - 入境要求
- ✅ `routes/boarding-pass.ts` - 登機證
- ✅ `routes/users.ts` - 用戶信息
- ✅ `routes/email.ts` - 郵件發送
- ✅ `routes/cron.ts` - 定時任務

### 核心文件
- ✅ `server.ts` - Express 服務器主文件
- ✅ `middleware/auth.ts` - 認證中間件（requireAuth, requireAdmin）

### 已刪除的 Next.js 文件
- ❌ `app/` 目錄（已完全刪除）
- ❌ `middleware.ts` (Next.js middleware，CORS 已在 server.ts 處理)
- ❌ `next.config.ts` (Next.js 配置)
- ❌ `next-env.d.ts` (Next.js 類型定義)

## 🔧 技術棧

- **運行時**: Node.js (純 JavaScript)
- **框架**: Express.js
- **語言**: TypeScript
- **ORM**: Prisma
- **認證**: JWT + Cookie
- **內存限制**: 512MB 堆內存

## 📊 API 端點總覽

### 認證 (`/api/auth`)
- `POST /api/auth/login` - 登錄
- `POST /api/auth/register` - 註冊
- `GET /api/auth/me` - 獲取當前用戶
- `POST /api/auth/send-verification` - 發送驗證郵件
- `GET /api/auth/verify-email` - 驗證郵箱
- `POST /api/auth/forgot-password` - 忘記密碼
- `GET /api/auth/verify-reset-token` - 驗證重置 token
- `POST /api/auth/reset-password` - 重置密碼

### 航班 (`/api/flights`)
- `GET /api/flights` - 獲取航班列表
- `GET /api/flights/:id` - 獲取單個航班
- `GET /api/flights/search` - 搜索航班
- `GET /api/flights/lookup` - 查找航班
- `GET /api/flights/roundtrip` - 往返航班
- `GET /api/flights/connections` - 中轉航班

### 航班狀態 (`/api/flight-status`)
- `GET /api/flight-status` - 獲取航班狀態列表（支持分頁）
- `GET /api/flight-status/:id` - 獲取單個航班狀態

### 預訂 (`/api/bookings`)
- `POST /api/bookings` - 創建預訂
- `GET /api/bookings` - 獲取預訂列表
- `GET /api/bookings/:id` - 獲取單個預訂
- `GET /api/bookings/lookup` - 查找預訂

### 管理員 (`/api/admin`)
- `GET /api/admin/users` - 獲取用戶列表
- `GET /api/admin/flights` - 獲取航班列表（支持分頁和搜索）
- `POST /api/admin/flights` - 創建航班
- `DELETE /api/admin/flights` - 刪除航班
- `GET /api/admin/bookings` - 獲取預訂列表
- `GET /api/admin/stats` - 獲取統計信息
- `GET /api/admin/notifications` - 獲取通知列表
- `POST /api/admin/notifications` - 創建通知

### 其他端點
- `GET /api/notifications` - 獲取用戶通知
- `POST /api/notifications/:id/read` - 標記通知已讀
- `POST /api/notifications/mark-all-read` - 標記所有通知已讀
- `POST /api/special-assistance` - 創建特殊協助請求
- `GET /api/special-assistance` - 獲取特殊協助請求列表
- `PUT /api/special-assistance/:id/status` - 更新特殊協助請求狀態
- `POST /api/check-in` - 值機
- `GET /api/check-in/search` - 搜索值機
- `GET /api/rewards` - 獲取獎勵列表
- `POST /api/rewards/redeem` - 兌換獎勵
- `GET /api/immigration/countries` - 獲取國家列表
- `POST /api/immigration/check` - 檢查入境要求
- `GET /api/boarding-pass/:id` - 生成登機證 PDF
- `GET /api/users/by-email` - 根據郵箱獲取用戶
- `POST /api/send-booking-email` - 發送預訂郵件
- `POST /api/test-email` - 測試郵件
- `POST /api/cron/process-points` - 處理積分

## 🚀 啟動方式

### 開發模式
```bash
npm run dev
```

### 生產模式
```bash
npm run build
npm start
```

### 使用 PM2
```bash
pm2 start ecosystem.config.cjs
```

## 📝 注意事項

1. **內存限制**: Node.js 堆內存限制為 512MB，PM2 自動重啟閾值為 520MB
2. **CORS**: 已在 `server.ts` 中配置，支持 Vercel 域名
3. **認證**: 使用 JWT token，支持 Cookie 和 Authorization header
4. **數據庫**: 使用 Prisma ORM，SQLite 數據庫

## ✅ 驗證清單

- [x] 所有 Next.js API 路由已遷移
- [x] 所有 Next.js 配置文件已刪除
- [x] TypeScript 編譯無錯誤
- [x] 所有路由已在 server.ts 中註冊
- [x] 認證中間件正常工作
- [x] CORS 配置正確
- [x] 內存優化配置完成

## 📚 相關文檔

- `README.md` - 後端使用說明
- `MIGRATION_GUIDE.md` - 遷移指南
- `MEMORY_OPTIMIZATION.md` - 內存優化文檔
- `SERVER_DEPLOYMENT.md` - 服務器部署指南
