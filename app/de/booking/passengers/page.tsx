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
  email: string  // 新增：郵箱
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
  const flightDate = searchParams.get('flightDate') || ''  // 新增：獲取具體日期
  
  // 往返机票参数
  const outboundFlightId = searchParams.get('outboundFlightId')
  const inboundFlightId = searchParams.get('inboundFlightId')
  const returnDate = searchParams.get('returnDate')
  const outboundCabinClass = searchParams.get('outboundCabinClass')
  const inboundCabinClass = searchParams.get('inboundCabinClass')
  const isRoundtrip = !!(outboundFlightId && inboundFlightId)
  
  // 調試：檢查接收到的參數
  console.log('📥 Passengers 頁面接收到的參數:', {
    flightId,
    cabinClass,
    flightDate,
    price,
    passengerCount,
    // 往返航班參數
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
      email: '',  // 新增
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
          // 加载往返航班
          const [outboundRes, inboundRes] = await Promise.all([
            fetch(`/api/flights/${outboundFlightId}?_t=${timestamp}`, { cache: 'no-store' }),
            fetch(`/api/flights/${inboundFlightId}?_t=${timestamp}`, { cache: 'no-store' })
          ])
          
          if (outboundRes.ok && inboundRes.ok) {
            const outboundData = await outboundRes.json()
            const inboundData = await inboundRes.json()
            setOutboundFlight(outboundData)
            setInboundFlight(inboundData)
            console.log('✅ 加載往返航班:', outboundData.flightNumber, inboundData.flightNumber)
          }
        } else if (flightId) {
          // 加载单程航班
          const response = await fetch(`/api/flights/${flightId}?_t=${timestamp}`, { cache: 'no-store' })
          
          if (response.ok) {
            const data = await response.json()
            setFlight(data)
            console.log('✅ 加載航班詳情:', data.flightNumber)
          }
        }
      } catch (error) {
        console.error('❌ 加載航班失敗:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadFlights()
  }, [flightId, outboundFlightId, inboundFlightId, isRoundtrip])

  useEffect(() => {
    // 根据乘客数量调整表单
    if (passengerCount > passengers.length) {
      const newPassengers = [...passengers]
      for (let i = passengers.length; i < passengerCount; i++) {
        newPassengers.push({
          id: (i + 1).toString(),
          firstName: '',
          lastName: '',
          email: '',  // 新增
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
        email: '',  // 新增
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
    
    // 验证所有乘客信息
    const allValid = passengers.every(p => 
      p.firstName && p.lastName && p.email && p.dateOfBirth && p.passportNumber && p.nationality
    )
    
    // 验证邮箱格式
    const emailValid = passengers.every(p => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(p.email)
    })

    if (!allValid) {
      alert('Bitte füllen Sie alle erforderlichen Informationen für alle Passagiere aus')
      return
    }
    
    if (!emailValid) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein')
      return
    }

    // 跳转到支付页面
    if (isRoundtrip) {
      // 往返机票
      // 確保艙位不為空
      const finalOutboundCabin = outboundCabinClass || cabinClass || 'ECONOMY'
      const finalInboundCabin = inboundCabinClass || cabinClass || 'ECONOMY'
      
      const params = new URLSearchParams({
        outboundFlightId: outboundFlightId || '',
        inboundFlightId: inboundFlightId || '',
        departureDate: flightDate,
        returnDate: returnDate || '',
        cabinClass: finalOutboundCabin,  // 使用最終確定的艙位
        outboundCabinClass: finalOutboundCabin,
        inboundCabinClass: finalInboundCabin,
        passengers: JSON.stringify(passengers),
        totalPrice: (price * passengers.length).toString(),
        isRoundtrip: 'true'
      })
      console.log('🚀 跳轉到支付頁面（往返）:', {
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
      console.log('   URL參數:', params.toString())
      router.push(`/de/booking/payment?${params.toString()}`)
    } else {
      // 单程机票
      // 確保 cabinClass 不為空
      const finalCabinClass = cabinClass || 'ECONOMY'
      
      const params = new URLSearchParams({
        flightId: flightId || '',
        flightDate: flightDate,
        cabinClass: finalCabinClass,
        seatNumber: seatNumber || '',
        passengers: JSON.stringify(passengers),
        totalPrice: (price * passengers.length).toString()
      })
      console.log('🚀 跳轉到支付頁面（單程）:', {
        flightId,
        flightDate,
        cabinClass: finalCabinClass,
        cabinClassFromURL: cabinClass,
        totalPrice: price * passengers.length
      })
      console.log('   URL參數:', params.toString())
      router.push(`/de/booking/payment?${params.toString()}`)
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 面包屑 */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/de/" className="text-gray-500 hover:text-gray-700">Startseite</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">Passagierinformationen</span>
            </li>
          </ol>
        </nav>

        {/* 航班信息摘要 */}
        {isRoundtrip ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Rückfluginformationen</h2>
            
            {outboundFlight && (
              <div className="mb-4 pb-4 border-b">
                <h3 className="font-semibold text-gray-900 mb-2">Abflug</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Flugnummer:</span>
                    <span className="ml-2 font-medium">{outboundFlight.flightNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Flugroute:</span>
                    <span className="ml-2 font-medium">{outboundFlight.fromCity} → {outboundFlight.toCity}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Datum:</span>
                    <span className="ml-2 font-medium">{flightDate}</span>
                  </div>
                </div>
              </div>
            )}
            
            {inboundFlight && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Rückflug</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Flugnummer:</span>
                    <span className="ml-2 font-medium">{inboundFlight.flightNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Flugroute:</span>
                    <span className="ml-2 font-medium">{inboundFlight.fromCity} → {inboundFlight.toCity}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Datum:</span>
                    <span className="ml-2 font-medium">{returnDate}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm">
                <span className="text-gray-600">Klasse:</span>
                <span className="ml-2 font-medium">
                  {cabinClass === 'ECONOMY' && 'Economy'}
                  {cabinClass === 'BUSINESS' && 'Business'}
                  {cabinClass === 'FIRST_CLASS' && 'First Klasse'}
                </span>
              </div>
            </div>
          </div>
        ) : flight && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Fluginformationen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Flugnummer:</span>
                <span className="ml-2 font-medium">{flight.flightNumber}</span>
              </div>
              <div>
                <span className="text-gray-600">Flugroute:</span>
                <span className="ml-2 font-medium">{flight.fromCity} → {flight.toCity}</span>
              </div>
              <div>
                <span className="text-gray-600">Klasse:</span>
                <span className="ml-2 font-medium">
                  {cabinClass === 'ECONOMY' && '經濟艙'}
                  {cabinClass === 'BUSINESS' && '商務艙'}
                  {cabinClass === 'FIRST_CLASS' && '頭等艙'}
                </span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 乘客人数控制 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-6 h-6 text-ya-yellow-600" />
                Passagierinformationen ({passengers.length} Passagiere)
              </h2>
              <button
                type="button"
                onClick={addPassenger}
                className="flex items-center gap-2 px-4 py-2 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Passagier hinzufügen
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Bitte füllen Sie alle erforderlichen Informationen aus. Die Informationen müssen mit dem Pass übereinstimmen.
            </p>
          </div>

          {/* 乘客表单 */}
          <div className="space-y-6">
            {passengers.map((passenger, index) => (
              <div key={passenger.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Passagier {index + 1}
                  </h3>
                  {passengers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePassenger(passenger.id)}
                      className="flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Entfernen
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vorname <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passenger.firstName}
                      onChange={(e) => updatePassenger(passenger.id, 'firstName', e.target.value)}
                      className="input-field"
                      placeholder="Bitte geben Sie den Vornamen ein"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nachname <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passenger.lastName}
                      onChange={(e) => updatePassenger(passenger.id, 'lastName', e.target.value)}
                      className="input-field"
                      placeholder="Bitte geben Sie den Nachnamen ein"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-Mail <span className="text-red-500">*</span>
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
                      Bestätigung und Boarding Pass werden an diese E-Mail gesendet
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Geburtsdatum <span className="text-red-500">*</span>
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
                      Passnummer <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passenger.passportNumber}
                      onChange={(e) => updatePassenger(passenger.id, 'passportNumber', e.target.value.toUpperCase())}
                      className="input-field"
                      placeholder="Bitte geben Sie die Passnummer ein"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nationalität <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={passenger.nationality}
                      onChange={(e) => updatePassenger(passenger.id, 'nationality', e.target.value)}
                      className="select-field"
                    >
                      <option value="">Bitte wählen Sie die Nationalität</option>
                      <option value="CN">China</option>
                      <option value="HK">Hong Kong(China)</option>
                      <option value="TW">Taiwan(China)</option>
                      <option value="US">USA</option>
                      <option value="GB">Großbritannien</option>
                      <option value="JP">Japan</option>
                      <option value="KR">Korea</option>
                      <option value="SG">Singapur</option>
                      <option value="AU">Australien</option>
                      <option value="CA">Kanada</option>
                      <option value="FR">Frankreich</option>
                      <option value="DE">Deutschland</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-ya-yellow-600" />
                      Yellow Airlines Mitgliedsnummer (optional)
                    </label>
                    <input
                      type="text"
                      value={passenger.memberNumber}
                      onChange={(e) => updatePassenger(passenger.id, 'memberNumber', e.target.value.toUpperCase())}
                      className="input-field"
                      placeholder="z.B.: YA123456"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Geben Sie die Mitgliedsnummer ein, um Punkte zu sammeln und Rabatte zu erhalten
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 价格摘要和提交 */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preisübersicht</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Einzelpreis:</span>
                <span>{formatPrice(price)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Passagierzahl:</span>
                <span>{passengers.length}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2"></div>
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Gesamt:</span>
                <span className="text-ya-yellow-700">{formatPrice(price * passengers.length)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Zurück
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors"
              >
                <CreditCard className="w-5 h-5" />
                Weiter zur Zahlung
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

