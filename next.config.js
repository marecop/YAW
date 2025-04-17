/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // 在生產環境構建時忽略 ESLint 錯誤
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 在生產環境構建時忽略 TypeScript 錯誤
    ignoreBuildErrors: true,
  },
  experimental: {
    // 支持更靈活的模塊解析
    esmExternals: 'loose',
  },
}

module.exports = nextConfig 