'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Plane, 
  Calendar, 
  TrendingUp, 
  AlertCircle
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFlights: 0,
    totalBookings: 0,
    activeBookings: 0,
    revenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This should call API to get stats
    // Using mock data for now
    setTimeout(() => {
      setStats({
        totalUsers: 1250,
        totalFlights: 450,
        totalBookings: 3200,
        activeBookings: 150,
        revenue: 1580000
      })
      setLoading(false)
    }, 1000)
  }, [])

  const statCards = [
    { name: 'Total Usuarios', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'bg-blue-500' },
    { name: 'Total Vuelos', value: stats.totalFlights.toLocaleString(), icon: Plane, color: 'bg-green-500' },
    { name: 'Total Reservas', value: stats.totalBookings.toLocaleString(), icon: Calendar, color: 'bg-purple-500' },
    { name: 'Ingresos Totales (HKD)', value: `$${(stats.revenue / 1000000).toFixed(2)}M`, icon: TrendingUp, color: 'bg-ya-yellow-500' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 flex items-center">
            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 mr-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Reservas Recientes</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                    U{i}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Usuario {i}</p>
                    <p className="text-xs text-gray-500">Reservó HKG → LHR</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">+HKD 5,200</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Alertas del Sistema</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Alerta de Retraso de Vuelo</p>
                <p className="text-xs text-yellow-700 mt-1">El vuelo YA105 (HKG → TPE) puede retrasarse debido al clima.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Nuevos Registros</p>
                <p className="text-xs text-blue-700 mt-1">25 nuevos miembros registrados en las últimas 24 horas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
