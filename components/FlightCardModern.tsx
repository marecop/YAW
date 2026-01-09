'use client'

import { useState } from 'react'
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
  const [expandedCabin, setExpandedCabin] = useState<string | null>(null)

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const getCabinLabel = (type: string) => {
    switch (type) {
      case 'ECONOMY': return '經濟艙'
      case 'PREMIUM_ECONOMY': return '進階經濟艙'
      case 'BUSINESS': return '商務艙'
      case 'FIRST_CLASS': return '頭等艙'
      default: return type
    }
  }

  const getCabinLabelEn = (type: string) => {
    switch (type) {
      case 'ECONOMY': return 'Economy'
      case 'PREMIUM_ECONOMY': return 'Premium Economy'
      case 'BUSINESS': return 'Business'
      case 'FIRST_CLASS': return 'First Class'
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
                  {flight.isDirect ? '直達' : `${flight.stops}次中轉`}
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
                      {getCabinLabelEn(cabin.type)}
                    </div>
                    <div className={`text-sm ${cabin.available ? 'text-text-secondary' : 'text-gray-400'}`}>
                      從
                    </div>
                    {cabin.available ? (
                      <>
                        <div className="text-lg font-bold text-primary">
                          HKD {(cabin.price * passengers).toLocaleString()}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {cabin.seats} 有空座
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-gray-400 font-medium">
                        不適用
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

