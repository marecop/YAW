/**
 * PM2 production config (SQLite friendly)
 *
 * Notes:
 * - Use **fork** mode + **single instance** when using SQLite to avoid db lock contention.
 * - Set DATABASE_URL to an **absolute** path on VPS (recommended), e.g.:
 *   DATABASE_URL="file:/var/www/finalya/prisma/dev.db"
 */

module.exports = {
  apps: [
    {
      name: 'yellowairlines',
      // IMPORTANT: `cwd` must be a string. Without quotes it becomes a RegExp literal and PM2 may mis-handle it.
      cwd: '/var/www/finalya',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      max_memory_restart: '700M',
      env: {
        NODE_ENV: 'production',
        // Hard cap the Node.js heap so the OS is less likely to OOM-kill other processes.
        // (PM2 `max_memory_restart` is a restart threshold, not a strict memory limiter.)
        NODE_OPTIONS: '--max-old-space-size=512'
        // DATABASE_URL: 'file:/var/www/finalya/prisma/dev.db',
        // NEXTAUTH_URL: 'https://your-domain.com',
        // NEXTAUTH_SECRET: 'change-me'
      }
    }
  ]
}

