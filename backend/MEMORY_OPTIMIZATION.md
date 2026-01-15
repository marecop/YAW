# 後端內存優化指南

## 問題描述

後端服務器出現 OOM（Out of Memory）問題，內存使用突然爆炸。

## 已實施的優化措施

### 1. Node.js 堆內存限制

**PM2 配置 (`ecosystem.config.cjs`)**：
- 添加 `node_args: '--max-old-space-size=512'` 限制 Node.js 堆內存為 512MB
- 設置 `max_memory_restart: '700M'` 當進程總內存超過 700MB 時自動重啟

**啟動腳本 (`package.json`)**：
- `start` 腳本添加 `NODE_OPTIONS='--max-old-space-size=512'` 環境變數

### 2. PrismaClient 單例模式

**`lib/prisma.ts`**：
- 使用 `globalThis` 確保 PrismaClient 只創建一次
- 添加優雅關閉處理，在進程退出時斷開連接
- 優化日誌配置（生產環境只記錄錯誤）

### 3. 內存監控

PM2 會自動監控內存使用：
- 當進程內存超過 700MB 時自動重啟
- 記錄錯誤和輸出日誌到 `./logs/` 目錄

## 內存使用估算

- **Node.js 堆內存**：512MB（限制）
- **PrismaClient**：~50-100MB
- **Next.js Runtime**：~100-200MB
- **其他開銷**：~50-100MB
- **總計**：~700-900MB（PM2 限制為 700MB，超過會重啟）

## 監控和調試

### 查看內存使用

```bash
# 查看 PM2 進程狀態和內存使用
pm2 status

# 查看詳細內存信息
pm2 monit

# 查看內存使用歷史
pm2 logs yellow-airlines-api --lines 100 | grep -i memory
```

### 查看日誌

```bash
# 查看錯誤日誌
pm2 logs yellow-airlines-api --err --lines 50

# 查看所有日誌
pm2 logs yellow-airlines-api --lines 100

# 實時監控
pm2 logs yellow-airlines-api --lines 0
```

### 手動重啟服務

```bash
# 重啟服務（會保留內存限制）
pm2 restart yellow-airlines-api

# 完全重啟（重新加載配置）
pm2 delete yellow-airlines-api
pm2 start ecosystem.config.cjs
```

## 進一步優化建議

### 1. 如果內存仍然不足

可以進一步降低內存限制：

```javascript
// ecosystem.config.cjs
node_args: '--max-old-space-size=384',  // 降低到 384MB
max_memory_restart: '500M',  // 降低重啟閾值
```

**注意**：過低的內存限制可能導致性能問題或頻繁重啟。

### 2. 檢查是否有內存洩漏

```bash
# 使用 Node.js 內存分析工具
node --inspect --max-old-space-size=512 node_modules/.bin/next start

# 或使用 clinic.js
npm install -g clinic
clinic doctor -- node_modules/.bin/next start
```

### 3. 優化 Prisma 查詢

- 使用 `select` 只查詢需要的字段
- 使用 `take` 限制查詢結果數量
- 避免 N+1 查詢問題
- 使用連接池限制（如果使用 PostgreSQL/MySQL）

### 4. 考慮使用數據庫連接池

如果使用 PostgreSQL 或 MySQL，可以配置連接池：

```typescript
// lib/prisma.ts
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // 連接池配置（僅適用於 PostgreSQL/MySQL）
  // __internal: {
  //   engine: {
  //     connection_limit: 10,  // 限制連接數
  //   },
  // },
})
```

### 5. 監控和告警

設置 PM2 監控：

```bash
# 安裝 PM2 Plus（可選，需要註冊）
pm2 link <secret_key> <public_key>

# 或使用自定義監控腳本
```

## 常見問題

### Q: 為什麼設置了 512MB 堆內存限制，但進程還是超過 700MB？

A: Node.js 堆內存只是內存使用的一部分，還包括：
- V8 引擎開銷
- 緩衝區和字符串
- 原生模組（如 Prisma）
- 系統庫

PM2 的 `max_memory_restart` 監控的是整個進程的內存使用。

### Q: 服務頻繁重啟怎麼辦？

A: 可能原因：
1. 內存限制過低
2. 有內存洩漏
3. 單個請求處理時間過長

解決方案：
- 檢查日誌找出原因
- 適當提高內存限制
- 優化慢查詢

### Q: 如何確認 PrismaClient 沒有重複創建？

A: 檢查日誌中是否有多次 "Prisma Client initialized" 消息，或添加調試日誌：

```typescript
// lib/prisma.ts
if (!globalForPrisma.prisma) {
  console.log('Creating new PrismaClient instance')
} else {
  console.log('Reusing existing PrismaClient instance')
}
```

## 參考資料

- [Node.js 內存管理](https://nodejs.org/en/docs/guides/simple-profiling/)
- [Prisma 性能優化](https://www.prisma.io/docs/guides/performance-and-optimization)
- [PM2 文檔](https://pm2.keymetrics.io/docs/usage/application-declaration/)
