 'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Plane, Calendar, Users, ArrowRight, Check, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import AirlineLogo from '@/components/AirlineLogo'

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
  pricePerPassenger: number
  totalPrice: number
  availableSeats: number
  cabinClass: string
}

function RoundtripSearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // 先获取 URL 参数
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''
  const departureDate = searchParams.get('departureDate') || searchParams.get('departDate') || ''
  const returnDate = searchParams.get('returnDate') || ''
  const passengers = parseInt(searchParams.get('passengers') || '1')
  const cabinClass = searchParams.get('cabinClass') || 'ECONOMY'

  // 然后使用参数初始化 state
  const [outboundFlights, setOutboundFlights] = useState<Flight[]>([])
  const [inboundFlights, setInboundFlights] = useState<Flight[]>([])
  const [selectedOutbound, setSelectedOutbound] = useState<Flight | null>(null)
  const [selectedInbound, setSelectedInbound] = useState<Flight | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [outboundCabinClass, setOutboundCabinClass] = useState<{[key: string]: string}>({})
  const [inboundCabinClass, setInboundCabinClass] = useState<{[key: string]: string}>({})
  const [error, setError] = useState('')

  useEffect(() => {
    fetchFlights()
  }, [searchParams])

  const fetchFlights = async () => {
    setIsLoading(true)
    setError('')

    try {
      const params = new URLSearchParams({
        from,
        to,
        departureDate,
        returnDate,
        passengers: passengers.toString(),
        cabinClass,
      })

      const response = await fetch(`/api/flights/roundtrip?${params.toString()}`)
      const data = await response.json()

      if (response.ok) {
        setOutboundFlights(data.outbound)
        setInboundFlights(data.inbound)
      } else {
        setError(data.error || '搜索往返航班失敗')
      }
    } catch (err) {
      setError('網絡錯誤，請稍後重試')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes/60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const handleContinue = () => {
    if (!selectedOutbound || !selectedInbound) {
      alert('請選擇去程和返程航班')
      return
    }

    const outboundCabin = getSelectedCabin(selectedOutbound.id, 'outbound')
    const inboundCabin = getSelectedCabin(selectedInbound.id, 'inbound')
    
    const params = new URLSearchParams({
      outboundFlightId: selectedOutbound.id,
      inboundFlightId: selectedInbound.id,
      passengers: passengers.toString(),
      outboundCabinClass: outboundCabin,
      inboundCabinClass: inboundCabin,
      flightDate: departureDate,
      returnDate,
      price: totalPrice.toString()
    })

    router.push(`/booking/passengers?${params.toString()}`)
  }

  const FlightCard = ({ flight, isSelected, onSelect, type }: { 
    flight: Flight
    isSelected: boolean
    onSelect: () => void
    type: 'outbound' | 'inbound'
  }) => {
    const cabinMap = type === 'outbound' ? outboundCabinClass : inboundCabinClass
    const setCabinMap = type === 'outbound' ? setOutboundCabinClass : setInboundCabinClass
    const selectedCabin = cabinMap[flight.id] || 'ECONOMY'
    const cabinPrice = getCabinPrice(flight, selectedCabin)

    return (
      <div
        className={`card-modern p-6 transition-all duration-300 ${
          isSelected 
            ? 'border-2 border-primary bg-blue-50' 
            : 'border border-border hover:border-primary hover:shadow-lg'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Flight Info - Left Side */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <AirlineLogo 
                airline={flight.airline}
                airlineCode={flight.airlineCode}
                airlineLogo={flight.airlineLogo}
                size="md"
              />
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-primary bg-blue-100 px-3 py-1 rounded-full">
                  {flight.flightNumber}
                </span>
                <span className="text-sm font-medium text-navy">{flight.airline}</span>
                <span className="text-sm text-text-secondary">{flight.aircraft}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              {/* Departure */}
              <div className="flex-1">
                <p className="text-3xl font-bold text-navy mb-1">
                  {format(new Date(flight.departureTime), 'HH:mm')}
                </p>
                <p className="text-sm font-medium text-navy">{flight.fromCity}</p>
                <p className="text-sm text-text-secondary">{flight.from}</p>
              </div>

              {/* Flight Path */}
              <div className="flex-1 px-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="flex-1 h-px bg-border"></div>
                  <Plane className="w-5 h-5 text-primary rotate-90" />
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                <p className="text-sm text-center text-text-secondary">
                  {formatDuration(flight.duration)}
                </p>
              </div>

              {/* Arrival */}
              <div className="flex-1 text-right">
                <p className="text-3xl font-bold text-navy mb-1">
                  {format(new Date(flight.arrivalTime), 'HH:mm')}
                </p>
                <p className="text-sm font-medium text-navy">{flight.toCity}</p>
                <p className="text-sm text-text-secondary">{flight.to}</p>
              </div>
            </div>

            <div className="mt-4 text-sm text-text-secondary">
              剩余座位：{flight.availableSeats}
            </div>
          </div>

          {/* Price and Selection - Right Side */}
          <div className="lg:col-span-4 flex flex-col items-end justify-center gap-4 lg:border-l lg:pl-6">
            <div className="text-right">
              <p className="text-sm text-text-secondary mb-1">总价</p>
              <p className="text-4xl font-bold text-primary">
                ¥{cabinPrice.toLocaleString()}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                ¥{(cabinPrice/passengers).toLocaleString()} {String.fromCharCode(47)} 人
              </p>
            </div>
            
            {/* 舱位选择和选择按钮 */}
            <div className="flex flex-col lg:flex-row items-center gap-3 w-full">
              <select
                value={selectedCabin}
                onChange={(e) => {
                  e.stopPropagation()
                  setCabinMap(prev => ({...prev, [flight.id]: e.target.value}))
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-full lg:w-auto px-4 py-2 border border-border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="ECONOMY">經濟艙</option>
                <option value="BUSINESS">商務艙</option>
                <option value="FIRST_CLASS">頭等艙</option>
              </select>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect()
                }}
                className={`w-full lg:w-auto px-6 py-2.5 rounded-lg font-medium transition-all ${
                  isSelected
                    ? 'bg-primary text-navy'
                    : 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-navy'
                }`}
              >
                {isSelected ? '已選擇' : '選擇'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-gray">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
          <p className="text-xl text-navy font-semibold">載入中...</p>
          <p className="text-text-secondary mt-2">正在搜索最佳往返航班...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-gray">
        <div className="card-modern p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-navy mb-2">出錯了</h2>
          <p className="text-text-secondary mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-primary text-navy font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            返回主頁
          </button>
        </div>
      </div>
    )
  }

  if (outboundFlights.length === 0 || inboundFlights.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-gray">
        <div className="card-modern p-12 max-w-md text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plane className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-navy mb-2">未找到符合條件的航班</h2>
          <p className="text-text-secondary mb-6">
            {outboundFlights.length === 0 ? '沒有去程航班' : '沒有返程航班'}
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-primary text-navy font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            重新搜索
          </button>
        </div>
      </div>
    )
  }

  // 根据选择的舱位计算价格
  const getCabinPrice = (flight: Flight | null, cabin: string) => {
    if (!flight) return 0
    
    let pricePerPassenger = 0
    switch (cabin) {
      case 'BUSINESS':
        pricePerPassenger = flight.pricePerPassenger * 2.5
        break
      case 'FIRST_CLASS':
        pricePerPassenger = flight.pricePerPassenger * 4
        break
      default: // ECONOMY
        pricePerPassenger = flight.pricePerPassenger
    }
    
    return pricePerPassenger * passengers
  }
  
  const getSelectedCabin = (flightId: string, type: 'outbound' | 'inbound') => {
    const cabinMap = type === 'outbound' ? outboundCabinClass : inboundCabinClass
    return cabinMap[flightId] || 'ECONOMY'
  }
  
  const totalPrice = selectedOutbound && selectedInbound 
    ? getCabinPrice(selectedOutbound, getSelectedCabin(selectedOutbound.id, 'outbound')) + 
      getCabinPrice(selectedInbound, getSelectedCabin(selectedInbound.id, 'inbound'))
    : 0

  return (
    <div className="min-h-screen bg-background-gray py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy mb-4">選擇往返航班</h1>
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              <span>{from} ⇄ {to}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{departureDate} - {returnDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{passengers} 位乘客</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Outbound Flights */}
          <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary text-navy rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-2xl font-bold text-navy">
                  選擇去程航班
                  <span className="text-lg font-normal text-text-secondary ml-2">
                    {from} → {to} · {departureDate}
                  </span>
                </h2>
              </div>
              <div className="space-y-4">
                {outboundFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    isSelected={selectedOutbound?.id === flight.id}
                    onSelect={() => setSelectedOutbound(flight)}
                    type="outbound"
                  />
                ))}
              </div>
          </div>

          {/* Inbound Flights */}
          <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary text-navy rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-2xl font-bold text-navy">
                  選擇返程航班
                  <span className="text-lg font-normal text-text-secondary ml-2">
                    {to} → {from} · {returnDate}
                  </span>
                </h2>
              </div>
              <div className="space-y-4">
                {inboundFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    isSelected={selectedInbound?.id === flight.id}
                    onSelect={() => setSelectedInbound(flight)}
                    type="inbound"
                  />
                ))}
              </div>
          </div>
        </div>

        {/* Continue Button */}
          {selectedOutbound && selectedInbound && (
            <div className="card-modern p-6 sticky bottom-6 bg-white shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-text-secondary mb-1">總價 ({passengers} 位乘客)</p>
                  <p className="text-3xl font-bold text-primary">¥{totalPrice.toLocaleString()}</p>
                </div>
                <button
                  onClick={handleContinue}
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-navy font-bold rounded-lg hover:bg-primary-dark transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>繼續預訂</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default function RoundtripSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background-gray">
        <Loader2 className="w-16 h-16 text-primary animate-spin" />
      </div>
    }>
      <RoundtripSearchContent />
    </Suspense>
  )
}

