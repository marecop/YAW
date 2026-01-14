'use client'

import { useState, useEffect, useRef } from 'react'
import { Bell, X, Check, CheckCheck } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  titleDe?: string
  titleEn?: string
  titleZhCn?: string
  titleZhHk?: string
  messageDe?: string
  messageEn?: string
  messageZhCn?: string
  messageZhHk?: string
  priority: string
  icon?: string
  link?: string
  createdAt: string
  isRead: boolean
}

export default function NotificationBell() {
  const { user } = useAuth()
  const pathname = usePathname()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Helper to get current language prefix
  const getLangPrefix = () => {
    const segments = pathname.split('/').filter(Boolean)
    const currentLang = ['en', 'zh-hk', 'zh-cn', 'de', 'jp', 'es'].includes(segments[0]) ? segments[0] : 'zh-hk'
    return currentLang === 'zh-hk' ? '' : `/${currentLang}`
  }
  const langPrefix = getLangPrefix()
  const currentLangCode = langPrefix ? langPrefix.substring(1) : 'zh-hk'

  const translations: Record<string, any> = {
    'zh-hk': {
      notifications: '通知',
      unread: '未讀',
      markAllRead: '全部標記已讀',
      noNotifications: '暫無通知',
      markRead: '標記已讀',
      justNow: '剛剛',
      minsAgo: '分鐘前',
      hoursAgo: '小時前',
      daysAgo: '天前'
    },
    'zh-cn': {
      notifications: '通知',
      unread: '未读',
      markAllRead: '全部标记已读',
      noNotifications: '暂无通知',
      markRead: '标记已读',
      justNow: '刚刚',
      minsAgo: '分钟前',
      hoursAgo: '小时前',
      daysAgo: '天前'
    },
    'en': {
      notifications: 'Notifications',
      unread: 'unread',
      markAllRead: 'Mark all as read',
      noNotifications: 'No notifications',
      markRead: 'Mark as read',
      justNow: 'Just now',
      minsAgo: 'mins ago',
      hoursAgo: 'hours ago',
      daysAgo: 'days ago'
    },
    'de': {
      notifications: 'Benachrichtigungen',
      unread: 'ungelesen',
      markAllRead: 'Alle als gelesen markieren',
      noNotifications: 'Keine Benachrichtigungen',
      markRead: 'Als gelesen markieren',
      justNow: 'Gerade eben',
      minsAgo: 'Minuten her',
      hoursAgo: 'Stunden her',
      daysAgo: 'Tage her'
    },
    'jp': {
      notifications: '通知',
      unread: '未読',
      markAllRead: 'すべて既読にする',
      noNotifications: '通知はありません',
      markRead: '既読にする',
      justNow: 'たった今',
      minsAgo: '分前',
      hoursAgo: '時間前',
      daysAgo: '日前'
    },
    'es': {
      notifications: 'Notificaciones',
      unread: 'no leídas',
      markAllRead: 'Marcar todo como leído',
      noNotifications: 'No hay notificaciones',
      markRead: 'Marcar como leído',
      justNow: 'Justo ahora',
      minsAgo: 'minutos atrás',
      hoursAgo: 'horas atrás',
      daysAgo: 'días atrás'
    }
  }

  const t = translations[currentLangCode] || translations['zh-hk']

  // 获取通知列表
  const fetchNotifications = async () => {
    if (!user) return
    
    try {
      const response = await fetch('/api/notifications')
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications)
        setUnreadCount(data.unreadCount)
      }
    } catch (error) {
      console.error('获取通知失败:', error)
    }
  }

  // 标记单个通知为已读
  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST'
      })
      
      if (response.ok) {
        // 更新本地状态
        setNotifications(prev =>
          prev.map(n =>
            n.id === notificationId ? { ...n, isRead: true } : n
          )
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error('标记已读失败:', error)
    }
  }

  // 标记所有为已读
  const markAllAsRead = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'POST'
      })
      
      if (response.ok) {
        setNotifications(prev =>
          prev.map(n => ({ ...n, isRead: true }))
        )
        setUnreadCount(0)
      }
    } catch (error) {
      console.error('批量标记已读失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 点击通知
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
    if (notification.link) {
      setIsOpen(false)
    }
  }

  // 获取通知图标
  const getNotificationIcon = (notification: Notification) => {
    if (notification.icon) {
      return <span className="text-2xl">{notification.icon}</span>
    }
    
    // 根据类型返回默认图标
    const iconMap: Record<string, string> = {
      'TRAVEL_UPDATE': '🌍',
      'FLIGHT_STATUS': '✈️',
      'SPECIAL_ASSISTANCE': '🆘',
      'PROMOTION': '🎁',
      'POLICY': '📋',
      'SYSTEM': '🔔'
    }
    return <span className="text-2xl">{iconMap[notification.type] || '🔔'}</span>
  }

  // 获取优先级样式
  const getPriorityColor = (priority: string) => {
    const colorMap: Record<string, string> = {
      'URGENT': 'border-l-4 border-red-500 bg-red-50',
      'HIGH': 'border-l-4 border-orange-500 bg-orange-50',
      'NORMAL': 'border-l-4 border-blue-500 bg-white',
      'LOW': 'border-l-4 border-gray-400 bg-gray-50'
    }
    return colorMap[priority] || colorMap['NORMAL']
  }

  // 格式化时间
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return '剛剛'
    if (minutes < 60) return `${minutes} 分鐘前`
    if (hours < 24) return `${hours} 小時前`
    if (days < 7) return `${days} 天前`
    return date.toLocaleDateString()
  }

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // 初始加载和定期刷新
  useEffect(() => {
    if (user) {
      fetchNotifications()
      
      // 每30秒刷新一次
      const interval = setInterval(fetchNotifications, 30000)
      return () => clearInterval(interval)
    }
  }, [user])

  if (!user) {
    return null
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 铃铛按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-ya-yellow-600 transition-colors"
        aria-label={t.notifications}
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* 下拉通知列表 */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[600px] flex flex-col">
          {/* 头部 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              {t.notifications}
              {unreadCount > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({unreadCount} {t.unread})
                </span>
              )}
            </h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  disabled={loading}
                  className="text-sm text-ya-yellow-600 hover:text-ya-yellow-700 flex items-center gap-1 disabled:opacity-50"
                  title={t.markAllRead}
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 通知列表 */}
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>{t.noNotifications}</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => {
                  const NotificationWrapper = (notification.link ? Link : 'div') as any
                  const wrapperProps = notification.link
                    ? { href: notification.link }
                    : {}

                  return (
                    <NotificationWrapper
                      key={notification.id}
                      {...wrapperProps}
                      onClick={() => handleNotificationClick(notification)}
                      className={`
                        p-4 transition-colors cursor-pointer
                        \${!notification.isRead ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}
                        \${getPriorityColor(notification.priority)}
                      `}
                    >
                      <div className="flex gap-3">
                        {/* 图标 */}
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification)}
                        </div>

                        {/* 内容 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`text-sm font-semibold \${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {formatTime(notification.createdAt)}
                          </p>
                        </div>

                        {/* 已读按钮 */}
                        {!notification.isRead && (
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              markAsRead(notification.id)
                            }}
                            className="flex-shrink-0 text-gray-400 hover:text-ya-yellow-600 transition-colors"
                            title={t.markRead}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </NotificationWrapper>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

