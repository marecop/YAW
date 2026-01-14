import React from 'react';
import { Armchair, Utensils, Wifi, Monitor } from 'lucide-react';

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-ya-navy-900 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">卓越飛行體驗</h1>
          <p className="text-xl max-w-2xl text-gray-300">
            從踏入機艙的那一刻起，享受我們為您精心準備的每一項細節。
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
                    <span className="text-2xl font-light">商務艙體驗</span>
                 </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="uppercase tracking-wide text-sm text-ya-yellow-600 font-bold mb-2">Business Class</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">尊尚商務艙</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  全平躺座椅讓您在雲端安然入睡。享受專屬通道、貴賓室禮遇以及米其林星級機上餐飲。
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Armchair className="w-5 h-5 mr-3 text-ya-yellow-600" />
                    180度全平躺座椅
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Utensils className="w-5 h-5 mr-3 text-ya-yellow-600" />
                    精緻多道式餐點
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Wifi className="w-5 h-5 mr-3 text-ya-yellow-600" />
                    高速機上 Wi-Fi
                  </li>
                </ul>
              </div>
            </div>

            {/* Economy Class */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 bg-white rounded-3xl overflow-hidden shadow-xl">
              <div className="md:w-1/2 h-80 bg-gray-200 relative">
                 {/* Placeholder for Economy Class Image */}
                 <div className="absolute inset-0 flex items-center justify-center bg-blue-900 text-white">
                    <span className="text-2xl font-light">舒適經濟艙</span>
                 </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="uppercase tracking-wide text-sm text-blue-600 font-bold mb-2">Economy Class</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">舒適經濟艙</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  更寬敞的腿部空間，人體工學座椅設計，以及豐富的機上娛樂系統，讓長途飛行不再疲憊。
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Monitor className="w-5 h-5 mr-3 text-blue-600" />
                    13英寸高清觸摸屏
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Utensils className="w-5 h-5 mr-3 text-blue-600" />
                    免費餐飲服務
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

