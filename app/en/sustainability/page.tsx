import React from 'react';
import Image from 'next/image';
import { Leaf, Globe, Recycle, Wind } from 'lucide-react';

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">永續飛行，守護地球</h1>
          <p className="text-xl max-w-2xl text-green-100">
            黃色航空致力於減少碳足跡，採用更環保的燃油和技術，為下一代保留蔚藍天空。
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
          <Globe className="w-full h-full text-white" />
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">碳抵消計劃</h3>
              <p className="text-gray-600 leading-relaxed">
                您可以選擇為您的航班購買碳抵消額度，支持全球植樹造林和可再生能源項目。
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Wind className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">現代化機隊</h3>
              <p className="text-gray-600 leading-relaxed">
                我們不斷更新機隊，引入更省油、更安靜的機型，如 A350 和 B787，減少燃油消耗。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Recycle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">減塑行動</h3>
              <p className="text-gray-600 leading-relaxed">
                機上餐飲服務全面減少一次性塑料使用，轉而使用可生物降解或可回收材料。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

