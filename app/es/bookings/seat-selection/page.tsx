'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, User, Info } from 'lucide-react'

// Mock seat map data
const SEAT_MAP = {
  columns: ['A', 'B', 'C', '', 'D', 'E', 'F', '', 'H', 'J', 'K'],
  rows: Array.from({ length: 40 }, (_, i) => i + 1),
  unavailable: ['1A', '1K', '2A', '2K', '15A', '15B', '15C'],
  premium: ['11A', '11B', '11C', '11H', '11J', '11K', '12A', '12B', '12C', '12H', '12J', '12K'],
  exit: ['30A', '30B', '30C', '30H', '30J', '30K'],
}

interface Passenger {
  id: string
  name: string
  seat?: string
}

function SeatSelectionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('bookingId')
  
  const [selectedSeats, setSelectedSeats] = useState<{[key: string]: string}>({})
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0)
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching booking data
    const fetchBooking = async () => {
      // In real app, fetch from API
      setTimeout(() => {
        setPassengers([
          { id: '1', name: 'WONG TAI SIN' },
          { id: '2', name: 'CHAN SIU MING' }
        ])
        setIsLoading(false)
      }, 1000)
    }
    
    if (bookingId) {
      fetchBooking()
    }
  }, [bookingId])

  const handleSeatClick = (seatId: string) => {
    if (SEAT_MAP.unavailable.includes(seatId)) return
    
    // Check if seat is already taken by another passenger in this booking
    const isTakenByOther = Object.values(selectedSeats).includes(seatId) && selectedSeats[passengers[currentPassengerIndex].id] !== seatId
    if (isTakenByOther) return

    setSelectedSeats(prev => {
      const newSeats = { ...prev }
      
      // If clicking already selected seat for current passenger, deselect it
      if (newSeats[passengers[currentPassengerIndex].id] === seatId) {
        delete newSeats[passengers[currentPassengerIndex].id]
      } else {
        // Select new seat
        newSeats[passengers[currentPassengerIndex].id] = seatId
      }
      return newSeats
    })
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      // API call to save seats
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push(`/es/bookings/${bookingId}`)
    } catch (error) {
      console.error('Error saving seats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-ya-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mapa de asientos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full mr-4">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Selección de Asientos</h1>
              <p className="text-sm text-gray-500">HKG → NRT • Vuelo YA888</p>
            </div>
          </div>
          <button 
            onClick={handleConfirm}
            disabled={Object.keys(selectedSeats).length !== passengers.length}
            className="px-6 py-2 bg-ya-yellow-500 text-black font-semibold rounded-lg hover:bg-ya-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Confirmar Selección
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full p-4 flex gap-8">
        {/* Left Sidebar - Passenger List */}
        <div className="w-80 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="font-semibold text-gray-900 mb-4">Pasajeros</h2>
            <div className="space-y-3">
              {passengers.map((passenger, index) => (
                <div 
                  key={passenger.id}
                  onClick={() => setCurrentPassengerIndex(index)}
                  className={`p-3 rounded-lg cursor-pointer border-2 transition-all ${
                    currentPassengerIndex === index 
                      ? 'border-ya-yellow-500 bg-yellow-50' 
                      : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        selectedSeats[passenger.id] ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
                      }`}>
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{passenger.name}</p>
                        <p className="text-sm text-gray-500">
                          {selectedSeats[passenger.id] ? `Asiento ${selectedSeats[passenger.id]}` : 'Sin asiento seleccionado'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="font-semibold text-gray-900 mb-4">Leyenda</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <div className="w-6 h-6 border-2 border-gray-300 rounded bg-white mr-3"></div>
                <span>Estándar (Gratis)</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 border-2 border-purple-300 bg-purple-50 rounded mr-3"></div>
                <span>Preferencial ($180)</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 border-2 border-orange-300 bg-orange-50 rounded mr-3"></div>
                <span>Espacio Extra ($320)</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-200 rounded mr-3 cursor-not-allowed opacity-50"></div>
                <span>No disponible</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-ya-yellow-500 rounded mr-3 border-2 border-ya-yellow-600"></div>
                <span>Seleccionado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Seat Map */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-8 overflow-y-auto max-h-[calc(100vh-140px)]">
          {/* Plane Nose */}
          <div className="w-full flex justify-center mb-12 opacity-20">
            <div className="w-32 h-32 border-4 border-b-0 border-gray-400 rounded-t-full"></div>
          </div>

          {/* Seat Grid */}
          <div className="w-fit mx-auto">
            {/* Column Headers */}
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-8"></div> {/* Row number spacer */}
              {SEAT_MAP.columns.map((col, i) => (
                <div key={i} className={`w-10 text-center font-bold text-gray-400 ${col === '' ? 'w-8' : ''}`}>
                  {col}
                </div>
              ))}
            </div>

            {/* Rows */}
            {SEAT_MAP.rows.map(rowNum => (
              <div key={rowNum} className="flex justify-center gap-2 mb-2">
                <div className="w-8 flex items-center justify-center text-xs text-gray-400 font-mono">
                  {rowNum}
                </div>
                {SEAT_MAP.columns.map((col, i) => {
                  if (col === '') return <div key={i} className="w-8 flex items-center justify-center text-xs text-gray-200">{rowNum}</div>
                  
                  const seatId = `${rowNum}${col}`
                  const isUnavailable = SEAT_MAP.unavailable.includes(seatId)
                  const isPremium = SEAT_MAP.premium.includes(seatId)
                  const isExit = SEAT_MAP.exit.includes(seatId)
                  
                  const isSelected = Object.values(selectedSeats).includes(seatId)
                  const isMySeat = selectedSeats[passengers[currentPassengerIndex].id] === seatId

                  let seatClass = "w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all text-xs font-bold cursor-pointer select-none "
                  
                  if (isUnavailable) {
                    seatClass += "bg-gray-200 border-transparent text-gray-400 cursor-not-allowed"
                  } else if (isSelected) {
                    if (isMySeat) {
                      seatClass += "bg-ya-yellow-500 border-ya-yellow-600 text-black shadow-md scale-105"
                    } else {
                      seatClass += "bg-green-100 border-green-500 text-green-700 opacity-50 cursor-not-allowed"
                    }
                  } else if (isPremium) {
                    seatClass += "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300"
                  } else if (isExit) {
                    seatClass += "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-300"
                  } else {
                    seatClass += "bg-white border-gray-200 text-gray-600 hover:border-ya-yellow-400 hover:bg-yellow-50"
                  }

                  return (
                    <div
                      key={seatId}
                      className={seatClass}
                      onClick={() => handleSeatClick(seatId)}
                    >
                      {isSelected && isMySeat && <User className="w-5 h-5" />}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SeatSelectionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-ya-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <SeatSelectionContent />
    </Suspense>
  )
}
