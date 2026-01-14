'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Loader2 } from 'lucide-react'

export default function DisabilityCarePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    passengerName: '',
    email: '',
    phone: '',
    bookingNumber: '',
    flightNumber: '',
    flightDate: '',
    assistanceType: '',
    mobilityAid: '',
    wheelchairType: '',
    serviceAnimal: false,
    medicalConditions: '',
    specialRequests: '',
    additionalNotes: ''
  })
  const [bookingLookupNumber, setBookingLookupNumber] = useState('')
  const [lookingUpBooking, setLookingUpBooking] = useState(false)
  const [bookingFound, setBookingFound] = useState(false)

  const assistanceTypes = [
    { value: 'WHEELCHAIR', label: 'Rollstuhlhilfe' },
    { value: 'WALKER', label: 'Walker' },
    { value: 'CANE', label: 'Gehstöcke' },
    { value: 'HEARING_IMPAIRED', label: 'Hörbehindertenhilfe' },
    { value: 'VISION_IMPAIRED', label: 'Sehbehindertenhilfe' },
    { value: 'COGNITIVE', label: 'Kognitive/Entwicklungshelfe' },
    { value: 'OTHER', label: 'Andere' }
  ]

  const wheelchairTypes = [
    { value: 'MANUAL', label: 'Manueller Rollstuhl' },
    { value: 'ELECTRIC', label: 'Elektrischer Rollstuhl' },
    { value: 'AIRPORT_PROVIDED', label: 'Rollstuhl am Flughafen' }
  ]

  const handleBookingLookup = async () => {
    if (!bookingLookupNumber) {
      alert('Bitte geben Sie die Buchungsnummer ein')
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
        console.log('✅ 預訂信息已自動填充')
      } else {
        alert('Die Buchung wurde nicht gefunden')
      }
    } catch (error) {
      console.error('Error looking up booking:', error)
      alert('Fehler beim Suchen der Buchung, bitte versuchen Sie es später erneut')
    } finally {
      setLookingUpBooking(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!bookingFound) {
      alert('Bitte suchen Sie zuerst nach der Buchung')
      return
    }
    
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/special-assistance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'DISABILITY_CARE',
          passengerName: formData.passengerName,
          email: formData.email,
          phone: formData.phone,
          bookingNumber: formData.bookingNumber,
          flightNumber: formData.flightNumber,
          flightDate: formData.flightDate,
          details: JSON.stringify({
            assistanceType: formData.assistanceType,
            mobilityAid: formData.mobilityAid,
            wheelchairType: formData.wheelchairType,
            serviceAnimal: formData.serviceAnimal,
            medicalConditions: formData.medicalConditions,
            specialRequests: formData.specialRequests,
            additionalNotes: formData.additionalNotes,
          }),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        alert(`Das Anfrage wurde erfolgreich gesendet\n\nAnfrage-Nr.: ${data.requestNumber}`)
        router.push('/de/special-assistance')
      } else {
        alert('Anfrage fehlgeschlagen, bitte versuchen Sie es erneut')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Anfrage fehlgeschlagen, bitte versuchen Sie es erneut')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/de/special-assistance" className="inline-flex items-center text-ya-yellow-600 hover:text-ya-yellow-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zurück zur Service-Liste
        </Link>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">♿</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Barrierefreie Dienste
            </h1>
          </div>
          <p className="text-gray-600">
            Unterstützung für Reisende mit Behinderungen, Hör- oder Sehbehinderungen oder anderen Anforderungen.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Anfrageformular
          </h2>

          {/* Booking Number Lookup */}
          <div className="mb-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Buchungsnummer-Suche *
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Geben Sie Ihre Buchungsnummer ein, um Flug- und Passagierdaten automatisch einzufügen.
            </p>
            <div className="flex gap-4">
              <input
                type="text"
                value={bookingLookupNumber}
                onChange={(e) => setBookingLookupNumber(e.target.value.toUpperCase())}
                placeholder="Buchungsnummer eingeben"
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
                    Suchen...
                  </>
                ) : bookingFound ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Gefunden
                  </>
                ) : (
                  'Suchen'
                )}
              </button>
            </div>
          </div>

          {/* Passenger Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Passagierdaten
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passagier Name *
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
                  E-Mail *
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
                  Telefon *
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
                Flugdaten (optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buchungsnummer
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
                    Flugnummer
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
                    Flugdatum
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

          {/* Assistance Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Unterstützungsinformationen
            </h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benötigte Unterstützungstypen *
              </label>
              <select
                required
                value={formData.assistanceType}
                onChange={(e) => setFormData({ ...formData, assistanceType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              >
                <option value="">Bitte wählen...</option>
                {assistanceTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hilfsmittel
              </label>
              <input
                type="text"
                value={formData.mobilityAid}
                onChange={(e) => setFormData({ ...formData, mobilityAid: e.target.value })}
                placeholder="Beispiel: Rollstuhl / Gehstöcke"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              />
            </div>

            {formData.assistanceType === 'WHEELCHAIR' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rollstuhl-Typ *
                </label>
                <select
                  required
                  value={formData.wheelchairType}
                  onChange={(e) => setFormData({ ...formData, wheelchairType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen...</option>
                  {wheelchairTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.serviceAnimal}
                  onChange={(e) => setFormData({ ...formData, serviceAnimal: e.target.checked })}
                  className="w-5 h-5 text-ya-yellow-600 border-gray-300 rounded focus:ring-ya-yellow-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Diensttiere mitführen
                </span>
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medizinische Zustände (optional)
              </label>
              <textarea
                value={formData.medicalConditions}
                onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                placeholder="Beschreiben Sie Ihre medizinischen Zustände"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spezielle Anforderungen (optional)
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                placeholder="Beispiel: Aufstieg/Abstieg-Hilfe, Sitzplatzanforderungen"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zusätzliche Informationen
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
              * Pflichtfelder
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-ya-yellow-500 text-black font-semibold rounded-lg hover:bg-ya-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Senden...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Anfrage senden
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
