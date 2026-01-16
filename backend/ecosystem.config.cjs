module.exports = {
  apps: [
    {
      name: 'yellow-airlines-api',

      // 使用編譯後的 Express 服務器
      script: 'dist/server.js',

      cwd: process.cwd(),

      instances: 1,
      exec_mode: 'fork',

      // 强制限制 V8 堆內存為 512MB
      node_args: '--max-old-space-size=512',

      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },

      // 日志 
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      // 重启策略（防 OOM 连锁反应）
      autorestart: true,
      watch: false,
      max_memory_restart: '520M',

      min_uptime: '20s',
      max_restarts: 5,
    },
  ],
}
