'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DB_VERSION, DB_VERSION_KEY } from '@/lib/dbVersion'

export default function ClearCachePage() {
  const router = useRouter()
  const [cleared, setCleared] = useState(false)

  const handleClearCache = () => {
    // すべてのキャッシュをクリア
    localStorage.clear()
    sessionStorage.clear()
    
    // 新しいバージョンを設定
    localStorage.setItem(DB_VERSION_KEY, DB_VERSION)
    
    setCleared(true)
    
    setTimeout(() => {
      router.push('/jp/')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔄</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">キャッシュをクリア</h1>
          <p className="text-gray-600">
            フライト検索に問題がある場合は、下のボタンをクリックしてすべてのキャッシュをクリアしてください。
          </p>
        </div>

        {!cleared ? (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>現在のデータベースバージョン：</strong> {DB_VERSION}
              </p>
              <p className="text-sm text-yellow-800 mt-2">
                この操作は、ログイン状態を含むすべてのローカルキャッシュをクリアします。
              </p>
            </div>

            <button
              onClick={handleClearCache}
              className="w-full bg-ya-yellow-500 text-black py-3 px-4 rounded-lg font-semibold hover:bg-ya-yellow-600 transition-colors"
            >
              キャッシュをクリアして更新
            </button>

            <button
              onClick={() => router.push('/jp/')}
              className="w-full mt-3 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              キャンセル
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <p className="text-lg font-semibold text-gray-900 mb-2">キャッシュがクリアされました！</p>
            <p className="text-gray-600">ホームページに戻ります...</p>
          </div>
        )}
      </div>
    </div>
  )
}
