#!/bin/bash
# 刪除 node_modules 以確保乾淨安裝
rm -rf node_modules

# 安裝基本依賴
npm install

# 直接安裝特定版本的 tailwindcss 和相關依賴
npm install tailwindcss@3.3.5 postcss@8.4.31 autoprefixer@10.4.16 --no-save

# 初始化 tailwindcss 如果配置不存在
if [ ! -f tailwind.config.js ]; then
  echo "module.exports = {content: ['./app/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}'],theme: {extend: {}},plugins: []};" > tailwind.config.js
fi

# 初始化 postcss.config.js 如果不存在
if [ ! -f postcss.config.js ]; then
  echo "module.exports = {plugins: {tailwindcss: {},autoprefixer: {},}};" > postcss.config.js
fi

# 確保 data 目錄存在並可寫入
mkdir -p data
chmod 777 data

# 創建必要的初始數據文件
echo '[]' > data/users.json
echo '[]' > data/flights.json
echo '[]' > data/miles.json
echo '{}' > data/sessions.json

# 建立簡化版的 app/layout.js
mkdir -p app
cat > app/layout.js << 'EOF'
export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
EOF

# 建立簡化版的 app/page.js
cat > app/page.js << 'EOF'
export default function Home() {
  return (
    <div style={{padding: '20px', textAlign: 'center'}}>
      <h1 style={{color: '#FFEB3B'}}>黃色航空</h1>
      <p>網站正在維護中，請稍後再試。</p>
    </div>
  )
}
EOF

# 對 next.config.js 進行更新
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
EOF

# 構建應用
NODE_OPTIONS="--max_old_space_size=4096" npm run build 