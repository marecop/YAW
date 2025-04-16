const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 確保數據目錄存在
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  console.log('Creating data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
}

// 檢查是否需要初始化數據文件
const usersFile = path.join(dataDir, 'users.json');
const sessionsFile = path.join(dataDir, 'sessions.json');
const flightsFile = path.join(dataDir, 'flights.json');
const milesFile = path.join(dataDir, 'miles.json');

let needsDataGeneration = false;

// 檢查所有需要的數據文件
if (!fs.existsSync(usersFile) || !fs.existsSync(sessionsFile) || 
    !fs.existsSync(flightsFile) || !fs.existsSync(milesFile)) {
  needsDataGeneration = true;
}

// 如果需要，生成數據
if (needsDataGeneration) {
  console.log('Generating initial data...');
  exec('node scripts/build.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating data: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Data generation stderr: ${stderr}`);
      return;
    }
    console.log(`Data generation stdout: ${stdout}`);
    startNextApp();
  });
} else {
  startNextApp();
}

function startNextApp() {
  console.log('Starting Next.js application...');
  // 啟動Next.js應用
  require('next/dist/bin/next');
} 