'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import { Send, Users, User, Bell, Loader2, CheckCircle } from 'lucide-react'

export default function AdminMessagesPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [formData, setFormData] = useState({
    type: 'SYSTEM',
    title: '',
    message: '',
    recipientType: 'ALL',
    recipientUserId: '',
    priority: 'NORMAL',
    icon: '🔔',
    link: '',
    expiresAt: '',
    // 多语言
    titleDe: '',
    titleEn: '',
    titleZhCn: '',
    titleZhHk: '',
    messageDe: '',
    messageEn: '',
    messageZhCn: '',
    messageZhHk: ''
  })

  const notificationTypes = [
    { value: 'SYSTEM', label: t('notifications.types.system'), icon: '🔔' },
    { value: 'TRAVEL_UPDATE', label: t('notifications.types.travelUpdate'), icon: '🌍' },
    { value: 'FLIGHT_STATUS', label: t('notifications.types.flightStatus'), icon: '✈️' },
    { value: 'SPECIAL_ASSISTANCE', label: t('notifications.types.specialAssistance'), icon: '🆘' },
    { value: 'PROMOTION', label: t('notifications.types.promotion'), icon: '🎁' },
    { value: 'POLICY', label: t('notifications.types.policy'), icon: '📋' }
  ]

  const priorityLevels = [
    { value: 'LOW', label: t('notifications.priority.low'), color: 'text-gray-600' },
    { value: 'NORMAL', label: t('notifications.priority.normal'), color: 'text-blue-600' },
    { value: 'HIGH', label: t('notifications.priority.high'), color: 'text-orange-600' },
    { value: 'URGENT', label: t('notifications.priority.urgent'), color: 'text-red-600' }
  ]

  // 获取用户列表（用于特定用户发送）
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users')
        if (response.ok) {
          const data = await response.json()
          setUsers(data.users || [])
        }
      } catch (error) {
        console.error('获取用户列表失败:', error)
      }
    }
    fetchUsers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      // 準備提交數據，確保 title 和 message 有值（使用繁體中文或英文）
      const submitData = {
        ...formData,
        title: formData.titleZhHk || formData.titleEn || formData.title,
        message: formData.messageZhHk || formData.messageEn || formData.message
      }

      const response = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 重要：携带 cookie
        body: JSON.stringify(submitData)
      })

      if (response.ok) {
        setSuccess(true)
        // 重置表单
        setFormData({
          type: 'SYSTEM',
          title: '',
          message: '',
          recipientType: 'ALL',
          recipientUserId: '',
          priority: 'NORMAL',
          icon: '🔔',
          link: '',
          expiresAt: '',
          titleDe: '',
          titleEn: '',
          titleZhCn: '',
          titleZhHk: '',
          messageDe: '',
          messageEn: '',
          messageZhCn: '',
          messageZhHk: ''
        })
        
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const data = await response.json()
        alert(`发送失败: ${data.error}`)
      }
    } catch (error) {
      console.error('发送通知失败:', error)
      alert('发送通知失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Bell className="w-8 h-8 mr-3 text-ya-yellow-600" />
                {t('admin.messages.title')}
              </h1>
              <p className="text-gray-600 mt-2">
                {t('admin.messages.description')}
              </p>
            </div>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-800">{t('admin.messages.sendSuccess')}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* 通知类型 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.messages.notificationType')} *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {notificationTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.value, icon: type.icon })}
                    className={`
                      p-4 border-2 rounded-lg transition-all flex items-center justify-center gap-2
                      ${formData.type === type.value
                        ? 'border-ya-yellow-500 bg-ya-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 接收者类型 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.messages.recipientType')} *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, recipientType: 'ALL', recipientUserId: '' })}
                  className={`
                    p-4 border-2 rounded-lg transition-all flex items-center justify-center gap-2
                    ${formData.recipientType === 'ALL'
                      ? 'border-ya-yellow-500 bg-ya-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <Users className="w-5 h-5" />
                  <span className="font-medium">{t('admin.messages.allUsers')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, recipientType: 'SPECIFIC_USER' })}
                  className={`
                    p-4 border-2 rounded-lg transition-all flex items-center justify-center gap-2
                    ${formData.recipientType === 'SPECIFIC_USER'
                      ? 'border-ya-yellow-500 bg-ya-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">{t('admin.messages.specificUser')}</span>
                </button>
              </div>
            </div>

            {/* 特定用户选择 */}
            {formData.recipientType === 'SPECIFIC_USER' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admin.messages.selectUser')} *
                </label>
                <select
                  required
                  value={formData.recipientUserId}
                  onChange={(e) => setFormData({ ...formData, recipientUserId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                >
                  <option value="">{t('admin.messages.selectUserPlaceholder')}</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* 优先级 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.messages.priority')} *
              </label>
              <div className="grid grid-cols-4 gap-3">
                {priorityLevels.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: level.value })}
                    className={`
                      p-3 border-2 rounded-lg transition-all
                      ${formData.priority === level.value
                        ? 'border-ya-yellow-500 bg-ya-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <span className={`text-sm font-medium ${level.color}`}>{level.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 标题（繁体中文） */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.messages.title')} (繁體中文) *
              </label>
              <input
                type="text"
                required
                value={formData.titleZhHk}
                onChange={(e) => setFormData({ ...formData, titleZhHk: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                placeholder="輸入通知標題..."
              />
            </div>

            {/* 消息（繁体中文） */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.messages.message')} (繁體中文) *
              </label>
              <textarea
                required
                value={formData.messageZhHk}
                onChange={(e) => setFormData({ ...formData, messageZhHk: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                placeholder="輸入通知內容..."
              />
            </div>

            {/* 其他语言（可选，折叠） */}
            <details className="mb-6">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2 hover:text-ya-yellow-600">
                {t('admin.messages.otherLanguages')} (可選)
              </summary>
              <div className="mt-4 space-y-4 pl-4">
                {/* 英文 */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">English</label>
                  <input
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value, title: e.target.value || formData.titleZhHk })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Title..."
                  />
                  <textarea
                    value={formData.messageEn}
                    onChange={(e) => setFormData({ ...formData, messageEn: e.target.value, message: e.target.value || formData.messageZhHk })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Message..."
                  />
                </div>
                
                {/* 德文 */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Deutsch</label>
                  <input
                    type="text"
                    value={formData.titleDe}
                    onChange={(e) => setFormData({ ...formData, titleDe: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Titel..."
                  />
                  <textarea
                    value={formData.messageDe}
                    onChange={(e) => setFormData({ ...formData, messageDe: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Nachricht..."
                  />
                </div>

                {/* 简体中文 */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">简体中文</label>
                  <input
                    type="text"
                    value={formData.titleZhCn}
                    onChange={(e) => setFormData({ ...formData, titleZhCn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="标题..."
                  />
                  <textarea
                    value={formData.messageZhCn}
                    onChange={(e) => setFormData({ ...formData, messageZhCn: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="消息..."
                  />
                </div>
              </div>
            </details>

            {/* 链接（可选） */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.messages.link')} (可選)
              </label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
                placeholder="/member/bookings"
              />
            </div>

            {/* 过期时间（可选） */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('admin.messages.expiresAt')} (可選)
              </label>
              <input
                type="datetime-local"
                value={formData.expiresAt}
                onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              />
            </div>

            {/* 提交按钮 */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-ya-yellow-500 text-black font-semibold rounded-lg hover:bg-ya-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t('common.sending')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t('admin.messages.sendNotification')}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

