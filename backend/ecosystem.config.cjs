module.exports = {
  apps: [{
    name: 'yellow-airlines-api',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: process.cwd(),
    instances: 1,
    exec_mode: 'fork',
    // 限制 Node.js 堆內存為 512MB（避免 OOM）
    node_args: '--max-old-space-size=512',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    // PM2 內存監控：當進程超過 700MB 時重啟（給 Node.js 堆內存 512MB + 其他開銷留餘地）
    max_memory_restart: '700M',
    // 如果服务崩溃，等待 10 秒后重启
    min_uptime: '10s',
    max_restarts: 10
  }]
}
