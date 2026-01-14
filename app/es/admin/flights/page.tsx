'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

interface Flight {
  id: string
  flightNumber: string
  airline: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
  status: string
  price: number
  capacity: number
  booked: number
}

export default function AdminFlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchFlights()
  }, [])

  const fetchFlights = async () => {
    try {
      // In real app: fetch from API
      // const response = await fetch('/api/admin/flights')
      // const data = await response.json()
      
      // Mock data
      setTimeout(() => {
        setFlights([
          {
            id: '1',
            flightNumber: 'YA101',
            airline: 'Yellow Airlines',
            from: 'HKG',
            to: 'NRT',
            departureTime: '2026-06-15T09:00:00',
            arrivalTime: '2026-06-15T14:30:00',
            status: 'SCHEDULED',
            price: 4500,
            capacity: 300,
            booked: 150
          },
          {
            id: '2',
            flightNumber: 'YA102',
            airline: 'Yellow Airlines',
            from: 'NRT',
            to: 'HKG',
            departureTime: '2026-06-15T16:00:00',
            arrivalTime: '2026-06-15T20:30:00',
            status: 'SCHEDULED',
            price: 4200,
            capacity: 300,
            booked: 120
          }
        ])
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to fetch flights:', error)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Vuelos</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors">
          <Plus className="w-5 h-5" />
          Añadir Vuelo
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Buscar por número de vuelo o aeropuerto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vuelo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ruta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ocupación</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-ya-yellow-600"></div>
                    </div>
                  </td>
                </tr>
              ) : flights.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No se encontraron vuelos
                  </td>
                </tr>
              ) : (
                flights.map((flight) => (
                  <tr key={flight.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-ya-yellow-100 rounded-full flex items-center justify-center text-ya-yellow-700 font-bold">
                          {flight.airline.substring(0, 1)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{flight.flightNumber}</div>
                          <div className="text-sm text-gray-500">{flight.airline}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{flight.from} → {flight.to}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{format(new Date(flight.departureTime), 'HH:mm')}</div>
                      <div className="text-xs text-gray-500">{format(new Date(flight.departureTime), 'yyyy-MM-dd')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {flight.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(flight.booked / flight.capacity) * 100}%` }}
                          ></div>
                        </div>
                        <span>{flight.booked}/{flight.capacity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
