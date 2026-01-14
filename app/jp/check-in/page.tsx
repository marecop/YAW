'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Plane, Calendar, User, Hash, CheckCircle, Download, Printer } from 'lucide-react'
import { generateOccupiedSeats, getOccupancyPercentage } from '@/lib/seatOccupancy'

function CheckInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [bookingNumber, setBookingNumber] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [booking, setBooking] = useState<any>(null)
  const [selectedSeat, setSelectedSeat] = useState('')
  const [isCheckingIn, setIsCheckingIn] = useState(false)

  // URLパラメータがある場合、予約情報を自動読み込み
  useEffect(() => {
    const urlBookingNumber = searchParams.get('bookingNumber')
    const urlEmail = searchParams.get('email')
    
    if (urlBookingNumber && urlEmail) {
      setBookingNumber(urlBookingNumber)
      // 予約を自動検索
      autoLoadBooking(urlBookingNumber, urlEmail)
    }
  }, [searchParams])

  const autoLoadBooking = async (bookingNum: string, email: string) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/bookings?bookingNumber=${bookingNum}`)
      
      if (!response.ok) {
        throw new Error('予約が見つかりません')
      }

      const data = await response.json()
      
      // APIは配列を返すので、最初の要素を取得
      const bookingData = Array.isArray(data) ? data[0] : data
      
      if (!bookingData) {
        throw new Error('予約が見つかりません')
      }

      // メールアドレスが一致するか確認
      if (bookingData.passengerEmail !== email) {
        throw new Error('予約情報が一致しません')
      }

      setBooking(bookingData)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`/api/check-in/search?bookingNumber=${bookingNumber}&lastName=${encodeURIComponent(lastName)}`)
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || '予約が見つかりません')
      }

      const data = await response.json()
      setBooking(data.booking)

      // 既にチェックイン済みの場合は搭乗券オプションを表示
      if (data.booking.checkedIn) {
        // 搭乗券をダウンロードするオプション
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckIn = async () => {
    if (!selectedSeat) {
      setError('座席を選択してください')
      return
    }

    setIsCheckingIn(true)
    setError('')

    try {
      const response = await fetch('/api/check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: booking.id,
          seatNumber: selectedSeat,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'チェックインに失敗しました')
      }

      const data = await response.json()
      setBooking(data.booking)

      // チェックイン成功、メッセージを表示
      alert('チェックインが完了しました！')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsCheckingIn(false)
    }
  }

  const handleDownloadBoardingPass = async () => {
    try {
      const response = await fetch(`/api/boarding-pass/${booking.id}`)
      
      if (!response.ok) {
        throw new Error('搭乗券の生成に失敗しました')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `boarding-pass-${booking.bookingNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const renderSeatSelection = () => {
    if (!booking || booking.checkedIn) return null

    // シンプルな座席選択（クラスに基づいて座席を生成）
    const cabinClass = booking.cabinClass
    let seats: string[] = []

    if (cabinClass === 'ECONOMY' || cabinClass === 'PREMIUM_ECONOMY') {
      // エコノミー/プレミアムエコノミー (20-35行, A-F)
      for (let row = 20; row <= 35; row++) {
        for (let col of ['A', 'B', 'C', 'D', 'E', 'F']) {
          seats.push(`${row}${col}`)
        }
      }
    } else if (cabinClass === 'BUSINESS') {
      // ビジネスクラス (10-15行, A-D)
      for (let row = 10; row <= 15; row++) {
        for (let col of ['A', 'B', 'C', 'D']) {
          seats.push(`${row}${col}`)
        }
      }
    } else if (cabinClass === 'FIRST_CLASS') {
      // ファーストクラス (1-5行, A-B)
      for (let row = 1; row <= 5; row++) {
        for (let col of ['A', 'B']) {
          seats.push(`${row}${col}`)
        }
      }
    } else {
      // デフォルトエコノミー
      for (let row = 20; row <= 35; row++) {
        for (let col of ['A', 'B', 'C', 'D', 'E', 'F']) {
          seats.push(`${row}${col}`)
        }
      }
    }

    // スマート座席占有システムを使用（決定論的アルゴリズム）
    const totalSeats = seats.length
    const occupiedSeatsSet = generateOccupiedSeats(
      booking.flight.id,
      booking.flightDate,
      booking.cabinClass,
      totalSeats
    )
    
    // 占有率を計算（決定論的アルゴリズム）
    const occupancyPercentage = getOccupancyPercentage(
      booking.flight.id,
      booking.flightDate,
      booking.cabinClass,
      totalSeats
    )
    const availableSeats = totalSeats - occupiedSeatsSet.size

    return (
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">座席を選択</h3>
            <p className="text-sm text-gray-600 mt-1">
              ご希望の座席を選択してください。座席は先着順です。
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">空席</div>
            <div className="text-2xl font-bold text-ya-yellow-600">
              {availableSeats}/{totalSeats}
            </div>
            <div className="text-xs text-gray-500">
              {occupancyPercentage.toFixed(0)}% 予約済み
            </div>
          </div>
        </div>
        
        {/* 座席凡例 */}
        <div className="flex gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded border-2 border-gray-300 bg-white"></div>
            <span className="text-sm text-gray-700">空席</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded border-2 border-ya-yellow-600 bg-ya-yellow-500"></div>
            <span className="text-sm text-gray-700">選択中</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded border-2 border-gray-300 bg-gray-300"></div>
            <span className="text-sm text-gray-700">指定済み</span>
          </div>
        </div>

        {/* 座席グリッド */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
            {seats.slice(0, 96).map((seat, index) => {
              const isOccupied = occupiedSeatsSet.has(index)
              return (
                <button
                  key={seat}
                  type="button"
                  onClick={() => !isOccupied && setSelectedSeat(seat)}
                  disabled={isOccupied}
                  className={`
                    h-12 w-12 rounded-md border-2 text-sm font-semibold transition-all
                    ${isOccupied 
                      ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                      : selectedSeat === seat
                      ? 'bg-ya-yellow-500 border-ya-yellow-600 text-black shadow-md scale-105'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-ya-yellow-400 hover:bg-ya-yellow-50 cursor-pointer'
                    }
                  `}
                >
                  {seat}
                </button>
              )
            })}
          </div>
        </div>
        
        {selectedSeat && (
          <div className="mt-4 p-4 bg-ya-yellow-50 border border-ya-yellow-200 rounded-lg">
            <p className="text-sm font-medium text-gray-900">
              選択された座席：<span className="text-ya-yellow-600 text-lg font-bold">{selectedSeat}</span>
            </p>
          </div>
        )}
        
        <p className="mt-4 text-xs text-gray-500">
          * 座席の空き状況はリアルタイムで更新されます。一部の座席には追加料金がかかる場合があります。
        </p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* パンくずリスト */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/jp/" className="text-gray-500 hover:text-gray-700">
                ホーム
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">オンラインチェックイン</span>
            </li>
          </ol>
        </nav>

        {/* タイトル */}
        <div className="text-center mb-8">
          <Plane className="inline-block w-12 h-12 text-ya-yellow-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">オンラインチェックイン</h1>
          <p className="text-gray-600">
            予約情報を入力してチェックインを開始し、座席を選択して搭乗券を取得してください
          </p>
        </div>

        {!booking ? (
          /* 予約検索フォーム */
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSearch} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="bookingNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  予約番号
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="bookingNumber"
                    name="bookingNumber"
                    type="text"
                    required
                    value={bookingNumber}
                    onChange={(e) => setBookingNumber(e.target.value.toUpperCase())}
                    className="input-field pl-10"
                    placeholder="例: YA123456"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  姓 (ローマ字)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input-field pl-10"
                    placeholder="搭乗者の姓を入力"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 disabled:opacity-50"
              >
                {isLoading ? '検索中...' : '予約を検索'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">ご注意</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• オンラインチェックイン受付時間：出発48時間前から90分前まで</li>
                <li>• 予約時と同じ情報を入力してください</li>
                <li>• チェックイン後は、出発の少なくとも90分前までに空港にお越しください</li>
              </ul>
            </div>
          </div>
        ) : (
          /* 予約詳細とチェックイン */
          <div className="space-y-6">
            {/* フライト情報カード */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">フライト情報</h2>
                {booking.checkedIn && (
                  <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    チェックイン済み
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">予約詳細</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">予約番号:</span>
                      <span className="font-medium">{booking.bookingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">搭乗者名:</span>
                      <span className="font-medium">{booking.passengerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">クラス:</span>
                      <span className="font-medium">
                        {booking.cabinClass === 'ECONOMY' && 'エコノミー'}
                        {booking.cabinClass === 'BUSINESS' && 'ビジネス'}
                        {booking.cabinClass === 'FIRST_CLASS' && 'ファースト'}
                      </span>
                    </div>
                    {booking.seatNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">座席番号:</span>
                        <span className="font-medium text-ya-yellow-600">{booking.seatNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">フライト詳細</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">便名:</span>
                      <span className="font-medium">{booking.flight.flightNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">出発地:</span>
                      <span className="font-medium">{booking.flight.fromCity} ({booking.flight.from})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">目的地:</span>
                      <span className="font-medium">{booking.flight.toCity} ({booking.flight.to})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">出発日:</span>
                      <span className="font-medium">
                        {new Date(booking.flightDate).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          weekday: 'long'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">出発時刻:</span>
                      <span className="font-medium">
                        {booking.flight.departureTime.replace('+1', '')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 座席選択 */}
              {!booking.checkedIn && renderSeatSelection()}

              {/* 操作ボタン */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {!booking.checkedIn ? (
                  <>
                    <button
                      onClick={handleCheckIn}
                      disabled={isCheckingIn || !selectedSeat}
                      className="flex-1 py-3 px-6 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCheckingIn ? 'チェックイン中...' : 'チェックインを確定'}
                    </button>
                    <button
                      onClick={() => setBooking(null)}
                      className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                    >
                      キャンセル
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleDownloadBoardingPass}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600"
                    >
                      <Download className="w-5 h-5" />
                      搭乗券をダウンロード (PDF)
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                    >
                      <Printer className="w-5 h-5" />
                      搭乗券を印刷
                    </button>
                  </>
                )}
              </div>

              {error && (
                <div className="mt-4 rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default function CheckInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    }>
      <CheckInContent />
    </Suspense>
  )
}
