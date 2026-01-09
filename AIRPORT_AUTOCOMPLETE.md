# ✈️ 机场自动补全功能

## 🎯 功能概述

已成功为航班搜索表单添加**智能机场自动补全**功能，用户可以通过输入城市名、机场代码或机场名称快速选择目的地。

---

## 📁 新增文件

### 1. **机场数据库** (`lib/airports.ts`)
包含 100+ 个全球主要机场的完整信息：

```typescript
export interface Airport {
  code: string;        // 机场代码 (例如: HKG, FRA)
  name: string;        // 机场名称
  city: string;        // 城市名称
  country: string;     // 国家/地区
  searchText?: string; // 搜索文本
}
```

#### 覆盖区域：
- ✅ **中国大陆** - 18个主要城市机场
- ✅ **港澳台** - 5个机场
- ✅ **日本** - 7个城市
- ✅ **韩国** - 3个机场
- ✅ **东南亚** - 10个热门目的地
- ✅ **大洋洲** - 澳大利亚、新西兰
- ✅ **欧洲** - 20+ 主要城市
- ✅ **北美** - 美国、加拿大主要机场
- ✅ **中东** - 迪拜、多哈等
- ✅ **南亚** - 印度、斯里兰卡

#### 核心函数：

```typescript
// 搜索机场 - 智能匹配
searchAirports(query: string, limit?: number): Airport[]

// 获取机场信息
getAirportByCode(code: string): Airport | undefined
```

---

### 2. **自动补全组件** (`components/AirportAutocomplete.tsx`)

#### 功能特点：

##### 🔍 **智能搜索**
- 优先匹配机场代码 (HKG, FRA)
- 其次匹配城市名称 (香港, 法兰克福)
- 最后匹配机场名称和国家

##### ⌨️ **键盘导航**
- `↑` / `↓` - 上下选择
- `Enter` - 确认选择
- `Escape` - 关闭列表

##### 🎨 **视觉设计**
```tsx
// 黄色高亮选中项
className="bg-ya-yellow-100"

// 悬停效果
className="hover:bg-ya-yellow-50"

// 飞机图标
<Plane className="text-gray-400" />
```

##### 📱 **响应式**
- 自动关闭（点击外部）
- 最大高度滚动
- 移动端友好

---

## 🎨 用户体验

### 搜索示例

#### 示例 1: 输入机场代码
```
用户输入: "HKG"
显示结果:
  ✈️ HKG - 香港
     香港国际机场
     中国香港
```

#### 示例 2: 输入城市名
```
用户输入: "法兰克福"
显示结果:
  ✈️ FRA - 法兰克福
     法兰克福国际机场
     德国
```

#### 示例 3: 输入部分文字
```
用户输入: "上海"
显示结果:
  ✈️ PVG - 上海
     上海浦东国际机场
     中国
  
  ✈️ SHA - 上海
     上海虹桥国际机场
     中国
```

---

## 🔧 集成到 FlightSearchForm

### 原来的设计:
```tsx
// 简单文本输入
<input
  type="text"
  value={from}
  onChange={(e) => setFrom(e.target.value)}
  placeholder="HKG"
/>
```

### 现在的设计:
```tsx
// 智能自动补全
<AirportAutocomplete
  id="from"
  name="from"
  label={t('search.from')}
  value={from}
  onChange={setFrom}
  placeholder="例如: HKG, 香港, 广州"
  required
/>
```

---

## 📊 搜索优先级

### 算法逻辑:

```typescript
1. 机场代码匹配 (优先级: 最高)
   - 输入 "HKG" → 立即匹配香港
   - 输入 "FRA" → 立即匹配法兰克福

2. 城市名称匹配 (优先级: 中)
   - 输入 "香港" → 匹配香港国际机场
   - 输入 "东京" → 匹配成田、羽田

3. 全文搜索 (优先级: 低)
   - 输入 "浦东" → 匹配上海浦东国际机场
   - 输入 "希思罗" → 匹配伦敦希思罗机场
```

---

## 🎯 Props API

### `AirportAutocomplete` 组件

| Prop | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `id` | `string` | ✅ | - | 输入框 ID |
| `name` | `string` | ✅ | - | 输入框 name |
| `label` | `string` | ✅ | - | 标签文本 |
| `value` | `string` | ✅ | - | 当前机场代码 |
| `onChange` | `(code: string) => void` | ✅ | - | 值变更回调 |
| `placeholder` | `string` | ❌ | `'输入城市或机场代码'` | 占位符文本 |
| `required` | `boolean` | ❌ | `false` | 是否必填 |
| `className` | `string` | ❌ | `''` | 额外 CSS 类 |

