# Vercel DNS 配置指南

## 前提条件

1. 你已经在 Vercel 部署了前端项目
2. 你已经有一个域名（例如：`yellowairlines.com`）
3. 你的后端 API 运行在服务器 `98.159.109.110:3001`

## 步骤 1：在 Vercel 中添加域名

1. **登录 Vercel Dashboard**
   - 访问 https://vercel.com/dashboard
   - 选择你的项目（Yellow Airlines Frontend）

2. **进入项目设置**
   - 点击项目名称进入项目详情页
   - 点击顶部菜单的 **Settings**
   - 在左侧菜单选择 **Domains**

3. **添加自定义域名**
   - 点击 **Add** 按钮
   - 输入你的域名（例如：`yellowairlines.com` 或 `www.yellowairlines.com`）
   - 点击 **Add**

## 步骤 2：配置 DNS 记录

Vercel 会显示需要添加的 DNS 记录。根据你的域名提供商，添加以下记录：

### 选项 A：使用 A 记录（推荐用于根域名）

如果你的域名提供商支持 A 记录：

```
类型: A
名称: @ (或留空，表示根域名)
值: 76.76.21.21 (Vercel 的 IP，Vercel 会提供)
TTL: 3600 (或自动)
```

### 选项 B：使用 CNAME 记录（推荐用于子域名）

如果你的域名提供商只支持 CNAME（或你想使用子域名）：

```
类型: CNAME
名称: www (或其他子域名，如 app)
值: cname.vercel-dns.com
TTL: 3600 (或自动)
```

### 选项 C：使用 Vercel 的 DNS 服务器（最简单）

如果你的域名提供商允许更改 DNS 服务器：

1. 在 Vercel 的 Domains 页面，选择你的域名
2. 点击 **Configure** 或 **DNS Settings**
3. Vercel 会提供 DNS 服务器地址，例如：
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. 在你的域名注册商处，将 DNS 服务器更改为 Vercel 提供的地址

## 步骤 3：等待 DNS 传播

- DNS 更改通常需要 **5 分钟到 48 小时** 才能完全传播
- 你可以使用以下工具检查 DNS 传播状态：
  - https://www.whatsmydns.net/
  - https://dnschecker.org/

## 步骤 4：验证域名

1. 在 Vercel Dashboard 中，等待域名状态变为 **Valid Configuration**
2. Vercel 会自动为你的域名配置 SSL 证书（HTTPS）
3. 访问你的域名，确认网站正常加载

## 步骤 5：配置环境变量

在 Vercel 项目设置中添加环境变量：

1. 进入项目 **Settings** → **Environment Variables**
2. 添加以下变量：

```
API_BASE_URL=http://98.159.109.110:3001
```

**重要提示**：
- 如果你的后端也配置了域名（例如：`api.yellowairlines.com`），应该使用域名而不是 IP
- 如果使用 HTTPS，确保后端也支持 HTTPS，否则会有混合内容警告

## 步骤 6：重新部署（如果需要）

如果环境变量是新添加的，需要重新部署：

1. 在 Vercel Dashboard 中，进入 **Deployments** 页面
2. 点击最新部署右侧的 **...** 菜单
3. 选择 **Redeploy**
4. 或者推送新的代码到 Git 仓库，Vercel 会自动部署

## 常见域名提供商配置示例

### Cloudflare

1. 登录 Cloudflare Dashboard
2. 选择你的域名
3. 进入 **DNS** → **Records**
4. 添加记录：
   - **Type**: CNAME
   - **Name**: www (或你想要的子域名)
   - **Target**: cname.vercel-dns.com
   - **Proxy status**: DNS only (关闭代理，或根据需要开启)
   - 点击 **Save**

### GoDaddy

1. 登录 GoDaddy
2. 进入 **My Products** → **DNS**
3. 在 **Records** 部分添加：
   - **Type**: CNAME
   - **Name**: www
   - **Value**: cname.vercel-dns.com
   - **TTL**: 1 Hour
   - 点击 **Save**

### Namecheap

1. 登录 Namecheap
2. 进入 **Domain List** → 选择域名 → **Manage** → **Advanced DNS**
3. 在 **Host Records** 部分添加：
   - **Type**: CNAME Record
   - **Host**: www
   - **Value**: cname.vercel-dns.com
   - **TTL**: Automatic
   - 点击 **Save All Changes**

### Google Domains

1. 登录 Google Domains
2. 选择你的域名
3. 进入 **DNS** → **Custom resource records**
4. 添加：
   - **Name**: www
   - **Type**: CNAME
   - **Data**: cname.vercel-dns.com
   - 点击 **Add**

## 后端 API 域名配置（可选但推荐）

为了更好的安全性和可维护性，建议也为后端 API 配置域名：

### 1. 在服务器上配置 Nginx

```nginx
server {
    listen 80;
    server_name api.yellowairlines.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. 配置 DNS A 记录

在你的域名提供商处添加：

```
类型: A
名称: api
值: 98.159.109.110
TTL: 3600
```

### 3. 配置 SSL 证书（使用 Let's Encrypt）

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yellowairlines.com
```

### 4. 更新 Vercel 环境变量

将 `API_BASE_URL` 更新为：
```
API_BASE_URL=https://api.yellowairlines.com
```

## 验证配置

部署完成后，访问你的域名并测试：

1. ✅ 首页正常加载
2. ✅ 可以搜索航班（会调用后端 API）
3. ✅ 可以登录（会调用后端 `/api/auth/login`）
4. ✅ 浏览器控制台没有 CORS 错误
5. ✅ 网络请求都指向正确的后端地址

## 故障排除

### DNS 未生效

- 等待更长时间（最多 48 小时）
- 清除 DNS 缓存：`sudo dscacheutil -flushcache` (Mac) 或 `ipconfig /flushdns` (Windows)
- 使用不同的 DNS 服务器（如 Google DNS: 8.8.8.8）

### SSL 证书问题

- Vercel 会自动配置 SSL，等待几分钟
- 如果使用自定义域名，确保 DNS 已正确配置

### API 请求失败

- 检查 `API_BASE_URL` 环境变量是否正确设置
- 检查后端服务是否正常运行
- 检查服务器防火墙是否开放 3001 端口
- 检查后端 CORS 配置是否正确

### CORS 错误

- 确保后端 `middleware.ts` 中配置了正确的前端域名
- 检查后端环境变量 `FRONTEND_URL` 是否包含你的 Vercel 域名

## 总结

1. ✅ 在 Vercel 添加域名
2. ✅ 在域名提供商配置 DNS（CNAME 或 A 记录）
3. ✅ 等待 DNS 传播
4. ✅ 在 Vercel 设置环境变量 `API_BASE_URL`
5. ✅ 重新部署（如果需要）
6. ✅ 验证网站和 API 正常工作

完成以上步骤后，你的网站就可以通过自定义域名访问了！
