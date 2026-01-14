# VPS 服务器部署指南

本指南将帮助你在 VPS 服务器（98.159.109.110）上部署 Yellow Airlines 后端 API 服务。

## 前提条件

- VPS 服务器：98.159.109.110
- SSH 访问权限
- 域名（可选，但推荐用于生产环境）

## 步骤 1：连接到服务器

```bash
# 使用 SSH 连接到服务器
ssh root@98.159.109.110
# 或使用你的用户名
ssh your-username@98.159.109.110
```

## 步骤 2：更新系统并安装必要软件

### Ubuntu/Debian 系统

```bash
# 更新系统包
sudo apt update && sudo apt upgrade -y

# 安装 Node.js 20.x（推荐 LTS 版本）
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 验证安装
node --version  # 应该显示 v20.x.x
npm --version   # 应该显示 10.x.x

# 安装 Git（如果还没有）
sudo apt install -y git

# 安装 PM2（用于进程管理）
sudo npm install -g pm2

# 安装 Nginx（用于反向代理，可选但推荐）
sudo apt install -y nginx
```

### CentOS/RHEL 系统

```bash
# 更新系统
sudo yum update -y

# 安装 Node.js 20.x
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# 安装 Git
sudo yum install -y git

# 安装 PM2
sudo npm install -g pm2

# 安装 Nginx
sudo yum install -y nginx
```

## 步骤 3：克隆代码仓库

```bash
# 创建项目目录
mkdir -p /var/www
cd /var/www

# 克隆仓库
git clone https://github.com/marecop/YAW.git yellow-airlines
cd yellow-airlines

# 进入后端目录
cd backend
```

## 步骤 4：安装依赖

```bash
# 安装项目依赖
npm install

# 生成 Prisma Client
npx prisma generate
```

## 步骤 5：配置环境变量

```bash
# 创建 .env 文件
nano .env
```

在 `.env` 文件中添加以下内容：

```env
# 数据库连接
DATABASE_URL="file:./prisma/dev.db"

# JWT 密钥（请更改为强密码）
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production-min-32-chars"

# 运行环境
NODE_ENV="production"

# 服务端口
PORT=3001

# 允许的前端域名（CORS）
# 如果有多个域名，用逗号分隔
FRONTEND_URL=https://your-vercel-domain.vercel.app,https://www.yourdomain.com

# 应用基础 URL（用于邮件链接等）
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
```

保存文件（`Ctrl+O`，然后 `Enter`，最后 `Ctrl+X`）

## 步骤 6：初始化数据库

```bash
# 运行数据库迁移（如果需要）
npx prisma migrate deploy

# 填充初始数据（可选）
npm run db:seed
```

## 步骤 7：构建项目

```bash
# 构建生产版本
npm run build
```

## 步骤 8：配置防火墙

```bash
# Ubuntu/Debian (UFW)
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp    # HTTPS
sudo ufw allow 3001/tcp   # API 端口（如果直接暴露）
sudo ufw enable

# 检查防火墙状态
sudo ufw status
```

**注意**：如果使用 Nginx 反向代理，不需要开放 3001 端口，只需要开放 80 和 443。

## 步骤 9：使用 PM2 运行服务

### 创建 PM2 配置文件

```bash
# 在 backend 目录下创建 ecosystem.config.cjs
nano ecosystem.config.cjs
```

添加以下内容：

```javascript
module.exports = {
  apps: [{
    name: 'yellow-airlines-api',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/yellow-airlines/backend',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/log/yellow-airlines/error.log',
    out_file: '/var/log/yellow-airlines/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}
```

### 创建日志目录

```bash
sudo mkdir -p /var/log/yellow-airlines
sudo chown -R $USER:$USER /var/log/yellow-airlines
```

### 启动服务

```bash
# 启动服务
pm2 start ecosystem.config.cjs

# 保存 PM2 配置（开机自启）
pm2 save

# 设置 PM2 开机自启
pm2 startup
# 执行上面命令输出的命令（通常是 sudo 命令）

# 查看服务状态
pm2 status

# 查看日志
pm2 logs yellow-airlines-api

# 重启服务
pm2 restart yellow-airlines-api

# 停止服务
pm2 stop yellow-airlines-api
```

## 步骤 10：配置 Nginx 反向代理（推荐）

### 创建 Nginx 配置文件

```bash
sudo nano /etc/nginx/sites-available/yellow-airlines-api
```

添加以下配置（如果使用 IP 直接访问）：

```nginx
server {
    listen 80;
    server_name 98.159.109.110;

    # API 代理
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # 增加超时时间
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # 健康检查端点
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

**如果你有域名（例如：api.yellowairlines.com），使用以下配置：**

```nginx
server {
    listen 80;
    server_name api.yellowairlines.com;

    # API 代理
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # CORS 头（如果需要）
        add_header Access-Control-Allow-Origin $http_origin always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
        add_header Access-Control-Allow-Credentials "true" always;
        
        if ($request_method = OPTIONS) {
            return 204;
        }
    }

    # 健康检查
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

