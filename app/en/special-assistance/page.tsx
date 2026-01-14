'use client'

import Link from 'next/link'
import { 
  Utensils, 
  Baby, 
  Accessibility, 
  Dog, 
  Heart, 
  Route, 
  Plane,
  ChevronRight 
} from 'lucide-react'

export default function SpecialAssistancePage() {
  const services = [
    {
      id: 'special-meal',
      icon: Utensils,
      title: '特殊餐食',
      description: '為您提供符合宗教、健康或飲食習慣嘅特殊餐食',
      href: '/special-assistance/special-meal',
      color: 'bg-orange-500'
    },
    {
      id: 'unaccompanied-minor',
      icon: Baby,
      title: '無人陪同兒童',
      description: '為5-17歲獨自旅行嘅兒童提供全程照顧服務',
      href: '/special-assistance/unaccompanied-minor',
      color: 'bg-pink-500'
    },
    {
      id: 'disability-care',
      icon: Accessibility,
      title: '無障礙服務',
      description: '為行動不便或需要輪椅協助嘅旅客提供支援服務',
      href: '/special-assistance/disability-care',
      color: 'bg-blue-500'
    },
    {
      id: 'pet-in-cabin',
      icon: Dog,
      title: '客艙寵物',
      description: '小型寵物可陪同進入客艙（需提前申請）',
      href: '/special-assistance/pet-in-cabin',
      color: 'bg-green-500'
    },
    {
      id: 'medical-care',
      icon: Heart,
      title: '醫療協助',
      description: '為有醫療需求或健康狀況嘅旅客提供協助',
      href: '/special-assistance/medical-care',
      color: 'bg-red-500'
    },
    {
      id: 'transfer-assistance',
      icon: Route,
      title: '轉機協助',
      description: '為轉機旅客提供指引與必要協助',
      href: '/special-assistance/transfer-assistance',
      color: 'bg-purple-500'
    },
    {
      id: 'priority-boarding',
      icon: Plane,
      title: '優先登機',
      description: '為長者、孕婦、帶嬰兒或行動不便旅客提供優先登機服務',
      href: '/special-assistance/priority-boarding',
      color: 'bg-yellow-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ya-yellow-500 to-ya-yellow-600 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            特別需求服務
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl">
            我哋致力於為所有乘客提供舒適安全嘅飛行體驗。無論您有咩特殊需求，我哋都會盡力協助。
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                href={service.href}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-ya-yellow-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center text-ya-yellow-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span>立即申請</span>
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Important Information */}
        <div className="mt-16 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            重要資訊
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>請至少於航班起飛前 48 小時提交申請。</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>部分服務可能需要提供醫療證明或相關文件。</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>申請提交後，我哋會以電郵或電話與您確認。</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>如有緊急情況，請即時聯絡客服。</span>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            需要協助？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2">📞</div>
              <div className="font-semibold text-gray-900">
                電話
              </div>
              <div className="text-gray-600">+852 2345 6789</div>
            </div>
            <div>
              <div className="text-4xl mb-2">✉️</div>
              <div className="font-semibold text-gray-900">
                電郵
              </div>
              <div className="text-gray-600">assist@yellowairlines.com</div>
            </div>
            <div>
              <div className="text-4xl mb-2">⏰</div>
              <div className="font-semibold text-gray-900">
                服務時間
              </div>
              <div className="text-gray-600">24/7</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

