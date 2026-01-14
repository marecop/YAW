import React from 'react';
import { Baby, Heart, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function FamilyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">家族で楽しむ空の旅</h1>
          <p className="text-xl max-w-2xl text-white/90">
            小さなお子様連れでも安心。ご家族全員が快適に過ごせるよう、心を込めたサービスをご用意しています。
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                <Baby className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ベビーケア</h3>
              <p className="text-gray-600">
                ベビーバスケット、ベビーミール、優先搭乗サービスをご利用いただけます。機内トイレにはおむつ交換台も完備しております。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">キッズミール</h3>
              <p className="text-gray-600">
                栄養バランスが良く、見た目も楽しいキッズミールで、お子様のお食事も楽しく。ご出発の24時間前までにご予約ください。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">お子様一人旅</h3>
              <p className="text-gray-600">
                専門の地上スタッフと客室乗務員がお子様の一人旅をフルサポート。目的地まで安全にお送りいたします。
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-orange-50 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">特別なサポートが必要ですか？</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              お子様一人旅サービスのお申し込みや、その他特別な配慮が必要な場合は、スペシャルアシスタンスページをご覧ください。
            </p>
            <Link 
              href="/jp/special-assistance" 
              className="inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
            >
              スペシャルアシスタンスへ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
