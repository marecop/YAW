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
    { value: 'OXYGEN', label: '氧氣' },
    { value: 'CPAP', label: 'CPAP 呼吸機' },
    { value: 'VENTILATOR', label: '呼吸機' },
    { value: 'WHEELCHAIR_MEDICAL', label: '醫療輪椅' },
    { value: 'STRETCHER', label: '擔架' },
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
        alert(`✅ 申請已提交\n\n申請編號: ${data.requestNumber}`)
        router.push('/zh-hk/special-assistance')
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
        <Link href="/zh-hk/special-assistance" className="inline-flex items-center text-ya-yellow-600 hover:text-ya-yellow-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回服務列表
        </Link>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-red-500 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">❤️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              醫療協助
            </h1>
          </div>
          <p className="text-gray-600">
            如您有醫療需求或需要攜帶醫療設備，請提前提交申請，我哋會與您確認安排。
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

          {/* Medical Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              醫療資料
            </h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                病況 / 需求 *
              </label>
              <textarea
                required
                value={formData.medicalCondition}
                onChange={(e) => setFormData({ ...formData, medicalCondition: e.target.value })}
                rows={3}
                placeholder="請描述您的病況或需要的協助"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                醫療設備
              </label>
              <select
                value={formData.medicalEquipment}
                onChange={(e) => setFormData({ ...formData, medicalEquipment: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              >
                <option value="">請選擇...</option>
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
                  需要氧氣
                </span>
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                藥物資訊
              </label>
              <textarea
                value={formData.medicationDetails}
                onChange={(e) => setFormData({ ...formData, medicationDetails: e.target.value })}
                rows={3}
                placeholder="請填寫需要攜帶或服用的藥物資訊"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                醫生證明
              </label>
              <input
                type="text"
                value={formData.doctorCertificate}
                onChange={(e) => setFormData({ ...formData, doctorCertificate: e.target.value })}
                placeholder="請填寫/上傳醫生證明資訊"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  緊急聯絡人 *
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
                  緊急聯絡電話 *
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
