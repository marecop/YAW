'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Plane, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Loader2,
  AlertCircle,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useCurrency } from '@/contexts/CurrencyContext'

interface Booking {
  id: string
  bookingNumber: string
  flightDate: string
  passengerName: string
  status: string
  totalPrice: number
  flight: {
    flightNumber: string
    fromCity: string
    toCity: string
    fromAirport: string
    toAirport: string
    departureTime: string
    arrivalTime: string
    duration: string
  }
}

export default function BookingsPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { formatPrice } = useCurrency()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/es/auth/login?redirect=/es/bookings')
      return
    }

    if (user) {
      fetchBookings()
    }
  }, [user, authLoading, router])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      if (!response.ok) {
        throw new Error('Error al obtener el historial de reservas')
      }
      const data = await response.json()
      // Sort by date descending
      const sortedBookings = data.sort((a: Booking, b: Booking) => 
        new Date(b.flightDate).getTime() - new Date(a.flightDate).getTime()
      )
      setBookings(sortedBookings)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800'
      case 'CHECKED_IN':
        return 'bg-blue-100 text-blue-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'Confirmado'
      case 'CHECKED_IN':
        return 'Check-in Realizado'
      case 'CANCELLED':
        return 'Cancelado'
      case 'COMPLETED':
        return 'Completado'
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    })
  }

  const formatTime = (timeString: string) => {
    if (!timeString) return ''
    if (timeString.includes('T')) {
      return new Date(timeString).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
    // If format is HH:mm
    return timeString.replace('+1', '')
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.flight.fromCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.flight.toCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.passengerName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'ALL' || booking.status === filterStatus

    return matchesSearch && matchesStatus
  })

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-ya-yellow-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando reservas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Reservas</h1>
            <p className="text-gray-600 mt-1">Gestione sus próximos viajes y vea el historial de vuelos</p>
          </div>
          <Link 
            href="/es/flights" 
            className="mt-4 md:mt-0 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-ya-yellow-500 hover:bg-ya-yellow-600 transition-colors"
          >
            <Plane className="w-5 h-5 mr-2" />
            Reservar Vuelo
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por número de reserva, destino o nombre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-ya-yellow-500 focus:border-ya-yellow-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {['ALL', 'CONFIRMED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    filterStatus === status
                      ? 'bg-ya-yellow-100 text-ya-yellow-800 border-ya-yellow-200 border'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent border'
                  }`}
                >
                  {status === 'ALL' ? 'Todos' : getStatusText(status)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plane className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No se encontraron reservas</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== 'ALL' 
                ? 'Intente ajustar sus filtros de búsqueda' 
                : 'Aún no ha realizado ninguna reserva con nosotros'}
            </p>
            {!searchTerm && filterStatus === 'ALL' && (
              <Link
                href="/es/flights"
                className="inline-flex items-center text-ya-yellow-600 font-medium hover:text-ya-yellow-700"
              >
                Comenzar su viaje <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Flight Route & Time */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {booking.bookingNumber}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{formatTime(booking.flight.departureTime)}</div>
                          <div className="text-sm font-medium text-gray-600">{booking.flight.fromCity}</div>
                          <div className="text-xs text-gray-400">{booking.flight.fromAirport}</div>
                        </div>

                        <div className="flex flex-col items-center flex-1 max-w-[120px]">
                          <div className="text-xs text-gray-500 mb-1">{booking.flight.duration}</div>
                          <div className="w-full h-px bg-gray-300 relative">
                            <Plane className="w-4 h-4 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90" />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Directo</div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{formatTime(booking.flight.arrivalTime)}</div>
                          <div className="text-sm font-medium text-gray-600">{booking.flight.toCity}</div>
                          <div className="text-xs text-gray-400">{booking.flight.toAirport}</div>
                        </div>
                      </div>
                    </div>

                    {/* Divider for mobile */}
                    <div className="h-px bg-gray-100 lg:hidden"></div>

                    {/* Flight Details & Price */}
                    <div className="flex flex-col sm:flex-row lg:flex-col justify-between gap-4 lg:w-64 lg:border-l lg:border-gray-100 lg:pl-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(booking.flightDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Plane className="w-4 h-4" />
                          <span>{booking.flight.flightNumber}</span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="text-sm text-gray-500">Precio Total</div>
                        <div className="text-xl font-bold text-ya-yellow-600">
                          {formatPrice(booking.totalPrice, 'HKD')}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row lg:flex-col gap-3 justify-end lg:justify-center lg:w-40">
                      <Link
                        href={`/es/bookings/${booking.id}`}
                        className="flex-1 lg:flex-none inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ya-yellow-500"
                      >
                        Ver Detalles
                      </Link>
                      
                      {booking.status === 'CONFIRMED' && (
                        <Link
                          href={`/es/check-in?bookingNumber=${booking.bookingNumber}`}
                          className="flex-1 lg:flex-none inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-ya-yellow-500 hover:bg-ya-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ya-yellow-500"
                        >
                          Check-in
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
