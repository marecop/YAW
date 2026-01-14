'use client'

import { useCurrency, currencyOptions } from '@/contexts/CurrencyContext'
import { usePathname } from 'next/navigation'

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()
  const pathname = usePathname()

  // Helper to get current language prefix
  const getLangPrefix = () => {
    const segments = pathname.split('/').filter(Boolean)
    const currentLang = ['en', 'zh-hk', 'zh-cn', 'de', 'jp', 'es'].includes(segments[0]) ? segments[0] : 'zh-hk'
    return currentLang === 'zh-hk' ? '' : `/${currentLang}`
  }
  const langPrefix = getLangPrefix()
  const currentLangCode = langPrefix ? langPrefix.substring(1) : 'zh-hk'

  const translations: Record<string, any> = {
    'zh-hk': {
      HKD: '港幣 (HKD)',
      CNY: '人民幣 (CNY)',
      USD: '美元 (USD)',
      EUR: '歐元 (EUR)',
      JPY: '日元 (JPY)'
    },
    'zh-cn': {
      HKD: '港币 (HKD)',
      CNY: '人民币 (CNY)',
      USD: '美元 (USD)',
      EUR: '欧元 (EUR)',
      JPY: '日元 (JPY)'
    },
    'en': {
      HKD: 'HKD (HK$)',
      CNY: 'CNY (¥)',
      USD: 'USD ($)',
      EUR: 'EUR (€)',
      JPY: 'JPY (¥)'
    },
    'de': {
      HKD: 'HKD (HK$)',
      CNY: 'CNY (¥)',
      USD: 'USD ($)',
      EUR: 'EUR (€)',
      JPY: 'JPY (¥)'
    },
    'jp': {
      HKD: '香港ドル (HKD)',
      CNY: '人民元 (CNY)',
      USD: '米ドル (USD)',
      EUR: 'ユーロ (EUR)',
      JPY: '日本円 (JPY)'
    },
    'es': {
      HKD: 'HKD (HK$)',
      CNY: 'CNY (¥)',
      USD: 'USD ($)',
      EUR: 'EUR (€)',
      JPY: 'JPY (¥)'
    }
  }

  const t = translations[currentLangCode] || translations['zh-hk']

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as any)}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ya-yellow-500 focus:border-ya-yellow-500 bg-white"
    >
      {currencyOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {t[option.value] || option.label}
        </option>
      ))}
    </select>
  )
}

