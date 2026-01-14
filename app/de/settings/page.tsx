'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Globe, Bell, Lock, User, Mail, CreditCard, Smartphone } from 'lucide-react'

export default function SettingsPage() {
    const router = useRouter()
  const language = 'de'
  const setLanguage = (code: string) => {
    router.push(`/${code}/settings`)
  }
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', name: 'Allgemeine Einstellungen', icon: User },
    { id: 'language', name: 'Sprache und Region', icon: Globe },
    { id: 'notifications', name: 'Benachrichtigungen', icon: Bell },
    { id: 'privacy', name: 'Datenschutz und Sicherheit', icon: Lock },
    { id: 'payment', name: 'Zahlungsmethoden', icon: CreditCard },
  ]

  const languages = [
    { code: 'zh-hk', name: 'Chinesisch (traditionell)', nativeName: '繁體中文' },
    { code: 'en', name: 'Englisch', nativeName: 'English' },
    { code: 'zh-cn', name: 'Chinesisch (vereinfacht)', nativeName: '简体中文' },
    { code: 'de', name: 'Deutsch', nativeName: 'Deutsch' },
    { code: 'jp', name: 'Japanisch', nativeName: '日本語' },
    { code: 'es', name: 'Spanisch', nativeName: 'Español' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Persönliche Informationen</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input-field"
                    placeholder="Geben Sie Ihren Namen ein"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    placeholder="dein@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefonnummer
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
                Änderungen speichern
              </button>
            </div>
          </div>
        )

      case 'language':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sprache auswählen</h3>
              <p className="text-sm text-gray-600 mb-4">
                Wählen Sie die bevorzugte Sprache für die Website-Anzeige
              </p>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <label
                    key={lang.code}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      language === lang.code
                        ? ')border-ya-yellow-500 bg-ya-yellow-50'
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Zeitzone einstellen</h3>
              <select className="select-field">
                <option>Hong Kong Time (GMT+8)</option>
                <option>Taipei Time (GMT+8)</option>
                <option>Singapore Time (GMT+8)</option>
                <option>Tokyo Time (GMT+9)</option>
                <option>London Time (GMT+0)</option>
                <option>New York Time (GMT-5)</option>
                <option>Berlin Time (GMT+1)</option>
              </select>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">E-Mail-Benachrichtigungen</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Flugupdates</div>
                    <div className="text-sm text-gray-600">Erhalten Sie Benachrichtigungen über Flugzeitenänderungen und Verspätungen</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Sonderangebote</div>
                    <div className="text-sm text-gray-600">Erhalten Sie Benachrichtigungen über Sonderangebote und Rabatte</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Buchung Bestätigung</div>
                    <div className="text-sm text-gray-600">Erhalten Sie Benachrichtigungen über Buchungsbestätigungen und Zahlungsbestätigungen</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Mitgliedschaftspunkte</div>
                    <div className="text-sm text-gray-600">Erhalten Sie Benachrichtigungen über Punkteänderungen und Belohnungen</div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Push-Benachrichtigungen</h3>
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Smartphone className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900 mb-1">Unsere App herunterladen</div>
                  <div className="text-sm text-blue-800">Erhalten Sie Push-Benachrichtigungen auf Ihrem Mobilgerät, um den Flugstatus jederzeit zu verfolgen</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Passwort ändern</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Aktuelles Passwort
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="input-field"
                    placeholder="Bitte geben Sie Ihr aktuelles Passwort ein"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Neues Passwort
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="input-field"
                    placeholder="Geben Sie ein neues Passwort ein"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Passwort bestätigen
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="input-field"
                    placeholder="Geben Sie das neue Passwort erneut ein"
                  />
                </div>
              </div>
              <button className="mt-4 px-6 py-2 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors">
                Passwort aktualisieren
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Zwei-Faktor-Authentifizierung</h3>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg mb-4">
                <Lock className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 mb-1">Verbesserte Konto-Sicherheit</div>
                  <div className="text-sm text-gray-600">Aktivieren Sie die Zwei-Faktor-Authentifizierung, um Ihr Konto mit zusätzlicher Sicherheit zu schützen</div>
                </div>
              </div>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Zwei-Faktor-Authentifizierung aktivieren
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daten und Privatsphäre</h3>
              <div className="space-y-3">
                <Link href="/de/privacy" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">Datenschutzrichtlinie ansehen</div>
                  <div className="text-sm text-gray-600">Erfahren Sie, wie wir Ihre persönlichen Daten schützen</div>
                </Link>
                <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">Ihre Daten herunterladen</div>
                  <div className="text-sm text-gray-600">Erhalten Sie eine Kopie Ihrer persönlichen Daten, die wir speichern</div>
                </button>
              </div>
            </div>
          </div>
        )

      case 'payment':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Gespeicherte Zahlungsmethoden</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">Visa •••• 1234</div>
                      <div className="text-sm text-gray-600">Ablaufdatum: 12/25</div>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Entfernen
                  </button>
                </div>
                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                  + Neue Zahlungsmethode hinzufügen
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rechnungsadresse</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="input-field"
                    placeholder="Geben Sie Ihre Adresse ein"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      Stadt
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="input-field"
                      placeholder="Stadt"
                    />
                  </div>
                  <div>
                    <label htmlFor="postal" className="block text-sm font-medium text-gray-700 mb-2">
                      Postleitzahl
                    </label>
                    <input
                      type="text"
                      id="postal"
                      className="input-field"
                      placeholder="Postleitzahl"
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
              <Link href="/de/" className="text-gray-500 hover:text-gray-700">
                Startseite
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">Einstellungen</span>
            </li>
          </ol>
        </nav>

        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Einstellungen</h1>
          <p className="mt-2 text-gray-600">Verwalten Sie Ihre Kontoeinstellungen und persönliche Daten</p>
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

