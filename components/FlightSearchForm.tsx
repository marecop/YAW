'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import AirportAutocomplete from './AirportAutocomplete'

export default function FlightSearchForm() {
  const router = useRouter()
  const { t } = useLanguage()

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [cabinClass, setCabinClass] = useState('ECONOMY')
  const [tripType, setTripType] = useState('roundtrip')

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
      router.push(`/flights/roundtrip?${params.toString()}`)
    } else {
      // 單程航班使用普通搜索頁面（默認包含中轉）
      const params = new URLSearchParams({
        from,
        to,
        departureDate,
        passengers: passengers.toString(),
        cabinClass,
      })
      router.push(`/flights/search?${params.toString()}`)
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
            {t('search.roundTrip')}
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
            {t('search.oneWay')}
          </label>
        </div>
      </div>

      {/* 出发地和目的地 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <AirportAutocomplete
          id="from"
          name="from"
          label={t('search.from')}
          value={from}
          onChange={setFrom}
          placeholder={t('search.from') + ' (例如: HKG, 香港, 广州)'}
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
          label={t('search.to')}
          value={to}
          onChange={setTo}
          placeholder={t('search.to') + ' (例如: FRA, 法兰克福, 伦敦)'}
          required
        />
      </div>

      {/* 日期和其他选项 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 出发日期 */}
        <div>
          <label htmlFor="departureDate" className="block text-sm font-bold text-gray-700 mb-2">
            {t('search.departure')}
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
              {t('search.return')}
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
            {t('search.passengers')}
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
        {t('search.search')}
      </button>
    </form>
  )
}
