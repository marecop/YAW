import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // API-only Next.js app (no pages)
  // Suppress middleware deprecation warning by explicitly enabling it
  experimental: {
    // Keep middleware support for CORS handling
  },
}

export default nextConfig

