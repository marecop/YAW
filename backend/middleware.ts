import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 允許的前端域名（從環境變數讀取，或使用默認值）
  const allowedOrigins = process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
    : [
        'http://localhost:3000',
        'https://*.vercel.app',
        /^https:\/\/.*\.vercel\.app$/,
        /^https:\/\/.*\.vercel\.dns$/,
      ]

  const origin = request.headers.get('origin')
  const isAllowedOrigin = origin && (
    allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        if (allowed.includes('*')) {
          const pattern = allowed.replace(/\*/g, '.*')
          return new RegExp(`^${pattern}$`).test(origin)
        }
        return origin === allowed
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin)
      }
      return false
    })
  )

  // 處理 CORS
  const response = NextResponse.next()
  
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
  
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Max-Age', '86400')

  // 處理 OPTIONS 預檢請求
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: response.headers,
    })
  }

  return response
}

export const config = {
  matcher: '/api/:path*',
}
