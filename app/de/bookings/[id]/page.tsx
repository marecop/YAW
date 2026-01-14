'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Plane, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CreditCard,
  MapPin,
  Download,
  CheckCircle
} from 'lucide-react'
import { useCurrency } from '@/contexts/CurrencyContext'

interface Booking {
  id: string
  bookingNumber: string
  flightDate: string  // 新增：具體飛行日期
  passengerName: string
  passengerEmail: string
  passengerPhone: string
  passportNumber: string
  cabinClass: string
  seatNumber: string | null
  status: string
  totalPrice: number
  checkedIn: boolean
  createdAt: string
  flight: {
    id: string
    flightNumber: string
    fromCity: string
    toCity: string
    fromAirport: string
    toAirport: string
    departureTime: string  // 只有時間，如 "23:45"
    arrivalTime: string    // 只有時間，如 "06:30+1"
    duration: string
  }
  user: {
    name: string
    email: string
    membershipLevel: string
  }
}

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { formatPrice } = useCurrency()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (params.id) {
      fetchBookingDetails()
    }
  }, [params.id])

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`/api/bookings/${params.id}`)
      if (!response.ok) {
        throw new Error('Vorbestellung nicht gefunden')
      }
      const data = await response.json()
      setBooking(data)
    } catch (err: any) {
      setError(err.message || 'Laden der Vorbestellungsinformationen fehlgeschlagen')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }

  // 格式化時間字符串（移除 +1 標記）
  const formatTime = (timeString: string) => {
    if (!timeString) return ''
    if (timeString.includes('T')) {
      // 如果是完整的 DateTime，則提取時間
      return new Date(timeString).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    }
    // 如果只是時間字符串，直接返回（移除 +1 標記）
    return timeString.replace('+1', '')
  }

  // 計算到達日期（如果有 +1 標記）
  const getArrivalDate = (flightDate: string, arrivalTime: string) => {
    if (!flightDate) return ''
    if (arrivalTime.includes('+1')) {
      const date = new Date(flightDate)
      date.setDate(date.getDate() + 1)
      return formatDate(date.toISOString())
    }
    return formatDate(flightDate)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'CHECKED_IN':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'Bestätigt'
      case 'CHECKED_IN':
        return 'Wertung'
      case 'CANCELLED':
        return 'Abgebrochen'
      case 'COMPLETED':
        return 'Abgeschlossen'
      default:
        return status
    }
  }

  const getCabinClassName = (cabinClass: string) => {
    switch (cabinClass) {
      case 'ECONOMY':
        return 'Economy Class'
      case 'PREMIUM_ECONOMY':
        return 'Premium Economy Class'
      case 'BUSINESS':
        return 'Business Class'
      case 'FIRST_CLASS':
        return 'First Class'
      default:
        return cabinClass
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-ya-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plane className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vorbestellung nicht gefunden</h2>
          <p className="text-gray-600 mb-6">{error || 'Die Vorbestellung existiert nicht oder wurde gelöscht'}</p>
          <Link
            href="/de/bookings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zu Meine Vorbestellungen</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 返回按钮 */}
        <Link
          href="/de/bookings"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Zurück zu Meine Vorbestellungen</span>
        </Link>

        {/* 预订标题 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Vorbestellungsinformationen</h1>
              <p className="text-gray-600">Vorbestellungsnummer：{booking.bookingNumber}</p>
            </div>
            <div className={`px-4 py-2 rounded-lg border-2 ${getStatusColor(booking.status)}`}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">{getStatusText(booking.status)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 航班信息 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Plane className="w-6 h-6 text-ya-yellow-600" />
            Fluginformationen
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">Flugnummer</div>
              <div className="text-2xl font-bold text-gray-900">{booking.flight.flightNumber}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Cabin</div>
              <div className="text-xl font-bold text-gray-900">{getCabinClassName(booking.cabinClass)}</div>
              {booking.seatNumber && (
                <div className="text-sm text-gray-600">Sitz：{booking.seatNumber}</div>
              )}
            </div>
          </div>

          {/* 行程 */}
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-ya-yellow-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{booking.flight.fromCity}</div>
                    <div className="text-sm text-gray-600">{booking.flight.fromAirport}</div>
                  </div>
                </div>
                <div className="ml-8">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(booking.flightDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xl font-bold text-gray-900 mt-1">
                    <Clock className="w-5 h-5" />
                    <span>{formatTime(booking.flight.departureTime)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center px-4">
                <div className="text-sm text-gray-600 mb-2">Flugzeit</div>
                <div className="text-lg font-bold text-gray-900">{booking.flight.duration}</div>
                <div className="w-32 h-0.5 bg-gray-300 my-2"></div>
              </div>

              <div className="flex-1 text-right">
                <div className="flex items-center gap-3 mb-2 justify-end">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{booking.flight.toCity}</div>
                    <div className="text-sm text-gray-600">{booking.flight.toAirport}</div>
                  </div>
                  <MapPin className="w-5 h-5 text-ya-yellow-600" />
                </div>
                <div className="mr-8">
                  <div className="flex items-center gap-2 text-gray-700 justify-end">
                    <span>{getArrivalDate(booking.flightDate, booking.flight.arrivalTime)}</span>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2 text-xl font-bold text-gray-900 mt-1 justify-end">
                    <span>{formatTime(booking.flight.arrivalTime)}</span>
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 乘客信息 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-6 h-6 text-ya-yellow-600" />
            Passagierinformationen
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <div className="text-sm text-gray-600">Name</div>
                <div className="font-medium text-gray-900">{booking.passengerName}</div>
              </div>
            </div>
            
            {booking.passengerEmail && (
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <div className="text-sm text-gray-600">E-Mail</div>
                  <div className="font-medium text-gray-900">{booking.passengerEmail}</div>
                </div>
              </div>
            )}
            
            {booking.passengerPhone && (
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <div className="text-sm text-gray-600">Telefon</div>
                  <div className="font-medium text-gray-900">{booking.passengerPhone}</div>
                </div>
              </div>
            )}
            
            {booking.passportNumber && (
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <div className="text-sm text-gray-600">Passportnummer</div>
                  <div className="font-medium text-gray-900">{booking.passportNumber}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 价格信息 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Preisdetails</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>{getCabinClassName(booking.cabinClass)} × 1</span>
              <span>{formatPrice(booking.totalPrice, 'HKD')}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Gesamtbetrag</span>
                <span className="text-2xl font-bold text-ya-yellow-600">{formatPrice(booking.totalPrice, 'HKD')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col gap-4">
          {booking.status === 'CONFIRMED' && !booking.checkedIn && (() => {
            // 检查值机时间窗口
            const flightDateStr = booking.flightDate || new Date().toISOString().split('T')[0]
            const departureTimeStr = booking.flight.departureTime
            const departureDateTime = new Date(`${flightDateStr}T${departureTimeStr}:00`)
            const now = new Date()
            const hoursUntilDeparture = (departureDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

            if (hoursUntilDeparture > 48) {
              const hoursUntilOpen = hoursUntilDeparture - 48
              const daysUntilOpen = Math.floor(hoursUntilOpen / 24)
              const remainingHours = Math.floor(hoursUntilOpen % 24)
              
              return (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-800 font-medium">
                    Online Check-In wird 48 Stunden vor dem Abflug geöffnet
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Noch {daysUntilOpen > 0 ? `${daysUntilOpen} Tage ` : ''}{remainingHours} Stunden offen
                  </p>
                </div>
              )
            } else if (hoursUntilDeparture < 1.5) {
              return (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                  <p className="text-sm text-red-800 font-medium">
                    Online Check-In ist geschlossen
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Bitte gehen Sie zur Check-In-Büro am Flughafen
                  </p>
                </div>
              )
            } else {
              return (
                <Link
                  href={`/de/check-in?bookingNumber=${booking.bookingNumber}&email=${booking.passengerEmail}`}
                  className="px-6 py-4 bg-ya-yellow-500 text-black font-bold rounded-lg hover:bg-ya-yellow-600 transition-colors text-center"
                >
                  Online Check-In
                </Link>
              )
            }
          })()}
          
          {booking.checkedIn && (
            <Link
              href={`/de/boarding-pass/${booking.id}`}
              target="_blank"
              className="px-6 py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors text-center flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>Ansicht der Boarding Pass</span>
            </Link>
          )}
        </div>

        {/* 预订时间 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Vorbestellungszeit：{formatDate(booking.createdAt)} {formatTime(booking.createdAt)}
        </div>
      </div>
    </div>
  )
}

