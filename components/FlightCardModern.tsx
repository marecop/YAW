'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Plane, ChevronDown, ChevronUp } from 'lucide-react'
import { format } from 'date-fns'
import AirlineLogo from './AirlineLogo'

interface CabinClass {
  type: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST_CLASS'
  price: number
  available: boolean
  seats: number
}

interface FlightCardProps {
  flight: {
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
    isDirect: boolean
    stops?: number
    cabinClasses: CabinClass[]
  }
  passengers: number
  onSelectCabin: (flightId: string, cabinType: string) => void
}

export default function FlightCardModern({ flight, passengers, onSelectCabin }: FlightCardProps) {
  const pathname = usePathname()
  const [expandedCabin, setExpandedCabin] = useState<string | null>(null)
  
  // Helper to get current language prefix
  const getLangPrefix = () => {
    const segments = pathname.split('/').filter(Boolean)
    const currentLang = ['en', 'zh-hk', 'zh-cn', 'de', 'jp', 'es'].includes(segments[0]) ? segments[0] : 'zh-hk'
    return currentLang === 'zh-hk' ? '' : `/${currentLang}`
  }
  const langPrefix = getLangPrefix()
  const currentLangCode = langPrefix ? langPrefix.substring(1) : 'zh-hk'

  const translations: Record<string, any> = {
    'zh-hk': { direct: '直達', stops: '次中轉', from: '從', available: '有空座', unavailable: '不可用', economy: '經濟艙', premiumEconomy: '進階經濟艙', business: '商務艙', first: '頭等艙' },
    'zh-cn': { direct: '直达', stops: '次中转', from: '从', available: '有空座', unavailable: '不适用', economy: '经济舱', premiumEconomy: '进阶经济舱', business: '商务舱', first: '头等舱' },
    'en': { direct: 'Direct', stops: 'stops', from: 'From', available: 'seats left', unavailable: 'N/A', economy: 'Economy', premiumEconomy: 'Premium Economy', business: 'Business', first: 'First Class' },
    'de': { direct: 'Direkt', stops: 'Stopps', from: 'Ab', available: 'Plätze', unavailable: 'N/A', economy: 'Economy', premiumEconomy: 'Premium Economy', business: 'Business', first: 'First Class' },
    'jp': { direct: '直行便', stops: '経由', from: '～', available: '席あり', unavailable: '不可', economy: 'エコノミー', premiumEconomy: 'プレミアムエコノミー', business: 'ビジネス', first: 'ファースト' },
    'es': { direct: 'Directo', stops: 'escalas', from: 'Desde', available: 'plazas', unavailable: 'N/A', economy: 'Económica', premiumEconomy: 'Económica Premium', business: 'Business', first: 'Primera Clase' }
  }
  
  const t = translations[currentLangCode] || translations['zh-hk']

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const getCabinLabel = (type: string) => {
    switch (type) {
      case 'ECONOMY': return t.economy
      case 'PREMIUM_ECONOMY': return t.premiumEconomy
      case 'BUSINESS': return t.business
      case 'FIRST_CLASS': return t.first
      default: return type
    }
  }

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-12 gap-4 p-6">
        {/* Left: Flight Info */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <div className="space-y-4">
            {/* Time and Cities */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-navy">
                  {format(new Date(flight.departureTime), 'HH:mm')}
                </div>
                <div className="text-sm font-medium text-navy mt-1">{flight.from}</div>
                <div className="text-xs text-text-secondary">{flight.fromCity}</div>
              </div>

              <div className="flex-1 px-4 text-center">
                <div className="text-xs text-text-secondary mb-1">
                  {formatDuration(flight.duration)}
                </div>
                <div className="flex items-center">
                  <div className="flex-1 h-px bg-border"></div>
                  <Plane className="w-4 h-4 text-primary mx-2" style={{ transform: 'rotate(90deg)' }} />
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                <div className="text-xs text-text-secondary mt-1">
                  {flight.isDirect ? t.direct : `${flight.stops} ${t.stops}`}
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-navy">
                  {format(new Date(flight.arrivalTime), 'HH:mm')}
                </div>
                <div className="text-sm font-medium text-navy mt-1">{flight.to}</div>
                <div className="text-xs text-text-secondary">{flight.toCity}</div>
              </div>
            </div>

            {/* Airline Info */}
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <AirlineLogo
                airline={flight.airline}
                airlineCode={flight.airlineCode}
                airlineLogo={flight.airlineLogo}
                size="sm"
              />
              <div>
                <div className="text-sm font-medium text-navy">{flight.airline}</div>
                <div className="text-xs text-text-secondary">
                  {flight.flightNumber} · {flight.aircraft}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Cabin Classes */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {flight.cabinClasses.map((cabin) => (
              <div key={cabin.type} className="relative">
                <button
                  onClick={() => cabin.available && onSelectCabin(flight.id, cabin.type)}
                  disabled={!cabin.available}
                  className={`w-full p-4 rounded-lg border transition-all ${
                    cabin.available
                      ? 'border-border hover:border-primary hover:shadow-md cursor-pointer'
                      : 'border-border bg-gray-50 cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div className={`text-xs font-medium ${cabin.available ? 'text-navy' : 'text-gray-400'}`}>
                      {getCabinLabel(cabin.type)}
                    </div>
                    <div className={`text-sm ${cabin.available ? 'text-text-secondary' : 'text-gray-400'}`}>
                      {t.from}
                    </div>
                    {cabin.available ? (
                      <>
                        <div className="text-lg font-bold text-primary">
                          HKD {(cabin.price * passengers).toLocaleString()}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {cabin.seats} {t.available}
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-gray-400 font-medium">
                        {t.unavailable}
                      </div>
                    )}
                  </div>
                  
                  {cabin.available && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center justify-center text-xs text-primary">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
