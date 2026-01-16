#!/bin/bash

# 修復數據庫 Schema 腳本
# 用於添加缺失的 emailVerified 和 emailVerificationToken 列

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

# 提取數據庫文件路徑（SQLite）
DB_PATH=$(echo $DATABASE_URL | sed 's/file://' | sed 's|prisma/dev.db|prisma/dev.db|')

# 如果路徑是相對路徑，轉換為絕對路徑
if [[ "$DB_PATH" != /* ]]; then
    DB_PATH="$(pwd)/$DB_PATH"
fi

echo "📁 數據庫文件: $DB_PATH"

# 檢查並添加缺失的列（如果使用 SQLite）
if [[ "$DATABASE_URL" == *"sqlite"* ]] || [[ "$DATABASE_URL" == *".db"* ]]; then
    if command -v sqlite3 &> /dev/null && [ -f "$DB_PATH" ]; then
        echo "🔍 檢查數據庫結構..."
        
        # 檢查 emailVerified 列
        EMAIL_VERIFIED_EXISTS=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM pragma_table_info('User') WHERE name='emailVerified';" 2>/dev/null || echo "0")
        
        if [ "$EMAIL_VERIFIED_EXISTS" = "0" ]; then
            echo "⚠️  emailVerified 列不存在，正在添加..."
            sqlite3 "$DB_PATH" "ALTER TABLE User ADD COLUMN emailVerified DATETIME;" 2>/dev/null && echo "✅ emailVerified 列已添加" || echo "⚠️  添加 emailVerified 時出錯"
        else
            echo "✅ emailVerified 列已存在"
        fi
        
        # 檢查 emailVerificationToken 列
        EMAIL_TOKEN_EXISTS=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM pragma_table_info('User') WHERE name='emailVerificationToken';" 2>/dev/null || echo "0")
        
        if [ "$EMAIL_TOKEN_EXISTS" = "0" ]; then
            echo "⚠️  emailVerificationToken 列不存在，正在添加..."
            sqlite3 "$DB_PATH" "ALTER TABLE User ADD COLUMN emailVerificationToken TEXT;" 2>/dev/null && echo "✅ emailVerificationToken 列已添加" || echo "⚠️  添加 emailVerificationToken 時出錯"
        else
            echo "✅ emailVerificationToken 列已存在"
        fi
        
        # 檢查 FlightInstance 表是否存在
        FLIGHT_INSTANCE_TABLE_EXISTS=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='FlightInstance';" 2>/dev/null || echo "0")
        
        if [ "$FLIGHT_INSTANCE_TABLE_EXISTS" = "0" ]; then
            echo "⚠️  FlightInstance 表不存在，正在創建..."
            sqlite3 "$DB_PATH" <<EOF
CREATE TABLE "FlightInstance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "scheduledDeparture" DATETIME NOT NULL,
    "scheduledArrival" DATETIME NOT NULL,
    "actualDeparture" DATETIME,
    "actualArrival" DATETIME,
    "aircraftRegistration" TEXT,
    "aircraftType" TEXT,
    "gate" TEXT,
    "terminal" TEXT,
    "baggageClaim" TEXT,
    "weatherOrigin" TEXT,
    "weatherDestination" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FlightInstance_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "FlightInstance_flightId_date_key" ON "FlightInstance"("flightId", "date");
EOF
            if [ $? -eq 0 ]; then
                echo "✅ FlightInstance 表已創建"
            else
                echo "❌ 創建 FlightInstance 表時出錯"
            fi
        else
            echo "✅ FlightInstance 表已存在"
        fi
    else
        echo "⚠️  sqlite3 未安裝或數據庫文件不存在，將使用 Prisma migrate"
    fi
fi

# 運行 Prisma migrate
echo "🔄 運行 Prisma migrate..."
npx prisma migrate deploy 2>&1 || {
    echo "⚠️  migrate deploy 失敗或部分遷移已應用"
    echo "💡 這可能是正常的，如果列已存在"
}

# 生成 Prisma Client
echo "🔧 重新生成 Prisma Client..."
npx prisma generate

echo "✅ 數據庫 Schema 修復完成！"
echo "💡 如果問題仍然存在，請檢查日誌或手動運行: npx prisma migrate dev"
