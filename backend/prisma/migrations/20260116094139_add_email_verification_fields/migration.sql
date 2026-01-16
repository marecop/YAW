-- AlterTable
-- 添加 emailVerified 和 emailVerificationToken 字段（如果不存在）
-- SQLite 不支持 IF NOT EXISTS，所以需要先檢查

-- 注意：如果列已存在，這個遷移會失敗，但不會影響數據庫
-- 在生產環境中，如果列已存在，可以手動跳過這個遷移

-- 添加 emailVerified 列
ALTER TABLE "User" ADD COLUMN "emailVerified" DATETIME;

-- 添加 emailVerificationToken 列
ALTER TABLE "User" ADD COLUMN "emailVerificationToken" TEXT;
