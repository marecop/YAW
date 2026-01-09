'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DB_VERSION, DB_VERSION_KEY } from '@/lib/dbVersion'

export default function ClearCachePage() {
  const router = useRouter()
  const [cleared, setCleared] = useState(false)

  const handleClearCache = () => {
    // 清除所有缓存
    localStorage.clear()
    sessionStorage.clear()
    
    // 设置新版本
    localStorage.setItem(DB_VERSION_KEY, DB_VERSION)
    
    setCleared(true)
    
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔄</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">清除缓存</h1>
          <p className="text-gray-600">
            如果遇到航班搜索问题，点击下方按钮清除所有缓存
          </p>
        </div>

        {!cleared ? (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>当前数据库版本：</strong> {DB_VERSION}
              </p>
              <p className="text-sm text-yellow-800 mt-2">
                此操作将清除所有本地缓存，包括登录状态
              </p>
            </div>

            <button
              onClick={handleClearCache}
              className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              清除缓存并刷新
            </button>

            <button
              onClick={() => router.push('/')}
              className="w-full mt-3 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              取消
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <p className="text-lg font-semibold text-gray-900 mb-2">缓存已清除！</p>
            <p className="text-gray-600">正在返回首页...</p>
          </div>
        )}
      </div>
    </div>
  )
}

