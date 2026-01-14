'use client'

import { use, useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, Luggage, Utensils, RefreshCw, X, Plane, Leaf, Zap } from 'lucide-react'

interface CabinOption {
  id: string
  name: string
  nameEn: string
  price: number
  seatsAvailable: number
  recommended?: boolean
  features: {
    modifications: {
      allowed: boolean
      fee?: number
      notes?: string
    }
    refund: {
      allowed: boolean
      fee?: number
      notes?: string
    }
    cabinBaggage: {
      pieces: number
      weight: number
      size: string
    }
    checkedBaggage: {
      pieces: number
      weight: number
    }
    personalItem: {
      allowed: boolean
      size?: string
    }
    meals: {
      included: boolean
      type?: string
    }
    seatSelection: {
      included: boolean
      type?: string
    }
    specialFeatures?: string[]
  }
}

function SelectCabinContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const flightId = searchParams.get('flightId')
  const cabinClass = searchParams.get('cabinClass')
  const passengers = parseInt(searchParams.get('passengers') || '1')

  const [flight, setFlight] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (flightId) {
      fetch(`/api/flights/${flightId}`)
        .then(res => res.json())
        .then(data => {
          setFlight(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Failed to fetch flight:', err)
          setLoading(false)
        })
    }
  }, [flightId])

  if (loading || !flight) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Cabin Options
  const economyOptions: CabinOption[] = [
    {
      id: 'economy-basic',
      name: 'Economy Basic',
      nameEn: 'Economy Basic',
      price: flight.economyPrice,
      seatsAvailable: flight.economySeats,
      features: {
        modifications: {
          allowed: true,
          fee: 1810,
          notes: 'Up to HKD 1,810 per passenger, plus fare difference'
        },
        refund: {
          allowed: false,
          notes: 'Not allowed'
        },
        cabinBaggage: {
          pieces: 1,
          weight: 8,
          size: 'Max 55 x 40 x 23 cm'
        },
        checkedBaggage: {
          pieces: 2,
          weight: 23
        },
        personalItem: {
          allowed: true,
          size: 'Max 40 x 30 x 15 cm'
        },
        meals: {
          included: true,
          type: 'Meal, Snacks'
        },
        seatSelection: {
          included: false
        }
      }
    },
    {
      id: 'economy-plus',
      name: 'Economy Basic Plus',
      nameEn: 'Economy Basic Plus',
      price: flight.economyPrice * 1.16,
      seatsAvailable: flight.economySeats,
      features: {
        modifications: {
          allowed: true,
          fee: 1810,
          notes: 'Up to HKD 1,810 per passenger, plus fare difference'
        },
        refund: {
          allowed: true,
          fee: 1810,
          notes: 'Refund allowed, less HKD 1,810'
        },
        cabinBaggage: {
          pieces: 1,
          weight: 8,
          size: 'Max 55 x 40 x 23 cm'
        },
        checkedBaggage: {
          pieces: 2,
          weight: 23
        },
        personalItem: {
          allowed: true,
          size: 'Max 40 x 30 x 15 cm'
        },
        meals: {
          included: true,
          type: 'Meal, Snacks'
        },
        seatSelection: {
          included: false
        }
      }
    }
  ]

  const premiumEconomyOptions: CabinOption[] = [
    {
      id: 'premium-basic',
      name: 'Premium Economy Basic',
      nameEn: 'Premium Economy Basic',
      price: flight.economyPrice * 2.42,
      seatsAvailable: 4,
      features: {
        modifications: {
          allowed: true,
          fee: 1810,
          notes: 'Up to HKD 1,810 per passenger, plus fare difference'
        },
        refund: {
          allowed: false,
          notes: 'Not allowed'
        },
        cabinBaggage: {
          pieces: 1,
          weight: 8,
          size: 'Max 55 x 40 x 23 cm'
        },
        checkedBaggage: {
          pieces: 2,
          weight: 23
        },
        personalItem: {
          allowed: true,
          size: 'Max 40 x 30 x 15 cm'
        },
        meals: {
          included: true,
          type: 'Meal, Snacks'
        },
        seatSelection: {
          included: false
        }
      }
    },
    {
      id: 'premium-plus',
      name: 'Premium Economy Basic Plus',
      nameEn: 'Premium Economy Basic Plus',
      price: flight.economyPrice * 2.58,
      seatsAvailable: 4,
      features: {
        modifications: {
          allowed: true,
          fee: 1810,
          notes: 'Up to HKD 1,810 per passenger, plus fare difference'
        },
        refund: {
          allowed: true,
          fee: 1810,
          notes: 'Refund allowed, less HKD 1,810'
        },
        cabinBaggage: {
          pieces: 1,
          weight: 8,
          size: 'Max 55 x 40 x 23 cm'
        },
        checkedBaggage: {
          pieces: 2,
          weight: 23
        },
        personalItem: {
          allowed: true,
          size: 'Max 40 x 30 x 15 cm'
        },
        meals: {
          included: true,
          type: 'Meal, Snacks'
        },
        seatSelection: {
          included: false
        }
      }
    },
    {
      id: 'premium-green',
      name: 'Premium Economy Green',
      nameEn: 'Premium Economy Green',
      price: flight.economyPrice * 2.68,
      seatsAvailable: 4,
      recommended: true,
      features: {
        modifications: {
          allowed: true,
          fee: 0,
          notes: 'Modification allowed\nFare difference applies'
        },
        refund: {
          allowed: true,
          fee: 1810,
          notes: 'Refund allowed, less HKD 1,810'
        },
        cabinBaggage: {
          pieces: 1,
          weight: 8,
          size: 'Max 55 x 40 x 23 cm'
        },
        checkedBaggage: {
          pieces: 2,
          weight: 23
        },
        personalItem: {
          allowed: true,
          size: 'Max 40 x 30 x 15 cm'
        },
        meals: {
          included: true,
          type: 'Meal, Snacks'
        },
        seatSelection: {
          included: true,
          type: 'Included'
        },
        specialFeatures: [
          'More sustainable way to fly',
          '10% Sustainable Aviation Fuel (SAF)',
          '90% Climate Projects',
          'Extra 10% award miles and tier points'
        ]
      }
    },
    {
      id: 'premium-flex',
      name: 'Premium Economy Flex',
      nameEn: 'Premium Economy Flex',
      price: flight.economyPrice * 2.74,
      seatsAvailable: 4,
      features: {
        modifications: {
          allowed: true,
          fee: 0,
          notes: 'Modification allowed\nFare difference applies'
        },
        refund: {
          allowed: true,
          fee: 0,
          notes: 'Allowed'
        },
        cabinBaggage: {
          pieces: 1,
          weight: 8,
          size: 'Max 55 x 40 x 23 cm'
        },
        checkedBaggage: {
          pieces: 2,
          weight: 23
        },
        personalItem: {
          allowed: true,
          size: 'Max 40 x 30 x 15 cm'
        },
        meals: {
          included: true,
          type: 'Meal, Snacks'
        },
        seatSelection: {
          included: true,
          type: 'Seat reservation (if available)\nIncluded'
        }
      }
    }
  ]

  const businessOptions: CabinOption[] = [
    {
      id: 'business-flex',
      name: 'Business Flex',
      nameEn: 'Business Flex',
      price: flight.businessPrice,
      seatsAvailable: flight.businessSeats,
      features: {
        modifications: {
          allowed: true,
          fee: 0,
          notes: 'Modification allowed\nFare difference applies'
        },
        refund: {
          allowed: true,
          fee: 0,
          notes: 'Allowed'
        },
        cabinBaggage: {
          pieces: 2,
          weight: 16,
          size: 'Max 55 x 40 x 23 cm'
        },
        checkedBaggage: {
          pieces: 3,
          weight: 32
        },
        personalItem: {
          allowed: true,
          size: 'Max 40 x 30 x 15 cm'
        },
        meals: {
          included: true,
          type: 'Premium Meal, Drinks'
        },
        seatSelection: {
          included: true,
          type: 'Flat-bed seat\nIncluded'
        },
        specialFeatures: [
          'Priority Boarding',
          'Lounge Access',
          'Extra Baggage Allowance',
          'Free Wi-Fi'
        ]
      }
    }
  ]

  let options: CabinOption[] = []
  if (cabinClass === 'ECONOMY') {
    options = economyOptions
  } else if (cabinClass === 'PREMIUM_ECONOMY') {
    options = premiumEconomyOptions
  } else if (cabinClass === 'BUSINESS') {
    options = businessOptions
  }

  const handleSelectOption = (optionId: string) => {
    const option = options.find(o => o.id === optionId)
    if (!option) return

    const params = new URLSearchParams({
      flightId: flight.id,
      cabinOption: optionId,
      passengers: passengers.toString(),
      price: (option.price * passengers).toString()
    })
    router.push(`/en/booking/passenger-info?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/en/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/en/flights" className="ml-2 text-gray-500 hover:text-gray-700">
                Flight Search
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">Select Fare</span>
            </li>
          </ol>
        </nav>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Fare</h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <button className="flex items-center gap-1 text-ya-yellow-600 hover:text-ya-yellow-700">
              <RefreshCw className="w-4 h-4" />
              <span>Compare fares and perks</span>
            </button>
            <span>•</span>
            <button className="flex items-center gap-1 hover:text-ya-yellow-600">
              <Plane className="w-4 h-4" />
              <span>View Seat Map</span>
            </button>
          </div>
        </div>

        {/* Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option) => (
            <div 
              key={option.id}
              className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
                option.recommended ? 'ring-2 ring-ya-yellow-500' : ''
              }`}
            >
              {/* Recommended Label */}
              {option.recommended && (
                <div className="absolute top-0 right-0 bg-ya-yellow-500 text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                  Recommended
                </div>
              )}

              {/* Top Bar */}
              <div className={`h-2 ${option.recommended ? 'bg-ya-yellow-500' : 'bg-ya-navy-700'}`}></div>

              {/* Content */}
              <div className="p-6">
                {/* Seats */}
                <div className="text-xs text-gray-600 mb-2">{option.seatsAvailable} seats left</div>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    HKD {(option.price * passengers).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">{option.nameEn}</div>
                  <div className="text-xs text-gray-500">{option.name}</div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {/* Modifications */}
                  <div className="flex items-start gap-2">
                    <RefreshCw className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">Modifications</div>
                      <div className="text-gray-600 whitespace-pre-line">{option.features.modifications.notes}</div>
                    </div>
                  </div>

                  {/* Refund */}
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">Refund</div>
                      <div className="text-gray-600">{option.features.refund.notes}</div>
                    </div>
                  </div>

                  {/* Cabin Baggage */}
                  <div className="flex items-start gap-2">
                    <Luggage className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">Cabin Baggage</div>
                      <div className="text-gray-600">
                        {option.features.cabinBaggage.pieces} x {option.features.cabinBaggage.weight}kg ({option.features.cabinBaggage.size})
                      </div>
                    </div>
                  </div>

                  {/* Personal Item */}
                  {option.features.personalItem.allowed && (
                    <div className="flex items-start gap-2">
                      <Luggage className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs">
                        <div className="font-medium text-gray-900">1 Personal Item</div>
                        <div className="text-gray-600">{option.features.personalItem.size}</div>
                      </div>
                    </div>
                  )}

                  {/* Checked Baggage */}
                  <div className="flex items-start gap-2">
                    <Luggage className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">Checked Baggage</div>
                      <div className="text-gray-600">
                        {option.features.checkedBaggage.pieces} x {option.features.checkedBaggage.weight}kg (50lb)
                      </div>
                    </div>
                  </div>

                  {/* Seat Selection */}
                  {option.features.seatSelection.included && (
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs">
                        <div className="font-medium text-gray-900">Seat Selection</div>
                        <div className="text-gray-600 whitespace-pre-line">{option.features.seatSelection.type}</div>
                      </div>
                    </div>
                  )}

                  {/* Special Features */}
                  {option.features.specialFeatures && (
                    <>
                      {option.features.specialFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          {feature.includes('sustainable') ? (
                            <Leaf className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : feature.includes('award') ? (
                            <Zap className="w-4 h-4 text-ya-yellow-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Check className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="text-xs text-gray-600">{feature}</div>
                        </div>
                      ))}
                    </>
                  )}

                  {/* Meals */}
                  <div className="flex items-start gap-2">
                    <Utensils className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">Meals</div>
                      <div className="text-gray-600">{option.features.meals.type}</div>
                    </div>
                  </div>
                </div>

                {/* Select Button */}
                <button
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    option.recommended
                      ? 'bg-ya-yellow-500 text-black hover:bg-ya-yellow-600'
                      : 'bg-ya-navy-700 text-white hover:bg-ya-navy-800'
                  }`}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SelectCabinPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SelectCabinContent />
    </Suspense>
  )
}
