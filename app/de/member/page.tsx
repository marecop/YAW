'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Award, Plane, Settings, LogOut, CreditCard, ChevronRight, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function MemberPage() {
  const router = useRouter()
  const { user, logout, isAuthenticated, isLoading } = useAuth()
  const [pointsUpdated, setPointsUpdated] = useState(false)

  // 模拟积分更新检查
  useEffect(() => {
    if (user && !pointsUpdated) {
      // 觸發積分更新
      fetch('/api/cron/process-points')
        .then(res => res.json())
        .then(data => {
          console.log('積分處理結果:', data)
          if (data.processed > 0) {
            // 如果有積分更新，刷新頁面以顯示最新積分
            window.location.reload()
          }
        })
        .catch(err => console.error('積分處理失敗:', err))
      setPointsUpdated(true)
    }
  }, [user, pointsUpdated])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/de/auth/login?redirect=/member')
    }
  }, [isLoading, isAuthenticated, router])

  const handleLogout = () => {
    logout()
  }

  const getMembershipColor = (level: string) => {
    switch (level) {
      case 'PLATINUM':
        return 'from-gray-800 to-gray-600'
      case 'GOLD':
        return 'from-yellow-500 to-yellow-600'
      default:
        return 'from-gray-400 to-gray-500'
    }
  }

  const getMembershipName = (level: string) => {
    switch (level) {
      case 'PLATINUM':
        return 'Platin-Mitglied'
      case 'GOLD':
        return 'Gold-Mitglied'
      default:
        return 'Silver-Mitglied'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Plane className="w-16 h-16 text-ya-yellow-500 animate-bounce mx-auto mb-4" />
          <p className="text-xl text-gray-700 font-semibold">Laden...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Willkommen zurück, {user.name}!
          </h1>
          <p className="text-gray-500">Verwalten Sie Ihr Konto und Ihre Buchungen</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Membership Card */}
          <div className="lg:col-span-1">
            {/* Membership Card */}
            <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${getMembershipColor(user.membershipLevel)} p-8 text-white mb-8 shadow-xl relative`}>
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Plane className="w-32 h-32" />
              </div>
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <p className="text-sm font-medium opacity-90 mb-1 tracking-wider">YELLOW AIRLINES</p>
                  <h3 className="text-2xl font-bold tracking-wide">{getMembershipName(user.membershipLevel || 'SILVER')}</h3>
                </div>
                <Award className="w-10 h-10 opacity-90" />
              </div>

              <div className="mb-8 relative z-10">
                <p className="text-xs font-medium opacity-80 mb-1 uppercaset(">Mitgliedsname</p>
                <p className=")text-xl font-semibold tracking-wide">{user.name}</p>
              </div>

              <div className="flex justify-between items-end relative z-10">
                <div>
                  <p className="text-xs font-medium opacity-80 mb-1 uppercaset(">Punkte</p>
                  <p className=")text-4xl font-bold tracking-tight">{(user.points || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 px-2">Schnelle Aktionen</h3>
              <div className="space-y-1">
                <Link
                  href="/de/bookings"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                    <Plane className="w-5 h-5" />
                  </div>
                  <span className="text-gray-700 font-medium flex-1">Meine Buchungen</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/de/settings"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition-colors">
                    <Settings className="w-5 h-5" />
                  </div>
                  <span className="text-gray-700 font-medium flex-1">Kontoeinstellungen</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="member/rewards"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-100 transition-colors">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className="text-gray-700 font-medium flex-1">Punkt-Shop</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-red-600 group mt-2"
                >
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-left flex-1">Abmelden</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Account Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-900">Persönliche Daten</h2>
                <Link
                  href="/de/settings"
                  className="text-ya-yellow-600 font-semibold hover:text-ya-yellow-700 transition-colors text-sm flex items-center gap-1"
                >
                  <Settings className="w-4 h-4" />
                  Daten bearbeiten
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Name</p>
                  <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">E-Mail</p>
                  <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Mitgliedschaft</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getMembershipColor(user.membershipLevel)}`}>
                      {getMembershipName(user.membershipLevel)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Verfügbare Punkte</p>
                  <p className="text-2xl font-bold text-ya-yellow-600">{user.points.toLocaleString()}</p>
                </div>
                {user.phone && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Telefon</p>
                    <p className="text-lg font-semibold text-gray-900">{user.phone}</p>
                  </div>
                )}
                {user.nationality && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nationalität</p>
                    <p className="text-lg font-semibold text-gray-900">{user.nationality}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Membership Benefits */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mitgliedsvorteile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-2xl hover:bg-yellow-50 transition-colors duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6 text-ya-yellow-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Punkt-Bonus</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {user.membershipLevel === 'PLATINUM' && 'Bei jedem Flug werden 2,0-fach Punkte erhalten'}
                    {user.membershipLevel === 'GOLD' && 'Bei jedem Flug werden 1,5-fach Punkte erhalten'}
                    {user.membershipLevel === 'SILVER' && 'Bei jedem Flug werden 1,25-fach Punkte erhalten'}
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl hover:bg-yellow-50 transition-colors duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plane className="w-6 h-6 text-ya-yellow-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Vorzugsdienste</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {user.membershipLevel === 'PLATINUM' && 'Vorrechtliche Einreise, Vorrechtliche Boarding, Vorrechtliche Lounge'}
                    {user.membershipLevel === 'GOLD' && 'Vorrechtliche Boarding, Vorrechtliche Lounge'}
                    {user.membershipLevel === 'SILVER' && 'Vorrechtliche Einreise'}
                  </p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/de/member/privileges"
                  className="inline-flex items-center text-ya-yellow-600 font-semibold hover:text-ya-yellow-700 transition-colors group"
                >
                  Weitere Informationen über Mitgliedsvorteile <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

