'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  Eye, 
  MoreVertical,
  Calendar,
  User,
  Plane
} from 'lucide-react'

interface Booking {
  id: string
  bookingNumber: string
  passengerName: string
  flightNumber: string
  from: string
  to: string
  date: string
  status: string
  totalPrice: number
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // 模擬數據加載
    setTimeout(() => {
      setBookings([
        { id: '1', bookingNumber: 'BK789012', passengerName: 'John Doe', flightNumber: 'YA101', from: 'HKG', to: 'LHR', date: '2025-11-15', status: 'CONFIRMED', totalPrice: 5200 },
        { id: '2', bookingNumber: 'BK789013', passengerName: 'Jane Smith', flightNumber: 'YA105', from: 'HKG', to: 'TPE', date: '2025-11-16', status: 'CHECKED_IN', totalPrice: 1500 },
        { id: '3', bookingNumber: 'BK789014', passengerName: 'Bob Wilson', flightNumber: 'YA888', from: 'HKG', to: 'JFK', date: '2025-11-18', status: 'CANCELLED', totalPrice: 8500 },
      ])
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search booking number, passenger name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ya-yellow-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Information</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passenger</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ya-yellow-600"></div>
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No booking data found</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{booking.bookingNumber}</div>
                          <div className="text-sm text-gray-500">{booking.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{booking.passengerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Plane className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{booking.flightNumber}</span>
                        <span className="text-sm text-gray-500 ml-2">({booking.from} → {booking.to})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 
                          booking.status === 'CHECKED_IN' ? 'bg-blue-100 text-blue-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      HKD {booking.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-ya-yellow-600 hover:text-ya-yellow-900">
                        <Eye className="w-5 h-5" />
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
