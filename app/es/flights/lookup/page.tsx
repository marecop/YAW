'use client'

import { Suspense, useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Plane, Calendar, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface Flight {
  id: string
  flightNumber: string
  airline: string
  airlineCode: string
  from: string
  fromCity: string
  to: string
  toCity: string
  departureTime: string
  arrivalTime: string
  // NOTE: In Prisma `Flight.duration` is stored as a string (e.g. "2h 30m"),
  // while other API endpoints may return numeric minutes. Handle both.
  duration: string | number
  aircraft: string
  operatingDays: string
}

function FlightLookupContent() {
  const searchParams = useSearchParams()
  const today = new Date().toISOString().split('T')[0]

  const initialNumber = (searchParams.get('number') || '').trim()
  const initialDate = (searchParams.get('date') || '').trim()

  const [flightNumber, setFlightNumber] = useState(initialNumber)
  const [selectedDate, setSelectedDate] = useState(initialDate || today)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Flight | null>(null)
  const [error, setError] = useState('')

  const currentLabels = {
    title: 'Búsqueda de vuelos',
    subtitle: 'Consulte el estado y los horarios de los vuelos mediante el número de vuelo.',
    placeholder: 'Ingrese el número de vuelo (ej. YA101)',
    dateLabel: 'Fecha',
    search: 'Buscar',
    flightInfo: 'Información del vuelo',
    origin: 'Origen',
    dest: 'Destino',
    duration: 'Duración',
    aircraft: 'Avión',
    schedule: 'Horario',
    depTime: 'Salida',
    arrTime: 'Llegada',
    actions: 'Acciones',
    checkStatus: 'Ver estado',
    bookTicket: 'Reservar este vuelo',
    notFound: 'No se encontró el vuelo con ese número.',
    enterNumber: 'Por favor ingrese el número de vuelo.',
  }

  const lookup = async (num: string) => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch(`/api/flights/lookup?number=${encodeURIComponent(num)}`)
      if (res.ok) {
        const data = await res.json()
        if (data) {
          setResult(data)
        } else {
          setError(currentLabels.notFound)
        }
      } else {
        setError('Error en la búsqueda, intente nuevamente.')
      }
    } catch (e) {
      setError('Error de red, verifique su conexión e intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialNumber) {
      setFlightNumber(initialNumber)
      void lookup(initialNumber)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNumber])

  useEffect(() => {
    if (initialDate) setSelectedDate(initialDate)
  }, [initialDate])

  const handleSearch = async (e?: FormEvent) => {
    if (e) e.preventDefault()
    const num = flightNumber.trim()
    if (!num) {
      setError(currentLabels.enterNumber)
      return
    }

    await lookup(num)
  }

  const formatDuration = (value: string | number) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      const h = Math.floor(value / 60)
      const m = value % 60
      return `${h}h ${m}m`
    }
    if (typeof value === 'string') {
      const s = value.trim()
      return s || '-'
    }
    return '-'
  }

  const operatesOnSelectedDate = (() => {
    if (!result || !selectedDate) return true
    // Use local date to avoid timezone day-shift
    const d = new Date(`${selectedDate}T00:00:00`)
    const jsDay = d.getDay() // 0-6
    const dayOfWeek = jsDay === 0 ? 7 : jsDay // 1-7, where 7 = Sunday
    return result.operatingDays?.includes(dayOfWeek.toString())
  })()

  return (
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">{currentLabels.title}</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              {currentLabels.subtitle}
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Search Box */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-7">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Plane className="h-5 w-5 text-gray-400 transform -rotate-45" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ya-yellow-500 focus:border-ya-yellow-500 sm:text-lg transition-shadow"
                    placeholder={currentLabels.placeholder}
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <label htmlFor="lookupDate" className="block text-sm font-medium text-gray-700 mb-2">
                  {currentLabels.dateLabel}
                </label>
                <input
                  id="lookupDate"
                  type="date"
                  min={today}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="block w-full py-3 px-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-ya-yellow-500 focus:border-ya-yellow-500"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-black bg-ya-yellow-500 hover:bg-ya-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ya-yellow-500 disabled:opacity-50 transition-colors"
                >
                  {loading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      {currentLabels.search}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-red-50 p-4 mb-8 flex items-center animate-fade-in">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Result Card */}
          {result && (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden animate-fade-in">
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-ya-yellow-100 rounded-lg flex items-center justify-center text-ya-yellow-700 font-bold mr-4">
                    {result.airlineCode}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{result.flightNumber}</h2>
                    <p className="text-sm text-gray-500">{result.airline}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Plane className="h-4 w-4 mr-1" />
                  {result.aircraft}
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {!operatesOnSelectedDate && (
                  <div className="rounded-lg bg-yellow-50 p-4 mb-6 text-sm text-yellow-800 border border-yellow-200">
                    Es posible que este vuelo no opere en la fecha seleccionada (sujeto al horario real/anuncio de la aerolínea).
                  </div>
                )}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                  {/* Origin */}
                  <div className="text-center md:text-left flex-1">
                    <div className="text-sm text-gray-500 mb-1">{currentLabels.origin}</div>
                    <div className="text-3xl font-bold text-gray-900">{result.from}</div>
                    <div className="text-sm font-medium text-gray-600">{result.fromCity}</div>
                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {result.departureTime}
                    </div>
                  </div>

                  {/* Flight Path Visualization */}
                  <div className="flex-1 px-4 flex flex-col items-center justify-center my-4 md:my-0">
                    <div className="text-xs text-gray-400 mb-1">{formatDuration(result.duration)}</div>
                    <div className="w-full flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
                      <div className="flex-1 h-0.5 bg-gray-300 relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white p-1">
                          <Plane className="h-4 w-4 text-gray-400 transform rotate-90" />
                        </div>
                      </div>
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="text-center md:text-right flex-1">
                    <div className="text-sm text-gray-500 mb-1">{currentLabels.dest}</div>
                    <div className="text-3xl font-bold text-gray-900">{result.to}</div>
                    <div className="text-sm font-medium text-gray-600">{result.toCity}</div>
                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {result.arrivalTime}
                      {result.arrivalTime.includes('+1') && <span className="ml-1 text-xs text-red-500 font-bold">+1</span>}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                  <Link 
                    href={`/es/flight-status?search=${encodeURIComponent(result.flightNumber)}&date=${encodeURIComponent(selectedDate)}`}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Clock className="h-5 w-5 mr-2 text-blue-500" />
                    {currentLabels.checkStatus}
                  </Link>

                  <Link 
                    href={`/es/flights/search?from=${encodeURIComponent(result.from)}&to=${encodeURIComponent(result.to)}&departureDate=${encodeURIComponent(selectedDate)}`}
                    className={`flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-lg text-black bg-ya-yellow-500 hover:bg-ya-yellow-400 transition-colors ${!operatesOnSelectedDate ? 'opacity-60' : ''}`}
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    {currentLabels.bookTicket}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
  )
}

export default function FlightLookupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-500"></div>
        </div>
      }
    >
      <FlightLookupContent />
    </Suspense>
  )
}
