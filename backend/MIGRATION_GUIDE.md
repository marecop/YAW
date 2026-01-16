# Next.js API 遷移到 Express 指南

由於文件較多（40個），這裡提供一個遷移模板和剩餘路由的創建指南。

## 已遷移的路由

✅ `/api/auth/*` - `routes/auth.ts`
✅ `/api/flights/*` - `routes/flights.ts`
✅ `/api/flight-status/*` - `routes/flight-status.ts`
✅ `/api/bookings/*` - `routes/bookings.ts`

## 遷移模板

### 基本結構

```typescript
import express from 'express'
import { prisma } from '../lib/prisma'
import { requireAuth, requireAdmin } from '../middleware/auth'

const router = express.Router()

// GET 路由
router.get('/', async (req, res) => {
  try {
    // 從 req.query 獲取參數
    const { param1, param2 } = req.query
    
    // 業務邏輯
    const result = await prisma.model.findMany({...})
    
    res.json(result)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: '錯誤訊息' })
  }
})

// POST 路由
router.post('/', requireAuth, async (req, res) => {
  try {
    const { field1, field2 } = req.body
    
    // 業務邏輯
    const result = await prisma.model.create({...})
    
    res.status(201).json(result)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: '錯誤訊息' })
  }
})

export default router
```

### Next.js 到 Express 轉換對照

| Next.js | Express |
|---------|---------|
| `NextRequest` | `express.Request` |
| `NextResponse.json()` | `res.json()` |
| `NextResponse.json(..., { status: 400 })` | `res.status(400).json(...)` |
| `request.json()` | `req.body` (需要 express.json() 中間件) |
| `request.nextUrl.searchParams.get('key')` | `req.query.key` |
| `request.cookies.get('token')` | `req.cookies.token` |
| `response.cookies.set('token', value, options)` | `res.cookie('token', value, options)` |
| `export async function GET()` | `router.get('/', async (req, res) => {})` |
| `export async function POST()` | `router.post('/', async (req, res) => {})` |

## 需要遷移的路由

### 1. Admin 路由 (`routes/admin.ts`)

需要從以下文件遷移：
- `app/api/admin/users/route.ts`
- `app/api/admin/flights/route.ts`
- `app/api/admin/bookings/route.ts`
- `app/api/admin/stats/route.ts`
- `app/api/admin/notifications/route.ts`

所有 admin 路由都需要 `requireAdmin` 中間件。

### 2. Notifications 路由 (`routes/notifications.ts`)

需要從以下文件遷移：
- `app/api/notifications/route.ts`
- `app/api/notifications/[id]/read/route.ts`
- `app/api/notifications/mark-all-read/route.ts`

### 3. Special Assistance 路由 (`routes/special-assistance.ts`)

需要從以下文件遷移：
- `app/api/special-assistance/route.ts`
- `app/api/special-assistance/[id]/status/route.ts`

### 4. Check-in 路由 (`routes/check-in.ts`)

需要從以下文件遷移：
- `app/api/check-in/route.ts`
- `app/api/check-in/search/route.ts`

### 5. Rewards 路由 (`routes/rewards.ts`)

需要從以下文件遷移：
- `app/api/rewards/route.ts`
- `app/api/rewards/redeem/route.ts`

### 6. Immigration 路由 (`routes/immigration.ts`)

需要從以下文件遷移：
- `app/api/immigration/countries/route.ts`
- `app/api/immigration/check/route.ts`

### 7. Boarding Pass 路由 (`routes/boarding-pass.ts`)

需要從以下文件遷移：
- `app/api/boarding-pass/[id]/route.ts`

### 8. Users 路由 (`routes/users.ts`)

需要從以下文件遷移：
- `app/api/users/by-email/route.ts`

### 9. Email 路由 (`routes/email.ts`)

需要從以下文件遷移：
- `app/api/send-booking-email/route.ts`
- `app/api/test-email/route.ts`

### 10. Cron 路由 (`routes/cron.ts`)

需要從以下文件遷移：
- `app/api/cron/process-points/route.ts`

## 快速遷移腳本

可以使用以下腳本快速生成路由骨架：

```bash
# 創建路由文件
touch backend/routes/admin.ts
touch backend/routes/notifications.ts
touch backend/routes/special-assistance.ts
touch backend/routes/check-in.ts
touch backend/routes/rewards.ts
touch backend/routes/immigration.ts
touch backend/routes/boarding-pass.ts
touch backend/routes/users.ts
touch backend/routes/email.ts
touch backend/routes/cron.ts
```

然後根據原始 Next.js 路由文件手動遷移邏輯。

## 注意事項

1. **路徑參數**：Express 使用 `req.params.id` 而不是 `params.id`
2. **Cookie 設置**：Express 的 `res.cookie()` 需要將 `maxAge` 轉換為毫秒
3. **CORS**：已在 `server.ts` 中配置，無需在路由中處理
4. **認證**：使用 `requireAuth` 或 `requireAdmin` 中間件
5. **錯誤處理**：統一使用 try-catch 和 `res.status().json()`

## 測試

遷移完成後，使用以下命令測試：

```bash
# 開發模式
npm run dev

# 構建
npm run build

# 生產模式
npm start
```
