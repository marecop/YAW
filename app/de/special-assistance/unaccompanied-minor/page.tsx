'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Loader2 } from 'lucide-react'

export default function UnaccompaniedMinorPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    passengerName: '',
    email: '',
    phone: '',
    bookingNumber: '',
    flightNumber: '',
    flightDate: '',
    childName: '',
    childAge: '',
    childGender: '',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    emergencyContact: '',
    emergencyPhone: '',
    pickupPersonName: '',
    pickupPersonPhone: '',
    pickupPersonID: '',
    medicalConditions: '',
    additionalNotes: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/special-assistance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'UNACCOMPANIED_MINOR',
          passengerName: formData.passengerName,
          email: formData.email,
          phone: formData.phone,
          bookingNumber: formData.bookingNumber || null,
          flightNumber: formData.flightNumber || null,
          flightDate: formData.flightDate || null,
          details: JSON.stringify({
            childName: formData.childName,
            childAge: formData.childAge,
            childGender: formData.childGender,
            guardianName: formData.guardianName,
            guardianRelation: formData.guardianRelation,
            guardianPhone: formData.guardianPhone,
            emergencyContact: formData.emergencyContact,
            emergencyPhone: formData.emergencyPhone,
            pickupPersonName: formData.pickupPersonName,
            pickupPersonPhone: formData.pickupPersonPhone,
            pickupPersonID: formData.pickupPersonID,
            medicalConditions: formData.medicalConditions,
            additionalNotes: formData.additionalNotes,
          }),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        alert(`✅ Anfrage wurde erfolgreich gesendet\n\nAnfrage-Nr.: ${data.requestNumber}`)
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
            <div className="bg-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">👶</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Unbegleitete Kinder-Service
            </h1>
          </div>
          <p className="text-gray-600">
            Wir bieten eine vollständige Begleitungsdienst für unbegleitete Kinder an. Von der Einreise-Prozedur bis zur Ankunft beim Empfänger-Personen, sorgen unsere Mitarbeiter für eine sorgfältige Betreuung, um die Sicherheit und Freude Ihres Kindes zu gewährleisten. Gilt für Kinder im Alter von 5-11 Jahren (muss beantragt werden), 12-17 Jahre alt Kinder können freiwillig beantragen.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Service-Antragstellung
          </h2>

          {/* Guardian Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ansprechpartner/Antragsteller-Informationen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Antragsteller-Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.passengerName}
                  onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kontakt-Telefon *
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

          {/* Child Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Kinder-Informationen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kinder-Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.childName}
                  onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alter *
                </label>
                <input
                  type="number"
                  required
                  min="5"
                  max="17"
                  value={formData.childAge}
                  onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Geschlecht *
                </label>
                <select
                  required
                  value={formData.childGender}
                  onChange={(e) => setFormData({ ...formData, childGender: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen...</option>
                  <option value="MALE">Männlich</option>
                  <option value="FEMALE">Weiblich</option>
                </select>
              </div>
            </div>
          </div>

          {/* Flight Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Fluginformationen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buchungsnummer
                </label>
                <input
                  type="text"
                  value={formData.bookingNumber}
                  onChange={(e) => setFormData({ ...formData, bookingNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flugnummer
                </label>
                <input
                  type="text"
                  value={formData.flightNumber}
                  onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flugdatum
                </label>
                <input
                  type="date"
                  value={formData.flightDate}
                  onChange={(e) => setFormData({ ...formData, flightDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Pickup Person Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Empfänger-Personen-Informationen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Empfänger-Personen-Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.pickupPersonName}
                  onChange={(e) => setFormData({ ...formData, pickupPersonName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Empfänger-Personen-Telefon *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.pickupPersonPhone}
                  onChange={(e) => setFormData({ ...formData, pickupPersonPhone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Empfänger-Personen-ID *
                </label>
                <input
                  type="text"
                  required
                  value={formData.pickupPersonID}
                  onChange={(e) => setFormData({ ...formData, pickupPersonID: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                  placeholder="Empfänger-Personen-ID beim Empfang benötigt"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Notfall-Kontakt
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
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
                  Telefon *
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
          </div>

          {/* Additional Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Andere Informationen
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medizinische Bedingungen/Allergien
              </label>
              <textarea
                value={formData.medicalConditions}
                onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                placeholder="Wenn Sie besondere medizinische Bedingungen oder Allergien haben, bitte hier beschreiben"
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notizen
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

