import React from 'react';
import { Armchair, Utensils, Wifi, Monitor } from 'lucide-react';

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-ya-navy-900 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">極上のフライト体験</h1>
          <p className="text-xl max-w-2xl text-gray-300">
            機内に足を踏み入れた瞬間から、細部までこだわり抜いたおもてなしをお楽しみください。
          </p>
        </div>
      </section>

      {/* Classes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* Business Class */}
            <div className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl overflow-hidden shadow-xl">
              <div className="md:w-1/2 h-80 bg-gray-200 relative">
                 {/* Placeholder for Business Class Image */}
                 <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
                    <span className="text-2xl font-light">ビジネスクラス体験</span>
                 </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="uppercase tracking-wide text-sm text-ya-yellow-600 font-bold mb-2">Business Class</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">プレミアムビジネスクラス</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  フルフラットシートで雲の上でもぐっすりお休みいただけます。専用レーン、ラウンジへのアクセス、ミシュラン星付きシェフによる機内食をお楽しみください。
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Armchair className="w-5 h-5 mr-3 text-ya-yellow-600" />
                    180度フルフラットシート
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Utensils className="w-5 h-5 mr-3 text-ya-yellow-600" />
                    こだわりのコース料理
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Wifi className="w-5 h-5 mr-3 text-ya-yellow-600" />
                    高速機内Wi-Fi
                  </li>
                </ul>
              </div>
            </div>

            {/* Economy Class */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 bg-white rounded-3xl overflow-hidden shadow-xl">
              <div className="md:w-1/2 h-80 bg-gray-200 relative">
                 {/* Placeholder for Economy Class Image */}
                 <div className="absolute inset-0 flex items-center justify-center bg-blue-900 text-white">
                    <span className="text-2xl font-light">エコノミークラス</span>
                 </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="uppercase tracking-wide text-sm text-blue-600 font-bold mb-2">Economy Class</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">快適なエコノミークラス</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  広々とした足元スペース、人間工学に基づいたシートデザイン、豊富な機内エンターテインメントシステムで、長時間のフライトも快適にお過ごしいただけます。
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Monitor className="w-5 h-5 mr-3 text-blue-600" />
                    13インチ高画質タッチスクリーン
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Utensils className="w-5 h-5 mr-3 text-blue-600" />
                    無料のお食事サービス
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
