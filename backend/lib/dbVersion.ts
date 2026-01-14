// 数据库版本管理
// 每次运行 seed 时更新这个版本号

export const DB_VERSION = '2.3.2' // 修復Prisma Client字段識別 // 168条航班，含多航空公司
export const DB_VERSION_KEY = 'yellow-airlines-db-version'

/**
 * 检查数据库版本是否匹配
 * 如果不匹配，清除所有缓存并刷新页面
 */
export function checkAndUpdateDBVersion(): boolean {
  if (typeof window === 'undefined') return true
  
  const storedVersion = localStorage.getItem(DB_VERSION_KEY)
  
  if (storedVersion !== DB_VERSION) {
    console.log('🔄 数据库版本已更新，清除缓存...')
    console.log(`   旧版本: ${storedVersion || '未知'}`)
    console.log(`   新版本: ${DB_VERSION}`)
    
    // 清除所有缓存
    localStorage.clear()
    sessionStorage.clear()
    
    // 设置新版本
    localStorage.setItem(DB_VERSION_KEY, DB_VERSION)
    
    return false // 需要刷新
  }
  
  return true // 版本匹配
}

/**
 * 强制更新数据库版本标记
 */
export function forceUpdateDBVersion() {
  if (typeof window === 'undefined') return
  localStorage.setItem(DB_VERSION_KEY, DB_VERSION)
}

