'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown, Plane, Clock, MapPin } from 'lucide-react'
import AirlineLogo from './AirlineLogo'
import { format } from 'date-fns'

interface Segment {
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
  durationStr: string
  aircraft: string
  pricePerPassenger: number
}

interface ConnectionFlightCardProps {
  connection: {
    id: string
    segments: Segment[]
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
  passengers: number
  departDate: string
  cabinClass: string
}

export default function ConnectionFlightCard({ 
  connection, 
  passengers, 
  departDate,
  cabinClass 
}: ConnectionFlightCardProps) {
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
      stops: '次中轉',
      totalDuration: '總時長',
      via: '經',
      layover: '中轉',
      viewDetails: '檢視航段詳細資料',
      perPerson: '每位',
      total: '總計',
      select: '選擇',
      departure: '出發',
      flightTime: '飛行時間',
      arrival: '到達',
      stopAt: '在',
      stopAtSuffix: '中轉',
      stay: '停留',
      hideDetails: '隱藏詳情',
      flightDetails: '航班詳情'
    },
    'zh-cn': {
      stops: '次中转',
      totalDuration: '总时长',
      via: '经',
      layover: '中转',
      viewDetails: '查看航段详情',
      perPerson: '每位',
      total: '总计',
      select: '选择',
      departure: '出发',
      flightTime: '飞行时间',
      arrival: '到达',
      stopAt: '在',
      stopAtSuffix: '中转',
      stay: '停留',
      hideDetails: '隐藏详情',
      flightDetails: '航班详情'
    },
    'en': {
      stops: 'stops',
      totalDuration: 'Total Duration',
      via: 'Via',
      layover: 'Layover',
      viewDetails: 'View Flight Details',
      perPerson: 'Per Person',
      total: 'Total',
      select: 'Select',
      departure: 'Depart',
      flightTime: 'Flight Time',
      arrival: 'Arrive',
      stopAt: 'Stop at',
      stopAtSuffix: '',
      stay: 'Stay',
      hideDetails: 'Hide Details',
      flightDetails: 'Flight Details'
    },
    'de': {
      stops: 'Stopps',
      totalDuration: 'Gesamtdauer',
      via: 'Über',
      layover: 'Aufenthalt',
      viewDetails: 'Details anzeigen',
      perPerson: 'Pro Person',
      total: 'Gesamt',
      select: 'Auswählen',
      departure: 'Abflug',
      flightTime: 'Flugzeit',
      arrival: 'Ankunft',
      stopAt: 'Zwischenstopp in',
      stopAtSuffix: '',
      stay: 'Aufenthalt',
      hideDetails: 'Details ausblenden',
      flightDetails: 'Flugdetails'
    },
    'jp': {
      stops: '経由',
      totalDuration: '所要時間',
      via: '経由',
      layover: '乗り継ぎ',
      viewDetails: '詳細を表示',
      perPerson: '1名様',
      total: '合計',
      select: '選択',
      departure: '出発',
      flightTime: '飛行時間',
      arrival: '到着',
      stopAt: '',
      stopAtSuffix: 'で乗り継ぎ',
      stay: '滞在',
      hideDetails: '詳細を隠す',
      flightDetails: 'フライト詳細'
    },
    'es': {
      stops: 'escalas',
      totalDuration: 'Duración total',
      via: 'Vía',
      layover: 'Escala',
      viewDetails: 'Ver detalles',
      perPerson: 'Por persona',
      total: 'Total',
      select: 'Seleccionar',
      departure: 'Salida',
      flightTime: 'Tiempo de vuelo',
      arrival: 'Llegada',
      stopAt: 'Escala en',
      stopAtSuffix: '',
      stay: 'Estancia',
      hideDetails: 'Ocultar detalles',
      flightDetails: 'Detalles del vuelo'
    }
  }

  const t = translations[currentLangCode] || translations['zh-hk']

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const formatLayover = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`
    } else if (hours > 0) {
      return `${hours}h`
    } else {
      return `${mins}m`
    }
  }

  const handleSelect = () => {
    // 對於中轉航班，需要特殊處理預訂流程
    const params = new URLSearchParams({
      connectionId: connection.id,
      segment1: connection.segments[0].id,
      segment2: connection.segments[1].id,
      passengers: passengers.toString(),
      cabinClass,
      flightDate: departDate,
    })
    router.push(`${langPrefix}/booking/connection-passengers?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-4 border-l-4 border-ya-yellow-500">
      {/* 主要航班信息 */}
      <div className="p-6">
        {/* 標籤 */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
            {connection.stops} 次中轉
          </span>
          <span className="text-xs text-gray-500">
            總時長 {formatDuration(connection.totalDuration)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          {/* 左側：航程概覽 */}
          <div className="flex-1">
            <div className="flex items-center gap-8">
              {/* 出發 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {format(new Date(connection.segments[0].departureTime), 'HH:mm')}
                </div>
                <div className="text-sm text-gray-600 font-medium mt-1">{connection.from}</div>
                <div className="text-xs text-gray-500">{connection.fromCity}</div>
              </div>

              {/* 飛行路徑 */}
              <div className="flex-1 px-4">
                <div className="relative">
                  <div className="h-px bg-gray-300 w-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                    <Plane className="w-5 h-5 text-orange-600 rotate-90" />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <div className="flex items-center justify-center gap-1 text-xs text-orange-600 font-medium">
                    <MapPin className="w-3 h-3" />
                    <span>經 {connection.layoverAirport}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    中轉 {formatLayover(connection.layoverMinutes)}
                  </div>
                </div>
              </div>

              {/* 到達 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {format(new Date(connection.segments[connection.segments.length - 1].arrivalTime), 'HH:mm')}
                </div>
                <div className="text-sm text-gray-600 font-medium mt-1">{connection.to}</div>
                <div className="text-xs text-gray-500">{connection.toCity}</div>
              </div>
            </div>

            {/* 查看詳情按鈕 */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-4 flex items-center gap-1 text-sm text-gray-600 hover:text-ya-yellow-600 transition-colors"
            >
              <span>檢視航段詳細資料</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* 右側：價格和選擇按鈕 */}
          <div className="ml-8 pl-8 border-l border-gray-200">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">每位</div>
              <div className="text-xs text-gray-600 mb-1">HKD</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {connection.pricePerPassenger.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mb-3">
                總計 {connection.totalPrice.toLocaleString()}
              </div>
              <button
                onClick={handleSelect}
                className="px-6 py-2 bg-ya-yellow-500 hover:bg-ya-yellow-600 text-black font-medium rounded-lg transition-colors"
              >
                選擇
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 展開的航段詳細信息 */}
      {showDetails && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <div className="space-y-6">
            {connection.segments.map((segment, index) => (
              <div key={segment.id}>
                <div className="flex items-start gap-4">
                  {/* 航段序號 */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-ya-yellow-500 text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    {index < connection.segments.length - 1 && (
                      <div className="w-px h-16 bg-gray-300 my-2"></div>
                    )}
                  </div>

                  {/* 航段信息 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <AirlineLogo
                        airline={segment.airline}
                        airlineCode={segment.airlineCode}
                        airlineLogo={segment.airlineLogo}
                        size="sm"
                      />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {segment.flightNumber} · {segment.airline}
                        </div>
                        <div className="text-xs text-gray-500">{segment.aircraft}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">出發</div>
                        <div className="font-bold text-gray-900">
                          {format(new Date(segment.departureTime), 'HH:mm')}
                        </div>
                        <div className="text-gray-700">{segment.fromCity} ({segment.from})</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">飛行時間</div>
                        <div className="font-medium text-gray-900">{segment.durationStr}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">到達</div>
                        <div className="font-bold text-gray-900">
                          {format(new Date(segment.arrivalTime), 'HH:mm')}
                        </div>
                        <div className="text-gray-700">{segment.toCity} ({segment.to})</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 中轉時間提示 */}
                {index < connection.segments.length - 1 && (
                  <div className="ml-12 mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="font-medium text-orange-900">
                        在 {connection.layoverAirport} ({connection.layoverAirportName}) 中轉
                      </span>
                      <span className="text-orange-700">
                        · 停留 {formatLayover(connection.layoverMinutes)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

