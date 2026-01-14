'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { QrCode, Plane, Calendar, Clock, User, MapPin } from 'lucide-react'

interface BoardingPassData {
  bookingNumber: string
  passengerName: string
  flightDate: string  // 新規: 具体的なフライト日付
  flight: {
    flightNumber: string
    from: string
    to: string
    fromCity: string
    toCity: string
    departureTime: string  // 時間のみ、例 "23:45"
    arrivalTime: string    // 時間のみ、例 "06:30+1"
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
        throw new Error('予約が見つかりません')
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
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const day = String(date.getDate()).padStart(2, '0')
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  }

  // 時間文字列をフォーマット（+1マークを削除）
  const formatTime = (timeString: string) => {
    return timeString.replace('+1', '')
  }

  // 日付と時間を組み合わせて完全なDateTimeを作成
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
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || '予約が見つかりません'}</p>
        </div>
      </div>
    )
  }

  // flightDateとdepartureTimeを組み合わせて完全な出発時間を作成
  const departureDate = combineDateTime(booking.flightDate, booking.flight.departureTime)
  const boardingDate = new Date(departureDate.getTime() - 30 * 60 * 1000) // 搭乗時間は出発30分前
  const gate = `${String.fromCharCode(65 + Math.floor(Math.random() * 10))}${Math.floor(Math.random() * 50) + 1}`
  const boardingGroup = Math.floor(Math.random() * 5) + 1
  
  // 搭乗時間をフォーマット
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
        {/* 印刷ボタン */}
        <div className="max-w-4xl mx-auto mb-6 no-print">
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-ya-yellow-500 text-black font-bold rounded-lg hover:bg-ya-yellow-600 transition-colors"
          >
            🖨️ 搭乗券を印刷
          </button>
        </div>

        {/* 搭乗券 */}
        <div className="max-w-4xl mx-auto boarding-pass-container">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* 黄色のヘッダーバー */}
            <div className="bg-ya-yellow-500 text-black py-6 px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plane className="w-8 h-8" />
                  <h1 className="text-3xl font-bold">YELLOW AIRLINES</h1>
                </div>
              </div>
              <p className="text-lg mt-2">登機牌 BOARDING PASS</p>
            </div>

            {/* メインコンテンツ */}
            <div className="p-8">
              {/* 乗客名 */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">PASSENGER NAME 乗客氏名</div>
                <div className="text-2xl font-bold">{booking.passengerName.toUpperCase()}</div>
              </div>

              {/* フライト情報 */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                {/* 出発 */}
                <div>
                  <div className="text-sm text-gray-600 mb-2">FROM 出発地</div>
                  <div className="text-4xl font-bold text-ya-yellow-600">{booking.flight.from}</div>
                  <div className="text-lg mt-1">{booking.flight.fromCity}</div>
                </div>

                {/* 便名 */}
                <div className="flex flex-col items-center justify-center">
                  <div className="text-3xl text-gray-400 mb-2">→</div>
                  <div className="text-sm text-gray-600">FLIGHT 便名</div>
                  <div className="text-xl font-bold">{booking.flight.flightNumber}</div>
                </div>

                {/* 到着 */}
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-2">TO 目的地</div>
                  <div className="text-4xl font-bold text-ya-yellow-600">{booking.flight.to}</div>
                  <div className="text-lg mt-1">{booking.flight.toCity}</div>
                </div>
              </div>

              {/* 詳細情報 */}
              <div className="grid grid-cols-5 gap-4 py-6 border-t border-b border-gray-200">
                <div>
                  <div className="text-xs text-gray-600 mb-1">DATE 日付</div>
                  <div className="font-bold">{formatDate(booking.flightDate)}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">BOARDING 搭乗</div>
                  <div className="font-bold">{formatBoardingTime(boardingDate)}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">DEPARTURE 出発</div>
                  <div className="font-bold">{formatTime(booking.flight.departureTime)}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">SEAT 座席</div>
                  <div className="text-2xl font-bold text-ya-yellow-600">{booking.seatNumber || 'N/A'}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">CLASS クラス</div>
                  <div className="font-bold">{getCabinClass(booking.cabinClass)}</div>
                </div>
              </div>

              {/* 下部情報 */}
              <div className="grid grid-cols-3 gap-6 mt-6">
                <div>
                  <div className="text-xs text-gray-600 mb-1">BOOKING REF 予約番号</div>
                  <div className="text-lg font-bold">{booking.bookingNumber}</div>
                </div>

                {booking.user?.membershipLevel && (
                  <div>
                    <div className="text-xs text-gray-600 mb-1">MEMBER 会員</div>
                    <div className="text-lg font-bold text-ya-yellow-600">{booking.user.membershipLevel}</div>
                  </div>
                )}

                <div className="text-right">
                  <div className="text-xs text-gray-600 mb-1">GATE 搭乗口</div>
                  <div className="text-lg font-bold">{gate}</div>
                  <div className="text-xs text-gray-600 mt-1">GROUP {boardingGroup}</div>
                </div>
              </div>

              {/* バーコードエリア */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600 mb-4">
                  PLEASE PRESENT THIS BOARDING PASS この搭乗券を提示してください
                </div>

                {/* 簡易的なバーコードシミュレーション */}
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

                {/* 警告メッセージ */}
                <div className="text-center text-xs text-red-600 mt-6">
                  ⚠ 出発の90分前には空港に到着してください | Please arrive 90 minutes before departure
                </div>
              </div>
            </div>

            {/* フッター */}
            <div className="bg-gray-100 py-4 px-8 text-center text-sm text-gray-600">
              Yellow Airlines - Your Journey, Our Passion
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
