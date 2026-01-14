'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Download, Printer, Plane, Calendar, Users } from 'lucide-react'
import { format } from 'date-fns'

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('bookingId')
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (bookingId) {
      fetchBooking()
    }
  }, [bookingId])

  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`)
      if (response.ok) {
        const data = await response.json()
        setBooking(data)
      }
    } catch (error) {
      console.error('Error fetching booking:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Vorbestellung nicht gefunden</p>
          <Link href="/de/" className="mt-4 inline-block text-ya-yellow-600 hover:text-ya-yellow-700">
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 成功图标 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vorbestellung erfolgreich！</h1>
          <p className="text-lg text-gray-600">
            Ihre Vorbestellung wurde bestätigt, die Bestätigungsemail wurde an Ihre E-Mail-Adresse gesendet
          </p>
        </div>

        {/* Vorbestellungsinformationen-Karte */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          {/* Vorbestellungsnummer */}
          <div className="bg-ya-yellow-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black/70">Vorbestellungsnummer</p>
                <p className="text-2xl font-bold text-black">{booking.bookingNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-black/70">Status</p>
                <span className="inline-block px-3 py-1 bg-black text-ya-yellow-500 rounded-full text-sm font-medium">
                  Bestätigt
                </span>
              </div>
            </div>
          </div>

          {/* 航班信息 */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Plane className="w-5 h-5 text-ya-yellow-600" />
              Fluginformationen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Flugnummer</p>
                <p className="font-medium">{booking.flight.flightNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Flugroute</p>
                <p className="font-medium">{booking.flight.fromCity} ({booking.flight.from}) → {booking.flight.toCity} ({booking.flight.to})</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Abflugzeit</p>
                <p className="font-medium">{format(new Date(booking.flight.departureTime), 'yyyy-MM-dd HH:mm')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ankunftzeit</p>
                <p className="font-medium">{format(new Date(booking.flight.arrivalTime), 'yyyy-MM-dd HH:mm')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cabin</p>
                <p className="font-medium">
                  {booking.cabinClass === 'ECONOMY' && 'Economy Class'}
                  {booking.cabinClass === 'BUSINESS' && 'Business Class'}
                  {booking.cabinClass === 'FIRST_CLASS' && 'First Class'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Flugzeugtyp</p>
                <p className="font-medium">{booking.flight.aircraft}</p>
              </div>
            </div>

            {/* 乘客信息 */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-ya-yellow-600" />
              Passagierinformationen
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="font-medium text-gray-900">{booking.passengerName}</p>
              <p className="text-sm text-gray-600">Passport: {booking.passportNumber || 'Nicht bereitgestellt'}</p>
            </div>

            {/* 价格信息 */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Gesamtbetrag</span>
                <span className="text-2xl font-bold text-ya-yellow-700">
                  HKD {booking.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            href="/de/bookings"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Meine Vorbestellungen
          </Link>
          <Link
            href="/de/check-in"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors"
          >
            <Plane className="w-5 h-5" />
            Online Check-In
          </Link>
          <Link
            href="/de/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Zurück zur Startseite
          </Link>
        </div>

        {/* 温馨提示 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Hinweise</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Bitte erstellen Sie Ihre Online Check-In 24 Stunden vor dem Abflug</li>
            <li>• Bitte kommen Sie mindestens 90 Minuten vor dem Abflug zum Flughafen</li>
            <li>• Bitte stellen Sie sicher, dass Ihr Pass im Gültigkeitszeitraum ist</li>
            <li>• Sie können Ihre Details in "Meine Vorbestellungen" einsehen</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  )
}
