'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Calendar, Plane, ChevronRight, Download, Clock, History } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function BookingsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searched, setSearched] = useState(false)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming')

  // 检查认证状态
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/bookings')
    }
  }, [isAuthenticated, authLoading, router])

  // 自动加载当前用户的预订
  useEffect(() => {
    if (isAuthenticated && user) {
      loadAllBookings()
    }
  }, [isAuthenticated, user])

  const loadAllBookings = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      // 只获取当前用户的预订
      const response = await fetch(`/api/bookings?userEmail=${encodeURIComponent(user.email)}`)
      const data = await response.json()
      setBookings(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      loadAllBookings()
      return
    }

    setLoading(true)
    setSearched(true)

    try {
      const response = await fetch(`/api/bookings?bookingNumber=${searchQuery}`)
      const data = await response.json()
      setBookings(Array.isArray(data) ? data : [data])
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-HK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // 格式化時間字符串（移除 +1 標記）
  const formatTime = (timeString: string) => {
    return timeString.replace('+1', '')
  }

  // 組合日期和時間顯示
  const formatDateTime = (flightDate: string, time: string) => {
    return `${formatDate(flightDate)} ${formatTime(time)}`
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

  // 判斷是否為即將到來的行程
  const isUpcoming = (booking: any) => {
    if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED') return false
    
    try {
      const dateStr = booking.flightDate.toString().split('T')[0]
      const timeStr = booking.flight.departureTime.replace('+1', '')
      const flightDateTime = new Date(`${dateStr}T${timeStr}:00`)
      const now = new Date()
      return flightDateTime > now
    } catch (e) {
      return true // 如果解析失敗，默認顯示在即將到來
    }
  }

  const filteredBookings = useMemo(() => {
    const upcoming = bookings.filter(isUpcoming).sort((a, b) => new Date(a.flightDate).getTime() - new Date(b.flightDate).getTime())
    const history = bookings.filter(b => !isUpcoming(b)).sort((a, b) => new Date(b.flightDate).getTime() - new Date(a.flightDate).getTime())
    return { upcoming, history }
  }, [bookings])

  const currentList = activeTab === 'upcoming' ? filteredBookings.upcoming : filteredBookings.history

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">我的預訂</h1>
          <p className="text-gray-600">查看和管理您的航班預訂</p>
        </div>

        {/* 搜索表单 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                預訂編號或電子郵件
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="輸入預訂編號（例如：YAAB123456）"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-ya-yellow-500 text-black font-bold rounded-lg hover:bg-ya-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? '搜索中...' : '搜索'}
              </button>
            </div>
          </form>
        </div>

        {/* 標籤頁切換 */}
        {!loading && bookings.length > 0 && !searched && (
          <div className="flex space-x-6 mb-6 border-b border-gray-200">
            <button
              className={`pb-3 px-2 font-bold text-lg transition-all relative flex items-center gap-2 ${
                activeTab === 'upcoming' ? 'text-ya-yellow-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              <Clock className="w-5 h-5" />
              即將到來的旅程
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs ml-1">
                {filteredBookings.upcoming.length}
              </span>
              {activeTab === 'upcoming' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-ya-yellow-500 rounded-t-full" />
              )}
            </button>
            <button
              className={`pb-3 px-2 font-bold text-lg transition-all relative flex items-center gap-2 ${
                activeTab === 'history' ? 'text-ya-yellow-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('history')}
            >
              <History className="w-5 h-5" />
              旅程歷史
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs ml-1">
                {filteredBookings.history.length}
              </span>
              {activeTab === 'history' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-ya-yellow-500 rounded-t-full" />
              )}
            </button>
          </div>
        )}

        {/* 搜索结果 / 所有预订 */}
        <div>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">載入中...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {searched ? '未找到預訂' : '暫無預訂記錄'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searched 
                  ? '請檢查您的預訂編號是否正確' 
                  : '您還沒有任何航班預訂'}
              </p>
              {searched ? (
                <button
                  onClick={() => {
                    setSearched(false)
                    setSearchQuery('')
                    loadAllBookings()
                  }}
                  className="px-6 py-2 text-ya-yellow-600 hover:bg-ya-yellow-50 rounded-lg transition-colors"
                >
                  查看所有預訂
                </button>
              ) : (
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors"
                >
                  <span>立即預訂</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* 如果是搜索狀態，顯示所有結果；否則顯示當前標籤頁結果 */}
              {(searched ? bookings : currentList).length === 0 ? (
                <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-gray-200">
                  <div className="text-gray-500 text-lg">
                    {activeTab === 'upcoming' ? '暫無即將到來的旅程' : '暫無歷史旅程記錄'}
                  </div>
                </div>
              ) : (
                (searched ? bookings : currentList).map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">預訂編號</div>
                        <div className="text-xl font-bold text-gray-900">{booking.bookingNumber}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      {/* 航班信息 */}
                      <div className="flex items-start gap-3">
                        <Plane className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <div className="text-sm text-gray-600 mb-1">航班</div>
                          <div className="font-medium text-gray-900">
                            {booking.flight.flightNumber}
                          </div>
                          <div className="text-sm text-gray-600">
                            {booking.flight.fromCity} → {booking.flight.toCity}
                          </div>
                        </div>
                      </div>

                      {/* 日期时间 */}
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <div className="text-sm text-gray-600 mb-1">出發時間</div>
                          <div className="font-medium text-gray-900">
                            {formatDate(booking.flightDate)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {formatTime(booking.flight.departureTime)}
                          </div>
                        </div>
                      </div>

                      {/* 乘客信息 */}
                      <div>
                        <div className="text-sm text-gray-600 mb-1">乘客</div>
                        <div className="font-medium text-gray-900">
                          {booking.passengerName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {booking.cabinClass === 'ECONOMY' && '經濟艙'}
                          {booking.cabinClass === 'PREMIUM_ECONOMY' && '高級經濟艙'}
                          {booking.cabinClass === 'BUSINESS' && '商務艙'}
                          {booking.cabinClass === 'FIRST_CLASS' && '頭等艙'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">總價</div>
                        <div className="text-xl font-bold text-gray-900">
                          HKD {booking.totalPrice.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        {booking.status === 'CONFIRMED' && activeTab === 'upcoming' && (
                          <Link 
                            href={`/check-in?bookingNumber=${booking.bookingNumber}&email=${booking.passengerEmail}`}
                            className="px-4 py-2 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors"
                          >
                            辦理值機
                          </Link>
                        )}
                        {booking.checkedIn && (
                          <Link
                            href={`/boarding-pass/${booking.id}`}
                            target="_blank"
                            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>查看登機牌</span>
                          </Link>
                        )}
                        <Link
                          href={`/bookings/${booking.id}`}
                          className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                          <span>查看詳情</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

