'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Plane, Globe } from 'lucide-react'

export default function DestinationsPage() {
    const [selectedRegion, setSelectedRegion] = useState<string>('all')

  const regions = [
    { id: 'all', name: 'すべての目的地' },
    { id: 'asia', name: 'アジア' },
    { id: 'europe', name: 'ヨーロッパ' },
    { id: 'americas', name: 'アメリカ' },
    { id: 'oceania', name: 'オセアニア' },
    { id: 'middle-east', name: '中東' },
  ]

  const destinations = [
    // アジア
    { id: 'hkg', code: 'HKG', city: '香港', country: '中国', region: 'asia', flights: 450, image: '/images/hk.png', price: 'HK$2,800' },
    { id: 'nrt', code: 'NRT', city: '東京', country: '日本', region: 'asia', flights: 30, image: '/images/tokyo.png', price: 'HK$2,800' },
    { id: 'icn', code: 'ICN', city: 'ソウル', country: '韓国', region: 'asia', flights: 30, image: '/images/seoul.png', price: 'HK$2,200' },
    { id: 'sin', code: 'SIN', city: 'シンガポール', country: 'シンガポール', region: 'asia', flights: 60, image: '/images/singapore.png', price: 'HK$2,400' },
    { id: 'bkk', code: 'BKK', city: 'バンコク', country: 'タイ', region: 'asia', flights: 30, image: '/images/bangkok.png', price: 'HK$1,800' },
    { id: 'pek', code: 'PEK', city: '北京', country: '中国', region: 'asia', flights: 180, price: 'HK$1,500' },
    { id: 'pvg', code: 'PVG', city: '上海', country: '中国', region: 'asia', flights: 150, price: 'HK$1,600' },
    { id: 'can', code: 'CAN', city: '広州', country: '中国', region: 'asia', flights: 150, price: 'HK$800' },
    
    // ヨーロッパ
    { id: 'fra', code: 'FRA', city: 'フランクフルト', country: 'ドイツ', region: 'europe', flights: 120, image: '/images/frankfurt.png', price: 'HK$4,465' },
    { id: 'cdg', code: 'CDG', city: 'パリ', country: 'フランス', region: 'europe', flights: 60, image: '/images/paris.png', price: 'HK$5,200' },
    { id: 'lhr', code: 'LHR', city: 'ロンドン', country: 'イギリス', region: 'europe', flights: 90, image: '/images/london.png', price: 'HK$5,500' },
    { id: 'muc', code: 'MUC', city: 'ミュンヘン', country: 'ドイツ', region: 'europe', flights: 30, price: 'HK$4,800' },
    { id: 'ams', code: 'AMS', city: 'アムステルダム', country: 'オランダ', region: 'europe', flights: 30, price: 'HK$5,100' },
    
    // アメリカ
    { id: 'jfk', code: 'JFK', city: 'ニューヨーク', country: 'アメリカ', region: 'americas', flights: 60, image: '/images/newyork.png', price: 'HK$6,800' },
    { id: 'lax', code: 'LAX', city: 'ロサンゼルス', country: 'アメリカ', region: 'americas', flights: 60, image: '/images/losangeles.png', price: 'HK$6,200' },
    { id: 'sfo', code: 'SFO', city: 'サンフランシスコ', country: 'アメリカ', region: 'americas', flights: 30, price: 'HK$6,400' },
    
    // オセアニア
    { id: 'syd', code: 'SYD', city: 'シドニー', country: 'オーストラリア', region: 'oceania', flights: 60, image: '/images/sydney.png', price: 'HK$4,200' },
    { id: 'mel', code: 'MEL', city: 'メルボルン', country: 'オーストラリア', region: 'oceania', flights: 30, price: 'HK$4,400' },
    
    // 中東
    { id: 'dxb', code: 'DXB', city: 'ドバイ', country: 'アラブ首長国連邦', region: 'middle-east', flights: 30, image: '/images/dubai.png', price: 'HK$3,800' },
  ]

  const filteredDestinations = selectedRegion === 'all'
    ? destinations
    : destinations.filter(d => d.region === selectedRegion)

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* パンくずリスト */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/jp/" className="text-gray-500 hover:text-gray-700">
              ホーム
            </Link>
          </li>
          <li className="flex items-center">
            <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-gray-900 font-medium">目的地を探す</span>
          </li>
        </ol>
      </nav>

      {/* タイトル */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          <Globe className="inline-block w-10 h-10 mr-3 text-ya-yellow-600" />
          目的地を探す
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          イエローエアラインは世界{destinations.length}の目的地を結び、あなたの旅をサポートします
        </p>
      </div>

      {/* 統計情報 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <MapPin className="w-8 h-8 text-ya-yellow-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900">{destinations.length}</div>
          <div className="text-sm text-gray-600">目的地</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Globe className="w-8 h-8 text-ya-yellow-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900">5</div>
          <div className="text-sm text-gray-600">大陸</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Plane className="w-8 h-8 text-ya-yellow-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900">930+</div>
          <div className="text-sm text-gray-600">月間フライト</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <svg className="w-8 h-8 text-ya-yellow-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-3xl font-bold text-gray-900">24/7</div>
          <div className="text-sm text-gray-600">フライトサービス</div>
        </div>
      </div>

      {/* 地域フィルター */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedRegion === region.id
                  ? 'bg-ya-yellow-500 text-black shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>

      {/* 目的地グリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDestinations.map((dest) => (
          <Link
            key={dest.id}
            href={`/jp/flights?to=${dest.code}`}
            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 bg-gradient-to-br from-ya-yellow-100 to-ya-yellow-200 overflow-hidden">
              {dest.image ? (
                <div className="h-full w-full flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={dest.image} alt={dest.city} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <MapPin className="w-20 h-20 text-ya-yellow-600 opacity-50" />
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-900">
                {dest.code}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-ya-yellow-600 transition-colors">
                {dest.city}
              </h3>
              <p className="text-gray-600 mb-3">{dest.country}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <Plane className="w-4 h-4" />
                  <span>{dest.flights} 便/月</span>
                </div>
                <div className="font-bold text-ya-yellow-600">
                  {dest.price}から
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTAエリア */}
      <div className="mt-16 bg-gradient-to-r from-ya-yellow-500 to-ya-yellow-600 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          旅を始める準備はできましたか？
        </h2>
        <p className="text-lg text-gray-800 mb-6">
          今すぐフライトを検索して、世界中の素晴らしい目的地を探索しましょう
        </p>
        <Link
          href="/jp/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          <Plane className="w-5 h-5" />
          <span>フライトを検索</span>
        </Link>
      </div>
    </main>
  )
}
