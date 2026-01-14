module.exports = {
  apps: [{
    name: 'yellow-airlines-api',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: process.cwd(),
    instances: 1,
    exec_mode: 'fork',
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
    max_memory_restart: '1G',
    // 如果服务崩溃，等待 10 秒后重启
    min_uptime: '10s',
    max_restarts: 10
  }]
}
