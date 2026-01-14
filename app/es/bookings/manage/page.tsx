'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Calendar, User, ArrowRight } from 'lucide-react'

export default function ManageBookingPage() {
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
      const response = await fetch(`/api/bookings/manage/verify`, {
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

      router.push(`/es/bookings/${data.bookingId}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Gestionar mi Reserva
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Ver detalles del itinerario, seleccionar asientos, comprar comidas o equipaje adicional
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
          {/* Left Side - Form */}
          <div className="p-8 md:w-1/2">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Buscar Reserva</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Referencia
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.bookingReference}
                    onChange={(e) => setFormData({ ...formData, bookingReference: e.target.value.toUpperCase() })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-ya-yellow-500 focus:border-ya-yellow-500 uppercase placeholder-gray-400"
                    placeholder="Ej: A1B2C3"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Código de 6 dígitos que se encuentra en el correo de confirmación
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido del Pasajero
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-ya-yellow-500 focus:border-ya-yellow-500 placeholder-gray-400"
                    placeholder="Ej: WONG"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-ya-yellow-600 hover:bg-ya-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ya-yellow-500 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Buscar Reserva <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Side - Features */}
          <div className="bg-ya-navy-900 p-8 md:w-1/2 text-white flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-6">¿Qué puede hacer aquí?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-ya-yellow-500 flex items-center justify-center mt-0.5">
                  <CheckIcon className="h-4 w-4 text-ya-navy-900" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">Ver detalles del itinerario</p>
                  <p className="text-sm text-gray-300">Verifique horarios de vuelo y terminales</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-ya-yellow-500 flex items-center justify-center mt-0.5">
                  <CheckIcon className="h-4 w-4 text-ya-navy-900" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">Seleccionar asientos</p>
                  <p className="text-sm text-gray-300">Elija su asiento favorito con anticipación</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-ya-yellow-500 flex items-center justify-center mt-0.5">
                  <CheckIcon className="h-4 w-4 text-ya-navy-900" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">Servicios adicionales</p>
                  <p className="text-sm text-gray-300">Compre equipaje extra o comidas especiales</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-ya-yellow-500 flex items-center justify-center mt-0.5">
                  <CheckIcon className="h-4 w-4 text-ya-navy-900" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">Actualizar información</p>
                  <p className="text-sm text-gray-300">Actualice información de contacto y documentos</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/es/check-in" className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-ya-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Check-in Online</h3>
                <p className="mt-1 text-sm text-gray-500">Disponible 48 horas antes del vuelo</p>
              </div>
            </div>
          </Link>
          {/* Add more quick links if needed */}
        </div>
      </div>
    </div>
  )
}

function CheckIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}
