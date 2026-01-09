'use client'

import { useCurrency, currencyOptions } from '@/contexts/CurrencyContext'

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as any)}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ya-yellow-500 focus:border-ya-yellow-500 bg-white"
    >
      {currencyOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

