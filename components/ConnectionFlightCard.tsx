'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  const [showDetails, setShowDetails] = useState(false)

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
    router.push(`/booking/connection-passengers?${params.toString()}`)
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

