'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
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
  const { t } = useLanguage()
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
      'SPECIAL_MEAL': '特殊餐食',
      'UNACCOMPANIED_MINOR': '無人陪同兒童',
      'DISABILITY_CARE': '殘疾人士關照',
      'PET_IN_CABIN': '寵物進客艙',
      'MEDICAL_CARE': '醫療關照',
      'TRANSFER_ASSISTANCE': '中轉引導',
      'PRIORITY_BOARDING': '優先登機'
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
      'PENDING': '待處理',
      'PROCESSING': '處理中',
      'APPROVED': '已批准',
      'REJECTED': '已拒絕'
    }

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {icons[status]}
        {labels[status]}
      </span>
    )
  }

  // 更新请求状态并发送通知
  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    setProcessingId(requestId)
    
    try {
      // TODO: 创建更新状态的API
      const response = await fetch(`/api/special-assistance/${requestId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        // 更新本地状态
        setRequests(prev =>
          prev.map(req =>
            req.id === requestId ? { ...req, status: newStatus } : req
          )
        )

        // 发送通知给用户
        const request = requests.find(r => r.id === requestId)
        if (request) {
          await sendNotification(request, newStatus)
        }

        alert('狀態已更新並已發送通知給用戶')
      } else {
        alert('更新失敗')
      }
    } catch (error) {
      console.error('更新狀態失敗:', error)
      alert('更新失敗')
    } finally {
      setProcessingId(null)
    }
  }

  // 发送通知给用户
  const sendNotification = async (request: SpecialAssistanceRequest, newStatus: string) => {
    // 根据状态生成不同的消息
    const statusMessages: Record<string, { title: string, message: string, icon: string }> = {
      'APPROVED': {
        title: '特別需求申請已批准',
        message: `您的特別需求申請 ${request.requestNumber} 已被批准。我們會為您提供相應服務。`,
        icon: '✅'
      },
      'REJECTED': {
        title: '特別需求申請未通過',
        message: `抱歉，您的特別需求申請 ${request.requestNumber} 未能通過審核。如有疑問，請聯繫客服。`,
        icon: '❌'
      },
      'PROCESSING': {
        title: '特別需求申請處理中',
        message: `您的特別需求申請 ${request.requestNumber} 正在處理中，我們會盡快為您處理。`,
        icon: '⏳'
      }
    }

    const statusMsg = statusMessages[newStatus]
    if (!statusMsg) return

    try {
      // 查找用户ID（通过email）
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
      console.error('發送通知失敗:', error)
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
            特別需求申請管理
          </h1>
          <p className="text-gray-600">
            共 {requests.length} 條申請記錄
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-2" />
                搜索
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="申請編號、姓名、郵箱"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                服務類型
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              >
                <option value="ALL">全部</option>
                <option value="SPECIAL_MEAL">特殊餐食</option>
                <option value="UNACCOMPANIED_MINOR">無人陪同兒童</option>
                <option value="DISABILITY_CARE">殘疾人士關照</option>
                <option value="PET_IN_CABIN">寵物進客艙</option>
                <option value="MEDICAL_CARE">醫療關照</option>
                <option value="TRANSFER_ASSISTANCE">中轉引導</option>
                <option value="PRIORITY_BOARDING">優先登機</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                狀態
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"
              >
                <option value="ALL">全部</option>
                <option value="PENDING">待處理</option>
                <option value="PROCESSING">處理中</option>
                <option value="APPROVED">已批准</option>
                <option value="REJECTED">已拒絕</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <p className="text-gray-500">沒有找到符合條件的申請</p>
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
                        <span className="font-semibold">乘客：</span>
                        {request.passengerName}
                      </div>
                      <div>
                        <span className="font-semibold">郵箱：</span>
                        {request.email}
                      </div>
                      <div>
                        <span className="font-semibold">電話：</span>
                        {request.phone}
                      </div>
                      <div>
                        <span className="font-semibold">申請日期：</span>
                        {new Date(request.createdAt).toLocaleDateString('zh-HK')}
                      </div>
                    </div>
                    {request.bookingNumber && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">預訂編號：</span>
                        {request.bookingNumber}
                        {request.flightNumber && ` | 航班：${request.flightNumber}`}
                        {request.flightDate && ` | 日期：${request.flightDate}`}
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
                
                {/* 展开详细信息 */}
                {expandedRequest === request.id && (
                  <>
                    {request.details && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700 mb-2">詳細資料：</p>
                        <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                          {JSON.stringify(JSON.parse(request.details), null, 2)}
                        </pre>
                      </div>
                    )}

                    {/* 操作按钮 */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        更新狀態並通知用戶：
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
                            標記為處理中
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
                            批准並通知
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
                            拒絕並通知
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

