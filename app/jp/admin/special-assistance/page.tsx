'use client'

import { useState, useEffect } from 'react'
import { Loader2, Search, Filter, Eye, CheckCircle, XCircle, Clock, Send, MessageSquare } from 'lucide-react'

interface SpecialAssistanceRequest {
  id: string
  requestNumber: string
  type: string
  status: string
  passengerName: string
  email: string
  phone: string
  bookingNumber: string | null
  flightNumber: string | null
  flightDate: string | null
  details: string
  notes: string | null
  adminNotes: string | null
  createdAt: string
  updatedAt: string
}

export default function AdminSpecialAssistancePage() {
  const [requests, setRequests] = useState<SpecialAssistanceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>('ALL')
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/special-assistance')
      if (response.ok) {
        const data = await response.json()
        setRequests(data)
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'SPECIAL_MEAL': '特別機内食',
      'UNACCOMPANIED_MINOR': 'お子様の一人旅',
      'DISABILITY_CARE': '障害者サポート',
      'PET_IN_CABIN': 'ペット同伴',
      'MEDICAL_CARE': '医療サポート',
      'TRANSFER_ASSISTANCE': '乗り継ぎサポート',
      'PRIORITY_BOARDING': '優先搭乗'
    }
    return types[type] || type
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'PROCESSING': 'bg-blue-100 text-blue-800',
      'APPROVED': 'bg-green-100 text-green-800',
      'REJECTED': 'bg-red-100 text-red-800'
    }
    
    const icons: Record<string, React.ReactNode> = {
      'PENDING': <Clock className="w-4 h-4" />,
      'PROCESSING': <Loader2 className="w-4 h-4 animate-spin" />,
      'APPROVED': <CheckCircle className="w-4 h-4" />,
      'REJECTED': <XCircle className="w-4 h-4" />
    }

    const labels: Record<string, string> = {
      'PENDING': '保留中',
      'PROCESSING': '処理中',
      'APPROVED': '承認済み',
      'REJECTED': '却下'
    }

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {icons[status]}
        {labels[status]}
      </span>
    )
  }

  // リクエストステータスを更新して通知を送信
  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    setProcessingId(requestId)
    
    try {
      // TODO: ステータス更新APIを作成
      const response = await fetch(`/api/special-assistance/${requestId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        // ローカルステータスを更新
        setRequests(prev =>
          prev.map(req =>
            req.id === requestId ? { ...req, status: newStatus } : req
          )
        )

        // ユーザーに通知を送信
        const request = requests.find(r => r.id === requestId)
        if (request) {
          await sendNotification(request, newStatus)
        }

        alert('ステータスが更新され、ユーザーに通知が送信されました')
      } else {
        alert('更新に失敗しました')
      }
    } catch (error) {
      console.error('ステータスの更新に失敗しました:', error)
      alert('更新に失敗しました')
    } finally {
      setProcessingId(null)
    }
  }

  // ユーザーに通知を送信
  const sendNotification = async (request: SpecialAssistanceRequest, newStatus: string) => {
    // ステータスに基づいて異なるメッセージを生成
    const statusMessages: Record<string, { title: string, message: string, icon: string }> = {
      'APPROVED': {
        title: '特別サポート申請が承認されました',
        message: `あなたの特別サポート申請 ${request.requestNumber} が承認されました。適切なサービスを提供いたします。`,
        icon: '✅'
      },
      'REJECTED': {
        title: '特別サポート申請が却下されました',
        message: `申し訳ありませんが、あなたの特別サポート申請 ${request.requestNumber} は承認されませんでした。ご不明な点がございましたら、カスタマーサービスまでお問い合わせください。`,
        icon: '❌'
      },
      'PROCESSING': {
        title: '特別サポート申請は処理中です',
        message: `あなたの特別サポート申請 ${request.requestNumber} は現在処理中です。できるだけ早く対応いたします。`,
        icon: '⏳'
      }
    }

    const statusMsg = statusMessages[newStatus]
    if (!statusMsg) return

    try {
      // ユーザーIDを検索（メールアドレスで）
      const userResponse = await fetch(`/api/users/by-email?email=${encodeURIComponent(request.email)}`)
      let recipientUserId = null
      
      if (userResponse.ok) {
        const userData = await userResponse.json()
        recipientUserId = userData.userId
      }

      await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'SPECIAL_ASSISTANCE',
          title: statusMsg.title,
          message: statusMsg.message,
          titleZhHk: statusMsg.title,
          messageZhHk: statusMsg.message,
          recipientType: recipientUserId ? 'SPECIFIC_USER' : 'ALL',
          recipientUserId: recipientUserId,
          priority: newStatus === 'REJECTED' ? 'HIGH' : 'NORMAL',
          icon: statusMsg.icon,
          link: '/special-assistance',
          relatedType: 'SPECIAL_ASSISTANCE',
          relatedId: request.id
        })
      })
    } catch (error) {
      console.error('通知の送信に失敗しました:', error)
    }
  }

  const filteredRequests = requests.filter(request => {
    if (selectedType !== 'ALL' && request.type !== selectedType) return false
    if (selectedStatus !== 'ALL' && request.status !== selectedStatus) return false
    if (searchQuery && !(
      request.requestNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.passengerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase())
    )) return false
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-ya-yellow-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            特別サポート申請管理
          </h1>
          <p className="text-gray-600">
            全 {requests.length} 件の申請記録
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-2" />
                検索
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="申請番号、氏名、メール"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                サービスタイプ
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              >
                <option value="ALL">すべて</option>
                <option value="SPECIAL_MEAL">特別機内食</option>
                <option value="UNACCOMPANIED_MINOR">お子様の一人旅</option>
                <option value="DISABILITY_CARE">障害者サポート</option>
                <option value="PET_IN_CABIN">ペット同伴</option>
                <option value="MEDICAL_CARE">医療サポート</option>
                <option value="TRANSFER_ASSISTANCE">乗り継ぎサポート</option>
                <option value="PRIORITY_BOARDING">優先搭乗</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                ステータス
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              >
                <option value="ALL">すべて</option>
                <option value="PENDING">保留中</option>
                <option value="PROCESSING">処理中</option>
                <option value="APPROVED">承認済み</option>
                <option value="REJECTED">却下</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <p className="text-gray-500">条件に一致する申請は見つかりませんでした</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {request.requestNumber}
                      </h3>
                      {getStatusBadge(request.status)}
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {getTypeLabel(request.type)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold">乗客：</span>
                        {request.passengerName}
                      </div>
                      <div>
                        <span className="font-semibold">メール：</span>
                        {request.email}
                      </div>
                      <div>
                        <span className="font-semibold">電話：</span>
                        {request.phone}
                      </div>
                      <div>
                        <span className="font-semibold">申請日：</span>
                        {new Date(request.createdAt).toLocaleDateString('ja-JP')}
                      </div>
                    </div>
                    {request.bookingNumber && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">予約番号：</span>
                        {request.bookingNumber}
                        {request.flightNumber && ` | フライト：${request.flightNumber}`}
                        {request.flightDate && ` | 日付：${request.flightDate}`}
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => setExpandedRequest(expandedRequest === request.id ? null : request.id)}
                    className="ml-4 p-2 text-ya-yellow-600 hover:bg-ya-yellow-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
                
                {/* 詳細情報を展開 */}
                {expandedRequest === request.id && (
                  <>
                    {request.details && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700 mb-2">詳細情報：</p>
                        <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                          {JSON.stringify(JSON.parse(request.details), null, 2)}
                        </pre>
                      </div>
                    )}

                    {/* 操作ボタン */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        ステータスを更新してユーザーに通知：
                      </p>
                      <div className="flex gap-3">
                        {request.status !== 'PROCESSING' && (
                          <button
                            onClick={() => updateRequestStatus(request.id, 'PROCESSING')}
                            disabled={processingId === request.id}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                          >
                            {processingId === request.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Clock className="w-4 h-4" />
                            )}
                            処理中としてマーク
                          </button>
                        )}
                        
                        {request.status !== 'APPROVED' && (
                          <button
                            onClick={() => updateRequestStatus(request.id, 'APPROVED')}
                            disabled={processingId === request.id}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                          >
                            {processingId === request.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                            承認して通知
                          </button>
                        )}
                        
                        {request.status !== 'REJECTED' && (
                          <button
                            onClick={() => updateRequestStatus(request.id, 'REJECTED')}
                            disabled={processingId === request.id}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                          >
                            {processingId === request.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                            却下して通知
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
