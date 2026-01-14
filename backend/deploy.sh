#!/bin/bash

# Yellow Airlines Backend 部署脚本
# 使用方法: bash deploy.sh

set -e  # 遇到错误立即退出

echo "🚀 开始部署 Yellow Airlines Backend API..."

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi

echo "✅ npm 版本: $(npm --version)"

# 安装依赖
echo "📦 安装依赖..."
npm install

# 生成 Prisma Client
echo "🔧 生成 Prisma Client..."
npx prisma generate

# 检查 .env 文件
if [ ! -f .env ]; then
    echo "⚠️  .env 文件不存在，正在创建..."
    cat > .env << EOF
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="yellow-airlines-secret-key-change-in-production"
NODE_ENV="production"
PORT=3001
FRONTEND_URL=https://your-vercel-domain.vercel.app
EOF
    echo "✅ 已创建 .env 文件，请编辑并填入正确的配置"
    echo "📝 使用命令: nano .env"
fi

# 运行数据库迁移
echo "🗄️  运行数据库迁移..."
npx prisma migrate deploy || echo "⚠️  数据库迁移失败或不需要迁移"

# 构建项目
echo "🏗️  构建项目..."
npm run build

# 检查 PM2
if command -v pm2 &> /dev/null; then
    echo "✅ PM2 已安装"
    
    # 停止旧服务（如果存在）
    pm2 stop yellow-airlines-api 2>/dev/null || true
    pm2 delete yellow-airlines-api 2>/dev/null || true
    
    # 启动服务
    echo "🚀 启动服务..."
    pm2 start ecosystem.config.cjs
    
    # 保存 PM2 配置
    pm2 save
    
    echo "✅ 服务已启动"
    echo "📊 查看状态: pm2 status"
    echo "📋 查看日志: pm2 logs yellow-airlines-api"
else
    echo "⚠️  PM2 未安装，使用 npm start 启动服务"
    echo "💡 安装 PM2: npm install -g pm2"
fi

echo "✅ 部署完成！"
echo "🌐 API 地址: http://localhost:3001"
echo "📚 查看部署文档: SERVER_DEPLOYMENT.md"
