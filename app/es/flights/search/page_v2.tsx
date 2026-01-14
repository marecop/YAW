'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Plane, Clock, Calendar, MapPin, ArrowRight, Filter, ChevronDown, ChevronLeft, ChevronRight, Users } from 'lucide-react'
import { format, addDays, subDays, parse } from 'date-fns'
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

export default function FlightSearchPage() {
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
          throw new Error(directData.error || 'Búsqueda fallida')
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

  const handleSelectCabin = (flightId: string, cabinType: string) => {
    router.push(`/es/flights/${flightId}/book?from=${from}&to=${to}&departureDate=${selectedDate || departureDate}&passengers=${passengers}&cabinClass=${cabinType}`)
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
    router.push(`/es/flights/search?${newParams.toString()}`, { scroll: false })
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
          <p className="text-text-secondary">Buscando vuelos...</p>
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
                  <div className="text-sm text-text-secondary">Salida</div>
                  <div className="font-medium text-navy">
                    {format(new Date(selectedDate || departureDate), 'dd MMM (E)')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-text-secondary" />
                <div>
                  <div className="text-sm text-text-secondary">Pasajeros</div>
                  <div className="font-medium text-navy">{passengers}</div>
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
                        {format(date, 'd E')}
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
              Filtro
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
                Todos
              </button>
              <button
                onClick={() => setFlightFilter('direct')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  flightFilter === 'direct'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border hover:border-primary'
                }`}
              >
                Solo Directos
              </button>
              <button
                onClick={() => setFlightFilter('connection')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  flightFilter === 'connection'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border hover:border-primary'
                }`}
              >
                Solo Conexiones
              </button>
            </div>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-border rounded-lg bg-white"
          >
            <option value="departure">Ordenar por: Relevancia</option>
            <option value="price">Precio más bajo</option>
            <option value="duration">Menor duración</option>
          </select>
        </div>

        {/* Direct Flights */}
        {filteredFlights.length > 0 && (
          <div className="space-y-4 mb-8">
            {filteredFlights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="grid grid-cols-12 gap-4 p-6">
                  {/* Left: Flight Info (40%) */}
                  <div className="col-span-12 lg:col-span-5">
                    <div className="space-y-4">
                      {/* Time and Cities */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-navy">
                            {format(new Date(flight.departureTime), 'HH:mm')}
                          </div>
                          <div className="text-sm font-medium text-navy mt-1">{flight.from}</div>
                          <div className="text-xs text-text-secondary">{flight.fromCity}</div>
                        </div>

                        <div className="flex-1 px-4 text-center">
                          <div className="text-xs text-text-secondary mb-1">
                            {Math.floor(flight.duration / 60)}h {flight.duration % 60}m
                          </div>
                          <div className="flex items-center">
                            <div className="flex-1 h-px bg-border"></div>
                            <div className="text-xs text-text-secondary px-2">Directo</div>
                            <div className="flex-1 h-px bg-border"></div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-3xl font-bold text-navy">
                            {format(new Date(flight.arrivalTime), 'HH:mm')}
                          </div>
                          <div className="text-sm font-medium text-navy mt-1">{flight.to}</div>
                          <div className="text-xs text-text-secondary">{flight.toCity}</div>
                        </div>
                      </div>

                      {/* Airline Info */}
                      <div className="flex items-center gap-3 pt-3 border-t border-border">
                        <img
                          src={flight.airlineLogo || `/images/airlines/${flight.airlineCode.toLowerCase()}.png`}
                          alt={flight.airline}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
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

                  {/* Right: Cabin Classes (60%) */}
                  <div className="col-span-12 lg:col-span-7">
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 h-full">
                      {flight.cabinClasses.map((cabin) => (
                        <button
                          key={cabin.type}
                          onClick={() => cabin.available && handleSelectCabin(flight.id, cabin.type)}
                          disabled={!cabin.available}
                          className={`flex flex-col justify-between p-4 rounded-lg border transition-all ${
                            cabin.available
                              ? 'border-border hover:border-primary hover:shadow-md cursor-pointer bg-white'
                              : 'border-border bg-gray-50 cursor-not-allowed opacity-60'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className={`text-xs font-semibold uppercase ${cabin.available ? 'text-navy' : 'text-gray-400'}`}>
                              {cabin.type === 'ECONOMY' && 'Económica'}
                              {cabin.type === 'PREMIUM_ECONOMY' && 'Premium Econ'}
                              {cabin.type === 'BUSINESS' && 'Negocios'}
                              {cabin.type === 'FIRST_CLASS' && 'Primera'}
                            </div>
                            <div className={`text-xs ${cabin.available ? 'text-text-secondary' : 'text-gray-400'}`}>
                              Desde
                            </div>
                            {cabin.available ? (
                              <>
                                <div className="text-xs text-text-secondary">HKD</div>
                                <div className="text-2xl font-bold text-primary">
                                  {(cabin.price * passengers).toLocaleString()}
                                </div>
                                <div className="text-xs text-text-secondary mt-1">
                                  {cabin.seats} asientos
                                </div>
                              </>
                            ) : (
                              <div className="text-sm text-gray-400 font-medium mt-2">
                                No disponible
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
                      ))}
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
            <h2 className="text-xl font-bold text-navy mb-4">Vuelos con Escalas</h2>
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
            <h3 className="text-xl font-bold text-navy mb-2">No se encontraron vuelos</h3>
            <p className="text-text-secondary">Por favor, intente ajustar sus criterios de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}