### 启用配置

```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/yellow-airlines-api /etc/nginx/sites-enabled/

# 测试 Nginx 配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx

# 设置 Nginx 开机自启
sudo systemctl enable nginx
```

## 步骤 11：配置 SSL 证书（可选但强烈推荐）

### 使用 Let's Encrypt（免费 SSL）

```bash
# 安装 Certbot
sudo apt install -y certbot python3-certbot-nginx  # Ubuntu/Debian
# 或
sudo yum install -y certbot python3-certbot-nginx  # CentOS/RHEL

# 获取 SSL 证书（如果有域名）
sudo certbot --nginx -d api.yellowairlines.com

# 自动续期测试
sudo certbot renew --dry-run
```

Certbot 会自动更新 Nginx 配置以使用 HTTPS。

## 步骤 12：验证部署

### 测试 API 是否运行

```bash
# 在服务器上测试
curl http://localhost:3001/api/flights

# 从外部测试（使用你的 IP）
curl http://98.159.109.110:3001/api/flights

# 如果有域名和 Nginx
curl http://api.yellowairlines.com/api/flights
```

### 检查服务状态

```bash
# 检查 PM2 状态
pm2 status

# 检查 Nginx 状态
sudo systemctl status nginx

# 查看 API 日志
pm2 logs yellow-airlines-api --lines 50
```

## 步骤 13：更新 Vercel 环境变量

如果使用了域名，更新 Vercel 的环境变量：

1. 进入 Vercel Dashboard → 项目 Settings → Environment Variables
2. 更新 `API_BASE_URL`：
   - 如果使用 IP：`http://98.159.109.110:3001`
   - 如果使用域名：`https://api.yellowairlines.com`（推荐）

## 常用维护命令

### 查看日志

```bash
# PM2 日志
pm2 logs yellow-airlines-api

# 实时日志
pm2 logs yellow-airlines-api --lines 100 --raw

# Nginx 错误日志
sudo tail -f /var/log/nginx/error.log

# Nginx 访问日志
sudo tail -f /var/log/nginx/access.log
```

### 重启服务

```bash
# 重启 API
pm2 restart yellow-airlines-api

# 重启 Nginx
sudo systemctl restart nginx

# 重启整个服务器（谨慎使用）
sudo reboot
```

### 更新代码

```bash
cd /var/www/yellow-airlines
git pull origin main
cd backend
npm install
npx prisma generate
npm run build
pm2 restart yellow-airlines-api
```

### 备份数据库

```bash
# 备份 SQLite 数据库
cp /var/www/yellow-airlines/backend/prisma/dev.db /var/backups/yellow-airlines-$(date +%Y%m%d).db

# 或使用 tar 压缩
tar -czf /var/backups/yellow-airlines-$(date +%Y%m%d).tar.gz /var/www/yellow-airlines/backend/prisma/dev.db
```

## 故障排除

### API 无法访问

1. **检查服务是否运行**
   ```bash
   pm2 status
   ```

2. **检查端口是否监听**
   ```bash
   sudo netstat -tlnp | grep 3001
   # 或
   sudo ss -tlnp | grep 3001
   ```

3. **检查防火墙**
   ```bash
   sudo ufw status
   ```

4. **检查 Nginx 配置**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

### 数据库错误

1. **检查数据库文件权限**
   ```bash
   ls -la /var/www/yellow-airlines/backend/prisma/dev.db
   ```

2. **重新生成 Prisma Client**
   ```bash
   cd /var/www/yellow-airlines/backend
   npx prisma generate
   ```

### 内存不足

如果服务器内存较小，可以：

1. **限制 PM2 内存使用**（已在 ecosystem.config.cjs 中设置）
2. **使用 swap 文件**
   ```bash
   sudo fallocate -l 2G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   ```

## 性能优化建议

1. **使用 Nginx 缓存静态响应**
2. **配置 PM2 集群模式**（如果有多核 CPU）
3. **使用 Redis 缓存**（如果需要）
4. **定期清理日志文件**
5. **监控服务器资源使用**

## 安全建议

1. ✅ 更改默认 SSH 端口
2. ✅ 使用 SSH 密钥认证而非密码
3. ✅ 定期更新系统包
4. ✅ 使用强密码和 JWT 密钥
5. ✅ 配置 fail2ban 防止暴力破解
6. ✅ 使用 HTTPS（SSL 证书）
7. ✅ 限制数据库文件访问权限
8. ✅ 定期备份数据

## 总结

完成以上步骤后，你的后端 API 应该：

- ✅ 运行在 `http://98.159.109.110:3001`（或你的域名）
- ✅ 通过 PM2 管理，自动重启
- ✅ 通过 Nginx 反向代理（如果配置）
- ✅ 支持 HTTPS（如果配置 SSL）
- ✅ 开机自动启动
- ✅ 日志记录完整

现在你的前端（Vercel）可以正常连接到后端 API 了！
