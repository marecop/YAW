'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCurrency } from '@/contexts/CurrencyContext'
import Link from 'next/link'
import { User, Plus, Trash2, Users, CreditCard } from 'lucide-react'

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

function PassengersPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { formatPrice } = useCurrency()

  const flightId = searchParams.get('flightId')
  const cabinClass = searchParams.get('cabinClass')
  const seatNumber = searchParams.get('seatNumber')
  const passengerCount = parseInt(searchParams.get('passengers') || '1')
  const price = parseFloat(searchParams.get('price') || '0')
  const flightDate = searchParams.get('flightDate') || ''
  
  // Roundtrip parameters
  const outboundFlightId = searchParams.get('outboundFlightId')
  const inboundFlightId = searchParams.get('inboundFlightId')
  const returnDate = searchParams.get('returnDate')
  const outboundCabinClass = searchParams.get('outboundCabinClass')
  const inboundCabinClass = searchParams.get('inboundCabinClass')
  const isRoundtrip = !!(outboundFlightId && inboundFlightId)
  
  // Debug: check received parameters
  console.log('📥 Passengers Page Params:', {
    flightId,
    cabinClass,
    flightDate,
    price,
    passengerCount,
    // Roundtrip params
    isRoundtrip,
    outboundFlightId,
    inboundFlightId,
    outboundCabinClass,
    inboundCabinClass,
    returnDate
  })

  const [flight, setFlight] = useState<any>(null)
  const [outboundFlight, setOutboundFlight] = useState<any>(null)
  const [inboundFlight, setInboundFlight] = useState<any>(null)
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
    const loadFlights = async () => {
      try {
        const timestamp = new Date().getTime()
        
        if (isRoundtrip) {
          // Load roundtrip flights
          const [outboundRes, inboundRes] = await Promise.all([
            fetch(`/api/flights/${outboundFlightId}?_t=${timestamp}`, { cache: 'no-store' }),
            fetch(`/api/flights/${inboundFlightId}?_t=${timestamp}`, { cache: 'no-store' })
          ])
          
          if (outboundRes.ok && inboundRes.ok) {
            const outboundData = await outboundRes.json()
            const inboundData = await inboundRes.json()
            setOutboundFlight(outboundData)
            setInboundFlight(inboundData)
            console.log('✅ Loaded roundtrip flights:', outboundData.flightNumber, inboundData.flightNumber)
          }
        } else if (flightId) {
          // Load oneway flight
          const response = await fetch(`/api/flights/${flightId}?_t=${timestamp}`, { cache: 'no-store' })
          
          if (response.ok) {
            const data = await response.json()
            setFlight(data)
            console.log('✅ Loaded flight details:', data.flightNumber)
          }
        }
      } catch (error) {
        console.error('❌ Failed to load flights:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadFlights()
  }, [flightId, outboundFlightId, inboundFlightId, isRoundtrip])

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
      alert('Please fill in all required information')
      return
    }
    
    if (!emailValid) {
      alert('Please enter valid email addresses')
      return
    }

    // Redirect to payment page
    if (isRoundtrip) {
      // Roundtrip ticket
      const finalOutboundCabin = outboundCabinClass || cabinClass || 'ECONOMY'
      const finalInboundCabin = inboundCabinClass || cabinClass || 'ECONOMY'
      
      const params = new URLSearchParams({
        outboundFlightId: outboundFlightId || '',
        inboundFlightId: inboundFlightId || '',
        departureDate: flightDate,
        returnDate: returnDate || '',
        cabinClass: finalOutboundCabin,
        outboundCabinClass: finalOutboundCabin,
        inboundCabinClass: finalInboundCabin,
        passengers: JSON.stringify(passengers),
        totalPrice: (price * passengers.length).toString(),
        isRoundtrip: 'true'
      })
      router.push(`/en/booking/payment?${params.toString()}`)
    } else {
      // One way ticket
      const finalCabinClass = cabinClass || 'ECONOMY'
      
      const params = new URLSearchParams({
        flightId: flightId || '',
        flightDate: flightDate,
        cabinClass: finalCabinClass,
        seatNumber: seatNumber || '',
        passengers: JSON.stringify(passengers),
        totalPrice: (price * passengers.length).toString()
      })
      router.push(`/en/booking/payment?${params.toString()}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/en/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">Passenger Info</span>
            </li>
          </ol>
        </nav>

        {/* Flight Info Summary */}
        {isRoundtrip ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Roundtrip Flight Info</h2>
            
            {outboundFlight && (
              <div className="mb-4 pb-4 border-b">
                <h3 className="font-semibold text-gray-900 mb-2">Outbound Flight</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Flight:</span>
                    <span className="ml-2 font-medium">{outboundFlight.flightNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Route:</span>
                    <span className="ml-2 font-medium">{outboundFlight.fromCity} → {outboundFlight.toCity}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="ml-2 font-medium">{flightDate}</span>
                  </div>
                </div>
              </div>
            )}
            
            {inboundFlight && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Return Flight</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Flight:</span>
                    <span className="ml-2 font-medium">{inboundFlight.flightNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Route:</span>
                    <span className="ml-2 font-medium">{inboundFlight.fromCity} → {inboundFlight.toCity}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="ml-2 font-medium">{returnDate}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm">
                <span className="text-gray-600">Cabin:</span>
                <span className="ml-2 font-medium">
                  {cabinClass === 'ECONOMY' && 'Economy'}
                  {cabinClass === 'BUSINESS' && 'Business'}
                  {cabinClass === 'FIRST_CLASS' && 'First Class'}
                </span>
              </div>
            </div>
          </div>
        ) : flight && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Flight Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Flight:</span>
                <span className="ml-2 font-medium">{flight.flightNumber}</span>
              </div>
              <div>
                <span className="text-gray-600">Route:</span>
                <span className="ml-2 font-medium">{flight.fromCity} → {flight.toCity}</span>
              </div>
              <div>
                <span className="text-gray-600">Cabin:</span>
                <span className="ml-2 font-medium">
                  {cabinClass === 'ECONOMY' && 'Economy'}
                  {cabinClass === 'BUSINESS' && 'Business'}
                  {cabinClass === 'FIRST_CLASS' && 'First Class'}
                </span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Passenger Count Control */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-6 h-6 text-ya-yellow-600" />
                Passenger Info ({passengers.length} Passengers)
              </h2>
              <button
                type="button"
                onClick={addPassenger}
                className="flex items-center gap-2 px-4 py-2 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Passenger
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Please fill in detailed information for all passengers. Information must match passport details.
            </p>
          </div>

          {/* Passenger Forms */}
          <div className="space-y-6">
            {passengers.map((passenger, index) => (
              <div key={passenger.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Passenger {index + 1}
                  </h3>
                  {passengers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePassenger(passenger.id)}
                      className="flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passenger.firstName}
                      onChange={(e) => updatePassenger(passenger.id, 'firstName', e.target.value)}
                      className="input-field"
                      placeholder="First Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passenger.lastName}
                      onChange={(e) => updatePassenger(passenger.id, 'lastName', e.target.value)}
                      className="input-field"
                      placeholder="Last Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={passenger.email}
                      onChange={(e) => updatePassenger(passenger.id, 'email', e.target.value)}
                      className="input-field"
                      placeholder="example@email.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Booking confirmation and boarding pass will be sent to this email
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passport Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passenger.passportNumber}
                      onChange={(e) => updatePassenger(passenger.id, 'passportNumber', e.target.value.toUpperCase())}
                      className="input-field"
                      placeholder="Passport Number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nationality <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={passenger.nationality}
                      onChange={(e) => updatePassenger(passenger.id, 'nationality', e.target.value)}
                      className="select-field"
                    >
                      <option value="">Select Nationality</option>
                      <option value="CN">China</option>
                      <option value="HK">Hong Kong</option>
                      <option value="TW">Taiwan</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="JP">Japan</option>
                      <option value="KR">South Korea</option>
                      <option value="SG">Singapore</option>
                      <option value="AU">Australia</option>
                      <option value="CA">Canada</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-ya-yellow-600" />
                      Yellow Airlines Member Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={passenger.memberNumber}
                      onChange={(e) => updatePassenger(passenger.id, 'memberNumber', e.target.value.toUpperCase())}
                      className="input-field"
                      placeholder="e.g. YA123456"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Enter member number to earn points and enjoy member benefits
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary and Submit */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Breakdown</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Price per person:</span>
                <span>{formatPrice(price)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Passengers:</span>
                <span>{passengers.length}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2"></div>
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total:</span>
                <span className="text-ya-yellow-700">{formatPrice(price * passengers.length)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Payment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function PassengersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
        </div>
      </div>
    }>
      <PassengersPageContent />
    </Suspense>
  )
}
