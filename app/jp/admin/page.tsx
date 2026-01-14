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
    revenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { name: '総ユーザー数', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'bg-blue-500' },
    { name: '総フライト数', value: stats.totalFlights.toLocaleString(), icon: Plane, color: 'bg-green-500' },
    { name: '総予約数', value: stats.totalBookings.toLocaleString(), icon: Calendar, color: 'bg-purple-500' },
    { name: '総収益 (HKD)', value: `$${(stats.revenue / 1000000).toFixed(2)}M`, icon: TrendingUp, color: 'bg-ya-yellow-500' },
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
      <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
      
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
        {/* System Alerts - Static for now, could be dynamic */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">システム通知</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">システム正常稼働中</p>
                <p className="text-xs text-yellow-700 mt-1">すべてのサービスが正常に動作しています。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
