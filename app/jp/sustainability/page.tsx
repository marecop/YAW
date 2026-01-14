import React from 'react';
import Image from 'next/image';
import { Leaf, Globe, Recycle, Wind } from 'lucide-react';

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">持続可能なフライト、地球を守る</h1>
          <p className="text-xl max-w-2xl text-green-100">
            イエローエアラインは、二酸化炭素排出量の削減に取り組み、より環境に優しい燃料と技術を採用して、次世代のために青い空を守ります。
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
              <h3 className="text-2xl font-bold mb-4 text-gray-900">カーボンオフセットプログラム</h3>
              <p className="text-gray-600 leading-relaxed">
                フライトのカーボンオフセットクレジットを購入し、世界中の植林および再生可能エネルギープロジェクトを支援することを選択できます。
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Wind className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">最新鋭の機材</h3>
              <p className="text-gray-600 leading-relaxed">
                A350やB787など、より燃費が良く静かな機材を導入し、燃料消費を削減するために常に機材を更新しています。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Recycle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">プラスチック削減</h3>
              <p className="text-gray-600 leading-relaxed">
                機内食サービスにおける使い捨てプラスチックの使用を全面的に削減し、生分解性またはリサイクル可能な素材に切り替えています。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
