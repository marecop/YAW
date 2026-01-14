'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Plane, Clock, Calendar, MapPin, ArrowRight, Filter, ChevronDown, ChevronLeft, ChevronRight, Users } from 'lucide-react'
import { format, addDays, subDays, parse } from 'date-fns'
import { ja } from 'date-fns/locale'
import Link from 'next/link'
import ConnectionFlightCard from '@/components/ConnectionFlightCard'

interface CabinClass {
  type: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST_CLASS'
  price: number
  available: boolean
  seats: number
}

interface Flight {
  id: string
  flightNumber: string
  airline: string
  airlineCode: string
  airlineLogo?: string | null
  from: string
  fromCity: string
  to: string
  toCity: string
  departureTime: string
  arrivalTime: string
  duration: number
  aircraft: string
  status: string
  isDirect: boolean
  stops: number
  pricePerPassenger: number
  totalPrice: number
  availableSeats: number
  cabinClass: string
  cabinClasses: CabinClass[]
}

interface ConnectionFlight {
  id: string
  type: 'connection'
  segments: any[]
  layoverMinutes: number
  layoverAirport: string
  layoverAirportName: string
  totalDuration: number
  totalPrice: number
  pricePerPassenger: number
  from: string
  fromCity: string
  to: string
  toCity: string
  stops: number
}

function FlightSearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [flights, setFlights] = useState<Flight[]>([])
  const [connections, setConnections] = useState<ConnectionFlight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('departure')
  const [flightFilter, setFlightFilter] = useState<'all' | 'direct' | 'connection'>('all')
  
  // Date selector state
  const [selectedDate, setSelectedDate] = useState('')
  const [datePrices, setDatePrices] = useState<{[key: string]: {date: Date, minPrice: number}}>({})
  
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''
  const departureDate = searchParams.get('departureDate') || ''
  const passengers = parseInt(searchParams.get('passengers') || '1')
  const cabinClass = searchParams.get('cabinClass') || 'ECONOMY'

  useEffect(() => {
    setSelectedDate(departureDate)
  }, [departureDate])

  useEffect(() => {
    const fetchFlights = async () => {
      setIsLoading(true)
      setError('')

      const params = new URLSearchParams()
      searchParams.forEach((value, key) => {
        params.append(key, value)
      })
      params.set('departureDate', selectedDate || departureDate)

      try {
        // Fetch direct flights
        const directRes = await fetch(`/api/flights/search?${params.toString()}`)
        const directData = await directRes.json()

        if (!directRes.ok) {
          throw new Error(directData.error || '検索に失敗しました')
        }

        setFlights(directData.flights || [])

        // Fetch connection flights
        const connParams = new URLSearchParams(params)
        const connRes = await fetch(`/api/flights/connections?${connParams.toString()}`)
        
        if (connRes.ok) {
          const connData = await connRes.json()
          setConnections(connData.connections || [])
        }

      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (from && to && (selectedDate || departureDate)) {
      fetchFlights()
    }
  }, [from, to, selectedDate, departureDate, passengers, cabinClass, searchParams])

  // Fetch prices for date range
  useEffect(() => {
    const fetchDatePrices = async () => {
      if (!departureDate || !from || !to) return

      const baseDate = parse(departureDate, 'yyyy-MM-dd', new Date())
      const pricesMap: {[key: string]: {date: Date, minPrice: number}} = {}

      for (let i = -3; i <= 3; i++) {
        const date = addDays(baseDate, i)
        const dateStr = format(date, 'yyyy-MM-dd')

        try {
          const params = new URLSearchParams()
          params.set('from', from)
          params.set('to', to)
          params.set('departureDate', dateStr)
          params.set('passengers', passengers.toString())
          params.set('cabinClass', cabinClass)

          const res = await fetch(`/api/flights/search?${params.toString()}`)
          const data = await res.json()

          if (res.ok && data.flights && data.flights.length > 0) {
            const minPrice = Math.min(...data.flights.map((f: Flight) => f.pricePerPassenger))
            pricesMap[dateStr] = { date, minPrice }
          }
        } catch (error) {
          console.error(`Error fetching price for ${dateStr}:`, error)
        }
      }

      setDatePrices(pricesMap)
    }

    fetchDatePrices()
  }, [departureDate, from, to, passengers, cabinClass])

  const handleSelectCabin = (flightId: string, cabinType: string, flight: Flight) => {
    // 直接跳轉到乘客信息頁面
    const cabinPrice = flight.cabinClasses.find(c => c.type === cabinType)?.price || 0
    
    const params = new URLSearchParams({
      flightId: flightId,
      from: from,
      to: to,
      flightDate: selectedDate || departureDate,
      passengers: passengers.toString(),
      cabinClass: cabinType,
      // 傳遞單人價格（passengers 頁面會自動計算總價）
      price: cabinPrice.toString()
    })
    
    console.log('🎫 クラスを選択:', {
      cabinType,
      cabinPrice,
      flightDate: selectedDate || departureDate,
      params: params.toString()
    })
    
    router.push(`/jp/booking/passengers?${params.toString()}`)
  }

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate)
    const newParams = new URLSearchParams()
    searchParams.forEach((value, key) => {
      if (key !== 'departureDate') {
        newParams.append(key, value)
      }
    })
    newParams.set('departureDate', newDate)
    router.push(`/jp/flights/search?${newParams.toString()}`, { scroll: false })
  }

  // Sort and filter flights
  const sortedFlights = [...flights].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.pricePerPassenger - b.pricePerPassenger
      case 'duration':
        return a.duration - b.duration
      case 'departure':
        return a.departureTime.localeCompare(b.departureTime)
      default:
        return 0
    }
  })

  const sortedConnections = [...connections].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.pricePerPassenger - b.pricePerPassenger
      case 'duration':
        return a.totalDuration - b.totalDuration
      case 'departure':
        return a.segments[0].departureTime.localeCompare(b.segments[0].departureTime)
      default:
        return 0
    }
  })

  const filteredFlights = flightFilter === 'connection' ? [] : sortedFlights
  const filteredConnections = flightFilter === 'direct' ? [] : sortedConnections

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">フライトを検索中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header Section */}
      <div className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Search Summary */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-navy" />
                <div>
                  <div className="text-2xl font-bold text-navy">{from}</div>
                  <div className="text-sm text-text-secondary">{flights[0]?.fromCity || ''}</div>
                </div>
              </div>

              <ArrowRight className="w-6 h-6 text-primary" />

              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-navy" />
                <div>
                  <div className="text-2xl font-bold text-navy">{to}</div>
                  <div className="text-sm text-text-secondary">{flights[0]?.toCity || ''}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-text-secondary" />
                <div>
                  <div className="text-sm text-text-secondary">出発</div>
                  <div className="font-medium text-navy">
                    {format(new Date(selectedDate || departureDate), 'MM月dd日 (E)', { locale: ja })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-text-secondary" />
                <div>
                  <div className="text-sm text-text-secondary">乗客</div>
                  <div className="font-medium text-navy">{passengers} 人</div>
                </div>
              </div>
            </div>
          </div>

          {/* Date Selector */}
          {Object.keys(datePrices).length > 0 && (
            <div className="flex items-center gap-2 justify-center py-3 border-t border-border">
              <button
                onClick={() => {
                  const currentDate = new Date(selectedDate || departureDate)
                  const newDate = format(subDays(currentDate, 1), 'yyyy-MM-dd')
                  handleDateChange(newDate)
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {Object.entries(datePrices)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([dateStr, { date, minPrice }]) => (
                    <button
                      key={dateStr}
                      onClick={() => handleDateChange(dateStr)}
                      className={`flex flex-col items-center px-4 py-2 rounded-lg border transition-all ${
                        dateStr === (selectedDate || departureDate)
                          ? 'border-primary bg-primary text-white'
                          : 'border-border hover:border-primary bg-white'
                      }`}
                    >
                      <div className={`text-xs ${dateStr === (selectedDate || departureDate) ? 'text-white' : 'text-text-secondary'}`}>
                        {format(date, 'd日(E)', { locale: ja })}
                      </div>
                      <div className={`text-sm font-bold mt-1 ${dateStr === (selectedDate || departureDate) ? 'text-white' : 'text-primary'}`}>
                        HKD {minPrice.toLocaleString()}
                      </div>
                    </button>
                  ))}
              </div>

              <button
                onClick={() => {
                  const currentDate = new Date(selectedDate || departureDate)
                  const newDate = format(addDays(currentDate, 1), 'yyyy-MM-dd')
                  handleDateChange(newDate)
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-primary transition-colors">
              <Filter className="w-4 h-4" />
              フィルター
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setFlightFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  flightFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border hover:border-primary'
                }`}
              >
                すべて
              </button>
              <button
                onClick={() => setFlightFilter('direct')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  flightFilter === 'direct'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border hover:border-primary'
                }`}
              >
                直行便のみ
              </button>
              <button
                onClick={() => setFlightFilter('connection')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  flightFilter === 'connection'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border hover:border-primary'
                }`}
              >
                乗り継ぎのみ
              </button>
            </div>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-border rounded-lg bg-white"
          >
            <option value="departure">並べ替え：おすすめ順</option>
            <option value="price">価格の安い順</option>
            <option value="duration">所要時間の短い順</option>
          </select>
        </div>

        {/* Direct Flights */}
        {filteredFlights.length > 0 && (
          <div className="space-y-4 mb-8">
              {filteredFlights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-xl border-2 border-gray-200 hover:border-primary shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* 頂部黃色裝飾條 */}
                <div className="h-1.5 bg-gradient-to-r from-primary via-yellow-400 to-primary"></div>
                
                <div className="grid grid-cols-12 gap-6 p-6">
                  {/* Left: Flight Info (40%) */}
                  <div className="col-span-12 lg:col-span-5">
                    <div className="space-y-4">
                      {/* Airline Logo & Info - 頂部 */}
                      <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-100">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50 flex items-center justify-center p-2 border border-yellow-200">
                          <img
                            src={flight.airlineLogo || `/images/airlines/${flight.airlineCode.toLowerCase()}.png`}
                            alt={flight.airline}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-base font-bold text-navy">{flight.airline}</div>
                          <div className="flex items-center gap-2 text-xs text-text-secondary mt-0.5">
                            <span className="px-2 py-0.5 bg-primary text-navy rounded font-semibold">
                              {flight.flightNumber}
                            </span>
                            <span>·</span>
                            <span>{flight.aircraft}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-text-secondary">所要時間</div>
                          <div className="text-sm font-bold text-navy">
                            {Math.floor(flight.duration / 60)}h {flight.duration % 60}m
                          </div>
                        </div>
                      </div>

                      {/* Time and Cities - 更大更清晰 */}
                      <div className="flex items-center justify-between py-2">
                        <div className="flex-1">
                          <div className="text-4xl font-bold text-navy mb-1">
                            {format(new Date(flight.departureTime), 'HH:mm')}
                          </div>
                          <div className="text-base font-semibold text-navy">{flight.fromCity}</div>
                          <div className="text-xs text-text-secondary mt-0.5">{flight.from}</div>
                        </div>

                        <div className="flex-1 px-6 flex flex-col items-center">
                          <Plane className="w-6 h-6 text-primary mb-2 transform rotate-90" />
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                          <div className="mt-2 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                            直行便
                          </div>
                        </div>

                        <div className="flex-1 text-right">
                          <div className="text-4xl font-bold text-navy mb-1">
                            {format(new Date(flight.arrivalTime), 'HH:mm')}
                          </div>
                          <div className="text-base font-semibold text-navy">{flight.toCity}</div>
                          <div className="text-xs text-text-secondary mt-0.5">{flight.to}</div>
                        </div>
                      </div>

                      {/* 日期信息 */}
                      <div className="flex items-center gap-2 text-xs text-text-secondary bg-gray-50 px-3 py-2 rounded-lg">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {format(new Date(flight.departureTime), 'yyyy年MM月dd日 EEEE', { locale: ja })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Cabin Classes (60%) */}
                  <div className="col-span-12 lg:col-span-7">
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-navy mb-3 flex items-center gap-2">
                        <div className="w-1 h-4 bg-primary rounded"></div>
                        クラスを選択
                      </div>
                      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                        {flight.cabinClasses.map((cabin) => (
                          <button
                            key={cabin.type}
                            onClick={() => cabin.available && handleSelectCabin(flight.id, cabin.type, flight)}
                            disabled={!cabin.available}
                            className={`group relative flex flex-col p-4 rounded-xl border-2 transition-all duration-300 ${
                              cabin.available
                                ? 'border-gray-200 hover:border-primary hover:shadow-lg hover:scale-105 cursor-pointer bg-white'
                                : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                            }`}
                          >
                            {/* 頂部裝飾 */}
                            {cabin.available && (
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-yellow-400 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            )}

                            <div className="space-y-2">
                              {/* 艙等名稱 */}
                              <div className={`text-xs font-bold tracking-wide ${cabin.available ? 'text-navy' : 'text-gray-400'}`}>
                                {cabin.type === 'ECONOMY' && 'エコノミークラス'}
                                {cabin.type === 'PREMIUM_ECONOMY' && 'プレミアムエコ'}
                                {cabin.type === 'BUSINESS' && 'ビジネスクラス'}
                                {cabin.type === 'FIRST_CLASS' && 'ファーストクラス'}
                              </div>

                              {cabin.available ? (
                                <>
                                  {/* 價格 */}
                                  <div className="space-y-1">
                                    <div className="text-xs text-text-secondary">から</div>
                                    <div className="flex items-baseline gap-1">
                                      <span className="text-xs text-text-secondary">HKD</span>
                                      <span className="text-2xl font-bold text-navy group-hover:text-primary transition-colors">
                                        {(cabin.price * passengers).toLocaleString()}
                                      </span>
                                    </div>
                                  </div>

                                  {/* 座位信息 */}
                                  <div className="pt-2 border-t border-gray-100">
                                    <div className="flex items-center gap-1 text-xs text-green-600">
                                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                      <span>{cabin.seats} 席</span>
                                    </div>
                                  </div>

                                  {/* 選擇按鈕 */}
                                  <div className="mt-2 pt-2 border-t border-gray-100">
                                    <div className="text-xs font-semibold text-primary group-hover:text-navy transition-colors flex items-center justify-center gap-1">
                                      <span>選択</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="py-4">
                                  <div className="text-sm text-gray-400 font-medium text-center">
                                    利用不可
                                  </div>
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Connection Flights */}
        {filteredConnections.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-navy mb-4">乗り継ぎ便</h2>
            {filteredConnections.map((connection) => (
              <ConnectionFlightCard
                key={connection.id}
                connection={connection}
                passengers={passengers}
                cabinClass={cabinClass}
                departDate={selectedDate || departureDate}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredFlights.length === 0 && filteredConnections.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Plane className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-navy mb-2">条件に一致するフライトが見つかりません</h3>
            <p className="text-text-secondary">検索条件を調整してください</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function FlightSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">読み込み中...</p>
        </div>
      </div>
    }>
      <FlightSearchContent />
    </Suspense>
  )
}
