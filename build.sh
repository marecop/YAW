#!/bin/bash
# 安裝依賴
npm install

# 確保data目錄存在並可寫入
mkdir -p data
chmod 777 data

# 生成必要的數據文件
npm run generate-data

# 構建應用
npm run build 