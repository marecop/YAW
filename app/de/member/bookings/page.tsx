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
  flightDate: string  // 航班日期
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
      router.push('/de/auth/login?redirect=/member/bookings')
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
          setError('获取预订失败')
        }
      } catch (err) {
        setError('网络错误')
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
        return '已確認'
      case 'CHECKED_IN':
        return '已值機'
      case 'CANCELLED':
        return '已取消'
      case 'COMPLETED':
        return '已完成'
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-gray">
        <div className="text-center">
          <Plane className="w-16 h-16 text-primary animate-bounce mx-auto mb-4" />
          <p className="text-xl text-navy font-semibold">載入中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-gray py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">
              我的預訂
            </h1>
            <p className="text-text-secondary">查看和管理您的所有预订</p>
          </div>
          <Link
            href="/de/"
            className="px-6 py-3 bg-primary text-navy font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            预订新航班
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="card-modern p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plane className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-navy mb-2">暂无预订</h2>
            <p className="text-text-secondary mb-6">
              您还没有任何预订记录。开始计划您的旅程吧！
            </p>
            <Link
              href="/de/"
              className="inline-block px-6 py-3 bg-primary text-navy font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              搜索航班
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="card-modern p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Side - Flight Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {booking.flight.flightNumber}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                      {booking.checkedIn && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                          已值机
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-text-secondary mb-1">出发</p>
                        <p className="text-xl font-bold text-navy">
                          {format(new Date(booking.flight.departureTime), 'HH:mm')}
                        </p>
                        <p className="text-sm text-navy">{booking.flight.fromCity}</p>
                        <p className="text-xs text-text-secondary">
                          {format(new Date(booking.flight.departureTime), 'yyyy-MM-dd')}
                        </p>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <Plane className="w-8 h-8 text-primary mx-auto rotate-90 mb-1" />
                          <p className="text-xs text-text-secondary">直飞</p>
                        </div>
                      </div>

                      <div className="text-right md:text-left">
                        <p className="text-sm text-text-secondary mb-1">抵达</p>
                        <p className="text-xl font-bold text-navy">
                          {format(new Date(booking.flight.arrivalTime), 'HH:mm')}
                        </p>
                        <p className="text-sm text-navy">{booking.flight.toCity}</p>
                        <p className="text-xs text-text-secondary">
                          {format(new Date(booking.flight.arrivalTime), 'yyyy-MM-dd')}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                      <div className="flex items-center gap-1">
                        <span>预订号：</span>
                        <span className="font-mono font-semibold text-navy">{booking.bookingNumber}</span>
                      </div>
                      <div>乘客：{booking.passengerName}</div>
                      <div>舱位：{booking.cabinClass}</div>
                      {booking.seatNumber && <div>座位：{booking.seatNumber}</div>}
                    </div>
                  </div>

                  {/* Right Side - Actions */}
                  <div className="flex flex-col items-end gap-3 lg:border-l lg:pl-6">
                    <div className="text-right mb-2">
                      <p className="text-sm text-text-secondary">总价</p>
                      <p className="text-2xl font-bold text-primary">
                        ¥{booking.totalPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 w-full lg:w-auto">
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
                          
                          return (
                            <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-center">
                              <p className="text-xs text-blue-800">
                                {daysUntilOpen > 0 ? `${daysUntilOpen}天後` : '即將'}開放值機
                              </p>
                            </div>
                          )
                        } else if (hoursUntilDeparture < 1.5) {
                          return (
                            <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-center">
                              <p className="text-xs text-red-800">
                                請前往機場櫃台
                              </p>
                            </div>
                          )
                        } else {
                          return (
                            <Link
                              href={`/de/check-in?bookingNumber=${booking.bookingNumber}&email=${booking.passengerEmail}`}
                              className="px-6 py-2 bg-primary text-navy font-semibold rounded-lg hover:bg-primary-dark transition-colors text-center"
                            >
                              办理值机
                            </Link>
                          )
                        }
                      })()}
                      <Link
                        href={`/de/member/bookings/${booking.id}`}
                        className="px-6 py-2 bg-white border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy hover:text-white transition-colors text-center"
                      >
                        查看详情
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

