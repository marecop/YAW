'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Globe, Bell, Lock, User, Mail, CreditCard, Smartphone } from 'lucide-react'

export default function SettingsPage() {
    const router = useRouter()
  const language = 'jp'
  const setLanguage = (code: string) => {
    router.push(`/${code}/settings`)
  }
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', name: '一般設定', icon: User },
    { id: 'language', name: '言語と地域', icon: Globe },
    { id: 'notifications', name: '通知設定', icon: Bell },
    { id: 'privacy', name: 'プライバシーとセキュリティ', icon: Lock },
    { id: 'payment', name: '支払い方法', icon: CreditCard },
  ]

  const languages = [
    { code: 'zh-hk', name: '粵語（繁體）', nativeName: '繁體中文' },
    { code: 'en', name: '英語', nativeName: 'English' },
    { code: 'zh-cn', name: '簡體中文', nativeName: '简体中文' },
    { code: 'de', name: '德語', nativeName: 'Deutsch' },
    { code: 'jp', name: '日語', nativeName: '日本語' },
    { code: 'es', name: '西班牙語', nativeName: 'Español' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">プロフィール</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    氏名
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input-field"
                    placeholder="氏名を入力"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="input-field"
                    placeholder="+852 9123 4567"
                  />
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <button className="px-6 py-2 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors">
                変更を保存
              </button>
            </div>
          </div>
        )

      case 'language':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">言語を選択</h3>
              <p className="text-sm text-gray-600 mb-4">
                ウェブサイトの表示言語を選択してください
              </p>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <label
                    key={lang.code}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      language === lang.code
                        ? 'border-ya-yellow-500 bg-ya-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="language"
                        value={lang.code}
                        checked={language === lang.code}
                        onChange={(e) => setLanguage(e.target.value as any)}
                        className="w-4 h-4 text-ya-yellow-600"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{lang.name}</div>
                        <div className="text-sm text-gray-600">{lang.nativeName}</div>
                      </div>
                    </div>
                    {language === lang.code && (
                      <svg className="w-5 h-5 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">タイムゾーン設定</h3>
              <select className="select-field">
                <option>香港時間 (GMT+8)</option>
                <option>台北時間 (GMT+8)</option>
                <option>シンガポール時間 (GMT+8)</option>
                <option>東京時間 (GMT+9)</option>
                <option>ロンドン時間 (GMT+0)</option>
                <option>ニューヨーク時間 (GMT-5)</option>
              </select>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">メール通知</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">フライト更新情報</div>
                    <div className="text-sm text-gray-600">フライト時間の変更や遅延の通知を受け取る</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">プロモーション・オファー</div>
                    <div className="text-sm text-gray-600">特別運賃やキャンペーンの通知を受け取る</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">予約確認</div>
                    <div className="text-sm text-gray-600">予約および支払い確認メールを受け取る</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">会員ポイント</div>
                    <div className="text-sm text-gray-600">ポイントの変動や特典の通知を受け取る</div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">プッシュ通知</h3>
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Smartphone className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900 mb-1">アプリをダウンロード</div>
                  <div className="text-sm text-blue-800">モバイル端末でリアルタイムのプッシュ通知を受け取り、フライト状況を常に把握しましょう</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">パスワードの変更</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">
                    現在のパスワード
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="input-field"
                    placeholder="現在のパスワードを入力"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                    新しいパスワード
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="input-field"
                    placeholder="新しいパスワードを入力"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                    新しいパスワード（確認）
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="input-field"
                    placeholder="新しいパスワードを再入力"
                  />
                </div>
              </div>
              <button className="mt-4 px-6 py-2 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors">
                パスワードを更新
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">2段階認証</h3>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg mb-4">
                <Lock className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 mb-1">アカウントのセキュリティを強化</div>
                  <div className="text-sm text-gray-600">2段階認証を有効にして、アカウントにセキュリティ層を追加します</div>
                </div>
              </div>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                2段階認証を有効にする
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">データとプライバシー</h3>
              <div className="space-y-3">
                <Link href="/jp/privacy" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">プライバシーポリシーを表示</div>
                  <div className="text-sm text-gray-600">個人情報の保護方法について確認する</div>
                </Link>
                <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">データをダウンロード</div>
                  <div className="text-sm text-gray-600">保存されている個人データのコピーを取得する</div>
                </button>
              </div>
            </div>
          </div>
        )

      case 'payment':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">保存された支払い方法</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">Visa •••• 1234</div>
                      <div className="text-sm text-gray-600">有効期限: 12/25</div>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    削除
                  </button>
                </div>
                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                  + 新しい支払い方法を追加
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">請求先住所</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    住所
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="input-field"
                    placeholder="住所を入力"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      市区町村
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="input-field"
                      placeholder="市区町村"
                    />
                  </div>
                  <div>
                    <label htmlFor="postal" className="block text-sm font-medium text-gray-700 mb-2">
                      郵便番号
                    </label>
                    <input
                      type="text"
                      id="postal"
                      className="input-field"
                      placeholder="郵便番号"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* パンくずリスト */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/jp/" className="text-gray-500 hover:text-gray-700">
                ホーム
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">設定</span>
            </li>
          </ol>
        </nav>

        {/* タイトル */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">設定</h1>
          <p className="mt-2 text-gray-600">アカウントの優先設定とプロフィールを管理します</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* サイドバーナビゲーション */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-ya-yellow-500 text-black font-medium'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* メインコンテンツエリア */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
