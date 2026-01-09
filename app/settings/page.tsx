'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Globe, Bell, Lock, User, Mail, CreditCard, Smartphone } from 'lucide-react'

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', name: '一般設定', icon: User },
    { id: 'language', name: '語言和地區', icon: Globe },
    { id: 'notifications', name: '通知設定', icon: Bell },
    { id: 'privacy', name: '隱私與安全', icon: Lock },
    { id: 'payment', name: '付款方式', icon: CreditCard },
  ]

  const languages = [
    { code: 'zh-hk', name: '粵語（繁體）', nativeName: '繁體中文' },
    { code: 'en', name: '英語', nativeName: 'English' },
    { code: 'zh-cn', name: '簡體中文', nativeName: '简体中文' },
    { code: 'de', name: '德語', nativeName: 'Deutsch' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">個人資料</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input-field"
                    placeholder="輸入您的姓名"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    電子郵件
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
                    電話號碼
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
                保存更改
              </button>
            </div>
          </div>
        )

      case 'language':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">選擇語言</h3>
              <p className="text-sm text-gray-600 mb-4">
                選擇您偏好的網站顯示語言
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">時區設定</h3>
              <select className="select-field">
                <option>香港時間 (GMT+8)</option>
                <option>台北時間 (GMT+8)</option>
                <option>新加坡時間 (GMT+8)</option>
                <option>東京時間 (GMT+9)</option>
                <option>倫敦時間 (GMT+0)</option>
                <option>紐約時間 (GMT-5)</option>
              </select>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">電子郵件通知</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">航班更新</div>
                    <div className="text-sm text-gray-600">接收航班時間變更和延誤通知</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">促銷優惠</div>
                    <div className="text-sm text-gray-600">接收特價機票和優惠活動通知</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">預訂確認</div>
                    <div className="text-sm text-gray-600">接收預訂和付款確認郵件</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">會員積分</div>
                    <div className="text-sm text-gray-600">接收積分變動和獎勵通知</div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">推送通知</h3>
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Smartphone className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900 mb-1">下載我們的應用程式</div>
                  <div className="text-sm text-blue-800">在移動設備上接收即時推送通知，讓您隨時掌握航班動態</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">更改密碼</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">
                    當前密碼
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="input-field"
                    placeholder="輸入當前密碼"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                    新密碼
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="input-field"
                    placeholder="輸入新密碼"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                    確認新密碼
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="input-field"
                    placeholder="再次輸入新密碼"
                  />
                </div>
              </div>
              <button className="mt-4 px-6 py-2 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors">
                更新密碼
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">雙重驗證</h3>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg mb-4">
                <Lock className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 mb-1">增強帳戶安全性</div>
                  <div className="text-sm text-gray-600">啟用雙重驗證，為您的帳戶添加額外的安全保護</div>
                </div>
              </div>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                啟用雙重驗證
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">數據與隱私</h3>
              <div className="space-y-3">
                <Link href="/privacy" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">查看隱私政策</div>
                  <div className="text-sm text-gray-600">了解我們如何保護您的個人信息</div>
                </Link>
                <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">下載您的數據</div>
                  <div className="text-sm text-gray-600">獲取我們存儲的您的個人數據副本</div>
                </button>
              </div>
            </div>
          </div>
        )

      case 'payment':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">已保存的付款方式</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">Visa •••• 1234</div>
                      <div className="text-sm text-gray-600">過期日期: 12/25</div>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    移除
                  </button>
                </div>
                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                  + 添加新的付款方式
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">帳單地址</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    地址
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="input-field"
                    placeholder="輸入您的地址"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      城市
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="input-field"
                      placeholder="城市"
                    />
                  </div>
                  <div>
                    <label htmlFor="postal" className="block text-sm font-medium text-gray-700 mb-2">
                      郵政編碼
                    </label>
                    <input
                      type="text"
                      id="postal"
                      className="input-field"
                      placeholder="郵編"
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
        {/* 面包屑 */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                首頁
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

        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">設定</h1>
          <p className="mt-2 text-gray-600">管理您的帳戶偏好設定和個人資料</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏导航 */}
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

          {/* 主要内容区域 */}
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

