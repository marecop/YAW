'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCurrency } from '@/contexts/CurrencyContext'
import Link from 'next/link'
import { User, Plus, Trash2, Users, CreditCard, Plane, Clock } from 'lucide-react'
import AirlineLogo from '@/components/AirlineLogo'
import { format } from 'date-fns'

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

function ConnectionPassengersPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { formatPrice } = useCurrency()

  const connectionId = searchParams.get('connectionId')
  const segment1Id = searchParams.get('segment1')
  const segment2Id = searchParams.get('segment2')
  const cabinClass = searchParams.get('cabinClass')
  const passengerCount = parseInt(searchParams.get('passengers') || '1')
  const flightDate = searchParams.get('flightDate') || ''
  const totalPrice = parseFloat(searchParams.get('totalPrice') || '0')

  const [segment1, setSegment1] = useState<any>(null)
  const [segment2, setSegment2] = useState<any>(null)
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
    if (segment1Id && segment2Id) {
      fetchFlights()
    }
  }, [segment1Id, segment2Id])

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

  const fetchFlights = async () => {
    try {
      const [res1, res2] = await Promise.all([
        fetch(`/api/flights/${segment1Id}`),
        fetch(`/api/flights/${segment2Id}`)
      ])
      
      if (res1.ok && res2.ok) {
        const data1 = await res1.json()
        const data2 = await res2.json()
        setSegment1(data1)
        setSegment2(data2)
      }
    } catch (error) {
      console.error('Error fetching flights:', error)
    } finally {
      setLoading(false)
    }
  }

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

    // 共通の支払いページへ遷移
    const params = new URLSearchParams({
      connectionId: connectionId || '',
      segment1: segment1Id || '',
      segment2: segment2Id || '',
      flightDate: flightDate,
      cabinClass: cabinClass || '',
      passengers: JSON.stringify(passengers),
      totalPrice: totalPrice.toString()
    })
    
    router.push(`/jp/booking/payment?${params.toString()}`)
  }

  const getCabinClassName = (cabin: string) => {
    switch (cabin) {
      case 'ECONOMY': return 'エコノミークラス'
      case 'BUSINESS': return 'ビジネスクラス'
      case 'FIRST_CLASS': return 'ファーストクラス'
      default: return cabin
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-secondary">読み込み中...</p>
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
              <Link href="/jp/" className="text-text-secondary hover:text-navy">トップページ</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-navy font-medium">乗り継ぎ便 乗客情報</span>
            </li>
          </ol>
        </nav>

        {/* 乗り継ぎフライト情報サマリー */}
        {segment1 && segment2 && (
          <div className="card-modern p-6 mb-6">
            <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <Plane className="w-6 h-6 text-primary" />
              乗り継ぎ便情報
            </h2>
            
            {/* 第1区間 */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  第1区間
                </span>
                <span className="text-sm font-medium text-navy">{segment1.flightNumber}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <AirlineLogo 
                    airline={segment1.airline}
                    airlineCode={segment1.airlineCode}
                    airlineLogo={segment1.airlineLogo}
                    size="sm"
                  />
                  <span className="font-medium">{segment1.airline}</span>
                </div>
                <div>
                  <span className="text-text-secondary">区間:</span>
                  <span className="ml-2 font-medium">{segment1.fromCity} → {segment1.toCity}</span>
                </div>
                <div>
                  <span className="text-text-secondary">所要時間:</span>
                  <span className="ml-2 font-medium">{segment1.duration}</span>
                </div>
              </div>
            </div>

            {/* 乗り継ぎ提示 */}
            <div className="flex items-center justify-center my-3">
              <div className="flex items-center gap-2 text-orange-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">乗り継ぎ地：{segment1.toCity}</span>
              </div>
            </div>

            {/* 第2区間 */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  第2区間
                </span>
                <span className="text-sm font-medium text-navy">{segment2.flightNumber}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <AirlineLogo 
                    airline={segment2.airline}
                    airlineCode={segment2.airlineCode}
                    airlineLogo={segment2.airlineLogo}
                    size="sm"
                  />
                  <span className="font-medium">{segment2.airline}</span>
                </div>
                <div>
                  <span className="text-text-secondary">区間:</span>
                  <span className="ml-2 font-medium">{segment2.fromCity} → {segment2.toCity}</span>
                </div>
                <div>
                  <span className="text-text-secondary">所要時間:</span>
                  <span className="ml-2 font-medium">{segment2.duration}</span>
                </div>
              </div>
            </div>

            {/* クラス情報 */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-text-secondary">クラス:</span>
                  <span className="ml-2 font-medium text-navy">{getCabinClassName(cabinClass || '')}</span>
                </div>
                <div>
                  <span className="text-text-secondary">出発日:</span>
                  <span className="ml-2 font-medium text-navy">{flightDate}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 乗客数コントロール */}
          <div className="card-modern p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                乗客情報 ({passengers.length} 名)
              </h2>
              <button
                type="button"
                onClick={addPassenger}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-navy font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Plus className="w-4 h-4" />
                乗客を追加
              </button>
            </div>
            <p className="text-sm text-text-secondary mb-6">
              全ての乗客の詳細情報を入力してください。情報はパスポートと一致する必要があります。
            </p>
          </div>

          {/* 乗客フォーム */}
          <div className="space-y-6">
            {passengers.map((passenger, index) => (
              <div key={passenger.id} className="card-modern p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-navy">
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
                    <label className="block text-sm font-medium text-navy mb-2">
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
                    <label className="block text-sm font-medium text-navy mb-2">
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
                    <label className="block text-sm font-medium text-navy mb-2">
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
                    <p className="text-xs text-text-secondary mt-1">
                      予約確認書と搭乗券はこのメールアドレスに送信されます
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
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
                    <label className="block text-sm font-medium text-navy mb-2">
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
                    <label className="block text-sm font-medium text-navy mb-2">
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
                    <label className="block text-sm font-medium text-navy mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Yellow Airlines 会員番号 (任意)
                    </label>
                    <input
                      type="text"
                      value={passenger.memberNumber}
                      onChange={(e) => updatePassenger(passenger.id, 'memberNumber', e.target.value.toUpperCase())}
                      className="input-field"
                      placeholder="例: YA123456"
                    />
                    <p className="mt-1 text-xs text-text-secondary">
                      会員番号を入力してポイントや特典を獲得
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 価格サマリーと送信 */}
          <div className="card-modern p-6 mt-6">
            <h3 className="text-lg font-semibold text-navy mb-4">料金明細</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-text-secondary">
                <span>1人あたりの料金:</span>
                <span>{formatPrice(totalPrice / passengerCount)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>乗客数:</span>
                <span>{passengers.length}</span>
              </div>
              <div className="border-t border-border pt-2 mt-2"></div>
              <div className="flex justify-between text-xl font-bold text-navy">
                <span>合計:</span>
                <span className="text-primary">{formatPrice(totalPrice / passengerCount * passengers.length)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-border text-navy font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                戻る
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-navy font-bold rounded-lg hover:bg-primary-dark transition-all transform hover:scale-105"
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

export default function ConnectionPassengersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    }>
      <ConnectionPassengersPageContent />
    </Suspense>
  )
}
