'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Users } from 'lucide-react'
import AirportAutocomplete from './AirportAutocomplete'

export default function FlightSearchForm() {
  const router = useRouter()
  const pathname = usePathname()

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [cabinClass, setCabinClass] = useState('ECONOMY')
  const [tripType, setTripType] = useState('roundtrip')

  // Flight number lookup (quick access)
  const [lookupFlightNumber, setLookupFlightNumber] = useState('')
  const [lookupDate, setLookupDate] = useState('')

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
      roundtrip: '往返',
      oneway: '單程',
      from: '從',
      to: '至',
      departure: '出發',
      return: '回程',
      passengers: '乘客',
      search: '搜尋',
      or: '或',
      flightLookup: '航班號查詢',
      flightNumber: '航班號',
      date: '日期',
      lookup: '查詢',
      swap: '交換出發地和目的地',
      fromPlaceholder: '從 (例如: HKG, 香港, 廣州)',
      toPlaceholder: '至 (例如: FRA, 法蘭克福, 倫敦)',
      flightNumPlaceholder: 'YA101 / 101'
    },
    'zh-cn': {
      roundtrip: '往返',
      oneway: '单程',
      from: '从',
      to: '至',
      departure: '出发',
      return: '回程',
      passengers: '乘客',
      search: '搜索',
      or: '或',
      flightLookup: '航班号查询',
      flightNumber: '航班号',
      date: '日期',
      lookup: '查询',
      swap: '交换出发地和目的地',
      fromPlaceholder: '从 (例如: HKG, 香港, 广州)',
      toPlaceholder: '至 (例如: FRA, 法兰克福, 伦敦)',
      flightNumPlaceholder: 'YA101 / 101'
    },
    'en': {
      roundtrip: 'Roundtrip',
      oneway: 'One way',
      from: 'From',
      to: 'To',
      departure: 'Depart',
      return: 'Return',
      passengers: 'Passengers',
      search: 'Search',
      or: 'Or',
      flightLookup: 'Flight Number Lookup',
      flightNumber: 'Flight Number',
      date: 'Date',
      lookup: 'Lookup',
      swap: 'Swap locations',
      fromPlaceholder: 'From (e.g. HKG, Hong Kong)',
      toPlaceholder: 'To (e.g. FRA, Frankfurt)',
      flightNumPlaceholder: 'YA101 / 101'
    },
    'de': {
      roundtrip: 'Hin- und Rückflug',
      oneway: 'Hinflug',
      from: 'Von',
      to: 'Nach',
      departure: 'Abflug',
      return: 'Rückflug',
      passengers: 'Reisende',
      search: 'Suchen',
      or: 'Oder',
      flightLookup: 'Flugnummer-Suche',
      flightNumber: 'Flugnummer',
      date: 'Datum',
      lookup: 'Suchen',
      swap: 'Orte tauschen',
      fromPlaceholder: 'Von (z.B. HKG, Hongkong)',
      toPlaceholder: 'Nach (z.B. FRA, Frankfurt)',
      flightNumPlaceholder: 'YA101 / 101'
    },
    'jp': {
      roundtrip: '往復',
      oneway: '片道',
      from: '出発地',
      to: '目的地',
      departure: '出発日',
      return: '現地出発日',
      passengers: '人数',
      search: '検索',
      or: 'または',
      flightLookup: '便名検索',
      flightNumber: '便名',
      date: '日付',
      lookup: '検索',
      swap: '出発地と目的地を入れ替え',
      fromPlaceholder: '出発地 (例: HKG, 香港)',
      toPlaceholder: '目的地 (例: FRA, フランクフルト)',
      flightNumPlaceholder: 'YA101 / 101'
    },
    'es': {
      roundtrip: 'Ida y vuelta',
      oneway: 'Solo ida',
      from: 'Origen',
      to: 'Destino',
      departure: 'Salida',
      return: 'Regreso',
      passengers: 'Pasajeros',
      search: 'Buscar',
      or: 'O',
      flightLookup: 'Búsqueda por número de vuelo',
      flightNumber: 'Número de vuelo',
      date: 'Fecha',
      lookup: 'Buscar',
      swap: 'Intercambiar ubicaciones',
      fromPlaceholder: 'Origen (ej. HKG, Hong Kong)',
      toPlaceholder: 'Destino (ej. FRA, Frankfurt)',
      flightNumPlaceholder: 'YA101 / 101'
    }
  }

  const t = translations[currentLangCode] || translations['zh-hk']

  // 设置最小日期为今天
  const today = new Date().toISOString().split('T')[0]
  // 根据出发日期计算返回日期的最小值
  const minReturnDate = departureDate || today

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 往返航班使用專門的往返搜索頁面
    if (tripType === 'roundtrip') {
      const params = new URLSearchParams({
        from,
        to,
        departureDate,
        returnDate,
        passengers: passengers.toString(),
        cabinClass,
      })
      router.push(`${langPrefix}/flights/roundtrip?${params.toString()}`)
    } else {
      // 單程航班使用普通搜索頁面（默認包含中轉）
      const params = new URLSearchParams({
        from,
        to,
        departureDate,
        passengers: passengers.toString(),
        cabinClass,
      })
      router.push(`${langPrefix}/flights/search?${params.toString()}`)
    }
  }

  const handlePassengerChange = (change: number) => {
    const newCount = Math.max(1, Math.min(10, passengers + change))
    setPassengers(newCount)
  }

  const handleSwapLocations = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handleFlightNumberLookup = () => {
    const num = lookupFlightNumber.trim()
    if (!num) return

    const params = new URLSearchParams()
    params.set('number', num)
    if (lookupDate) params.set('date', lookupDate)

    router.push(`${langPrefix}/flights/lookup?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 行程类型切换 */}
      <div className="flex items-center flex-wrap gap-4 mb-4">
        <div className="flex items-center">
          <input
            id="roundtrip"
            name="tripType"
            type="radio"
            checked={tripType === 'roundtrip'}
            onChange={() => setTripType('roundtrip')}
            className="h-4 w-4 text-ya-yellow-600 focus:ring-ya-yellow-500 border-gray-300"
          />
          <label htmlFor="roundtrip" className="ml-2 block text-sm font-medium text-gray-700">
            往返
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="oneway"
            name="tripType"
            type="radio"
            checked={tripType === 'oneWay'}
            onChange={() => setTripType('oneWay')}
            className="h-4 w-4 text-ya-yellow-600 focus:ring-ya-yellow-500 border-gray-300"
          />
          <label htmlFor="oneway" className="ml-2 block text-sm font-medium text-gray-700">
            單程
          </label>
        </div>
      </div>

      {/* 出发地和目的地 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <AirportAutocomplete
          id="from"
          name="from"
          label="從"
          value={from}
          onChange={setFrom}
          placeholder={'從 (例如: HKG, 香港, 廣州)'}
          required
        />

        {/* 交换按钮 */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block mt-3">
          <button
            type="button"
            onClick={handleSwapLocations}
            className="bg-white rounded-full p-3 shadow-lg border border-gray-100 hover:bg-gray-50 transition-all hover:scale-110 group"
            title="交換出發地和目的地"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-ya-yellow-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
          </button>
        </div>

        <AirportAutocomplete
          id="to"
          name="to"
          label="至"
          value={to}
          onChange={setTo}
          placeholder={'至 (例如: FRA, 法蘭克福, 倫敦)'}
          required
        />
      </div>

      {/* 日期和其他选项 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 出发日期 */}
        <div>
          <label htmlFor="departureDate" className="block text-sm font-bold text-gray-700 mb-2">
            出發
          </label>
          <input
            id="departureDate"
            name="departureDate"
            type="date"
            required
            min={today}
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="py-4 px-5 w-full bg-gray-50 border border-gray-200 rounded-xl shadow-sm focus:border-ya-yellow-500 focus:ring-ya-yellow-500 transition-all"
          />
        </div>

        {/* 返回日期（只在往返行程时显示） */}
        {tripType === 'roundtrip' && (
          <div>
            <label htmlFor="returnDate" className="block text-sm font-bold text-gray-700 mb-2">
              回程
            </label>
            <input
              id="returnDate"
              name="returnDate"
              type="date"
              required
              min={minReturnDate}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="py-4 px-5 w-full bg-gray-50 border border-gray-200 rounded-xl shadow-sm focus:border-ya-yellow-500 focus:ring-ya-yellow-500 transition-all"
            />
          </div>
        )}

        {/* 旅客数量 */}
        <div className={tripType === 'roundtrip' ? 'md:col-span-2' : ''}>
          <label htmlFor="passengers" className="block text-sm font-bold text-gray-700 mb-2">
            乘客
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl shadow-sm bg-gray-50 overflow-hidden">
            <button
              type="button"
              onClick={() => handlePassengerChange(-1)}
              disabled={passengers <= 1}
              className="px-5 py-4 text-gray-500 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
              </svg>
            </button>
            <input
              id="passengers"
              name="passengers"
              type="number"
              min="1"
              max="10"
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
              className="w-full py-4 px-4 text-center bg-transparent focus:border-ya-yellow-500 focus:ring-ya-yellow-500 border-0 text-lg font-medium"
            />
            <button
              type="button"
              onClick={() => handlePassengerChange(1)}
              disabled={passengers >= 10}
              className="px-5 py-4 text-gray-500 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-black bg-ya-yellow-500 hover:bg-ya-yellow-400 hover:shadow-xl hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ya-yellow-500"
      >
        搜尋
      </button>

      {/* Flight number lookup */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white text-gray-500">或</span>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
        <div className="text-sm font-bold text-gray-800 mb-4">
          航班號查詢
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="lookupFlightNumber" className="block text-sm font-bold text-gray-700 mb-2">
              航班號
            </label>
            <input
              id="lookupFlightNumber"
              name="lookupFlightNumber"
              type="text"
              value={lookupFlightNumber}
              onChange={(e) => setLookupFlightNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleFlightNumberLookup()
                }
              }}
              placeholder="YA101 / 101"
              className="py-4 px-5 w-full bg-white border border-gray-200 rounded-xl shadow-sm focus:border-ya-yellow-500 focus:ring-ya-yellow-500 transition-all"
            />
          </div>

          <div>
            <label htmlFor="lookupDate" className="block text-sm font-bold text-gray-700 mb-2">
              日期
            </label>
            <input
              id="lookupDate"
              name="lookupDate"
              type="date"
              min={today}
              value={lookupDate}
              onChange={(e) => setLookupDate(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleFlightNumberLookup()
                }
              }}
              className="py-4 px-5 w-full bg-white border border-gray-200 rounded-xl shadow-sm focus:border-ya-yellow-500 focus:ring-ya-yellow-500 transition-all"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleFlightNumberLookup}
          className="mt-4 w-full py-3 px-6 border border-transparent rounded-xl shadow text-base font-bold text-black bg-ya-yellow-400 hover:bg-ya-yellow-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ya-yellow-500"
        >
          查詢
        </button>
      </div>
    </form>
  )
}
