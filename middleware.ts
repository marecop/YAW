import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'zh-hk', 'zh-cn', 'es', 'de', 'jp']
const defaultLocale = 'en'

// 簡單的語言匹配邏輯
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  // 簡單解析：取第一個偏好語言
  const preferredLocale = acceptLanguage.split(',')[0].split(';')[0].toLowerCase()
  
  // 嘗試完全匹配
  if (locales.includes(preferredLocale)) {
    return preferredLocale
  }

  // 嘗試匹配前綴 (e.g., 'en-US' -> 'en')
  const langPrefix = preferredLocale.split('-')[0]
  if (locales.includes(langPrefix)) {
    return langPrefix
  }
  
  // 特殊處理中文
  if (langPrefix === 'zh') {
    if (preferredLocale.includes('cn') || preferredLocale.includes('hans') || preferredLocale.includes('china')) {
      return 'zh-cn'
    }
    // 其他中文默認繁體 (HK/TW)
    return 'zh-hk' 
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. 忽略 API 請求（由 next.config.ts rewrites 處理）
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // 2. 忽略靜態資源和特定文件
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/data') ||
    pathname.startsWith('/globals.css') ||
    pathname.includes('.') // 文件擴展名 (svg, png, ico, etc.)
  ) {
    return NextResponse.next()
  }

  // 3. 檢查路徑是否已包含 locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // 4. 重定向到帶 locale 的路徑
  const locale = getLocale(request)
  
  // 構建新的 URL
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
  // 保留查詢參數
  newUrl.search = request.nextUrl.search
  
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    // 匹配所有路徑
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
