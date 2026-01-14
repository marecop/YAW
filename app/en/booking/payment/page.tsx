'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCurrency } from '@/contexts/CurrencyContext'
import { useAuth } from '@/contexts/AuthContext'
import { checkAndUpdateDBVersion } from '@/lib/dbVersion'
import Link from 'next/link'
import { CreditCard, Lock, CheckCircle2, Plane } from 'lucide-react'

function PaymentPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { formatPrice } = useCurrency()
  const { user } = useAuth()

  const flightId = searchParams.get('flightId')
  const flightDate = searchParams.get('flightDate') || searchParams.get('departureDate') || ''  // Accept both param names
  const cabinClass = searchParams.get('cabinClass')
  const seatNumber = searchParams.get('seatNumber')
  const passengersParam = searchParams.get('passengers')
  const totalPrice = parseFloat(searchParams.get('totalPrice') || '0')
  
  // Connection flight params
  const connectionId = searchParams.get('connectionId')
  const segment1Id = searchParams.get('segment1')
  const segment2Id = searchParams.get('segment2')
  const isConnectionFlight = !!(connectionId && segment1Id && segment2Id)
  
  // Roundtrip params
  const outboundFlightId = searchParams.get('outboundFlightId')
  const inboundFlightId = searchParams.get('inboundFlightId')
  const returnDate = searchParams.get('returnDate')
  const outboundCabinClass = searchParams.get('outboundCabinClass')
  const inboundCabinClass = searchParams.get('inboundCabinClass')
  const isRoundtrip = searchParams.get('isRoundtrip') === 'true' && outboundFlightId && inboundFlightId

  const [passengers, setPassengers] = useState<any[]>([])
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  // Check DB version
  useEffect(() => {
    const versionMatches = checkAndUpdateDBVersion()
    if (!versionMatches) {
      console.log('🔄 Database version updated, clearing cache and refreshing...')
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }, [])

  useEffect(() => {
    if (passengersParam) {
      try {
        const parsed = JSON.parse(passengersParam)
        setPassengers(parsed)
        console.log('👥 Passengers loaded:', parsed.length)
      } catch (e) {
        console.error('❌ Failed to parse passenger info:', e)
      }
    }
  }, [passengersParam])

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    const chunks = cleaned.match(/.{1,4}/g) || []
    return chunks.join(' ')
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '')
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(value)
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4)
    }
    if (value.length <= 5) {
      setExpiryDate(value)
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsProcessing(true)

    // Simple validation
    if (cardNumber.length !== 16) {
      setError('Please enter a valid 16-digit card number')
      setIsProcessing(false)
      return
    }

    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
      setError('Please enter a valid expiry date (MM/YY)')
      setIsProcessing(false)
      return
    }

    if (cvv.length !== 3) {
      setError('Please enter a valid 3-digit CVV')
      setIsProcessing(false)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      if (isRoundtrip) {
        // ========== Roundtrip Logic ==========
        console.log('💳 Processing roundtrip payment...')
        // ... (logging remains same)

        // 1. Get flight info
        const outboundFlightResponse = await fetch(`/api/flights/${outboundFlightId}?_t=${new Date().getTime()}`, {
          cache: 'no-store'
        })
        if (!outboundFlightResponse.ok) {
          throw new Error('Unable to fetch outbound flight info')
        }
        const outboundFlight = await outboundFlightResponse.json()
        
        const inboundFlightResponse = await fetch(`/api/flights/${inboundFlightId}?_t=${new Date().getTime()}`, {
          cache: 'no-store'
        })
        if (!inboundFlightResponse.ok) {
          throw new Error('Unable to fetch inbound flight info')
        }
        const inboundFlight = await inboundFlightResponse.json()

        console.log('✅ Flight info retrieved')
        
        // 3. Calculate price
        const outboundCabinType = (outboundCabinClass || cabinClass || 'ECONOMY').toUpperCase()
        const inboundCabinType = (inboundCabinClass || cabinClass || 'ECONOMY').toUpperCase()
        
        let outboundPrice = 0
        let inboundPrice = 0
        
        // Price switch logic (same as before)
        switch (outboundCabinType) {
          case 'ECONOMY': outboundPrice = outboundFlight.economyPrice; break;
          case 'PREMIUM_ECONOMY': outboundPrice = outboundFlight.premiumEconomyPrice; break;
          case 'BUSINESS': outboundPrice = outboundFlight.businessPrice; break;
          case 'FIRST_CLASS': outboundPrice = outboundFlight.firstClassPrice; break;
        }
        
        switch (inboundCabinType) {
          case 'ECONOMY': inboundPrice = inboundFlight.economyPrice; break;
          case 'PREMIUM_ECONOMY': inboundPrice = inboundFlight.premiumEconomyPrice; break;
          case 'BUSINESS': inboundPrice = inboundFlight.businessPrice; break;
          case 'FIRST_CLASS': inboundPrice = inboundFlight.firstClassPrice; break;
        }
        
        // 4. Create bookings
        for (let i = 0; i < passengers.length; i++) {
          const passenger = passengers[i]
          
          // Outbound
          console.log(`📝 Creating outbound booking ${i + 1}/${passengers.length}:`, `${passenger.firstName} ${passenger.lastName}`)
          const outboundBookingData = {
            flightId: outboundFlightId,
            flightDate: flightDate,
            cabinClass: outboundCabinType,
            passengerName: `${passenger.firstName} ${passenger.lastName}`,
            passengerEmail: passenger.email,
            passengerPhone: '+852 0000 0000',
            passportNumber: passenger.passportNumber,
            nationality: passenger.nationality,
            dateOfBirth: passenger.dateOfBirth,
            memberNumber: passenger.memberNumber || '',
            totalPrice: outboundPrice,
            paymentMethod: 'CREDIT_CARD',
            paymentDetails: {
              cardLast4: cardNumber.slice(-4),
              cardHolder: cardName,
            },
            isRoundtrip: true,
            userEmail: user?.email || passenger.email,
          }

          const outboundResponse = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(outboundBookingData),
          })

          if (!outboundResponse.ok) {
            const errorData = await outboundResponse.json()
            throw new Error(`Outbound booking failed: ${errorData.error || 'Unknown error'}`)
          }
          
          // Inbound
          console.log(`📝 Creating inbound booking ${i + 1}/${passengers.length}:`, `${passenger.firstName} ${passenger.lastName}`)
          const inboundBookingData = {
            flightId: inboundFlightId,
            flightDate: returnDate,
            cabinClass: inboundCabinType,
            passengerName: `${passenger.firstName} ${passenger.lastName}`,
            passengerEmail: passenger.email,
            passengerPhone: '+852 0000 0000',
            passportNumber: passenger.passportNumber,
            nationality: passenger.nationality,
            dateOfBirth: passenger.dateOfBirth,
            memberNumber: passenger.memberNumber || '',
            totalPrice: inboundPrice,
            paymentMethod: 'CREDIT_CARD',
            paymentDetails: {
              cardLast4: cardNumber.slice(-4),
              cardHolder: cardName,
            },
            isRoundtrip: true,
            userEmail: user?.email || passenger.email,
          }

          const inboundResponse = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(inboundBookingData),
          })

          if (!inboundResponse.ok) {
            const errorData = await inboundResponse.json()
            throw new Error(`Inbound booking failed: ${errorData.error || 'Unknown error'}`)
          }
        }
        
        console.log('✅ Roundtrip booking successful!')
        alert(`Booking Successful!\nTotal: HKD ${(outboundPrice + inboundPrice) * passengers.length}`)
        router.push('/en/member/bookings')
        return
      } else if (isConnectionFlight) {
        // ========== Connection Flight Logic ==========
        console.log('💳 Processing connection flight payment...')
        // ... logging

        for (const segmentFlightId of [segment1Id, segment2Id]) {
          for (let i = 0; i < passengers.length; i++) {
            const passenger = passengers[i]
            console.log(`📝 Creating connection booking:`, `${passenger.firstName} ${passenger.lastName}`, segmentFlightId)
            
            const bookingData = {
              flightId: segmentFlightId,
              flightDate,
              cabinClass: cabinClass?.toUpperCase(),
              passengerName: `${passenger.firstName} ${passenger.lastName}`,
              passengerEmail: passenger.email,
              passengerPhone: '+852 0000 0000',
              passportNumber: passenger.passportNumber,
              nationality: passenger.nationality,
              dateOfBirth: passenger.dateOfBirth,
              memberNumber: passenger.memberNumber || '',
              totalPrice: totalPrice / 2, // Assume split price
              paymentMethod: 'CREDIT_CARD',
              paymentDetails: {
                cardLast4: cardNumber.slice(-4),
                cardHolder: cardName,
              },
              isConnection: true,
              connectionId: connectionId,
            }

            const response = await fetch('/api/bookings', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
              },
              body: JSON.stringify(bookingData),
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.error || 'Booking failed')
            }
          }
        }
        
        console.log('✅ Connection flight booking successful!')
        router.push('/en/member/bookings')
        return
      }

      // ========== Oneway Flight Logic ==========
      console.log('💳 Processing oneway flight payment...')
      
      // 1. Get flight info
      const timestamp = new Date().getTime()
      const flightResponse = await fetch(`/api/flights/${flightId}?_t=${timestamp}`, {
        cache: 'no-store'
      })
      
      if (!flightResponse.ok) {
        throw new Error('Unable to fetch flight info')
      }
      
      const flightData = await flightResponse.json()
      console.log('✅ Flight info retrieved:', flightData.flightNumber)
      
      // 2. Get price from DB
      const cabinType = (cabinClass || 'ECONOMY').toUpperCase()
      let singlePrice = 0
      
      switch (cabinType) {
        case 'ECONOMY': singlePrice = flightData.economyPrice; break;
        case 'PREMIUM_ECONOMY': singlePrice = flightData.premiumEconomyPrice; break;
        case 'BUSINESS': singlePrice = flightData.businessPrice; break;
        case 'FIRST_CLASS': singlePrice = flightData.firstClassPrice; break;
        default: singlePrice = flightData.economyPrice;
      }
      
      // 3. Create bookings
      const bookings = []
      const emailResults: { email: string; success: boolean }[] = []
      
      for (let i = 0; i < passengers.length; i++) {
        const passenger = passengers[i]
        console.log(`📝 Creating booking ${i + 1}/${passengers.length}:`, `${passenger.firstName} ${passenger.lastName}`)
        
        const bookingData = {
          flightId,
          flightDate,
          cabinClass: cabinType,
          seatNumber,
          passengerName: `${passenger.firstName} ${passenger.lastName}`,
          passengerEmail: passenger.email,
          passengerPhone: '+852 0000 0000',
          passportNumber: passenger.passportNumber,
          nationality: passenger.nationality,
          dateOfBirth: passenger.dateOfBirth,
          memberNumber: passenger.memberNumber,
          totalPrice: singlePrice,
          userEmail: user?.email || passenger.email,
        }
        
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        })

        if (response.ok) {
          const data = await response.json()
          bookings.push(data.booking)

          // Send confirmation email
          try {
            const emailResponse = await fetch('/api/send-booking-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: passenger.email,
                bookingNumber: data.booking.bookingNumber,
                passengerName: `${passenger.firstName} ${passenger.lastName}`,
                flightNumber: flightData.flightNumber,
                from: flightData.from,
                fromCity: flightData.fromCity,
                to: flightData.to,
                toCity: flightData.toCity,
                departureTime: flightData.departureTime,
                arrivalTime: flightData.arrivalTime,
                flightDate: flightDate,
                cabinClass: cabinClass?.toUpperCase(),
                seatNumber: seatNumber,
                totalPrice: totalPrice / passengers.length,
              }),
            })
            
            if (emailResponse.ok) {
              emailResults.push({ email: passenger.email, success: true })
              console.log('✅ Confirmation email sent to', passenger.email)
            } else {
              emailResults.push({ email: passenger.email, success: false })
              console.error('❌ Failed to send email:', passenger.email)
            }
          } catch (emailError) {
            emailResults.push({ email: passenger.email, success: false })
            console.error('❌ Email error:', emailError)
          }
        }
      }

      // Show email result alert
      if (emailResults.length > 0) {
        const successCount = emailResults.filter(r => r.success).length
        if (successCount === emailResults.length) {
          alert(`✅ Booking Successful!\n\nConfirmation emails sent to:\n${emailResults.map(r => `  • ${r.email}`).join('\n')}\n\nPlease check your inbox (including spam folder)`)
        } else if (successCount > 0) {
          alert(`⚠️ Booking Successful!\n\nSome emails sent:\n${emailResults.filter(r => r.success).map(r => `  ✅ ${r.email}`).join('\n')}\n${emailResults.filter(r => !r.success).map(r => `  ❌ ${r.email}`).join('\n')}`)
        } else {
          alert(`⚠️ Booking Successful!\n\nBut email delivery failed. Please check "My Bookings" for details.`)
        }
      }

      if (bookings.length > 0) {
        router.push('/en/bookings')
      }
    } catch (err: any) {
      setError('Payment processing failed, please try again')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="ml-2 text-gray-900 font-medium">Payment</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-ya-yellow-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-ya-yellow-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
                  <p className="text-sm text-gray-600">Please enter your card details</p>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={formatCardNumber(cardNumber)}
                      onChange={handleCardNumberChange}
                      className="w-full px-4 pl-11 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-ya-yellow-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    This is a simulation, no real payment will be charged
                  </p>
                </div>

                {/* Card Holder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Holder Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="input-field"
                    placeholder="Name on card"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Expiry Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      className="input-field"
                      placeholder="MM/YY"
                    />
                  </div>

                  {/* CVV */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={cvv}
                      onChange={handleCvvChange}
                      className="input-field"
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Secure Payment</p>
                    <p>Your payment information is encrypted securely. This is a simulation system.</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isProcessing}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 disabled:opacity-50 transition-colors"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Pay {formatPrice(totalPrice)}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Passengers:</span>
                  <span className="font-medium">{passengers.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cabin:</span>
                  <span className="font-medium">
                    {cabinClass === 'economy' && 'Economy'}
                    {cabinClass === 'business' && 'Business'}
                    {cabinClass === 'firstClass' && 'First Class'}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Passenger List:</h4>
                <ul className="space-y-1">
                  {passengers.map((p, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      {i + 1}. {p.firstName} {p.lastName}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total:</span>
                  <span className="text-ya-yellow-700">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
        </div>
      </div>
    }>
      <PaymentPageContent />
    </Suspense>
  )
}
