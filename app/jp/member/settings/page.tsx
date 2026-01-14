'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Save, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function MemberSettingsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  
  // ここではuserオブジェクトから状態を初期化する必要がありますが、簡略化のためにプレースホルダーを使用します
  // 実際のアプリケーションでは、ユーザープロファイルを更新するためのAPIを作成する必要があります
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    passportNumber: user?.passportNumber || '',
    nationality: user?.nationality || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // API呼び出しのシミュレーション
    setTimeout(() => {
      alert('情報を更新しました（デモ機能）')
      setLoading(false)
    }, 1000)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/jp/member" className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">アカウント設定</h1>
            <p className="text-gray-500">プロフィールを更新</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">氏名</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">メールアドレスは変更できません</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="例: +852 1234 5678"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">パスポート番号</label>
                <input
                  type="text"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">国籍</label>
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                >
                  <option value="">選択してください</option>
                  <option value="HK">香港</option>
                  <option value="CN">中国</option>
                  <option value="US">アメリカ</option>
                  <option value="UK">イギリス</option>
                  <option value="JP">日本</option>
                  <option value="OTHER">その他のオプション...</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-ya-yellow-500 text-black font-bold rounded-xl hover:bg-ya-yellow-600 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>保存中...</>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    変更を保存
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
