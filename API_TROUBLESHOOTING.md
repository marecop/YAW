# API 連接問題排查指南

## 問題症狀

- 登錄顯示「登錄失敗」
- 註冊顯示「服務器錯誤，請稍後重試」
- flight-status 顯示「無航班數據」

## 可能原因

1. **Vercel 環境變數未設置或設置錯誤**
2. **後端服務器未運行或無法訪問**
3. **CORS 配置問題**
4. **網絡連接問題**

## 排查步驟

### 步驟 1：檢查 Vercel 環境變數

1. 登錄 Vercel Dashboard
2. 進入你的項目 → **Settings** → **Environment Variables**
3. 確認是否有 `API_BASE_URL` 環境變數
4. 確認值是否正確：
   - 如果後端使用 IP：`http://98.159.109.110:3001`
   - 如果後端使用域名：`https://api.yellowairlines.com` 或 `http://api.yellowairlines.com`
5. 確認環境變數已應用到所有環境（Production, Preview, Development）

**如果環境變數不存在或錯誤：**
- 添加或更新 `API_BASE_URL` 環境變數
- 重新部署項目（在 Deployments 頁面點擊 "Redeploy"）

### 步驟 2：檢查後端服務器狀態

在服務器上執行：

```bash
# 檢查後端服務是否運行
pm2 status

# 檢查端口是否監聽
netstat -tlnp | grep 3001
# 或
ss -tlnp | grep 3001

# 檢查後端日誌
pm2 logs yellow-airlines-api
```

**如果服務未運行：**
```bash
cd /path/to/backend
pm2 start ecosystem.config.cjs
# 或
npm run start
```

### 步驟 3：測試後端 API 可訪問性

在瀏覽器或使用 curl 測試：

```bash
# 測試後端是否可訪問
curl http://98.159.109.110:3001/api/flight-status

# 測試登錄 API
curl -X POST http://98.159.109.110:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**如果無法訪問：**
- 檢查服務器防火牆設置（確保端口 3001 開放）
- 檢查 Nginx 配置（如果使用反向代理）
- 檢查服務器網絡連接

### 步驟 4：檢查瀏覽器控制台

1. 打開瀏覽器開發者工具（F12）
2. 進入 **Network** 標籤
3. 嘗試登錄或查看航班狀態
4. 查看 API 請求：
   - 請求 URL 是什麼？
   - 請求狀態碼是什麼？（200, 404, 500, CORS 錯誤等）
   - 響應內容是什麼？

**常見錯誤：**
- **404 Not Found**：API 路由不存在或 rewrites 未生效
- **CORS 錯誤**：後端 CORS 配置不允許前端域名
- **Network Error**：無法連接到後端服務器
- **500 Internal Server Error**：後端服務器內部錯誤

### 步驟 5：檢查 Next.js Rewrites 配置

確認 `next.config.ts` 中的 rewrites 配置正確：

```typescript
const apiBaseUrl = (process.env.API_BASE_URL || 'http://98.159.109.110:3001').replace(/\/+$/, '')

const nextConfig: NextConfig = {
  async rewrites() {
    if (!apiBaseUrl) return []
    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ]
  },
}
```

**注意：**
- `rewrites()` 在構建時執行，需要環境變數在構建時可用
- 如果環境變數在構建後才添加，需要重新部署

### 步驟 6：檢查後端 CORS 配置

確認 `backend/middleware.ts` 中的 CORS 配置允許前端域名：

```typescript
// 應該包含你的 Vercel 域名
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-vercel-domain.vercel.app',
  'https://www.yellowairlines.com', // 你的自定義域名
]
```

## 快速修復方案

### 方案 1：確保環境變數正確設置

1. 在 Vercel Dashboard 中設置 `API_BASE_URL`
2. 值為：`http://98.159.109.110:3001`（或你的後端地址）
3. 應用到所有環境
4. 重新部署項目

### 方案 2：檢查並重啟後端服務

```bash
# SSH 到服務器
ssh user@98.159.109.110

# 進入後端目錄
cd /path/to/yellow-airlines/backend

# 檢查服務狀態
pm2 status

# 如果服務未運行，啟動它
pm2 start ecosystem.config.cjs

# 如果服務運行但異常，重啟它
pm2 restart yellow-airlines-api

# 查看日誌
pm2 logs yellow-airlines-api --lines 50
```

### 方案 3：臨時使用客戶端代理（不推薦，僅用於測試）

如果 rewrites 不工作，可以臨時修改前端代碼直接調用後端 API：

```typescript
// 在 contexts/AuthContext.tsx 中
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://98.159.109.110:3001'

const response = await fetch(`${API_BASE}/api/auth/login`, {
  // ...
})
```

**注意：** 這會暴露後端地址，不建議在生產環境使用。

## 驗證修復

修復後，測試以下功能：

1. ✅ 登錄功能
2. ✅ 註冊功能
3. ✅ 查看航班狀態
4. ✅ 搜索航班
5. ✅ 查看預訂

## 聯繫支持

如果以上步驟都無法解決問題，請提供：
1. 瀏覽器控制台的錯誤信息
2. 後端服務器日誌
3. Vercel 部署日誌
4. 網絡請求詳情（從瀏覽器 Network 標籤）
