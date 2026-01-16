# 數據庫 Schema 修復指南

## 錯誤信息

```
The column `main.User.emailVerified` does not exist in the current database.
```

這個錯誤表示數據庫結構與 Prisma schema 不同步。

## 快速修復

在服務器上執行以下命令：

```bash
# 1. SSH 連接到服務器
ssh root@98.159.109.110

# 2. 進入後端目錄
cd /var/www/yellow-airlines/backend

# 3. 運行修復腳本
bash fix-database-schema.sh

# 或者手動執行：
# 4. 創建遷移
npx prisma migrate dev --name add_email_verified_column

# 5. 應用遷移
npx prisma migrate deploy

# 6. 重新生成 Prisma Client
npx prisma generate

# 7. 重啟服務
pm2 restart yellow-airlines-api
```

## 手動修復（如果自動修復失敗）

### 方法 1: 使用 Prisma Migrate

```bash
cd /var/www/yellow-airlines/backend

# 創建遷移
npx prisma migrate dev --name add_email_verified_column

# 應用遷移
npx prisma migrate deploy

# 重新生成 Prisma Client
npx prisma generate

# 重啟服務
pm2 restart yellow-airlines-api
```

### 方法 2: 直接修改數據庫（SQLite）

如果使用 SQLite，可以直接添加列：

```bash
cd /var/www/yellow-airlines/backend

# 使用 sqlite3 添加列
sqlite3 prisma/dev.db "ALTER TABLE User ADD COLUMN emailVerified TEXT;"

# 重新生成 Prisma Client
npx prisma generate

# 重啟服務
pm2 restart yellow-airlines-api
```

### 方法 3: 重置數據庫（⚠️ 會丟失數據）

**僅在開發環境或可以接受數據丟失時使用**：

```bash
cd /var/www/yellow-airlines/backend

# 重置數據庫
npx prisma migrate reset

# 重新填充數據
npm run db:seed

# 重啟服務
pm2 restart yellow-airlines-api
```

## 驗證修復

修復後，檢查服務日誌：

```bash
pm2 logs yellow-airlines-api --lines 20
```

應該不再看到 `emailVerified` 相關的錯誤。

測試登錄：

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@yellowairlines.com","password":"password123"}'
```

應該返回成功響應，而不是數據庫錯誤。

## 預防措施

1. **部署前檢查**：在部署前運行 `npx prisma migrate status` 檢查遷移狀態
2. **自動化部署**：`deploy.sh` 腳本已更新，會自動嘗試修復遷移問題
3. **版本控制**：確保 `prisma/schema.prisma` 和 `prisma/migrations/` 都在 Git 中

## 相關文檔

- `SERVER_DEPLOYMENT.md` - 服務器部署指南
- `QUICK_START_SERVER.md` - 快速部署指南
