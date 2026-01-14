'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Loader2 } from 'lucide-react'

export default function MedicalCarePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    passengerName: '',
    email: '',
    phone: '',
    bookingNumber: '',
    flightNumber: '',
    flightDate: '',
    medicalCondition: '',
    medicalEquipment: '',
    oxygenRequired: false,
    medicationDetails: '',
    doctorCertificate: '',
    emergencyContact: '',
    emergencyPhone: '',
    additionalNotes: ''
  })
  const [bookingLookupNumber, setBookingLookupNumber] = useState('')
  const [lookingUpBooking, setLookingUpBooking] = useState(false)
  const [bookingFound, setBookingFound] = useState(false)

  const medicalEquipmentOptions = [
    { value: 'OXYGEN', label: '酸素ボンベ' },
    { value: 'CPAP', label: 'CPAP (持続陽圧呼吸療法装置)' },
    { value: 'VENTILATOR', label: '人工呼吸器' },
    { value: 'WHEELCHAIR_MEDICAL', label: '医療用車椅子' },
    { value: 'STRETCHER', label: 'ストレッチャー' },
    { value: 'OTHER', label: 'その他' }
  ]

  const handleBookingLookup = async () => {
    if (!bookingLookupNumber) {
      alert('予約番号を入力してください')
      return
    }

    setLookingUpBooking(true)
    
    try {
      const response = await fetch(`/api/bookings/lookup?bookingNumber=${bookingLookupNumber}`)
      
      if (response.ok) {
        const data = await response.json()
        
        setFormData({
          ...formData,
          passengerName: data.booking.passengerName,
          email: data.booking.passengerEmail,
          bookingNumber: data.booking.bookingNumber,
          flightNumber: data.flight.flightNumber,
          flightDate: new Date(data.flightDate).toISOString().split('T')[0]
        })
        
        setBookingFound(true)
      } else {
        alert('予約が見つかりません')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('予約の検索に失敗しました。後でもう一度お試しください')
    } finally {
      setLookingUpBooking(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!bookingFound) {
      alert('先に予約を検索してください')
      return
    }
    
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/special-assistance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'MEDICAL_CARE',
          passengerName: formData.passengerName,
          email: formData.email,
          phone: formData.phone,
          bookingNumber: formData.bookingNumber,
          flightNumber: formData.flightNumber,
          flightDate: formData.flightDate,
          details: JSON.stringify({
            medicalCondition: formData.medicalCondition,
            medicalEquipment: formData.medicalEquipment,
            oxygenRequired: formData.oxygenRequired,
            medicationDetails: formData.medicationDetails,
            doctorCertificate: formData.doctorCertificate,
            emergencyContact: formData.emergencyContact,
            emergencyPhone: formData.emergencyPhone,
            additionalNotes: formData.additionalNotes,
          }),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        alert(`✅ 申請を送信しました\n\n申請番号: ${data.requestNumber}`)
        router.push('/jp/special-assistance')
      } else {
        alert('申請の送信に失敗しました。もう一度お試しください')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('申請の送信に失敗しました。もう一度お試しください')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/jp/special-assistance" className="inline-flex items-center text-ya-yellow-600 hover:text-ya-yellow-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          サービス一覧に戻る
        </Link>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-red-500 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">❤️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              医療アシスタンス
            </h1>
          </div>
          <p className="text-gray-600">
            医療的ケアや医療機器の持ち込みが必要な場合は、事前に申請してください。確認のご連絡を差し上げます。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            申請フォーム
          </h2>

          {/* Booking Number Lookup */}
          <div className="mb-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              予約番号検索 *
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              予約番号を入力すると、フライトと乗客情報が自動入力されます。
            </p>
            <div className="flex gap-4">
              <input
                type="text"
                value={bookingLookupNumber}
                onChange={(e) => setBookingLookupNumber(e.target.value.toUpperCase())}
                placeholder="予約番号を入力"
                disabled={bookingFound}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent disabled:bg-gray-100"
              />
              <button
                type="button"
                onClick={handleBookingLookup}
                disabled={lookingUpBooking || bookingFound}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {lookingUpBooking ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    検索中...
                  </>
                ) : bookingFound ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    見つかりました
                  </>
                ) : (
                  '検索'
                )}
              </button>
            </div>
          </div>

          {/* Passenger Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              乗客情報
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  氏名 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.passengerName}
                  onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
                  disabled={bookingFound}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100 focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={bookingFound}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100 focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  電話番号 *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Flight Information */}
          {bookingFound && (
            <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-600" />
                フライト情報 (任意)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    予約番号
                  </label>
                  <input type="text" value={formData.bookingNumber} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    便名
                  </label>
                  <input type="text" value={formData.flightNumber} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    搭乗日
                  </label>
                  <input type="date" value={formData.flightDate} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" />
                </div>
              </div>
            </div>
          )}

          {/* Medical Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              医療情報
            </h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                病状 / ご要望 *
              </label>
              <textarea
                required
                value={formData.medicalCondition}
                onChange={(e) => setFormData({ ...formData, medicalCondition: e.target.value })}
                rows={3}
                placeholder="病状や必要なサポートについてご記入ください"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                医療機器
              </label>
              <select
                value={formData.medicalEquipment}
                onChange={(e) => setFormData({ ...formData, medicalEquipment: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              >
                <option value="">選択してください...</option>
                {medicalEquipmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.oxygenRequired}
                  onChange={(e) => setFormData({ ...formData, oxygenRequired: e.target.checked })}
                  className="w-5 h-5 text-ya-yellow-600 border-gray-300 rounded focus:ring-ya-yellow-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  酸素が必要
                </span>
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                薬剤情報
              </label>
              <textarea
                value={formData.medicationDetails}
                onChange={(e) => setFormData({ ...formData, medicationDetails: e.target.value })}
                rows={3}
                placeholder="機内に持ち込む薬剤や服用薬についてご記入ください"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                医師の診断書
              </label>
              <input
                type="text"
                value={formData.doctorCertificate}
                onChange={(e) => setFormData({ ...formData, doctorCertificate: e.target.value })}
                placeholder="診断書の詳細をご記入ください"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  緊急連絡先 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  緊急連絡先電話番号 *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                その他の情報
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              * 必須項目
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-ya-yellow-500 text-black font-semibold rounded-lg hover:bg-ya-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  送信中...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  申請を送信
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
