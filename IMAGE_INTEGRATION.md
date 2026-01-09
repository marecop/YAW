# 🖼️ 图片素材整合文档

## ✅ 已修复的问题

### CSS 编译错误
**问题**: `@import` 规则顺序错误
**解决方案**: 将 Google Fonts 的 `@import` 移到 Tailwind CSS 之前

```css
@import url('https://fonts.googleapis.com/css2?family=Inter...');
@import "tailwindcss";
```

---

## 📸 已整合的图片素材

### 1. **Logo 图片** - Header 导航栏

**文件**: `/images/logoremovebkgnd.png`

**位置**: Header 组件左上角

**特点**:
- ✅ 使用 Next.js Image 组件优化
- ✅ 响应式尺寸（48x48px）
- ✅ 悬停放大效果（scale-110）
- ✅ 优先加载（priority）
- ✅ 平滑过渡动画

```tsx
<Image
  src="/images/logoremovebkgnd.png"
  alt="Yellow Airlines Logo"
  fill
  className="object-contain"
  priority
/>
```

---

### 2. **城市图片** - 热门目的地卡片

已整合 6 个城市的真实图片：

| 城市 | 代码 | 图片文件 | 价格 |
|------|------|----------|------|
| 香港 | HKG | `/images/hk.png` | ¥3,800 |
| 新加坡 | SIN | `/images/Singapore.png` | ¥4,200 |
| 伦敦 | LHR | `/images/london.png` | ¥6,500 |
| 纽约 | JFK | `/images/newyork.png` | ¥7,800 |
| 东京 | NRT | `/images/tokyo.png` | ¥4,500 |
| 广州 | CAN | `/images/guangzhou.png` | ¥2,800 |

**卡片设计特点**:
- ✅ 56高度的图片容器
- ✅ 悬停时图片放大（scale-110）
- ✅ 渐变遮罩层（黑色到透明）
- ✅ 城市名称叠加在图片上
- ✅ 价格和查看航班按钮
- ✅ 箭头悬停动画

```tsx
<div className="relative h-56 overflow-hidden">
  <Image
    src={destination.image}
    alt={destination.city}
    fill
    className="object-cover group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60..." />
</div>
```

---

### 3. **Hero 背景装饰**

**文件**: `/images/logoremovebkgnd.png`

**位置**: Hero 区域右下角

**特点**:
- ✅ 大尺寸 Logo 水印（600x600px）
- ✅ 超低透明度（opacity-[0.03]）
- ✅ 不影响交互（pointer-events-none）
- ✅ 创造品牌一致性

---

## 🎨 视觉改进效果

### Before（之前）:
- 🔸 使用表情符号代替城市图片
- 🔸 Header 使用飞机图标
- 🔸 纯色渐变背景

### After（现在）:
- ✅ **真实城市照片**，更具吸引力
- ✅ **专业 Logo**，品牌识别度高
- ✅ **视觉层次丰富**，有深度感
- ✅ **悬停动画流畅**，用户体验好

---

## 🚀 性能优化

所有图片使用 Next.js Image 组件：

### 优势：
1. **自动优化**: WebP 格式转换
2. **懒加载**: 视口外的图片延迟加载
3. **响应式**: 根据设备提供合适尺寸
4. **优先级**: Logo 设置 priority 优先加载
5. **缓存**: 浏览器缓存优化

---

## 📐 图片规格建议

### Logo 图片:
- 建议尺寸: 512x512px 或更高
- 格式: PNG（透明背景）
- 文件大小: < 100KB

### 城市图片:
- 建议尺寸: 800x600px 或 16:9 比例
- 格式: JPG 或 PNG
- 文件大小: < 500KB
- 建议: 高质量风景照或地标建筑

---

## 🎯 使用的图片

### 已使用:
- ✅ `logoremovebkgnd.png` - Header Logo
- ✅ `logoremovebkgnd.png` - Hero 背景水印
- ✅ `hk.png` - 香港卡片
- ✅ `Singapore.png` - 新加坡卡片
- ✅ `london.png` - 伦敦卡片
- ✅ `newyork.png` - 纽约卡片
- ✅ `tokyo.png` - 东京卡片
- ✅ `guangzhou.png` - 广州卡片

### 未使用（可以在其他页面使用）:
- 📋 `yellowbackgndlogo.png` - 可用于 Footer 或关于我们页面
- 📋 `airlines/yellow-airlines.png` - 可用于品牌展示页

---

## 🔄 下一步建议

可以继续添加图片到其他页面：

1. **会员中心页**
   - 会员卡背景图
   - 等级徽章图标

2. **航班搜索结果页**
   - 飞机座位图
   - 舱位示意图

3. **登录/注册页**
   - 背景图片
   - 品牌插画

4. **About 页面**
   - 公司历史图片
   - 团队照片
   - 舰队图片

5. **机上体验页**
   - 座舱照片
   - 餐食图片
   - 娱乐系统截图

---

## ✨ 最终效果

网站现在拥有：
- 🎯 **专业的品牌展示**（真实 Logo）
- 🌆 **吸引人的目的地展示**（城市实景照片）
- ⚡ **优化的图片加载**（Next.js Image）
- 🎨 **精致的视觉效果**（悬停动画、渐变遮罩）

**整体视觉质量提升至专业航空公司网站水平！** ✈️

---

## 🐛 故障排除

如果图片不显示：
1. 确认图片文件在 `/public/images/` 目录
2. 检查图片文件名大小写
3. 清除浏览器缓存并刷新
4. 重启开发服务器

如果 CSS 错误：
- 确认 `@import` 顺序正确（字体在前，Tailwind 在后）

