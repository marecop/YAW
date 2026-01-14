'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCurrency } from '@/contexts/CurrencyContext'
import Link from 'next/link'
import { User, Plus, Trash2, Users, CreditCard, Plane, Clock } from 'lucide-react'
import AirlineLogo from '@/components/AirlineLogo'

interface Passenger {
  id: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  passportNumber: string
  nationality: string
  memberNumber?: string
}

function ConnectionPassengersPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { formatPrice } = useCurrency()

  const connectionId = searchParams.get('connectionId')
  const segment1Id = searchParams.get('segment1')
  const segment2Id = searchParams.get('segment2')
  const cabinClass = searchParams.get('cabinClass')
  const passengerCount = parseInt(searchParams.get('passengers') || '1')
  const flightDate = searchParams.get('flightDate') || ''
  const totalPrice = parseFloat(searchParams.get('totalPrice') || '0')

  const [segment1, setSegment1] = useState<any>(null)
  const [segment2, setSegment2] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: '1',
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      passportNumber: '',
      nationality: '',
      memberNumber: ''
    }
  ])

  useEffect(() => {
    if (segment1Id && segment2Id) {
      fetchFlights()
    }
  }, [segment1Id, segment2Id])

  useEffect(() => {
    // Adjust form based on passenger count
    if (passengerCount > passengers.length) {
      const newPassengers = [...passengers]
      for (let i = passengers.length; i < passengerCount; i++) {
        newPassengers.push({
          id: (i + 1).toString(),
          firstName: '',
          lastName: '',
          email: '',
          dateOfBirth: '',
          passportNumber: '',
          nationality: '',
          memberNumber: ''
        })
      }
      setPassengers(newPassengers)
    } else if (passengerCount < passengers.length) {
      setPassengers(passengers.slice(0, passengerCount))
    }
  }, [passengerCount])

  const fetchFlights = async () => {
    try {
      const [res1, res2] = await Promise.all([
        fetch(`/api/flights/${segment1Id}`),
        fetch(`/api/flights/${segment2Id}`)
      ])
      
      if (res1.ok && res2.ok) {
        const data1 = await res1.json()
        const data2 = await res2.json()
        setSegment1(data1)
        setSegment2(data2)
      }
    } catch (error) {
      console.error('Error fetching flights:', error)
    } finally {
      setLoading(false)
    }
  }

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        id: (passengers.length + 1).toString(),
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        passportNumber: '',
        nationality: '',
        memberNumber: ''
      }
    ])
  }

  const removePassenger = (id: string) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter(p => p.id !== id))
    }
  }

  const updatePassenger = (id: string, field: keyof Passenger, value: string) => {
    setPassengers(passengers.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all passenger info
    const allValid = passengers.every(p => 
      p.firstName && p.lastName && p.email && p.dateOfBirth && p.passportNumber && p.nationality
    )
    
    // Validate email format
    const emailValid = passengers.every(p => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(p.email)
    })

    if (!allValid) {
      alert('Por favor complete todos los campos obligatorios')
      return
    }
    
    if (!emailValid) {
      alert('Por favor ingrese una dirección de correo electrónico válida')
      return
    }

    // Redirect to payment page
    const params = new URLSearchParams({
      connectionId: connectionId || '',
      segment1: segment1Id || '',
      segment2: segment2Id || '',
      flightDate: flightDate,
      cabinClass: cabinClass || '',
      passengers: JSON.stringify(passengers),
      totalPrice: totalPrice.toString()
    })
    
    router.push(`/es/booking/payment?${params.toString()}`)
  }

  const getCabinClassName = (cabin: string) => {
    switch (cabin) {
      case 'ECONOMY': return 'Económica'
      case 'BUSINESS': return 'Negocios'
      case 'FIRST_CLASS': return 'Primera Clase'
      default: return cabin
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-secondary">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/es/" className="text-text-secondary hover:text-navy">Inicio</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-navy font-medium">Información del Pasajero de Vuelo con Conexión</span>
            </li>
          </ol>
        </nav>

        {/* Connection Flight Info Summary */}
        {segment1 && segment2 && (
          <div className="card-modern p-6 mb-6">
            <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <Plane className="w-6 h-6 text-primary" />
              Información del Vuelo con Conexión
            </h2>
            
            {/* First Segment */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Tramo 1
                </span>
                <span className="text-sm font-medium text-navy">{segment1.flightNumber}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <AirlineLogo 
                    airline={segment1.airline}
                    airlineCode={segment1.airlineCode}
                    airlineLogo={segment1.airlineLogo}
                    size="sm"
                  />
                  <span className="font-medium">{segment1.airline}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Ruta:</span>
                  <span className="ml-2 font-medium">{segment1.fromCity} → {segment1.toCity}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Duración:</span>
                  <span className="ml-2 font-medium">{segment1.duration}</span>
                </div>
              </div>
            </div>

            {/* Connection Info */}
            <div className="flex items-center justify-center my-3">
              <div className="flex items-center gap-2 text-orange-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Conexión en {segment1.toCity}</span>
              </div>
            </div>

            {/* Second Segment */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Tramo 2
                </span>
                <span className="text-sm font-medium text-navy">{segment2.flightNumber}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <AirlineLogo 
                    airline={segment2.airline}
                    airlineCode={segment2.airlineCode}
                    airlineLogo={segment2.airlineLogo}
                    size="sm"
                  />
                  <span className="font-medium">{segment2.airline}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Ruta:</span>
                  <span className="ml-2 font-medium">{segment2.fromCity} → {segment2.toCity}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Duración:</span>
                  <span className="ml-2 font-medium">{segment2.duration}</span>
                </div>
              </div>
            </div>

            {/* Cabin Info */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-text-secondary">Clase:</span>
                  <span className="ml-2 font-medium text-navy">{getCabinClassName(cabinClass || '')}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Fecha de salida:</span>
                  <span className="ml-2 font-medium text-navy">{flightDate}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Passenger Count Control */}
          <div className="card-modern p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Información del pasajero ({passengers.length} pasajero(s))
              </h2>
              <button
                type="button"
                onClick={addPassenger}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-navy font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Plus className="w-4 h-4" />
                Añadir pasajero
              </button>
            </div>
            <p className="text-sm text-text-secondary mb-6">
              Por favor complete la información detallada de todos los pasajeros. La información debe coincidir con el pasaporte.
            </p>
          </div>

          {/* Passenger Form */}
          <div className="space-y-6">
            {passengers.map((passenger, index) => (
              <div key={passenger.id} className="card-modern p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-navy">
                    Pasajero {index + 1}
                  </h3>
                  {passengers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePassenger(passenger.id)}
                      className="flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passenger.firstName}
                      onChange={(e) => updatePassenger(passenger.id, 'firstName', e.target.value)}
                      className="input-field"
                      placeholder="Ingrese el nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Apellido <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passenger.lastName}
                      onChange={(e) => updatePassenger(passenger.id, 'lastName', e.target.value)}
                      className="input-field"
                      placeholder="Ingrese el apellido"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={passenger.email}
                      onChange={(e) => updatePassenger(passenger.id, 'email', e.target.value)}
                      className="input-field"
                      placeholder="ejemplo@email.com"
                    />
                    <p className="text-xs text-text-secondary mt-1">
                      La confirmación de la reserva y la tarjeta de embarque se enviarán a este correo
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Fecha de nacimiento <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={passenger.dateOfBirth}
                      onChange={(e) => updatePassenger(passenger.id, 'dateOfBirth', e.target.value)}
                      className="input-field"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Número de pasaporte <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passenger.passportNumber}
                      onChange={(e) => updatePassenger(passenger.id, 'passportNumber', e.target.value.toUpperCase())}
                      className="input-field"
                      placeholder="Ingrese el número de pasaporte"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Nacionalidad <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={passenger.nationality}
                      onChange={(e) => updatePassenger(passenger.id, 'nationality', e.target.value)}
                      className="select-field"
                    >
                      <option value="">Seleccione nacionalidad</option>
                      <option value="CN">China</option>
                      <option value="HK">Hong Kong, China</option>
                      <option value="TW">Taiwán, China</option>
                      <option value="US">Estados Unidos</option>
                      <option value="GB">Reino Unido</option>
                      <option value="JP">Japón</option>
                      <option value="KR">Corea del Sur</option>
                      <option value="SG">Singapur</option>
                      <option value="AU">Australia</option>
                      <option value="CA">Canadá</option>
                      <option value="FR">Francia</option>
                      <option value="DE">Alemania</option>
                      <option value="ES">España</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Número de miembro (Opcional)
                    </label>
                    <input
                      type="text"
                      value={passenger.memberNumber}
                      onChange={(e) => updatePassenger(passenger.id, 'memberNumber', e.target.value.toUpperCase())}
                      className="input-field"
                      placeholder="Ej: YA123456"
                    />
                    <p className="mt-1 text-xs text-text-secondary">
                      Ingrese el número de miembro para disfrutar de acumulación de puntos y beneficios
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary and Submit */}
          <div className="card-modern p-6 mt-6">
            <h3 className="text-lg font-semibold text-navy mb-4">Detalles del Costo</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-text-secondary">
                <span>Precio por persona:</span>
                <span>{formatPrice(totalPrice / passengerCount)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Número de pasajeros:</span>
                <span>{passengers.length}</span>
              </div>
              <div className="border-t border-border pt-2 mt-2"></div>
              <div className="flex justify-between text-xl font-bold text-navy">
                <span>Total:</span>
                <span className="text-primary">{formatPrice(totalPrice / passengerCount * passengers.length)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-border text-navy font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Volver
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-navy font-bold rounded-lg hover:bg-primary-dark transition-all transform hover:scale-105"
              >
                <CreditCard className="w-5 h-5" />
                Continuar al pago
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ConnectionPassengersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    }>
      <ConnectionPassengersPageContent />
    </Suspense>
  )
}
