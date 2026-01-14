'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCurrency } from '@/contexts/CurrencyContext'
import Link from 'next/link'
import { User, Plus, Trash2, Users, CreditCard } from 'lucide-react'

interface Passenger {
  id: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  passportNumber: string
  nationality: string
  memberNumber?: string
}

function PassengersPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { formatPrice } = useCurrency()

  const flightId = searchParams.get('flightId')
  const cabinClass = searchParams.get('cabinClass')
  const seatNumber = searchParams.get('seatNumber')
  const passengerCount = parseInt(searchParams.get('passengers') || '1')
  const price = parseFloat(searchParams.get('price') || '0')
  const flightDate = searchParams.get('flightDate') || ''
  
  // 往復チケットパラメータ
  const outboundFlightId = searchParams.get('outboundFlightId')
  const inboundFlightId = searchParams.get('inboundFlightId')
  const returnDate = searchParams.get('returnDate')
  const outboundCabinClass = searchParams.get('outboundCabinClass')
  const inboundCabinClass = searchParams.get('inboundCabinClass')
  const isRoundtrip = !!(outboundFlightId && inboundFlightId)
  
  // デバッグ：受信したパラメータを確認
  console.log('📥 Passengers ページがパラメータを受信:', {
    flightId,
    cabinClass,
    flightDate,
    price,
    passengerCount,
    // 往復フライトパラメータ
    isRoundtrip,
    outboundFlightId,
    inboundFlightId,
    outboundCabinClass,
    inboundCabinClass,
    returnDate
  })

  const [flight, setFlight] = useState<any>(null)
  const [outboundFlight, setOutboundFlight] = useState<any>(null)
  const [inboundFlight, setInboundFlight] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: '1',
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      passportNumber: '',
      nationality: '',
      memberNumber: ''
    }
  ])

  useEffect(() => {
    const loadFlights = async () => {
      try {
        const timestamp = new Date().getTime()
        
        if (isRoundtrip) {
          // 往復フライトをロード
          const [outboundRes, inboundRes] = await Promise.all([
            fetch(`/api/flights/${outboundFlightId}?_t=${timestamp}`, { cache: 'no-store' }),
            fetch(`/api/flights/${inboundFlightId}?_t=${timestamp}`, { cache: 'no-store' })
          ])
          
          if (outboundRes.ok && inboundRes.ok) {
            const outboundData = await outboundRes.json()
            const inboundData = await inboundRes.json()
            setOutboundFlight(outboundData)
            setInboundFlight(inboundData)
            console.log('✅ 往復フライトをロード:', outboundData.flightNumber, inboundData.flightNumber)
          }
        } else if (flightId) {
          // 片道フライトをロード
          const response = await fetch(`/api/flights/${flightId}?_t=${timestamp}`, { cache: 'no-store' })
          
          if (response.ok) {
            const data = await response.json()
            setFlight(data)
            console.log('✅ フライト詳細をロード:', data.flightNumber)
          }
        }
      } catch (error) {
        console.error('❌ フライトのロードに失敗:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadFlights()
  }, [flightId, outboundFlightId, inboundFlightId, isRoundtrip])

  useEffect(() => {
    // 乗客数に基づいてフォームを調整
    if (passengerCount > passengers.length) {
      const newPassengers = [...passengers]
      for (let i = passengers.length; i < passengerCount; i++) {
        newPassengers.push({
          id: (i + 1).toString(),
          firstName: '',
          lastName: '',
          email: '',
          dateOfBirth: '',
          passportNumber: '',
          nationality: '',
          memberNumber: ''
        })
      }
      setPassengers(newPassengers)
    } else if (passengerCount < passengers.length) {
      setPassengers(passengers.slice(0, passengerCount))
    }
  }, [passengerCount])

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        id: (passengers.length + 1).toString(),
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        passportNumber: '',
        nationality: '',
        memberNumber: ''
      }
    ])
  }

  const removePassenger = (id: string) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter(p => p.id !== id))
    }
  }

  const updatePassenger = (id: string, field: keyof Passenger, value: string) => {
    setPassengers(passengers.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // すべての乗客情報を検証
    const allValid = passengers.every(p => 
      p.firstName && p.lastName && p.email && p.dateOfBirth && p.passportNumber && p.nationality
    )
    
    // メールアドレスの形式を検証
    const emailValid = passengers.every(p => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(p.email)
    })

    if (!allValid) {
      alert('必須項目をすべて入力してください')
      return
    }
    
    if (!emailValid) {
      alert('有効なメールアドレスを入力してください')
      return
    }

    // 支払いページへ遷移
    if (isRoundtrip) {
      // 往復チケット
      // クラスが空でないことを確認
      const finalOutboundCabin = outboundCabinClass || cabinClass || 'ECONOMY'
      const finalInboundCabin = inboundCabinClass || cabinClass || 'ECONOMY'
      
      const params = new URLSearchParams({
        outboundFlightId: outboundFlightId || '',
        inboundFlightId: inboundFlightId || '',
        departureDate: flightDate,
        returnDate: returnDate || '',
        cabinClass: finalOutboundCabin,  // 最終的に決定されたクラスを使用
        outboundCabinClass: finalOutboundCabin,
        inboundCabinClass: finalInboundCabin,
        passengers: JSON.stringify(passengers),
        totalPrice: (price * passengers.length).toString(),
        isRoundtrip: 'true'
      })
      console.log('🚀 支払いページへ遷移（往復）:', {
        outboundFlightId,
        inboundFlightId,
        departureDate: flightDate,
        returnDate,
        outboundCabinClass: finalOutboundCabin,
        inboundCabinClass: finalInboundCabin,
        outboundCabinClassFromURL: outboundCabinClass,
        inboundCabinClassFromURL: inboundCabinClass,
        totalPrice: price * passengers.length
      })
      console.log('   URLパラメータ:', params.toString())
      router.push(`/jp/booking/payment?${params.toString()}`)
    } else {
      // 片道チケット
      // cabinClass が空でないことを確認
      const finalCabinClass = cabinClass || 'ECONOMY'
      
      const params = new URLSearchParams({
        flightId: flightId || '',
        flightDate: flightDate,
        cabinClass: finalCabinClass,
        seatNumber: seatNumber || '',
        passengers: JSON.stringify(passengers),
        totalPrice: (price * passengers.length).toString()
      })
      console.log('🚀 支払いページへ遷移（片道）:', {
        flightId,
        flightDate,
        cabinClass: finalCabinClass,
        cabinClassFromURL: cabinClass,
        totalPrice: price * passengers.length
      })
      console.log('   URLパラメータ:', params.toString())
      router.push(`/jp/booking/payment?${params.toString()}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* パンくずリスト */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/jp/" className="text-gray-500 hover:text-gray-700">トップページ</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">乗客情報</span>
            </li>
          </ol>
        </nav>

        {/* フライト情報サマリー */}
        {isRoundtrip ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">往復フライト情報</h2>
            
            {outboundFlight && (
              <div className="mb-4 pb-4 border-b">
                <h3 className="font-semibold text-gray-900 mb-2">往路フライト</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">便名:</span>
                    <span className="ml-2 font-medium">{outboundFlight.flightNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">区間:</span>
                    <span className="ml-2 font-medium">{outboundFlight.fromCity} → {outboundFlight.toCity}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">日付:</span>
                    <span className="ml-2 font-medium">{flightDate}</span>
                  </div>
                </div>
              </div>
            )}
            
            {inboundFlight && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">復路フライト</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">便名:</span>
                    <span className="ml-2 font-medium">{inboundFlight.flightNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">区間:</span>
                    <span className="ml-2 font-medium">{inboundFlight.fromCity} → {inboundFlight.toCity}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">日付:</span>
                    <span className="ml-2 font-medium">{returnDate}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm">
                <span className="text-gray-600">クラス:</span>
                <span className="ml-2 font-medium">
                  {cabinClass === 'ECONOMY' && 'エコノミークラス'}
                  {cabinClass === 'BUSINESS' && 'ビジネスクラス'}
                  {cabinClass === 'FIRST_CLASS' && 'ファーストクラス'}
                </span>
              </div>
            </div>
          </div>
        ) : flight && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">フライト情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">便名:</span>
                <span className="ml-2 font-medium">{flight.flightNumber}</span>
              </div>
              <div>
                <span className="text-gray-600">区間:</span>
                <span className="ml-2 font-medium">{flight.fromCity} → {flight.toCity}</span>
              </div>
              <div>
                <span className="text-gray-600">クラス:</span>
                <span className="ml-2 font-medium">
                  {cabinClass === 'ECONOMY' && 'エコノミークラス'}
                  {cabinClass === 'BUSINESS' && 'ビジネスクラス'}
                  {cabinClass === 'FIRST_CLASS' && 'ファーストクラス'}
                </span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 乗客数コントロール */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-6 h-6 text-ya-yellow-600" />
                乗客情報 ({passengers.length} 名)
              </h2>
              <button
                type="button"
                onClick={addPassenger}
                className="flex items-center gap-2 px-4 py-2 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                乗客を追加
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              全ての乗客の詳細情報を入力してください。情報はパスポートと一致する必要があります。
            </p>
          </div>

          {/* 乗客フォーム */}
          <div className="space-y-6">
            {passengers.map((passenger, index) => (
              <div key={passenger.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    乗客 {index + 1}
                  </h3>
                  {passengers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePassenger(passenger.id)}
                      className="flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      削除
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      名 (First Name) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passenger.firstName}
                      onChange={(e) => updatePassenger(passenger.id, 'firstName', e.target.value)}
                      className="input-field"
                      placeholder="名を入力してください"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      姓 (Last Name) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passenger.lastName}
                      onChange={(e) => updatePassenger(passenger.id, 'lastName', e.target.value)}
                      className="input-field"
                      placeholder="姓を入力してください"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={passenger.email}
                      onChange={(e) => updatePassenger(passenger.id, 'email', e.target.value)}
                      className="input-field"
                      placeholder="example@email.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      予約確認書と搭乗券はこのメールアドレスに送信されます
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      生年月日 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={passenger.dateOfBirth}
                      onChange={(e) => updatePassenger(passenger.id, 'dateOfBirth', e.target.value)}
                      className="input-field"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      パスポート番号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passenger.passportNumber}
                      onChange={(e) => updatePassenger(passenger.id, 'passportNumber', e.target.value.toUpperCase())}
                      className="input-field"
                      placeholder="パスポート番号を入力してください"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      国籍 <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={passenger.nationality}
                      onChange={(e) => updatePassenger(passenger.id, 'nationality', e.target.value)}
                      className="select-field"
                    >
                      <option value="">国籍を選択してください</option>
                      <option value="CN">中国</option>
                      <option value="HK">中国香港</option>
                      <option value="TW">中国台湾</option>
                      <option value="US">アメリカ</option>
                      <option value="GB">イギリス</option>
                      <option value="JP">日本</option>
                      <option value="KR">韓国</option>
                      <option value="SG">シンガポール</option>
                      <option value="AU">オーストラリア</option>
                      <option value="CA">カナダ</option>
                      <option value="FR">フランス</option>
                      <option value="DE">ドイツ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-ya-yellow-600" />
                      Yellow Airlines 会員番号 (任意)
                    </label>
                    <input
                      type="text"
                      value={passenger.memberNumber}
                      onChange={(e) => updatePassenger(passenger.id, 'memberNumber', e.target.value.toUpperCase())}
                      className="input-field"
                      placeholder="例: YA123456"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      会員番号を入力してポイントや特典を獲得
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 価格サマリーと送信 */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">料金明細</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>1人あたりの料金:</span>
                <span>{formatPrice(price)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>乗客数:</span>
                <span>{passengers.length}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2"></div>
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>合計:</span>
                <span className="text-ya-yellow-700">{formatPrice(price * passengers.length)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                戻る
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors"
              >
                <CreditCard className="w-5 h-5" />
                支払いに進む
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function PassengersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
        </div>
      </div>
    }>
      <PassengersPageContent />
    </Suspense>
  )
}
