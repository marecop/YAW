'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import FlightCard from '@/components/FlightCard'
import FlightSearchForm from '@/components/FlightSearchForm'
import { ChevronDown, ChevronUp, Loader2, Plane, Filter, X } from 'lucide-react'
import { checkAndUpdateDBVersion } from '@/lib/dbVersion'

function FlightsPageContent() {
  const searchParams = useSearchParams()
  
  const [flights, setFlights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [sortBy, setSortBy] = useState<'departure' | 'price' | 'duration'>('departure')
  
  // Filters state
  const [priceRange, setPriceRange] = useState<number>(10000)
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [selectedStops, setSelectedStops] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false) // Mobile filter toggle

  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''
  const departDate = searchParams.get('departDate') || ''
  const passengers = parseInt(searchParams.get('passengers') || '1')
  const tripType = searchParams.get('tripType') || 'oneway'

  const hasSearchParams = !!(from && to && departDate)

  // 檢查數據庫版本
  useEffect(() => {
    const versionMatches = checkAndUpdateDBVersion()
    if (!versionMatches) {
      console.log('🔄 データベースのバージョンが更新されました。キャッシュをクリアして更新します...')
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }, [])

  useEffect(() => {
    if (!hasSearchParams) {
      setLoading(false)
      return
    }
    fetchFlights()
  }, [from, to, departDate, sortBy])

  const fetchFlights = async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        from,
        to,
        departDate,
        sort: sortBy
      })

      console.log('🔍 フライトを検索中...', { from, to, departDate })

      const timestamp = new Date().getTime()
      const response = await fetch(`/api/flights?${params.toString()}&_t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch flights')
      }

      const data = await response.json()
      setFlights(data)
    } catch (err: any) {
      console.error('❌ フライトの検索に失敗しました:', err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Filter Logic
  const uniqueAirlines = useMemo(() => {
    const airlines = new Set(flights.map(f => f.airline || 'Yellow Airlines'))
    return Array.from(airlines)
  }, [flights])

  const maxPrice = useMemo(() => {
    if (flights.length === 0) return 10000
    return Math.max(...flights.map(f => f.economyPrice))
  }, [flights])

  useEffect(() => {
    if (maxPrice > 0) setPriceRange(maxPrice)
  }, [maxPrice])

  const filteredFlights = useMemo(() => {
    return flights.filter(flight => {
      // Price Filter
      if (flight.economyPrice > priceRange) return false
      
      // Airline Filter
      if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline || 'Yellow Airlines')) return false
      
      // Stops Filter (Assuming direct for now as data structure suggests)
      // if (selectedStops.length > 0) ... 

      return true
    })
  }, [flights, priceRange, selectedAirlines])

  const handleAirlineToggle = (airline: string) => {
    setSelectedAirlines(prev => 
      prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
    )
  }

  // 如果沒有搜索參數，顯示搜索表單
  if (!hasSearchParams) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">フライトを予約</h1>
            <p className="text-xl text-gray-600">旅を始めよう、もっと遠くへ</p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Plane className="w-6 h-6 text-ya-yellow-600" />
                フライト
              </h2>
            </div>
            <FlightSearchForm />
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-ya-yellow-600 mx-auto" />
          <p className="mt-4 text-gray-600">フライトを検索中...</p>
          <p className="mt-2 text-sm text-gray-500">お待ちください。最適なフライトを検索しています</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">検索に失敗しました</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchFlights}
            className="px-6 py-3 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors"
          >
            もう一度試す
          </button>
        </div>
      </div>
    )
  }

  if (flights.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">フライトが見つかりません</h2>
          <p className="text-gray-600 mb-6">検索条件を変更してください</p>
          <button
            onClick={() => setShowSearch(true)}
            className="px-6 py-3 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors"
          >
            もう一度試す
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium"
          >
            <Filter className="w-5 h-5" />
            絞り込みと並べ替え
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-xl font-bold text-gray-900">絞り込み条件</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">価格帯</h3>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ya-yellow-600"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>HKD 0</span>
                  <span>HKD {priceRange.toLocaleString()}</span>
                </div>
              </div>

              {/* Airline Filter */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">航空会社</h3>
                <div className="space-y-2">
                  {uniqueAirlines.map(airline => (
                    <label key={airline} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAirlines.includes(airline)}
                        onChange={() => handleAirlineToggle(airline)}
                        className="w-4 h-4 text-ya-yellow-600 border-gray-300 rounded focus:ring-ya-yellow-500"
                      />
                      <span className="text-sm text-gray-700">{airline}</span>
                    </label>
                  ))}
                </div>
                </div>

              {/* Stops Filter (Placeholder) */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">乗り継ぎ回数</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-ya-yellow-600 border-gray-300 rounded focus:ring-ya-yellow-500" defaultChecked />
                    <span className="text-sm text-gray-700">直行便</span>
                  </label>
                  {/* Add more options if data supports it */}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <span>片道</span>
                    <span>•</span>
                    <span>{passengers} 人</span>
                    <span>•</span>
                  <span>エコノミークラス</span>
                  </div>
                  <div className="flex items-center gap-4 text-xl font-bold text-gray-900">
                    <span>{from}</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span>{to}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {new Date(departDate).toLocaleDateString('ja-JP', { weekday: 'short', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                >
                  <SearchIcon className="w-4 h-4" />
                  {showSearch ? '検索を隠す' : '検索を変更'}
                </button>
              </div>

              {/* Collapsible Search Form */}
              {showSearch && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <FlightSearchForm />
                </div>
              )}
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-600">
                表示 <span className="font-bold text-gray-900">{filteredFlights.length}</span> 件のフライト
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:inline">並べ替え：</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ya-yellow-500 bg-white"
                >
                  <option value="departure">出発時刻</option>
                  <option value="price">価格</option>
                  <option value="duration">所要時間</option>
                </select>
              </div>
            </div>

            {/* Flight List */}
            <div className="space-y-4">
              {filteredFlights.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">条件に一致するフライトがありません</h3>
                  <p className="text-gray-500 mb-6">条件を調整するか、再検索してください</p>
                  <button
                    onClick={() => {
                      setPriceRange(maxPrice)
                      setSelectedAirlines([])
                    }}
                    className="text-ya-yellow-600 font-medium hover:text-ya-yellow-700"
                  >
                    すべての条件をクリア
                  </button>
                </div>
              ) : (
                filteredFlights.map((flight) => (
                  <FlightCard 
                    key={flight.id} 
                    flight={flight}
                    passengers={passengers}
                    departDate={departDate}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export default function FlightsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-ya-yellow-600" />
      </div>
    }>
      <FlightsPageContent />
    </Suspense>
  )
}
