import React from 'react';
import { Baby, Heart, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function FamilyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">家庭出行，歡樂相伴</h1>
          <p className="text-xl max-w-2xl text-white/90">
            無論是攜帶嬰兒還是兒童出行，我們都為您準備了貼心的服務，讓全家人的旅程輕鬆愉快。
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">嬰兒護理</h3>
              <p className="text-gray-600">
                提供嬰兒籃、嬰兒餐和優先登機服務。機上洗手間配有換尿布台，方便您照顧寶寶。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">兒童餐食</h3>
              <p className="text-gray-600">
                營養均衡、造型可愛的兒童餐，讓小朋友愛上吃飯。請記得在起飛前24小時預訂。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">無人陪同兒童</h3>
              <p className="text-gray-600">
                專業地勤和機組人員全程照顧獨自出行的兒童，確保他們安全抵達目的地。
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-orange-50 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">需要特殊協助？</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              如果您需要申請無人陪同兒童服務或有其他特殊需求，請訪問我們的特殊協助頁面。
            </p>
            <Link 
              href="/en/special-assistance" 
              className="inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
            >
              前往特殊協助
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

