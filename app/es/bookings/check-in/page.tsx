'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Search, Plane, Clock, User, QrCode } from 'lucide-react'

export default function CheckInPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    bookingReference: '',
    lastName: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // API call to verify booking
      const response = await fetch('/api/bookings/check-in/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'No se encontró la reserva')
      }

      // Redirect to check-in flow with booking ID
      router.push(`/es/check-in/${data.bookingId}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Check-in Online</h1>
          <p className="text-lg text-gray-600">
            Realice el check-in entre 48 horas y 90 minutos antes de la salida
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-gray-50 border-b border-gray-200 p-6">
            <div className="flex justify-between items-center max-w-lg mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-ya-yellow-500 flex items-center justify-center text-white font-bold mb-2">1</div>
                <span className="text-sm font-medium text-gray-900">Buscar Reserva</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center opacity-50">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold mb-2">2</div>
                <span className="text-sm font-medium text-gray-500">Confirmar Pasajero</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center opacity-50">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold mb-2">3</div>
                <span className="text-sm font-medium text-gray-500">Obtener Tarjeta de Embarque</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="bookingReference" className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Referencia de Reserva
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="bookingReference"
                    required
                    value={formData.bookingReference}
                    onChange={(e) => setFormData({ ...formData, bookingReference: e.target.value.toUpperCase() })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-ya-yellow-500 focus:border-ya-yellow-500"
                    placeholder="Ej: AB12CD"
                    maxLength={6}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Código de 6 caracteres (letras y números), que se encuentra en su correo de confirmación
                </p>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido del Pasajero
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-ya-yellow-500 focus:border-ya-yellow-500"
                    placeholder="Apellido como aparece en el pasaporte"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-ya-yellow-600 hover:bg-ya-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ya-yellow-500 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Buscando...
                  </span>
                ) : (
                  'Continuar Check-in'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Horario de Check-in</h3>
            <p className="text-sm text-gray-600">
              El check-in online abre 48 horas antes y cierra 90 minutos antes de la salida del vuelo.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Tarjeta de Embarque Móvil</h3>
            <p className="text-sm text-gray-600">
              Guarde su tarjeta de embarque en su teléfono para un paso rápido por seguridad y embarque.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Plane className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Mostrador de Aeropuerto</h3>
            <p className="text-sm text-gray-600">
              Si tiene equipaje para facturar, por favor llegue al mostrador al menos 60 minutos antes de la salida.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
