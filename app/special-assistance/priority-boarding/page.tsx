'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Loader2 } from 'lucide-react'

export default function PriorityBoardingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    passengerName: '',
    email: '',
    phone: '',
    bookingNumber: '',
    flightNumber: '',
    flightDate: '',
    reason: '',
    age: '',
    pregnancyWeeks: '',
    medicalCertificate: '',
    travelingWithInfant: false,
    infantAge: '',
    additionalNotes: ''
  })
  const [bookingLookupNumber, setBookingLookupNumber] = useState('')
  const [lookingUpBooking, setLookingUpBooking] = useState(false)
  const [bookingFound, setBookingFound] = useState(false)

  const reasonOptions = [
    { value: 'ELDERLY', label: '長者' },
    { value: 'PREGNANT', label: '孕婦' },
    { value: 'WITH_INFANT', label: '攜帶嬰兒' },
    { value: 'DISABILITY', label: '行動不便/殘障' },
    { value: 'MEDICAL', label: '醫療原因' },
    { value: 'OTHER', label: '其他' }
  ]

  const handleBookingLookup = async () => {
    if (!bookingLookupNumber) {
      alert('請輸入預訂編號')
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
        alert('找不到該預訂')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('查詢預訂失敗，請稍後重試')
    } finally {
      setLookingUpBooking(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!bookingFound) {
      alert('請先查詢預訂')
      return
    }
    
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/special-assistance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'PRIORITY_BOARDING',
          passengerName: formData.passengerName,
          email: formData.email,
          phone: formData.phone,
          bookingNumber: formData.bookingNumber,
          flightNumber: formData.flightNumber,
          flightDate: formData.flightDate,
          details: JSON.stringify({
            reason: formData.reason,
            age: formData.age,
            pregnancyWeeks: formData.pregnancyWeeks,
            medicalCertificate: formData.medicalCertificate,
            travelingWithInfant: formData.travelingWithInfant,
            infantAge: formData.infantAge,
            additionalNotes: formData.additionalNotes,
          }),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        alert(`✅ 申請已提交\n\n申請編號: ${data.requestNumber}`)
        router.push('/special-assistance')
      } else {
        alert('申請提交失敗，請重試')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('申請提交失敗，請重試')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/special-assistance" className="inline-flex items-center text-ya-yellow-600 hover:text-ya-yellow-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回服務列表
        </Link>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-500 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">✈️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              優先登機
            </h1>
          </div>
          <p className="text-gray-600">
            為長者、孕婦、攜帶嬰兒或行動不便旅客提供優先登機協助。請於起飛前提交申請。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            申請表格
          </h2>

          {/* Booking Number Lookup */}
          <div className="mb-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              預訂編號查詢 *
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              輸入您的預訂編號以自動填入航班與乘客資料。
            </p>
            <div className="flex gap-4">
              <input
                type="text"
                value={bookingLookupNumber}
                onChange={(e) => setBookingLookupNumber(e.target.value.toUpperCase())}
                placeholder="輸入預訂編號"
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
                    查詢中...
                  </>
                ) : bookingFound ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    已找到
                  </>
                ) : (
                  '查詢'
                )}
              </button>
            </div>
          </div>

          {/* Passenger Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              乘客資料
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  乘客姓名 *
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
                  電郵 *
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
                  電話 *
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
                航班資料（選填）
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    預訂編號
                  </label>
                  <input type="text" value={formData.bookingNumber} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    航班號
                  </label>
                  <input type="text" value={formData.flightNumber} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    航班日期
                  </label>
                  <input type="date" value={formData.flightDate} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" />
                </div>
              </div>
            </div>
          )}

          {/* Priority Boarding Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              優先登機資料
            </h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                原因 *
              </label>
              <select
                required
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              >
                <option value="">請選擇...</option>
                {reasonOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {formData.reason === 'ELDERLY' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  年齡 *
                </label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  min="65"
                  placeholder="65+"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
            )}

            {formData.reason === 'PREGNANT' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  懷孕週數 *
                </label>
                <input
                  type="number"
                  required
                  value={formData.pregnancyWeeks}
                  onChange={(e) => setFormData({ ...formData, pregnancyWeeks: e.target.value })}
                  min="1"
                  max="40"
                  placeholder="例如：24"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
            )}

            {(formData.reason === 'MEDICAL' || formData.reason === 'DISABILITY') && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  醫療證明（如適用）
                </label>
                <input
                  type="text"
                  value={formData.medicalCertificate}
                  onChange={(e) => setFormData({ ...formData, medicalCertificate: e.target.value })}
                  placeholder="請描述/上傳醫療證明資訊"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.travelingWithInfant}
                  onChange={(e) => setFormData({ ...formData, travelingWithInfant: e.target.checked })}
                  className="w-5 h-5 text-ya-yellow-600 border-gray-300 rounded focus:ring-ya-yellow-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  是否攜帶嬰兒
                </span>
              </label>
            </div>

            {formData.travelingWithInfant && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  嬰兒年齡 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.infantAge}
                  onChange={(e) => setFormData({ ...formData, infantAge: e.target.value })}
                  placeholder="例如：6 個月"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                額外資料
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
              * 必填項目
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-ya-yellow-500 text-black font-semibold rounded-lg hover:bg-ya-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  提交中...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  提交申請
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
