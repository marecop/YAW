'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Printer, Download, Home, ArrowRight } from 'lucide-react'

function CheckInSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [booking, setBooking] = useState<any>(null)
  
  const bookingNumber = searchParams.get('bookingNumber')
  
  useEffect(() => {
    // In a real app, fetch booking details to confirm status
    if (bookingNumber) {
      setBooking({
        bookingNumber,
        flightNumber: 'YA888',
        passengerName: 'JOHN DOE',
        seat: '12A',
        gate: '24',
        boardingTime: '10:30'
      })
    }
  }, [bookingNumber])

  if (!booking) return null

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-green-500 p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">¡Check-in Exitoso!</h1>
            <p className="text-green-100 text-lg">Su asiento ha sido confirmado</p>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Vuelo</p>
                    <p className="text-xl font-bold text-gray-900">{booking.flightNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Asiento</p>
                    <p className="text-xl font-bold text-ya-yellow-600">{booking.seat}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Puerta</p>
                    <p className="text-xl font-bold text-gray-900">{booking.gate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Embarque</p>
                    <p className="text-xl font-bold text-gray-900">{booking.boardingTime}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link 
                  href={`/es/boarding-pass/${booking.bookingNumber}`}
                  className="block w-full py-4 px-6 bg-ya-yellow-500 hover:bg-ya-yellow-400 text-black font-bold rounded-xl text-center transition-colors shadow-sm"
                >
                  Ver Tarjeta de Embarque
                </Link>
                
                <Link 
                  href="/es/"
                  className="block w-full py-4 px-6 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 font-bold rounded-xl text-center transition-colors"
                >
                  Volver al Inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-8">
          Hemos enviado la tarjeta de embarque a su correo electrónico.
        </p>
      </div>
    </div>
  )
}

export default function CheckInSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600"></div>
      </div>
    }>
      <CheckInSuccessContent />
    </Suspense>
  )
}
