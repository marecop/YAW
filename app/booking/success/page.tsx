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
          <p className="mt-4 text-gray-600">載入中...</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">找不到預訂信息</p>
          <Link href="/" className="mt-4 inline-block text-ya-yellow-600 hover:text-ya-yellow-700">
            返回首頁
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">預訂成功！</h1>
          <p className="text-lg text-gray-600">
            您的預訂已確認，確認郵件已發送至您的郵箱
          </p>
        </div>

        {/* 预订信息卡片 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          {/* 预订号 */}
          <div className="bg-ya-yellow-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black/70">預訂編號</p>
                <p className="text-2xl font-bold text-black">{booking.bookingNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-black/70">狀態</p>
                <span className="inline-block px-3 py-1 bg-black text-ya-yellow-500 rounded-full text-sm font-medium">
                  已確認
                </span>
              </div>
            </div>
          </div>

          {/* 航班信息 */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Plane className="w-5 h-5 text-ya-yellow-600" />
              航班信息
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">航班號</p>
                <p className="font-medium">{booking.flight.flightNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">航線</p>
                <p className="font-medium">{booking.flight.fromCity} ({booking.flight.from}) → {booking.flight.toCity} ({booking.flight.to})</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">出發時間</p>
                <p className="font-medium">{format(new Date(booking.flight.departureTime), 'yyyy-MM-dd HH:mm')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">到達時間</p>
                <p className="font-medium">{format(new Date(booking.flight.arrivalTime), 'yyyy-MM-dd HH:mm')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">艙位</p>
                <p className="font-medium">
                  {booking.cabinClass === 'ECONOMY' && '經濟艙'}
                  {booking.cabinClass === 'BUSINESS' && '商務艙'}
                  {booking.cabinClass === 'FIRST_CLASS' && '頭等艙'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">機型</p>
                <p className="font-medium">{booking.flight.aircraft}</p>
              </div>
            </div>

            {/* 乘客信息 */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-ya-yellow-600" />
              乘客信息
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="font-medium text-gray-900">{booking.passengerName}</p>
              <p className="text-sm text-gray-600">護照: {booking.passportNumber || '未提供'}</p>
            </div>

            {/* 价格信息 */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">總金額</span>
                <span className="text-2xl font-bold text-ya-yellow-700">
                  HK$ {booking.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            href="/bookings"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            我的預訂
          </Link>
          <Link
            href="/check-in"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors"
          >
            <Plane className="w-5 h-5" />
            在線值機
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            返回首頁
          </Link>
        </div>

        {/* 温馨提示 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">溫馨提示</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• 請在航班起飛前24小時完成在線值機</li>
            <li>• 請至少提前90分鐘到達機場</li>
            <li>• 請確保您的護照在有效期內</li>
            <li>• 您可以在"我的預訂"中查看詳細信息</li>
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
