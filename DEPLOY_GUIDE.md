# 將黃色航空部署到Render.com的詳細指南

本指南將幫助您將黃色航空 (Yellow Airlines) 網站部署到Render.com雲平台。

## 必要條件

1. GitHub帳戶
2. Render.com帳戶
3. 基本的Git知識

## 部署步驟

### 1. 準備您的代碼

本項目已包含所有必要的部署文件：
- `build.sh` - 構建腳本
- `render.yaml` - Render配置
- `scripts/start.js` - 確保數據目錄和文件存在的啟動腳本

### 2. 上傳到GitHub

1. 創建一個新的GitHub倉庫
2. 在本地初始化git:
   ```
   git init
   git add .
   git commit -m "Initial commit for Yellow Airlines"
   ```
3. 添加您的GitHub倉庫作為遠程
   ```
   git remote add origin https://github.com/您的用戶名/您的倉庫.git
   ```
4. 推送代碼
   ```
   git push -u origin main
   ```

### 3. 在Render上部署

#### 使用Blueprint功能（推薦）：

1. 登錄您的Render帳戶
2. 點擊控制面板上的"Blueprints"
3. 點擊"New Blueprint Instance"
4. 選擇您的GitHub倉庫
5. Render將自動檢測`render.yaml`文件並配置服務
6. 點擊"Apply"開始部署

#### 手動配置：

1. 登錄您的Render帳戶
2. 點擊控制面板上的"New"按鈕
3. 選擇"Web Service"
4. 連接您的GitHub倉庫
5. 配置以下設置：
   - **名稱**: yellairlines (或您喜歡的名稱)
   - **環境**: Node
   - **構建命令**: `./build.sh`
   - **啟動命令**: `npm start`
   - **計劃**: Free
6. 在"Environment Variables"部分添加：
   - `NODE_ENV`: production
7. 點擊"Create Web Service"開始部署

### 4. 等待部署完成

Render將執行以下操作：
1. 拉取您的代碼
2. 執行build.sh腳本
3. 安裝依賴
4. 構建Next.js應用
5. 啟動應用

### 5. 訪問您的應用

部署完成後，您可以通過Render提供的URL訪問您的應用，通常格式為：
```
https://yellairlines.onrender.com
```

## 數據持久性

由於Render的免費計劃不提供永久性存儲，每次重新部署時，所有用戶數據將被重置。對於生產環境，您應該考慮以下選項：

1. 使用MongoDB Atlas作為永久數據存儲
2. 升級到Render的付費計劃，以獲得磁盤存儲

## 故障排除

### 構建失敗

如果構建失敗，請檢查Render日誌中的錯誤。常見原因包括：

1. **build.sh權限問題**: 確保在推送到GitHub前執行了`chmod +x build.sh`
2. **依賴問題**: 檢查package.json中的依賴是否正確

### 應用啟動失敗

如果應用啟動失敗，可能的原因包括：

1. **數據目錄問題**: 檢查scripts/start.js是否正確創建了數據目錄
2. **環境變量問題**: 確保NODE_ENV設置為production

### 連接超時

如果部署成功但訪問時連接超時，可能是因為：

1. **啟動超時**: 在Render控制面板中，增加啟動超時時間
2. **應用崩潰**: 檢查Render日誌了解可能的錯誤

## 維護和更新

### 自動部署

默認情況下，Render配置為在每次推送到主分支時自動重新部署。您可以在Render控制面板的"Settings"部分修改此行為。

### 手動重新部署

您也可以在Render控制面板上點擊"Manual Deploy"按鈕，選擇"Clear build cache & deploy"來強制重新部署。

---

如有任何疑問或需要幫助，請參考Render的官方文檔或聯繫Render支持。 