'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plane, Calendar, MapPin, Clock } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { format } from 'date-fns'
import Link from 'next/link'

interface Booking {
  id: string
  bookingNumber: string
  passengerName: string
  passengerEmail: string
  cabinClass: string
  seatNumber: string | null
  status: string
  totalPrice: number
  checkedIn: boolean
  flightDate: string  // Flight date
  flight: {
    flightNumber: string
    from: string
    fromCity: string
    to: string
    toCity: string
    departureTime: string
    arrivalTime: string
  }
}

export default function BookingsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/es/auth/login?redirect=/member/bookings')
      return
    }
    
    if (!user) return

    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/bookings?userEmail=${encodeURIComponent(user.email)}`)

        if (response.ok) {
          const data = await response.json()
          setBookings(data.bookings || [])
        } else {
          setError('Error al obtener las reservas')
        }
      } catch (err) {
        setError('Error de red')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [authLoading, isAuthenticated, user, router])

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
        return 'Confirmada'
      case 'CHECKED_IN':
        return 'Check-in Realizado'
      case 'CANCELLED':
        return 'Cancelada'
      case 'COMPLETED':
        return 'Completada'
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Plane className="w-16 h-16 text-ya-yellow-600 animate-bounce mx-auto mb-4" />
          <p className="text-xl text-gray-900 font-semibold">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Mis Reservas
            </h1>
            <p className="text-gray-600">Ver y gestionar todas sus reservas</p>
          </div>
          <Link
            href="/es/"
            className="px-6 py-3 bg-ya-yellow-500 text-black font-semibold rounded-lg hover:bg-ya-yellow-600 transition-colors"
          >
            Reservar Nuevo Vuelo
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plane className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No hay reservas</h2>
            <p className="text-gray-600 mb-6">
              Aún no tiene ningún registro de reserva. ¡Comience a planificar su viaje!
            </p>
            <Link
              href="/es/"
              className="inline-block px-6 py-3 bg-ya-yellow-500 text-black font-semibold rounded-lg hover:bg-ya-yellow-600 transition-colors"
            >
              Buscar Vuelos
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Side - Flight Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-semibold text-ya-yellow-800 bg-ya-yellow-100 px-3 py-1 rounded-full">
                        {booking.flight.flightNumber}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                      {booking.checkedIn && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                          Check-in Realizado
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Salida</p>
                        <p className="text-xl font-bold text-gray-900">
                          {format(new Date(booking.flight.departureTime), 'HH:mm')}
                        </p>
                        <p className="text-sm text-gray-900">{booking.flight.fromCity}</p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(booking.flight.departureTime), 'yyyy-MM-dd')}
                        </p>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <Plane className="w-8 h-8 text-ya-yellow-600 mx-auto rotate-90 mb-1" />
                          <p className="text-xs text-gray-500">Directo</p>
                        </div>
                      </div>

                      <div className="text-right md:text-left">
                        <p className="text-sm text-gray-500 mb-1">Llegada</p>
                        <p className="text-xl font-bold text-gray-900">
                          {format(new Date(booking.flight.arrivalTime), 'HH:mm')}
                        </p>
                        <p className="text-sm text-gray-900">{booking.flight.toCity}</p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(booking.flight.arrivalTime), 'yyyy-MM-dd')}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <span>Ref. Reserva:</span>
                        <span className="font-mono font-semibold text-gray-900">{booking.bookingNumber}</span>
                      </div>
                      <div>Pasajero: {booking.passengerName}</div>
                      <div>Clase: {booking.cabinClass}</div>
                      {booking.seatNumber && <div>Asiento: {booking.seatNumber}</div>}
                    </div>
                  </div>

                  {/* Right Side - Actions */}
                  <div className="flex flex-col items-end gap-3 lg:border-l lg:pl-6">
                    <div className="text-right mb-2">
                      <p className="text-sm text-gray-500">Precio Total</p>
                      <p className="text-2xl font-bold text-ya-yellow-600">
                        HKD {booking.totalPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 w-full lg:w-auto">
                      {booking.status === 'CONFIRMED' && !booking.checkedIn && (() => {
                        // Check check-in window
                        const flightDateStr = booking.flightDate || new Date().toISOString().split('T')[0]
                        const departureTimeStr = booking.flight.departureTime
                        const departureDateTime = new Date(`${flightDateStr}T${departureTimeStr}:00`)
                        const now = new Date()
                        const hoursUntilDeparture = (departureDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

                        if (hoursUntilDeparture > 48) {
                          const hoursUntilOpen = hoursUntilDeparture - 48
                          const daysUntilOpen = Math.floor(hoursUntilOpen / 24)
                          
                          return (
                            <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-center">
                              <p className="text-xs text-blue-800">
                                Check-in abre en {daysUntilOpen > 0 ? `${daysUntilOpen} día(s)` : 'breve'}
                              </p>
                            </div>
                          )
                        } else if (hoursUntilDeparture < 1.5) {
                          return (
                            <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-center">
                              <p className="text-xs text-red-800">
                                Por favor diríjase al mostrador del aeropuerto
                              </p>
                            </div>
                          )
                        } else {
                          return (
                            <Link
                              href={`/es/check-in?bookingNumber=${booking.bookingNumber}&email=${booking.passengerEmail}`}
                              className="px-6 py-2 bg-ya-yellow-500 text-black font-semibold rounded-lg hover:bg-ya-yellow-600 transition-colors text-center"
                            >
                              Check-in
                            </Link>
                          )
                        }
                      })()}
                      <Link
                        href={`/es/bookings/${booking.id}`}
                        className="px-6 py-2 bg-white border-2 border-ya-yellow-500 text-black font-semibold rounded-lg hover:bg-ya-yellow-50 transition-colors text-center"
                      >
                        Ver Detalles
                      </Link>
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
