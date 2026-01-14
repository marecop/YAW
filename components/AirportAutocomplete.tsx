'use client'

import { useState, useRef, useEffect } from 'react'
import { searchAirports, getAirportByCode, type Airport } from '@/lib/airports'
import { Plane } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface AirportAutocompleteProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (code: string) => void
  placeholder?: string
  required?: boolean
  className?: string
}

export default function AirportAutocomplete({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className = ''
}: AirportAutocompleteProps) {
  const pathname = usePathname()
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<Airport[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionRef = useRef<HTMLDivElement>(null)

  // Helper to get current language prefix
  const getLangPrefix = () => {
    const segments = pathname.split('/').filter(Boolean)
    const currentLang = ['en', 'zh-hk', 'zh-cn', 'de', 'jp', 'es'].includes(segments[0]) ? segments[0] : 'zh-hk'
    return currentLang === 'zh-hk' ? '' : `/${currentLang}`
  }
  const langPrefix = getLangPrefix()
  const currentLangCode = langPrefix ? langPrefix.substring(1) : 'zh-hk'

  const translations: Record<string, any> = {
    'zh-hk': { placeholder: '輸入城市或機場代碼', noResults: '未搵到匹配嘅機場，請嘗試其他關鍵詞' },
    'zh-cn': { placeholder: '输入城市或机场代码', noResults: '未找到匹配的机场，请尝试其他关键词' },
    'en': { placeholder: 'Enter city or airport code', noResults: 'No matching airport found, please try other keywords' },
    'de': { placeholder: 'Stadt oder Flughafencode eingeben', noResults: 'Kein passender Flughafen gefunden' },
    'jp': { placeholder: '都市または空港コードを入力', noResults: '一致する空港が見つかりません' },
    'es': { placeholder: 'Ingrese ciudad o código de aeropuerto', noResults: 'No se encontraron aeropuertos coincidentes' }
  }

  const t = translations[currentLangCode] || translations['zh-hk']
  const finalPlaceholder = placeholder || t.placeholder

  // 当 value 改变时，更新显示的文本
  useEffect(() => {
    if (value) {
      const airport = getAirportByCode(value)
      if (airport) {
        setInputValue(`${airport.code} - ${airport.city}`)
      } else {
        setInputValue(value)
      }
    } else {
      setInputValue('')
    }
  }, [value])

  // 点击外部关闭建议列表
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    
    if (newValue.trim().length > 0) {
      const results = searchAirports(newValue, 8)
      setSuggestions(results)
      setShowSuggestions(true)
      setSelectedIndex(-1)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      onChange('')
    }
  }

  const handleSelectAirport = (airport: Airport) => {
    setInputValue(`${airport.code} - ${airport.city}`)
    onChange(airport.code)
    setShowSuggestions(false)
    setSuggestions([])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectAirport(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        break
    }
  }

  const handleFocus = () => {
    if (inputValue.trim().length > 0 && suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={finalPlaceholder}
          className="w-full py-4 px-4 pl-10 bg-gray-50 border border-gray-200 rounded-xl shadow-sm focus:border-ya-yellow-500 focus:ring-2 focus:ring-ya-yellow-500 focus:outline-none transition-all"
          autoComplete="off"
          required={required}
        />
        <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      {/* 建议列表 */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((airport, index) => (
            <button
              key={airport.code}
              type="button"
              onClick={() => handleSelectAirport(airport)}
              className={`w-full text-left px-4 py-3 hover:bg-ya-yellow-50 transition-colors ${
                index === selectedIndex ? 'bg-ya-yellow-100' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {airport.code} - {airport.city}
                  </div>
                  <div className="text-sm text-gray-600 mt-0.5">
                    {airport.name}
                  </div>
                </div>
                <div className="text-xs text-gray-500 ml-2 mt-1">
                  {airport.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 无结果提示 */}
      {showSuggestions && inputValue.trim().length > 0 && suggestions.length === 0 && (
        <div
          ref={suggestionRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4"
        >
          <p className="text-sm text-gray-500 text-center">
            {t.noResults}
          </p>
        </div>
      )}
    </div>
  )
}
