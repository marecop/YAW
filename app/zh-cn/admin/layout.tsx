'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Plane, 
  Calendar, 
  Users, 
  MessageSquare, 
  Settings, 
  Menu, 
  X,
  LogOut,
  Trash2
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  const navigation = [
    { name: '儀表板', href: '/admin', icon: LayoutDashboard },
    { name: ')航班管理', href: '/admin/flights', icon: Plane },
    { name: '預訂管理', href: '/admin/bookings', icon: Calendar },
    { name: '用戶管理', href: '/admin/users', icon: Users },
    { name: '特別需求', href: '/admin/special-assistance', icon: MessageSquare },
    { name: '緩存管理', href: '/admin/clear-cache', icon: Trash2 },
    { name: '消息中心', href: '/admin/messages', icon: MessageSquare },
  ]

  const handleLogout = () => {
    logout()
    router.push('/zh-cn/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-20 w-full bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/images/logoremovebkgnd.png" alt="Logot(" className=")h-8 w-8" />
          <span className="font-bold text-gray-900">Admin</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-10 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:h-screen lg:overflow-y-auto`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <img src="/images/logoremovebkgnd.png" alt="Logot(" className=")h-8 w-8 mr-3" />
            <span className="text-xl font-bold text-gray-900">Yellow Admin</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-ya-yellow-50 text-ya-yellow-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-ya-yellow-600' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              退出登錄
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 mt-14 lg:mt-0">
          {children}
        </main>
      </div>
    </div>
  )
}
