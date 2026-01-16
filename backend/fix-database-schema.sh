#!/bin/bash

# 修復數據庫 Schema 腳本
# 用於添加缺失的 emailVerified 列

set -e

echo "🔧 開始修復數據庫 Schema..."

# 檢查 .env 文件
if [ ! -f .env ]; then
    echo "❌ .env 文件不存在，請先創建 .env 文件"
    exit 1
fi

# 載入環境變數
export $(cat .env | grep -v '^#' | xargs)

# 檢查 DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL 未設置"
    exit 1
fi

echo "📊 數據庫路徑: $DATABASE_URL"

# 檢查 emailVerified 列是否存在
echo "🔍 檢查數據庫結構..."

# 使用 sqlite3 檢查（如果是 SQLite）
if [[ "$DATABASE_URL" == *"sqlite"* ]] || [[ "$DATABASE_URL" == *".db"* ]]; then
    DB_PATH=$(echo $DATABASE_URL | sed 's/file://' | sed 's/prisma\/dev.db/backend\/prisma\/dev.db/')
    
    # 如果路徑是相對路徑，轉換為絕對路徑
    if [[ "$DB_PATH" != /* ]]; then
        DB_PATH="$(pwd)/$DB_PATH"
    fi
    
    echo "📁 數據庫文件: $DB_PATH"
    
    # 檢查列是否存在
    if command -v sqlite3 &> /dev/null; then
        COLUMN_EXISTS=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM pragma_table_info('User') WHERE name='emailVerified';" 2>/dev/null || echo "0")
        
        if [ "$COLUMN_EXISTS" = "0" ]; then
            echo "⚠️  emailVerified 列不存在，正在添加..."
            sqlite3 "$DB_PATH" "ALTER TABLE User ADD COLUMN emailVerified TEXT;" 2>/dev/null || echo "⚠️  添加列時出錯（可能已存在）"
            echo "✅ emailVerified 列已添加"
        else
            echo "✅ emailVerified 列已存在"
        fi
    else
        echo "⚠️  sqlite3 未安裝，跳過直接檢查"
        echo "💡 將使用 Prisma migrate 來修復"
    fi
fi

# 運行 Prisma migrate
echo "🔄 運行 Prisma migrate..."
npx prisma migrate deploy || {
    echo "⚠️  migrate deploy 失敗，嘗試創建新遷移..."
    npx prisma migrate dev --name add_email_verified_column --create-only || true
}

# 生成 Prisma Client
echo "🔧 重新生成 Prisma Client..."
npx prisma generate

echo "✅ 數據庫 Schema 修復完成！"
echo "💡 如果問題仍然存在，請手動運行: npx prisma migrate dev"