---

## 🌍 多语言支持

### 标签文本
使用现有的多语言系统：

```tsx
label={t('search.from')}  // "出发地" / "Departure"
label={t('search.to')}    // "目的地" / "Destination"
```

### 占位符提示
```tsx
placeholder={t('search.from') + ' (例如: HKG, 香港, 广州)'}
```

---

## ✨ 视觉效果

### 卡片样式
```css
/* 建议列表 */
.suggestion-list {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  max-height: 15rem;
  overflow-y: auto;
}

/* 选项悬停 */
.suggestion-item:hover {
  background-color: #fffdf0; /* ya-yellow-50 */
}

/* 选项选中 */
.suggestion-item.selected {
  background-color: #fff9c2; /* ya-yellow-100 */
}
```

### 图标
```tsx
<Plane className="w-5 h-5 text-gray-400" />
```

---

## 🔄 交换功能

保留原有的交换按钮功能：

```tsx
const handleSwapLocations = () => {
  const temp = from
  setFrom(to)
  setTo(temp)
}
```

交换时自动更新两个自动补全输入框的显示。

---

## 📱 响应式设计

### 桌面端
- 双列布局
- 中间显示交换按钮
- 建议列表完整显示

### 移动端
- 单列布局
- 交换按钮隐藏（使用移动原生体验）
- 建议列表全屏显示

---

## 🚀 性能优化

### 搜索优化
```typescript
// 限制返回结果数量
searchAirports(query, 8)

// 预计算搜索文本
airport.searchText = `${code} ${name} ${city} ${country}`.toLowerCase()
```

### 防抖机制
- 用户输入时实时搜索
- 无需额外防抖（搜索算法本身足够快）

### 懒加载
- 建议列表仅在有结果时渲染
- 自动关闭未使用的列表

---

## 🎨 设计系统

### 颜色使用

| 元素 | 颜色 | 用途 |
|------|------|------|
| 输入框边框 | `gray-300` | 默认状态 |
| 输入框焦点 | `ya-yellow-500` | 获得焦点 |
| 图标 | `gray-400` | 辅助元素 |
| 悬停背景 | `ya-yellow-50` | 轻微高亮 |
| 选中背景 | `ya-yellow-100` | 强高亮 |
| 建议文本 | `gray-900` / `gray-600` | 主次文本 |

---

## 🐛 错误处理

### 无结果情况
```tsx
{showSuggestions && suggestions.length === 0 && (
  <div className="p-4 text-center text-gray-500">
    未找到匹配的机场，请尝试其他关键词
  </div>
)}
```

### 无效输入
- 用户必须从列表中选择
- 手动输入无效代码会在提交时被验证

---

## 📈 未来扩展

### 可能的增强功能：

1. **历史记录** 💾
   - 记住用户最近搜索的机场
   - 优先显示常用机场

2. **热门推荐** 🔥
   - 显示热门目的地
   - 季节性推荐

3. **距离计算** 📏
   - 显示两地距离
   - 预估飞行时间

4. **价格提示** 💰
   - 显示最低价格
   - 特价标记

5. **地理定位** 📍
   - 自动检测用户位置
   - 推荐最近机场

---

## ✅ 测试建议

### 功能测试

```typescript
// 1. 搜索机场代码
输入: "HKG" → 应显示香港国际机场

// 2. 搜索城市名
输入: "东京" → 应显示成田和羽田

// 3. 搜索中文
输入: "法兰克福" → 应显示 FRA

// 4. 键盘导航
按下 ↓ → 应高亮第一项
按 Enter → 应选择该项

// 5. 交换功能
选择 HKG → FRA
点击交换 → 应变为 FRA → HKG

// 6. 清空输入
删除所有文字 → 应关闭列表
```

---

## 🎉 总结

### ✅ 新增功能
- 100+ 全球机场数据
- 智能搜索匹配
- 键盘导航支持
- 响应式设计
- 黄色品牌配色

### ✅ 用户体验提升
- 更快速的输入
- 减少输入错误
- 视觉反馈清晰
- 移动端友好

### ✅ 开发友好
- 类型安全 (TypeScript)
- 可复用组件
- 易于扩展
- 性能优化

---

**🚀 现在用户可以轻松搜索全球 100+ 机场，享受流畅的预订体验！**

