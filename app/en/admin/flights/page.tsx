'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Filter,
  MoreVertical,
  Plane
} from 'lucide-react'

// 定義航班類型
interface Flight {
  id: string
  flightNumber: string
  airline: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
  status: string
  economyPrice: number
  economySeats: number
}

export default function AdminFlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchFlights()
  }, [page, searchQuery])

  const fetchFlights = async () => {
    setLoading(true)
    try {
      // 這裡應該調用真實的 API
      // const res = await fetch(`/api/flights?page=${page}&search=${searchQuery}`)
      // const data = await res.json()
      
      // 模擬數據
      setTimeout(() => {
        setFlights([
          { id: '1', flightNumber: 'YA101', airline: 'Yellow Airlines', from: 'HKG', to: 'LHR', departureTime: '23:45', arrivalTime: '06:30+1', status: 'SCHEDULED', economyPrice: 5200, economySeats: 150 },
          { id: '2', flightNumber: 'YA105', airline: 'Yellow Airlines', from: 'HKG', to: 'TPE', departureTime: '10:30', arrivalTime: '12:15', status: 'DELAYED', economyPrice: 1500, economySeats: 20 },
          { id: '3', flightNumber: 'YA888', airline: 'Yellow Airlines', from: 'HKG', to: 'JFK', departureTime: '14:00', arrivalTime: '18:30', status: 'SCHEDULED', economyPrice: 8500, economySeats: 200 },
        ])
        setTotalPages(5)
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Failed to fetch flights:', error)
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this flight?')) return
    // 調用 API 刪除
    console.log('Delete flight:', id)
    // 刷新列表
    fetchFlights()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Flight Management</h1>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors">
          <Plus className="w-5 h-5" />
          Add Flight
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search flight number, departure and arrival..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ya-yellow-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight Information</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure and Arrival Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price / Seats</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ya-yellow-600"></div>
                    </div>
                  </td>
                </tr>
              ) : flights.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No flight data found</td>
                </tr>
              ) : (
                flights.map((flight) => (
                  <tr key={flight.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-ya-yellow-100 rounded-full flex items-center justify-center text-ya-yellow-700">
                          <Plane className="w-5 h-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{flight.flightNumber}</div>
                          <div className="text-sm text-gray-500">{flight.from} → {flight.to}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{flight.departureTime}</div>
                      <div className="text-sm text-gray-500">{flight.arrivalTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${flight.status === 'SCHEDULED' ? 'bg-green-100 text-green-800' : 
                          flight.status === 'DELAYED' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {flight.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">HKD {flight.economyPrice}</div>
                      <div className="text-sm text-gray-500">Remaining {flight.economySeats} seats</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(flight.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous Page
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next Page
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to <span className="font-medium">{Math.min(page * 10, 100)}</span> of <span className="font-medium">100</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous Page
                </button>
                {/* 簡單的分頁顯示 */}
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === i + 1
                        ? 'z-10 bg-ya-yellow-50 border-ya-yellow-500 text-ya-yellow-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next Page
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
