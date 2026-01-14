'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { QrCode, Plane, Calendar, Clock, User, MapPin } from 'lucide-react'

interface BoardingPassData {
  bookingNumber: string
  passengerName: string
  flightDate: string
  flight: {
    flightNumber: string
    from: string
    to: string
    fromCity: string
    toCity: string
    departureTime: string
    arrivalTime: string
  }
  seatNumber: string
  cabinClass: string
  user?: {
    membershipLevel: string
  }
}

export default function BoardingPassPage() {
  const params = useParams()
  const [booking, setBooking] = useState<BoardingPassData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (params.id) {
      fetchBooking()
    }
  }, [params.id])

  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/${params.id}`)
      if (!response.ok) {
        throw new Error('No se encontró la reserva')
      }
      const data = await response.json()
      setBooking(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
    const day = String(date.getDate()).padStart(2, '0')
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  }

  const formatTime = (timeString: string) => {
    return timeString.replace('+1', '')
  }

  const combineDateTime = (dateString: string, timeString: string) => {
    const cleanTime = timeString.replace('+1', '')
    return new Date(`${dateString.split('T')[0]}T${cleanTime}:00`)
  }

  const getCabinClass = (cabinClass: string) => {
    switch (cabinClass) {
      case 'ECONOMY':
        return 'ECONOMY'
      case 'PREMIUM_ECONOMY':
        return 'PREMIUM ECONOMY'
      case 'BUSINESS':
        return 'BUSINESS'
      case 'FIRST_CLASS':
        return 'FIRST CLASS'
      default:
        return cabinClass
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-ya-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Reserva no encontrada'}</p>
        </div>
      </div>
    )
  }

  // Calculate times
  const departureDate = combineDateTime(booking.flightDate, booking.flight.departureTime)
  const boardingDate = new Date(departureDate.getTime() - 30 * 60 * 1000) // 30 mins before
  const gate = `${String.fromCharCode(65 + Math.floor(Math.random() * 10))}${Math.floor(Math.random() * 50) + 1}`
  const boardingGroup = Math.floor(Math.random() * 5) + 1
  
  const formatBoardingTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
          .boarding-pass-container {
            width: 100%;
            max-width: none;
            box-shadow: none !important;
            margin: 0 !important;
            page-break-after: avoid;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 py-8 px-4">
        {/* Print Button */}
        <div className="max-w-4xl mx-auto mb-6 no-print">
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-ya-yellow-500 text-black font-bold rounded-lg hover:bg-ya-yellow-600 transition-colors"
          >
            🖨️ Imprimir Tarjeta de Embarque
          </button>
        </div>

        {/* Boarding Pass */}
        <div className="max-w-4xl mx-auto boarding-pass-container">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-ya-yellow-500 text-black py-6 px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plane className="w-8 h-8" />
                  <h1 className="text-3xl font-bold">YELLOW AIRLINES</h1>
                </div>
              </div>
              <p className="text-lg mt-2">TARJETA DE EMBARQUE / BOARDING PASS</p>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Passenger Name */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">NOMBRE DEL PASAJERO / PASSENGER NAME</div>
                <div className="text-2xl font-bold">{booking.passengerName.toUpperCase()}</div>
              </div>

              {/* Flight Info */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                {/* From */}
                <div>
                  <div className="text-sm text-gray-600 mb-2">DE / FROM</div>
                  <div className="text-4xl font-bold text-ya-yellow-600">{booking.flight.from}</div>
                  <div className="text-lg mt-1">{booking.flight.fromCity}</div>
                </div>

                {/* Flight No */}
                <div className="flex flex-col items-center justify-center">
                  <div className="text-3xl text-gray-400 mb-2">→</div>
                  <div className="text-sm text-gray-600">VUELO / FLIGHT</div>
                  <div className="text-xl font-bold">{booking.flight.flightNumber}</div>
                </div>

                {/* To */}
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-2">A / TO</div>
                  <div className="text-4xl font-bold text-ya-yellow-600">{booking.flight.to}</div>
                  <div className="text-lg mt-1">{booking.flight.toCity}</div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-5 gap-4 py-6 border-t border-b border-gray-200">
                <div>
                  <div className="text-xs text-gray-600 mb-1">FECHA / DATE</div>
                  <div className="font-bold">{formatDate(booking.flightDate)}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">EMBARQUE / BOARDING</div>
                  <div className="font-bold">{formatBoardingTime(boardingDate)}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">SALIDA / DEPARTURE</div>
                  <div className="font-bold">{formatTime(booking.flight.departureTime)}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">ASIENTO / SEAT</div>
                  <div className="text-2xl font-bold text-ya-yellow-600">{booking.seatNumber || 'N/A'}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">CLASE / CLASS</div>
                  <div className="font-bold">{getCabinClass(booking.cabinClass)}</div>
                </div>
              </div>

              {/* Footer Info */}
              <div className="grid grid-cols-3 gap-6 mt-6">
                <div>
                  <div className="text-xs text-gray-600 mb-1">REF. RESERVA / BOOKING REF</div>
                  <div className="text-lg font-bold">{booking.bookingNumber}</div>
                </div>

                {booking.user?.membershipLevel && (
                  <div>
                    <div className="text-xs text-gray-600 mb-1">MIEMBRO / MEMBER</div>
                    <div className="text-lg font-bold text-ya-yellow-600">{booking.user.membershipLevel}</div>
                  </div>
                )}

                <div className="text-right">
                  <div className="text-xs text-gray-600 mb-1">PUERTA / GATE</div>
                  <div className="text-lg font-bold">{gate}</div>
                  <div className="text-xs text-gray-600 mt-1">GRUPO / GROUP {boardingGroup}</div>
                </div>
              </div>

              {/* Barcode */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600 mb-4">
                  POR FAVOR PRESENTE ESTA TARJETA DE EMBARQUE / PLEASE PRESENT THIS BOARDING PASS
                </div>

                {/* Simulated Barcode */}
                <div className="flex justify-center gap-1 mb-2">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-black"
                      style={{
                        width: '3px',
                        height: i % 3 === 0 ? '60px' : '40px',
                      }}
                    />
                  ))}
                </div>

                <div className="text-center font-mono text-sm">{booking.bookingNumber}</div>

                {/* Warning */}
                <div className="text-center text-xs text-red-600 mt-6">
                  ⚠ Por favor llegue al aeropuerto 90 minutos antes de la salida | Please arrive 90 minutes before departure
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-100 py-4 px-8 text-center text-sm text-gray-600">
              Yellow Airlines - Your Journey, Our Passion
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
