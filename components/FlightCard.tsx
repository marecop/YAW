'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown, Plane, Clock, Wifi, Coffee, Tv } from 'lucide-react'
import AirlineLogo from './AirlineLogo'

interface FlightCardProps {
  flight: {
    id: string
    flightNumber: string
    airline?: string
    airlineCode?: string
    airlineLogo?: string | null
    from: string
    fromCity: string
    to: string
    toCity: string
    departureTime: string
    arrivalTime: string
    duration: string
    aircraft: string
    economyPrice: number
    businessPrice: number
    firstClassPrice: number
    economySeats: number
    businessSeats: number
    firstClassSeats: number
  }
  passengers: number
  departDate?: string
}

export default function FlightCard({ flight, passengers, departDate }: FlightCardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [showDetails, setShowDetails] = useState(false)

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
      direct: '直達',
      remaining: '餘',
      seats: '位',
      hideDetails: '隱藏詳情',
      flightDetails: '航班詳情',
      flightInfo: '航班信息',
      inflightServices: '機上服務與設施',
      aircraft: '機型',
      meals: '餐食',
      mealProvided: '提供正餐',
      baggage: '行李額度 (經濟艙)',
      mileage: '里程累積',
      economy: 'Economy',
      business: 'Business',
      wifi: 'Wi-Fi',
      entertainment: '娛樂'
    },
    'zh-cn': {
      direct: '直达',
      remaining: '余',
      seats: '位',
      hideDetails: '隐藏详情',
      flightDetails: '航班详情',
      flightInfo: '航班信息',
      inflightServices: '机上服务与设施',
      aircraft: '机型',
      meals: '餐食',
      mealProvided: '提供正餐',
      baggage: '行李额度 (经济舱)',
      mileage: '里程累积',
      economy: '经济舱',
      business: '商务舱',
      wifi: 'Wi-Fi',
      entertainment: '娱乐'
    },
    'en': {
      direct: 'Direct',
      remaining: '',
      seats: 'seats left',
      hideDetails: 'Hide Details',
      flightDetails: 'Flight Details',
      flightInfo: 'Flight Info',
      inflightServices: 'In-flight Services',
      aircraft: 'Aircraft',
      meals: 'Meals',
      mealProvided: 'Meal provided',
      baggage: 'Baggage (Economy)',
      mileage: 'Mileage Accrual',
      economy: 'Economy',
      business: 'Business',
      wifi: 'Wi-Fi',
      entertainment: 'Entertainment'
    },
    'de': {
      direct: 'Direkt',
      remaining: 'Noch',
      seats: 'Plätze',
      hideDetails: 'Details ausblenden',
      flightDetails: 'Flugdetails',
      flightInfo: 'Fluginformationen',
      inflightServices: 'Bordservice & Ausstattung',
      aircraft: 'Flugzeugtyp',
      meals: 'Mahlzeiten',
      mealProvided: 'Mahlzeit inbegriffen',
      baggage: 'Gepäck (Economy)',
      mileage: 'Meilengutschrift',
      economy: 'Economy',
      business: 'Business',
      wifi: 'WLAN',
      entertainment: 'Unterhaltung'
    },
    'jp': {
      direct: '直行便',
      remaining: '残り',
      seats: '席',
      hideDetails: '詳細を隠す',
      flightDetails: 'フライト詳細',
      flightInfo: 'フライト情報',
      inflightServices: '機内サービス・設備',
      aircraft: '機材',
      meals: '食事',
      mealProvided: '食事付き',
      baggage: '手荷物 (エコノミー)',
      mileage: 'マイル積算',
      economy: 'エコノミー',
      business: 'ビジネス',
      wifi: 'Wi-Fi',
      entertainment: 'エンターテイメント'
    },
    'es': {
      direct: 'Directo',
      remaining: 'Quedan',
      seats: 'asientos',
      hideDetails: 'Ocultar detalles',
      flightDetails: 'Detalles del vuelo',
      flightInfo: 'Información del vuelo',
      inflightServices: 'Servicios a bordo',
      aircraft: 'Avión',
      meals: 'Comidas',
      mealProvided: 'Comida incluida',
      baggage: 'Equipaje (Económica)',
      mileage: 'Acumulación de millas',
      economy: 'Económica',
      business: 'Business',
      wifi: 'Wi-Fi',
      entertainment: 'Entretenimiento'
    }
  }

  const t = translations[currentLangCode] || translations['zh-hk']

  const formatTime = (time: string) => time.replace('+1', '')

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-HK', {
      month: 'short',
      day: 'numeric',
    })
  }

  const getArrivalDate = () => {
    if (!departDate) return ''
    if (flight.arrivalTime.includes('+1')) {
      const date = new Date(departDate)
      date.setDate(date.getDate() + 1)
      return formatDate(date.toISOString())
    }
    return formatDate(departDate)
  }

  const handleSelectCabin = (cabinClass: string, price: number) => {
    const params = new URLSearchParams({
      flightId: flight.id,
      cabinClass,
      passengers: passengers.toString(),
      price: price.toString(),
      flightDate: departDate || '',
    })
    router.push(`${langPrefix}/booking/passengers?${params.toString()}`)
  }

  const depDateDisplay = departDate ? formatDate(departDate) : ''
  const arrDateDisplay = getArrivalDate()

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
          
          {/* Flight Info Section */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                  <AirlineLogo 
                    airline={flight.airline || 'Yellow Airlines'}
                    airlineCode={flight.airlineCode || 'YA'}
                    airlineLogo={flight.airlineLogo}
                    size="sm"
                  />
                <div>
                  <span className="font-bold text-gray-900">{flight.airline || 'Yellow Airlines'}</span>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{flight.flightNumber}</span>
                    <span>•</span>
                    <span>{flight.aircraft}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-8">
              {/* Departure */}
              <div className="flex-1">
                <div className="text-2xl font-bold text-gray-900">{formatTime(flight.departureTime)}</div>
                <div className="text-sm font-medium text-gray-600">{flight.from}</div>
                {depDateDisplay && <div className="text-xs text-gray-400 mt-1">{depDateDisplay}</div>}
              </div>

              {/* Duration Graphic */}
              <div className="flex flex-col items-center flex-[2]">
                <div className="text-xs text-gray-500 mb-1">{flight.duration}</div>
                <div className="relative w-full flex items-center">
                  <div className="h-[2px] bg-gray-200 w-full rounded-full"></div>
                  <Plane className="w-4 h-4 text-ya-yellow-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 bg-white px-1 box-content" />
                </div>
                <div className="text-xs text-gray-500 mt-1">{t.direct}</div>
              </div>

              {/* Arrival */}
              <div className="flex-1 text-right">
                <div className="text-2xl font-bold text-gray-900">{formatTime(flight.arrivalTime)}</div>
                <div className="text-sm font-medium text-gray-600">{flight.to}</div>
                {arrDateDisplay && <div className="text-xs text-ya-yellow-600 mt-1">{arrDateDisplay}</div>}
              </div>
            </div>
          </div>

          {/* Vertical Divider (Desktop) */}
          <div className="hidden lg:block w-px bg-gray-100 self-stretch"></div>

          {/* Pricing Options */}
          <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0">
            {/* Economy */}
            <button
              onClick={() => handleSelectCabin('economy', flight.economyPrice)}
              className="flex-shrink-0 w-32 lg:w-40 p-3 rounded-lg border border-gray-200 hover:border-ya-yellow-500 hover:bg-ya-yellow-50 transition-all text-left group"
            >
              <div className="text-xs text-gray-500 mb-1">{t.economy}</div>
              <div className="text-lg font-bold text-gray-900 group-hover:text-ya-yellow-700">
                <span className="text-xs font-normal text-gray-400 mr-1">HKD</span>
                {(flight.economyPrice * passengers).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 mt-1">{t.remaining} {flight.economySeats} {t.seats}</div>
            </button>

            {/* Business */}
            <button
              onClick={() => handleSelectCabin('business', flight.businessPrice)}
              className="flex-shrink-0 w-32 lg:w-40 p-3 rounded-lg border border-gray-200 hover:border-ya-yellow-500 hover:bg-ya-yellow-50 transition-all text-left group"
            >
              <div className="text-xs text-gray-500 mb-1">{t.business}</div>
              <div className="text-lg font-bold text-gray-900 group-hover:text-ya-yellow-700">
                <span className="text-xs font-normal text-gray-400 mr-1">HKD</span>
                {(flight.businessPrice * passengers).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 mt-1">{t.remaining} {flight.businessSeats} {t.seats}</div>
            </button>
          </div>
                </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex gap-4 text-gray-400">
            <div className="flex items-center gap-1 text-xs" title="Wi-Fi Available">
              <Wifi className="w-3 h-3" /> <span className="hidden sm:inline">{t.wifi}</span>
            </div>
            <div className="flex items-center gap-1 text-xs" title="In-flight Meal">
              <Coffee className="w-3 h-3" /> <span className="hidden sm:inline">{t.meals}</span>
            </div>
            <div className="flex items-center gap-1 text-xs" title="Entertainment">
              <Tv className="w-3 h-3" /> <span className="hidden sm:inline">{t.entertainment}</span>
            </div>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-ya-yellow-600 hover:text-ya-yellow-700 font-medium flex items-center gap-1"
          >
            {showDetails ? t.hideDetails : t.flightDetails}
            <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="bg-gray-50 border-t border-gray-100 p-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h4 className="text-sm font-bold text-gray-900 mb-4">{t.flightInfo}</h4>
              <div className="space-y-4 relative">
                {/* Timeline Line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200"></div>

                <div className="flex gap-4 relative">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-400 z-10 mt-1"></div>
            <div>
                    <div className="font-bold text-gray-900">{formatTime(flight.departureTime)}</div>
                    <div className="text-sm text-gray-600">{flight.fromCity} ({flight.from})</div>
                    <div className="text-xs text-gray-500">香港國際機場 T1</div>
                  </div>
                </div>

                <div className="flex gap-4 relative py-2">
                  <div className="w-4 flex justify-center">
                    <Clock className="w-3 h-3 text-gray-400 bg-gray-50 z-10" />
            </div>
            <div>
                    <div className="text-sm text-gray-500">{flight.duration}</div>
                  </div>
            </div>

                <div className="flex gap-4 relative">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-ya-yellow-500 z-10 mt-1"></div>
            <div>
                    <div className="font-bold text-gray-900">{formatTime(flight.arrivalTime)}</div>
                    <div className="text-sm text-gray-600">{flight.toCity} ({flight.to})</div>
                    <div className="text-xs text-gray-500">目的地機場 T1</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-bold text-gray-900 mb-4">{t.inflightServices}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">{t.aircraft}</div>
                  <div className="font-medium text-gray-900">{flight.aircraft}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">{t.meals}</div>
                  <div className="font-medium text-gray-900">{t.mealProvided}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">{t.baggage}</div>
                  <div className="font-medium text-gray-900">1 x 23kg</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">{t.mileage}</div>
                  <div className="font-medium text-gray-900">100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
