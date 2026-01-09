'use client'

import { Plane, Users, Globe, Award, Heart, Shield } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-navy to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Plane className="w-20 h-20 mx-auto mb-6 text-primary" />
          <h1 className="text-5xl font-bold mb-4">關於黃色航空</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            連接世界，創造美好旅程 —— 您值得信賴的航空夥伴
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy mb-6">我們的使命</h2>
              <p className="text-lg text-gray-700 mb-4">
                黃色航空致力於為全球旅客提供安全、舒適、準時的航空服務。我們相信，每一次飛行都不僅僅是從A點到B點的移動，更是一段充滿期待和美好回憶的旅程。
              </p>
              <p className="text-lg text-gray-700 mb-6">
                自成立以來，我們始終堅持以客為本的理念，不斷創新服務，提升飛行體驗，讓每一位乘客都能享受到優質的空中旅行。
              </p>
              <Link 
                href="/flights/search"
                className="inline-block px-8 py-3 bg-primary text-navy font-bold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                立即預訂航班
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-yellow-300 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl">
                <img 
                  src="/images/plane-wing.jpg" 
                  alt="Aircraft" 
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-64 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-lg flex items-center justify-center"><Plane class="w-24 h-24 text-navy opacity-20" /></div>'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-navy text-center mb-12">我們的核心價值</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: '安全第一',
                description: '我們將安全放在首位，採用最先進的技術和最嚴格的標準，確保每一次飛行都安全無憂。',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: Heart,
                title: '以客為本',
                description: '客戶的滿意是我們最大的追求。從預訂到登機，我們提供全程貼心服務。',
                color: 'from-red-500 to-pink-600'
              },
              {
                icon: Award,
                title: '卓越品質',
                description: '我們追求卓越，不斷提升服務質量，為旅客創造超越期待的飛行體驗。',
                color: 'from-yellow-500 to-orange-600'
              },
              {
                icon: Globe,
                title: '連接世界',
                description: '我們的航線網絡覆蓋全球主要城市，讓世界變得更近，讓旅行更加便捷。',
                color: 'from-green-500 to-teal-600'
              },
              {
                icon: Users,
                title: '團隊協作',
                description: '我們擁有專業、熱情的團隊，每一位員工都致力於為您提供最優質的服務。',
                color: 'from-purple-500 to-indigo-600'
              },
              {
                icon: Plane,
                title: '創新進取',
                description: '我們不斷創新，引入最新技術和服務理念，為航空業樹立新標準。',
                color: 'from-cyan-500 to-blue-600'
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-20 bg-gradient-to-r from-navy to-blue-900 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold text-center mb-12">數據說話</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '100+', label: '通航城市' },
              { number: '50+', label: '現代化機隊' },
              { number: '1000萬+', label: '年服務旅客' },
              { number: '99.5%', label: '準點率' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <h2 className="text-4xl font-bold text-navy mb-6">聯繫我們</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            無論您有任何問題或建議，我們都樂意為您服務。請隨時與我們聯繫！
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-navy mb-2">客服熱線</h3>
              <p className="text-gray-700">+852 3988 8888</p>
            </div>
            <div className="p-6 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-navy mb-2">電子郵箱</h3>
              <p className="text-gray-700">service@yellowairlines.com</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="font-bold text-navy mb-2">營業時間</h3>
              <p className="text-gray-700">24小時全天候服務</p>
            </div>
          </div>
          <div className="mt-8">
            <Link 
              href="/faq"
              className="inline-block px-8 py-3 bg-navy text-white font-bold rounded-lg hover:bg-blue-900 transition-colors mr-4"
            >
              查看常見問題
            </Link>
            <Link 
              href="/contact"
              className="inline-block px-8 py-3 bg-white border-2 border-navy text-navy font-bold rounded-lg hover:bg-gray-50 transition-colors"
            >
              聯繫客服
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

