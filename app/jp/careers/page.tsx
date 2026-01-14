'use client'

import Link from 'next/link'

export default function CareersPage() {
  
  const jobCategories = [
    {
      id: 'flight',
      title: 'フライトオペレーション',
      positions: [
        { id: 1, title: 'パイロット', location: '複数拠点', type: 'フルタイム' },
        { id: 2, title: '機長', location: '複数拠点', type: 'フルタイム' },
        { id: 3, title: '客室乗務員', location: '複数拠点', type: 'フルタイム' },
        { id: 4, title: '地上職', location: '複数拠点', type: 'フルタイム' },
      ]
    },
    {
      id: 'technical',
      title: '技術・整備',
      positions: [
        { id: 5, title: '航空機整備士', location: '広州', type: 'フルタイム' },
        { id: 6, title: 'アビオニクス技術者', location: '広州', type: 'フルタイム' },
        { id: 7, title: '品質保証スペシャリスト', location: '広州', type: 'フルタイム' },
      ]
    },
    {
      id: 'business',
      title: 'ビジネス・管理',
      positions: [
        { id: 8, title: '路線計画マネージャー', location: '広州', type: 'フルタイム' },
        { id: 9, title: 'マーケティングスペシャリスト', location: '複数拠点', type: 'フルタイム' },
        { id: 10, title: 'カスタマーサービススーパーバイザー', location: '複数拠点', type: 'フルタイム' },
        { id: 11, title: '財務アナリスト', location: '複数拠点', type: 'フルタイム' },
      ]
    },
    {
      id: 'digital',
      title: 'デジタル・技術',
      positions: [
        { id: 12, title: 'ソフトウェアエンジニア', location: '広州', type: 'フルタイム/リモート' },
        { id: 13, title: 'UI/UXデザイナー', location: '広州', type: 'フルタイム/リモート' },
        { id: 14, title: 'データアナリスト', location: '広州', type: 'フルタイム' },
        { id: 15, title: 'ITサポートスペシャリスト', location: '複数拠点', type: 'フルタイム' },
      ]
    }
  ]

  const benefits = [
    { title: '割引航空券', description: '従業員および家族向けの割引航空券' },
    { title: '包括的な医療保障', description: '充実した医療保険と健康診断プログラム' },
    { title: 'キャリア開発プログラム', description: '豊富なトレーニングコースとキャリア開発計画' },
    { title: '柔軟な勤務体系', description: '一部の職種でリモートワークやフレックスタイム制を提供' },
    { title: '退職金制度', description: '競争力のある退職金制度と福利厚生' },
    { title: '国際的な職場環境', description: '多文化的な職場環境とグローバルな活躍の機会' },
  ]

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 面包屑 */}
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
            <span className="ml-2 text-gray-900 font-medium">採用情報</span>
          </li>
        </ol>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Yellow Airlinesに参加する</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          私たちは卓越したフライト体験を提供することに尽力しており、情熱と才能ある人材をチームに歓迎します。
        </p>
      </div>

      <div className="bg-ya-yellow-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">企業文化</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-ya-yellow-600">革新の精神</h3>
            <p className="text-gray-600">私たちは従業員に革新的な思考を促し、常にサービスの改善と最適化の方法を模索することを奨励しています。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-ya-yellow-600">チームワーク</h3>
            <p className="text-gray-600">チームワークを通じて、より大きな成果を上げ、より良いサービスを提供できると信じています。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-ya-yellow-600">多様性と包摂</h3>
            <p className="text-gray-600">私たちは一人ひとりのユニークな背景と視点を尊重し、大切にし、包摂的な職場環境を作り出しています。</p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">募集職種</h2>
        
        <div className="space-y-12">
          {jobCategories.map((category) => (
            <div key={category.id}>
              <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.positions.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-medium text-gray-900">{job.title}</h4>
                      <span className="bg-ya-yellow-100 text-ya-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {job.type}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">勤務地: {job.location}</p>
                    <div className="mt-4">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ya-yellow-600 hover:bg-ya-yellow-700">
                        詳細を見る
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">従業員福利厚生</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">採用プロセス</h2>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gray-50 text-lg font-medium text-gray-900">応募フロー</span>
            </div>
          </div>
          
          <div className="mt-8 space-y-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-ya-yellow-500 text-white font-bold">
                  1
                </div>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium">オンライン応募</h3>
                <p className="mt-1 text-gray-600">募集職種一覧をご覧になり、自分に合った職種を見つけて応募してください</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-ya-yellow-500 text-white font-bold">
                  2
                </div>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium">一次選考</h3>
                <p className="mt-1 text-gray-600">採用チームが応募書類を審査し、適切な候補者に連絡します</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-ya-yellow-500 text-white font-bold">
                  3
                </div>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium">面接段階</h3>
                <p className="mt-1 text-gray-600">職種に応じて、電話面接、ビデオ面接、対面面接が行われます</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-ya-yellow-500 text-white font-bold">
                  4
                </div>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium">採用・入社</h3>
                <p className="mt-1 text-gray-600">面接に合格した後、採用通知を送り、入社手続きをサポートします</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-ya-yellow-600 hover:bg-ya-yellow-700">
            今すぐ応募する
          </button>
        </div>
      </div>
    </main>
  )
}
