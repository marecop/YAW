'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Globe, Bell, Lock, User, Mail, CreditCard, Smartphone } from 'lucide-react'

export default function SettingsPage() {
    const router = useRouter()
  const language = 'en'
  const setLanguage = (code: string) => {
    router.push(`/${code}/settings`)
  }
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', name: 'General Settings', icon: User },
    { id: 'language', name: 'Language & Region', icon: Globe },
    { id: 'notifications', name: 'Notification Settings', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Lock },
    { id: 'payment', name: 'Payment Methods', icon: CreditCard },
  ]

  const languages = [
    { code: 'zh-hk', name: 'Traditional Chinese', nativeName: '繁體中文' },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'zh-cn', name: 'Simplified Chinese', nativeName: '简体中文' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'jp', name: 'Japanese', nativeName: '日本語' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input-field"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
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
                    Phone Number
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
                Save Changes
              </button>
            </div>
          </div>
        )

      case 'language':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Language</h3>
              <p className="text-sm text-gray-600 mb-4">
                Choose your preferred language for the website
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Zone Settings</h3>
              <select className="select-field">
                <option>Hong Kong Time (GMT+8)</option>
                <option>Taipei Time (GMT+8)</option>
                <option>Singapore Time (GMT+8)</option>
                <option>Tokyo Time (GMT+9)</option>
                <option>London Time (GMT+0)</option>
                <option>New York Time (GMT-5)</option>
              </select>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Flight Updates</div>
                    <div className="text-sm text-gray-600">Receive notifications for schedule changes and delays</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Promotions</div>
                    <div className="text-sm text-gray-600">Receive notifications for special offers and deals</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Booking Confirmations</div>
                    <div className="text-sm text-gray-600">Receive booking and payment confirmation emails</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Member Points</div>
                    <div className="text-sm text-gray-600">Receive notifications for point changes and rewards</div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Push Notifications</h3>
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Smartphone className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900 mb-1">Download Our App</div>
                  <div className="text-sm text-blue-800">Receive instant push notifications on your mobile device to track flight status anytime</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="input-field"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="input-field"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="input-field"
                    placeholder="Enter new password again"
                  />
                </div>
              </div>
              <button className="mt-4 px-6 py-2 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors">
                Update Password
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg mb-4">
                <Lock className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 mb-1">Enhanced Account Security</div>
                  <div className="text-sm text-gray-600">Enable two-factor authentication to add extra security to your account</div>
                </div>
              </div>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Enable 2FA
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
              <div className="space-y-3">
                <Link href="/en/privacy" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">View Privacy Policy</div>
                  <div className="text-sm text-gray-600">Learn how we protect your personal information</div>
                </Link>
                <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">Download Your Data</div>
                  <div className="text-sm text-gray-600">Get a copy of your personal data stored with us</div>
                </button>
              </div>
            </div>
          </div>
        )

      case 'payment':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Payment Methods</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">Visa •••• 1234</div>
                      <div className="text-sm text-gray-600">Expires: 12/25</div>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Remove
                  </button>
                </div>
                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                  + Add New Payment Method
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="input-field"
                    placeholder="Enter your address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="input-field"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label htmlFor="postal" className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postal"
                      className="input-field"
                      placeholder="Postal Code"
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
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/en/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">Settings</span>
            </li>
          </ol>
        </nav>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account preferences and personal information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
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

          {/* Main Content Area */}
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
