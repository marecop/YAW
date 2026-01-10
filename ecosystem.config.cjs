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
      name: 'yellow-airlines',
      cwd: __dirname,
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      max_memory_restart: '1500M',
      env: {
        NODE_ENV: 'production'
        // DATABASE_URL: 'file:/var/www/finalya/prisma/dev.db',
        // NEXTAUTH_URL: 'https://your-domain.com',
        // NEXTAUTH_SECRET: '...'
      }
    }
  ]
}

