import type { NextConfig } from 'next'

/**
 * Frontend (Vercel) 專案：
 * - 不再在同一個 Next.js runtime 內跑 /api（已搬到 backend/）
 * - 透過 rewrite 將 /api/* 代理到後端 API 服務
 *
 * 設定方式：
 * - Vercel / 本機：設定環境變數 API_BASE_URL，例如：https://api.example.com 或 http://localhost:3001
 * - 生產環境默認：http://98.159.109.110:3001
 */
const apiBaseUrl = (process.env.API_BASE_URL || 'http://98.159.109.110:3001').replace(/\/+$/, '')

const nextConfig: NextConfig = {
  async rewrites() {
    if (!apiBaseUrl) return []
    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
