#!/bin/bash
# 安裝依賴 - 使用 --force 確保所有依賴都能正確安裝
npm install --force

# 確保安裝 tailwindcss 和其他相關依賴
npm install --save-dev tailwindcss postcss autoprefixer --force

# 確保data目錄存在並可寫入
mkdir -p data
chmod 777 data

# 初始化基本的 JSON 文件
echo '[]' > data/users.json
echo '[]' > data/flights.json
echo '[]' > data/miles.json
echo '{}' > data/sessions.json

# 生成必要的數據文件 - 如果失敗不要中斷構建
npm run generate-data || echo "Warning: Failed to generate data, but continuing build..."

# 構建應用
npm run build || {
  echo "標準構建失敗，嘗試重新安裝並重建..."
  npm install --force
  npm run build
} 