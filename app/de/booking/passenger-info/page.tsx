'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Phone, CreditCard } from 'lucide-react'

function PassengerInfoContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const flightId = searchParams.get('flightId')
  const cabinOption = searchParams.get('cabinOption')
  const passengers = parseInt(searchParams.get('passengers') || '1')
  const totalPrice = parseFloat(searchParams.get('price') || '0')

  const [passengerData, setPassengerData] = useState<any[]>(
    Array(passengers).fill(null).map(() => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      passportNumber: '',
      dateOfBirth: '',
      nationality: ''
    }))
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (index: number, field: string, value: string) => {
    const newData = [...passengerData]
    newData[index] = { ...newData[index], [field]: value }
    setPassengerData(newData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 验证所有字段
      for (let i = 0; i < passengerData.length; i++) {
        const passenger = passengerData[i]
        if (!passenger.firstName || !passenger.lastName || !passenger.email) {
          throw new Error(`Bitte füllen Sie alle erforderlichen Informationen für Passagier ${i + 1} aus`)
        }
      }

      // 创建预订
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flightId,
          cabinOption,
          passengers: passengerData,
          totalPrice,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Buchung fehlgeschlagen')
      }

      const booking = await response.json()
      
      // 跳转到支付页面
      router.push(`/de/booking/payment?bookingId=${booking.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 面包屑 */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/de/" className="text-gray-500 hover:text-gray-700">
                Startseite
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/de/flights" className="ml-2 text-gray-500 hover:text-gray-700">
                Flugsuche
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/de/booking/select-cabin" className="ml-2 text-gray-500 hover:text-gray-700">
                Ticketpreise auswählen
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">Passagierinformationen</span>
            </li>
          </ol>
        </nav>

        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Passagierinformationen</h1>
          <p className="text-gray-600">Bitte füllen Sie alle erforderlichen Informationen für alle Passagiere aus</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {passengerData.map((passenger, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Passagier {index + 1}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 名字 */}
                <div>
                  <label htmlFor={`firstName-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Vorname (First Name) *</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    id={`firstName-${index}`}
                    required
                    value={passenger.firstName}
                    onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                    className="input-field"
                    placeholder="John"
                  />
                </div>

                {/* 姓氏 */}
                <div>
                  <label htmlFor={`lastName-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Nachname (Last Name) *</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    id={`lastName-${index}`}
                    required
                    value={passenger.lastName}
                    onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                    className="input-field"
                    placeholder="Doe"
                  />
                </div>

                {/* 电子邮件 */}
                <div>
                  <label htmlFor={`email-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>E-Mail *</span>
                    </div>
                  </label>
                  <input
                    type="email"
                    id={`email-${index}`}
                    required
                    value={passenger.email}
                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>

                {/* 电话 */}
                <div>
                  <label htmlFor={`phone-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Telefonnummer</span>
                    </div>
                  </label>
                  <input
                    type="tel"
                    id={`phone-${index}`}
                    value={passenger.phone}
                    onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                    className="input-field"
                    placeholder="+852 9123 4567"
                  />
                </div>

                {/* 护照号码 */}
                <div>
                  <label htmlFor={`passportNumber-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span>Passnummer</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    id={`passportNumber-${index}`}
                    value={passenger.passportNumber}
                    onChange={(e) => handleInputChange(index, 'passportNumber', e.target.value)}
                    className="input-field"
                    placeholder="A12345678"
                  />
                </div>

                {/* 出生日期 */}
                <div>
                  <label htmlFor={`dateOfBirth-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                    Geburtsdatum
                  </label>
                  <input
                    type="date"
                    id={`dateOfBirth-${index}`}
                    value={passenger.dateOfBirth}
                    onChange={(e) => handleInputChange(index, 'dateOfBirth', e.target.value)}
                    className="input-field"
                  />
                </div>

                {/* 国籍 */}
                <div>
                  <label htmlFor={`nationality-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                    Nationalität
                  </label>
                  <select
                    id={`nationality-${index}`}
                    value={passenger.nationality}
                    onChange={(e) => handleInputChange(index, 'nationality', e.target.value)}
                    className="select-field"
                  >
                    <option value="">Bitte wählen Sie die Nationalität</option>
                    <option value="CN">China</option>
                    <option value="HK">Hong Kong</option>
                    <option value="TW">Taiwan</option>
                    <option value="US">USA</option>
                    <option value="GB">Großbritannien</option>
                    <option value="DE">Deutschland</option>
                    <option value="FR">Frankreich</option>
                    <option value="JP">Japan</option>
                    <option value="KR">Korea</option>
                    <option value="SG">Singapur</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          {/* 价格摘要 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Preisübersicht</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>{passengers} Passagiere</span>
                <span>HKD {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Steuern</span>
                <span>Enthalten</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold text-gray-900">
                <span>Gesamt</span>
                <span>HKD {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 px-6 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Zurück
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-6 bg-ya-yellow-500 text-black font-bold rounded-lg hover:bg-ya-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Verarbeitung...' : 'Weiter zur Zahlung'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function PassengerInfoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ya-yellow-500"></div>
      </div>
    }>
      <PassengerInfoContent />
    </Suspense>
  )
}
