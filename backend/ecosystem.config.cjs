module.exports = {
  apps: [
    {
      name: 'yellow-airlines-api',

      // ⚠️ 关键：直接指向 next 的 Node 入口
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',

      cwd: process.cwd(),

      instances: 1,
      exec_mode: 'fork',

      // 强制限制 V8 堆
      node_args: '--max-old-space-size=512',

      env: {
        NODE_ENV: 'production',
      },

      // 日志
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      // 重启策略（防 OOM 连锁反应）
      autorestart: true,
      watch: false,
      max_memory_restart: '700M',

      min_uptime: '30s',
      max_restarts: 3,
    },
  ],
}
