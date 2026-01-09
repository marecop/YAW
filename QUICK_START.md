# Yellow Airlines 快速开始

## 🎉 项目已经成功创建！

您的黄色航空网站现在正在运行。

## 📝 当前状态

开发服务器已启动并运行在：
**http://localhost:3000**

## ✅ 已完成的功能

### 核心功能
- ✈️ 航班搜索系统
- 👤 用户认证（登录/注册）
- 🎫 会员中心
- 📋 我的预订管理
- 🌍 4种语言支持（德/英/简中/粤语）
- 🎨 黄色主题的简约现代设计

### 数据库
- 21个示例航班数据
- 2个测试用户账户
- 3个促销活动
- 2个政策条款
- 3个会员权益等级

### 页面
1. 首页（http://localhost:3000）
2. 登录（http://localhost:3000/auth/login）
3. 注册（http://localhost:3000/auth/register）
4. 航班搜索结果（搜索后显示）
5. 会员中心（http://localhost:3000/member）
6. 我的预订（http://localhost:3000/member/bookings）

## 🚀 开始使用

### 1. 测试登录功能

访问登录页面并使用以下测试账户：

**账户1（金卡会员）：**
- 邮箱：john@example.com
- 密码：password123

**账户2（白金卡会员）：**
- 邮箱：sarah@example.com  
- 密码：password123

### 2. 测试航班搜索

1. 在首页输入以下信息：
   - 出发地：HKG
   - 目的地：FRA
   - 选择日期
   - 点击搜索

2. 查看搜索结果并选择航班

### 3. 测试语言切换

- 滚动到页面底部 Footer
- 点击语言按钮切换语言（德语/英语/简体中文/粤语繁体）

## 📊 数据库管理

查看数据库内容：

```bash
npx prisma studio
```

这将在 http://localhost:5555 打开 Prisma Studio

## 🛠️ 开发命令

```bash
# 开发服务器（已运行）
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 重新填充数据库
npm run db:seed

# Lint 检查
npm run lint
```

## 📂 项目结构

```
/app                    # Next.js 应用目录
  /api                  # API 路由
    /auth               # 认证 API（登录/注册）
    /flights            # 航班搜索 API
    /bookings           # 预订管理 API
  /auth                 # 认证页面
  /flights              # 航班相关页面
  /member               # 会员中心
  layout.tsx            # 根布局
  page.tsx              # 首页

/components             # React 组件
  Header.tsx            # 导航栏
  Footer.tsx            # 页脚（含语言切换器）
  FlightSearchForm.tsx  # 航班搜索表单

/contexts               # React Context
  LanguageContext.tsx   # 多语言管理

/lib                    # 工具函数
  prisma.ts             # Prisma 客户端
  /utils
    auth.ts             # 认证工具函数

/public/locales         # 翻译文件
  de.json               # 德语
  en.json               # 英语
  zh-cn.json            # 简体中文
  zh-hk.json            # 粤语繁体

/prisma                 # 数据库
  schema.prisma         # 数据库模型
  seed.ts               # 种子数据
  dev.db                # SQLite 数据库文件
```

## 🎨 设计特色

- **主色调**：黄色 (#FFC107) - Yellow Airlines 品牌色
- **辅助色**：深蓝色 (#0F172A) - 用于导航和文字
- **设计风格**：简约现代，大量留白
- **响应式**：完全适配移动端、平板和桌面

## 🔐 安全功能

- **密码哈希**：使用 bcrypt 加密存储
- **JWT 认证**：安全的 token 认证
- **数据隔离**：每个用户只能查看自己的数据
- **API 保护**：所有敏感 API 都需要认证

## 🌟 特色功能

### 1. 多语言系统
- 自定义实现，避免 i18n 库的常见 bug
- 4种语言无缝切换
- 语言选择保存在 localStorage

### 2. 会员系统
- 三个等级：银卡、金卡、白金卡
- 积分系统
- 专属权益

### 3. 数据隔离
- 每个用户的预订完全隔离
- API 层面强制验证
- 安全的数据访问控制

## 📝 下一步建议

可以继续开发以下功能：

1. **在线值机和选座**
   - 座位选择界面
   - 登机牌生成

2. **预订流程**
   - 航班详情页
   - 预订确认页
   - 支付集成

3. **内容页面**
   - 礼遇计划详情
   - 促销活动页面
   - 政策中心
   - 目的地指南
   - FAQ 页面

4. **高级功能**
   - 航班状态实时查询
   - 积分兑换商城
   - 邮件通知
   - 行李额外购买

## 🐛 故障排除

### 翻译文本显示为键名

这是正常的客户端水合过程，页面加载完成后会自动显示正确的翻译文本。

### 数据库错误

重新生成数据库：

```bash
npx prisma db push
npm run db:seed
```

### 端口被占用

更改端口号：

```bash
npm run dev -- -p 3001
```

## 📞 技术支持

如有问题，请检查：
- 浏览器控制台是否有错误
- 终端是否有错误信息
- 数据库是否正确初始化

## 🎯 测试检查清单

- [ ] 访问首页
- [ ] 测试航班搜索
- [ ] 登录测试账户
- [ ] 查看会员中心
- [ ] 切换语言
- [ ] 测试移动端响应式

---

**享受开发！✨**

如果一切正常，您应该能看到一个功能完整、设计精美的航空公司网站正在运行！

