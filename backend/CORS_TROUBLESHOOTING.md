# CORS 錯誤排查指南

## 錯誤信息

```
Error: Not allowed by CORS
```

這個錯誤表示前端發送的請求的 origin 不在後端允許的域名列表中。

## 解決方法

### 1. 檢查環境變數

在服務器上檢查 `.env` 文件中的 `FRONTEND_URL` 設置：

```bash
cd /var/www/yellow-airlines/backend
cat .env | grep FRONTEND_URL
```

### 2. 設置正確的前端域名

編輯 `.env` 文件：

```bash
nano .env
```

確保 `FRONTEND_URL` 設置為你的實際前端域名：

```env
# 單個域名
FRONTEND_URL=https://your-app.vercel.app

# 多個域名（用逗號分隔）
FRONTEND_URL=https://your-app.vercel.app,https://www.yourdomain.com,https://yourdomain.com
```

### 3. 重啟服務

修改環境變數後，需要重啟服務：

```bash
pm2 restart yellow-airlines-api
```

### 4. 檢查日誌

查看服務器日誌，確認 CORS 配置：

```bash
pm2 logs yellow-airlines-api --lines 50
```

啟動時應該會看到類似這樣的日誌：

```
🌐 CORS: 從環境變數讀取允許的域名: [ 'https://your-app.vercel.app' ]
🔒 CORS 配置:
   1. https://your-app.vercel.app
   ✅ 使用環境變數 FRONTEND_URL
```

如果看到被拒絕的請求，日誌會顯示：

```
⚠️  CORS: Origin "https://some-domain.com" is not allowed. Allowed origins: [...]
```

### 5. 常見問題

#### 問題 1: 前端域名包含路徑

**錯誤**：
```env
FRONTEND_URL=https://your-app.vercel.app/some-path
```

**正確**：
```env
FRONTEND_URL=https://your-app.vercel.app
```

CORS 只檢查域名，不檢查路徑。

#### 問題 2: 協議不匹配

**錯誤**：前端使用 `https://`，但環境變數設置為 `http://`

**正確**：確保協議匹配（生產環境通常都是 `https://`）

#### 問題 3: 多個域名

如果前端有多個域名（例如 `www.yourdomain.com` 和 `yourdomain.com`），需要全部列出：

```env
FRONTEND_URL=https://www.yourdomain.com,https://yourdomain.com
```

#### 問題 4: Vercel 預覽部署

Vercel 的預覽部署會生成新的域名（例如 `your-app-git-main-username.vercel.app`），這些域名會被默認的正則表達式匹配：

```javascript
/^https:\/\/.*\.vercel\.app$/
```

但如果你的域名是自定義域名，需要手動添加到 `FRONTEND_URL`。

### 6. 臨時調試（不推薦用於生產）

如果需要臨時允許所有域名（僅用於調試），可以修改 `server.ts`：

```typescript
origin: (origin, callback) => {
  // 臨時允許所有域名（僅用於調試！）
  callback(null, true)
}
```

**⚠️ 警告**：這會允許任何域名訪問你的 API，存在安全風險，僅用於調試！

### 7. 驗證 CORS 配置

使用 curl 測試 CORS：

```bash
# 測試 OPTIONS 預檢請求
curl -X OPTIONS \
  -H "Origin: https://your-app.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v http://localhost:3001/api/auth/login

# 應該看到類似這樣的響應頭：
# Access-Control-Allow-Origin: https://your-app.vercel.app
# Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
# Access-Control-Allow-Credentials: true
```

## 快速修復步驟

1. **SSH 連接到服務器**：
   ```bash
   ssh root@98.159.109.110
   ```

2. **進入後端目錄**：
   ```bash
   cd /var/www/yellow-airlines/backend
   ```

3. **編輯環境變數**：
   ```bash
   nano .env
   ```

4. **設置 FRONTEND_URL**（替換為你的實際前端域名）：
   ```env
   FRONTEND_URL=https://your-actual-frontend-domain.vercel.app
   ```

5. **保存並退出**（`Ctrl+O`, `Enter`, `Ctrl+X`）

6. **重啟服務**：
   ```bash
   pm2 restart yellow-airlines-api
   ```

7. **檢查日誌**：
   ```bash
   pm2 logs yellow-airlines-api --lines 20
   ```

8. **測試**：在前端發送請求，應該不再出現 CORS 錯誤。

## 相關文檔

- `SERVER_DEPLOYMENT.md` - 服務器部署指南
- `API_TROUBLESHOOTING.md` - API 連接問題排查
