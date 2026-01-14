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
      // Use the actual Next.js node entry + explicit node args so memory limits are *guaranteed* to apply.
      script: 'node_modules/next/dist/bin/next',
      interpreter: 'node',
      node_args: '--max-old-space-size=512',
      args: 'start -p 3000',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      max_memory_restart: '700M',
      env: {
        NODE_ENV: 'production'
        // DATABASE_URL: 'file:/var/www/finalya/prisma/dev.db',
        // NEXTAUTH_URL: 'https://your-domain.com',
        // NEXTAUTH_SECRET: 'change-me'
      }
    }
  ]
}

