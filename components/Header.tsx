'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import NotificationBell from '@/components/NotificationBell'

export default function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()  // 使用 AuthContext 代替 getUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const getLangPrefix = () => {
    const segments = pathname.split('/').filter(Boolean)
    const currentLang = ['en', 'zh-hk', 'zh-cn', 'de', 'jp', 'es'].includes(segments[0]) ? segments[0] : 'zh-hk'
    return currentLang === 'zh-hk' ? '' : `/${currentLang}`
  }

  const langPrefix = getLangPrefix()
  // Determine current language code (without slash) for translations
  const currentLangCode = langPrefix ? langPrefix.substring(1) : 'zh-hk'

  const translations: Record<string, any> = {
    'zh-hk': {
      home: '主頁',
      book: '預訂航班',
      status: '航班動態',
      myBookings: '我的預訂',
      destinations: '探索目的地',
      about: '關於我們',
      login: '登入',
      register: '註冊',
      memberCenter: '會員中心',
      settings: '設定',
      logout: '登出',
      member: '會員'
    },
    'zh-cn': {
      home: '主页',
      book: '预订航班',
      status: '航班动态',
      myBookings: '我的预订',
      destinations: '探索目的地',
      about: '关于我们',
      login: '登录',
      register: '注册',
      memberCenter: '会员中心',
      settings: '设置',
      logout: '登出',
      member: '会员'
    },
    'en': {
      home: 'Home',
      book: 'Book Flights',
      status: 'Flight Status',
      myBookings: 'My Bookings',
      destinations: 'Destinations',
      about: 'About Us',
      login: 'Login',
      register: 'Register',
      memberCenter: 'Member Center',
      settings: 'Settings',
      logout: 'Logout',
      member: 'Member'
    },
    'de': {
      home: 'Startseite',
      book: 'Flüge buchen',
      status: 'Flugstatus',
      myBookings: 'Meine Buchungen',
      destinations: 'Reiseziele',
      about: 'Über uns',
      login: 'Anmelden',
      register: 'Registrieren',
      memberCenter: 'Mitgliederbereich',
      settings: 'Einstellungen',
      logout: 'Abmelden',
      member: 'Mitglied'
    },
    'jp': {
      home: 'ホーム',
      book: 'フライト予約',
      status: '運航状況',
      myBookings: '予約確認',
      destinations: '就航地',
      about: '会社概要',
      login: 'ログイン',
      register: '登録',
      memberCenter: '会員センター',
      settings: '設定',
      logout: 'ログアウト',
      member: '会員'
    },
    'es': {
      home: 'Inicio',
      book: 'Reservar vuelos',
      status: 'Estado del vuelo',
      myBookings: 'Mis reservas',
      destinations: 'Destinos',
      about: 'Sobre nosotros',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      memberCenter: 'Centro de miembros',
      settings: 'Configuración',
      logout: 'Cerrar sesión',
      member: 'Miembro'
    }
  }

  const t = translations[currentLangCode] || translations['zh-hk']

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getUserInitials = () => {
    if (!user) return 'U'
    if (user.name) {
      const names = user.name.split(' ')
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase()
      }
      return names[0][0].toUpperCase()
    }
    return user.email[0].toUpperCase()
  }

  const navigation = [
    { name: t.home, href: `${langPrefix}/`, active: pathname === `${langPrefix}/` || pathname === langPrefix },
    { name: t.book, href: `${langPrefix}/flights`, active: pathname === `${langPrefix}/flights` || pathname.startsWith(`${langPrefix}/flights/`) },
    { name: t.status, href: `${langPrefix}/flight-status`, active: pathname.startsWith(`${langPrefix}/flight-status`) },
    { name: t.myBookings, href: `${langPrefix}/bookings`, active: pathname.startsWith(`${langPrefix}/bookings`), needsAuth: true },
    { name: t.destinations, href: `${langPrefix}/destinations`, active: pathname === `${langPrefix}/destinations` },
    { name: t.about, href: `${langPrefix}/about`, active: pathname === `${langPrefix}/about` },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href={`${langPrefix}/`} className="flex items-center">
                <div className="relative w-10 h-10">
                  <Image
                    src="/images/logoremovebkgnd.png" 
                    alt="黃色航空標誌"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="ml-2 text-gray-800 font-semibold hidden sm:inline-block">黃色航空 | Yellow Airlines</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8 md:items-center">
            {navigation.map((item) => {
              if (item.needsAuth && !user) return null
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    item.active
                      ? 'border-ya-yellow-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
          
          {/* 登入與註冊入口 */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <>
                {/* 通知铃铛 */}
                <NotificationBell />
                
                <div className="relative" ref={userMenuRef}>
                  <button
                    className="flex items-center text-gray-700 hover:text-ya-yellow-600 focus:outline-none"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <div className="h-8 w-8 rounded-full bg-ya-yellow-500 flex items-center justify-center text-white">
                      {getUserInitials()}
                    </div>
                    <span className="ml-1 text-sm hidden sm:inline-block">{user.name}</span>
                  </button>
                
                {/* 用戶選單 */}
                {userMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                  >
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                      {t.member}<br />
                      <span className="font-medium text-gray-900">{user.email}</span>
                    </div>
                    
                    <Link 
                      href={`${langPrefix}/member`} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      {t.memberCenter}
                    </Link>
                    
                    <Link 
                      href={`${langPrefix}/settings`} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      {t.settings}
                    </Link>
                    
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        console.log('🚪 桌面版：點擊登出')
                        setUserMenuOpen(false)
                        logout()
                      }}
                    >
                      {t.logout}
                    </button>
                  </div>
                )}
                </div>
              </>
            ) : (
              <>
                <Link href={`${langPrefix}/auth/login`} className="text-sm font-medium text-gray-500 hover:text-gray-700">
                  {t.login}
                </Link>
                <Link href={`${langPrefix}/auth/register`} className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ya-yellow-500 hover:bg-ya-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ya-yellow-500">
                  {t.register}
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">打開主菜單</span>
              <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            if (item.needsAuth && !user) return null
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  item.active
                    ? 'border-ya-yellow-500 text-gray-900 bg-gray-50'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            )
          })}
          
          {/* 移動端登入與註冊入口 */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="px-4 space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {getUserInitials()}
                  </div>
                  <div className="text-base font-medium text-gray-700">
                    {user.name}
                  </div>
                </div>
                <div className="space-y-1 mt-3">
                  <Link href={`${langPrefix}/member`} className="block px-2 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md">
                    {t.memberCenter}
                  </Link>
                  <Link href={`${langPrefix}/member/settings`} className="block px-2 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md">
                    {t.settings}
                  </Link>
                  <button
                    onClick={() => {
                      console.log('🚪 移動版：點擊登出')
                      setMobileMenuOpen(false)
                      logout()  // 使用 AuthContext 的 logout
                    }}
                    className="block w-full text-left px-2 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md"
                  >
                    {t.logout}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center px-4 space-x-3">
                <Link href={`${langPrefix}/auth/login`} className="block text-base font-medium text-gray-600 hover:text-gray-800">
                  {t.login}
                </Link>
                <Link href={`${langPrefix}/auth/register`} className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-ya-yellow-500 hover:bg-ya-yellow-600">
                  {t.register}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
