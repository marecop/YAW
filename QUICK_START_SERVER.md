# 服务器快速部署指南（简化版）

## 一键部署命令

在服务器上执行以下命令即可完成部署：

```bash
# 1. 连接到服务器
ssh root@98.159.109.110

# 2. 安装必要软件（Ubuntu/Debian）
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx
sudo npm install -g pm2

# 3. 克隆代码
cd /var/www
git clone https://github.com/marecop/YAW.git yellow-airlines
cd yellow-airlines/backend

# 4. 运行部署脚本
bash deploy.sh

# 5. 编辑环境变量
nano .env
# 填入正确的配置（参考下面的配置示例）

# 6. 重启服务
pm2 restart yellow-airlines-api

# 7. 配置防火墙
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3001/tcp
sudo ufw enable

# 8. 测试 API
curl http://localhost:3001/api/flights
```

## .env 配置示例

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars-change-this"
NODE_ENV="production"
PORT=3001
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

## 验证部署

```bash
# 检查服务状态
pm2 status

# 查看日志
pm2 logs yellow-airlines-api

# 测试 API
curl http://98.159.109.110:3001/api/flights
```

## 常用命令

```bash
# 重启服务
pm2 restart yellow-airlines-api

# 停止服务
pm2 stop yellow-airlines-api

# 查看日志
pm2 logs yellow-airlines-api

# 更新代码
cd /var/www/yellow-airlines
git pull origin main
cd backend
npm install
npm run build
pm2 restart yellow-airlines-api
```

## 详细文档

完整部署指南请参考：`SERVER_DEPLOYMENT.md`
