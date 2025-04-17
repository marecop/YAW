#!/bin/bash
# 安裝依賴
npm install

# 確保data目錄存在並可寫入
mkdir -p data
chmod 777 data

# 生成必要的數據文件
npm run generate-data || echo "Warning: Failed to generate data, but continuing build..."

# 構建應用
npm run build 