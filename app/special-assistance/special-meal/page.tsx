'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import { ArrowLeft, Check, Loader2 } from 'lucide-react'

export default function SpecialMealPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    passengerName: '',
    email: '',
    phone: '',
    bookingNumber: '',
    flightNumber: '',
    flightDate: '',
    mealType: '',
    dietaryRestrictions: '',
    allergies: '',
    additionalNotes: ''
  })
  const [bookingLookupNumber, setBookingLookupNumber] = useState('')
  const [lookingUpBooking, setLookingUpBooking] = useState(false)
  const [bookingFound, setBookingFound] = useState(false)

  const mealTypes = [
    { value: 'VEGETARIAN', label: t('specialAssistance.specialMeal.types.vegetarian') },
    { value: 'VEGAN', label: t('specialAssistance.specialMeal.types.vegan') },
    { value: 'HALAL', label: t('specialAssistance.specialMeal.types.halal') },
    { value: 'KOSHER', label: t('specialAssistance.specialMeal.types.kosher') },
    { value: 'GLUTEN_FREE', label: t('specialAssistance.specialMeal.types.glutenFree') },
    { value: 'DIABETIC', label: t('specialAssistance.specialMeal.types.diabetic') },
    { value: 'LOW_SODIUM', label: t('specialAssistance.specialMeal.types.lowSodium') },
    { value: 'CHILD_MEAL', label: t('specialAssistance.specialMeal.types.childMeal') },
    { value: 'INFANT_MEAL', label: t('specialAssistance.specialMeal.types.infantMeal') },
  ]

  const handleBookingLookup = async () => {
    if (!bookingLookupNumber) {
      alert(t('specialAssistance.form.pleaseEnterBookingNumber'))
      return
    }

    setLookingUpBooking(true)
    
    try {
      const response = await fetch(`/api/bookings/lookup?bookingNumber=${bookingLookupNumber}`)
      
      if (response.ok) {
        const data = await response.json()
        
        // 自动填充表单
        setFormData({
          ...formData,
          passengerName: data.booking.passengerName,
          email: data.booking.passengerEmail,
          bookingNumber: data.booking.bookingNumber,
          flightNumber: data.flight.flightNumber,
          flightDate: new Date(data.flightDate).toISOString().split('T')[0]
        })
        
        setBookingFound(true)
        console.log('✅ 預訂信息已自動填充')
      } else {
        alert(t('specialAssistance.form.bookingNotFound'))
      }
    } catch (error) {
      console.error('Error looking up booking:', error)
      alert(t('specialAssistance.form.bookingLookupFailed'))
    } finally {
      setLookingUpBooking(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!bookingFound) {
      alert(t('specialAssistance.form.pleaseSearchBookingFirst'))
      return
    }
    
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/special-assistance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'SPECIAL_MEAL',
          passengerName: formData.passengerName,
          email: formData.email,
          phone: formData.phone,
          bookingNumber: formData.bookingNumber || null,
          flightNumber: formData.flightNumber || null,
          flightDate: formData.flightDate || null,
          details: JSON.stringify({
            mealType: formData.mealType,
            dietaryRestrictions: formData.dietaryRestrictions,
            allergies: formData.allergies,
            additionalNotes: formData.additionalNotes,
          }),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        alert(`✅ ${t('specialAssistance.requestSubmitted')}\n\n${t('specialAssistance.requestNumber')}: ${data.requestNumber}`)
        router.push('/special-assistance')
      } else {
        alert(t('specialAssistance.requestFailed'))
      }
    } catch (error) {
      console.error('Error submitting request:', error)
      alert(t('specialAssistance.requestFailed'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/special-assistance"
          className="inline-flex items-center text-ya-yellow-600 hover:text-ya-yellow-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('specialAssistance.backToServices')}
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">🍽️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('specialAssistance.specialMeal.title')}
            </h1>
          </div>
          <p className="text-gray-600">
            {t('specialAssistance.specialMeal.longDescription')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('specialAssistance.applicationForm')}
          </h2>

          {/* Booking Number Lookup */}
          <div className="mb-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('specialAssistance.form.bookingNumberLookup')} *
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {t('specialAssistance.form.bookingNumberLookupDesc')}
            </p>
            <div className="flex gap-4">
              <input
                type="text"
                value={bookingLookupNumber}
                onChange={(e) => setBookingLookupNumber(e.target.value.toUpperCase())}
                placeholder={t('specialAssistance.form.enterBookingNumber')}
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
                    {t('specialAssistance.form.searching')}
                  </>
                ) : bookingFound ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    {t('specialAssistance.form.found')}
                  </>
                ) : (
                  t('specialAssistance.form.search')
                )}
              </button>
            </div>
          </div>

          {/* Passenger Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('specialAssistance.passengerInfo')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('specialAssistance.form.passengerName')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.passengerName}
                  onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
                  disabled={bookingFound}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('specialAssistance.form.email')} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={bookingFound}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('specialAssistance.form.phone')} *
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

          {/* Flight Information (Auto-filled from Booking) */}
          {bookingFound && (
            <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-600" />
                {t('specialAssistance.flightInfo')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('specialAssistance.form.bookingNumber')}
                  </label>
                  <input
                    type="text"
                    value={formData.bookingNumber}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('specialAssistance.form.flightNumber')}
                  </label>
                  <input
                    type="text"
                    value={formData.flightNumber}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('specialAssistance.form.flightDate')}
                  </label>
                  <input
                    type="date"
                    value={formData.flightDate}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Special Meal Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('specialAssistance.specialMeal.mealDetails')}
            </h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('specialAssistance.specialMeal.mealType')} *
              </label>
              <select
                required
                value={formData.mealType}
                onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              >
                <option value="">{t('specialAssistance.form.selectOption')}</option>
                {mealTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('specialAssistance.specialMeal.dietaryRestrictions')}
              </label>
              <textarea
                value={formData.dietaryRestrictions}
                onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                placeholder={t('specialAssistance.specialMeal.dietaryRestrictionsPlaceholder')}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('specialAssistance.specialMeal.allergies')}
              </label>
              <textarea
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                placeholder={t('specialAssistance.specialMeal.allergiesPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('specialAssistance.form.additionalNotes')}
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              * {t('specialAssistance.form.requiredFields')}
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-ya-yellow-500 text-black font-semibold rounded-lg hover:bg-ya-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t('specialAssistance.form.submitting')}
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  {t('specialAssistance.form.submit')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

