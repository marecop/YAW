'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Plane, Search, Calendar, User, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'

function CheckInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [formData, setFormData] = useState({
    bookingReference: '',
    lastName: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const bookingRef = searchParams.get('bookingNumber')
    if (bookingRef) {
      setFormData(prev => ({ ...prev, bookingReference: bookingRef }))
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate API check
    try {
      // In real app: await checkBooking(formData)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Navigate to seat selection or confirmation
      // For demo, go straight to success
      router.push(`/es/check-in/success?bookingNumber=${formData.bookingReference}`)
    } catch (err) {
      setError('No se pudo encontrar la reserva. Verifique sus datos e intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-ya-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plane className="w-8 h-8 text-ya-yellow-600 transform -rotate-45" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Check-in Online</h1>
          <p className="text-gray-600">
            Realice el check-in de su vuelo de forma rápida y sencilla.
            <br className="hidden sm:block" />
            Disponible desde 24 horas hasta 60 minutos antes de la salida.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="bookingReference" className="block text-sm font-medium text-gray-700 mb-2">
                Referencia de Reserva
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="bookingReference"
                  value={formData.bookingReference}
                  onChange={(e) => setFormData(prev => ({ ...prev, bookingReference: e.target.value.toUpperCase() }))}
                  className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent uppercase placeholder-gray-400 transition-shadow"
                  placeholder="Ej. YA123456"
                  required
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Código alfanumérico de 6 caracteres que se encuentra en su confirmación.
              </p>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Apellido del Pasajero
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent placeholder-gray-400 transition-shadow"
                  placeholder="Como aparece en el pasaporte"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ya-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-ya-yellow-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  Buscando...
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link href="/es/bookings" className="text-ya-yellow-600 font-medium hover:text-ya-yellow-700 transition-colors">
            ¿Necesita encontrar su número de reserva?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CheckInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600"></div>
      </div>
    }>
      <CheckInForm />
    </Suspense>
  )
}
