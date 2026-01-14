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
      title: '特別機内食',
      description: '宗教、健康状態、または食事制限に対応した特別なお食事をご提供します',
      href: '/jp/special-assistance/special-meal',
      color: 'bg-orange-500'
    },
    {
      id: 'unaccompanied-minor',
      icon: Baby,
      title: 'お子様の一人旅',
      description: '5歳から17歳のお子様が一人で旅行される際、出発から到着までサポートします',
      href: '/jp/special-assistance/unaccompanied-minor',
      color: 'bg-pink-500'
    },
    {
      id: 'disability-care',
      icon: Accessibility,
      title: 'バリアフリーサービス',
      description: 'お体の不自由なお客様や車椅子をご利用のお客様をサポートします',
      href: '/jp/special-assistance/disability-care',
      color: 'bg-blue-500'
    },
    {
      id: 'pet-in-cabin',
      icon: Dog,
      title: 'ペットの機内持ち込み',
      description: '小型のペットと一緒に客室でご旅行いただけます（要事前予約）',
      href: '/jp/special-assistance/pet-in-cabin',
      color: 'bg-green-500'
    },
    {
      id: 'medical-care',
      icon: Heart,
      title: '医療アシスタンス',
      description: '医療的な配慮が必要なお客様や健康状態に不安のあるお客様をサポートします',
      href: '/jp/special-assistance/medical-care',
      color: 'bg-red-500'
    },
    {
      id: 'transfer-assistance',
      icon: Route,
      title: '乗り継ぎサポート',
      description: '乗り継ぎのお客様へ案内や必要なサポートを提供します',
      href: '/jp/special-assistance/transfer-assistance',
      color: 'bg-purple-500'
    },
    {
      id: 'priority-boarding',
      icon: Plane,
      title: '優先搭乗',
      description: 'ご高齢の方、妊娠中の方、小さなお子様連れの方、お体の不自由な方は優先的にご搭乗いただけます',
      href: '/jp/special-assistance/priority-boarding',
      color: 'bg-yellow-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ya-yellow-500 to-ya-yellow-600 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            スペシャルアシスタンス
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl">
            すべてのお客様に快適で安全な空の旅をお届けします。どのような特別なご要望でも、可能な限りサポートさせていただきます。
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
                    <span>詳細を見る</span>
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
            重要なお知らせ
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>出発の48時間前までにお申し込みください。</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>一部のサービスには診断書や関連書類の提出が必要な場合があります。</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>お申し込み後、メールまたはお電話にて確認のご連絡を差し上げます。</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>お急ぎの場合は、カスタマーサービスまで直接お問い合わせください。</span>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            お問い合わせ
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
                メール
              </div>
              <div className="text-gray-600">assist@yellowairlines.com</div>
            </div>
            <div>
              <div className="text-4xl mb-2">⏰</div>
              <div className="font-semibold text-gray-900">
                受付時間
              </div>
              <div className="text-gray-600">24/7 (年中無休)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
