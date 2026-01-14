'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Yellow Airlines - 概要
          </h1>
          <p className="text-xl text-gray-500 font-light">
            航空 - 同じ目的で連携し、情熱を燃やす。
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card */}
          <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="/images/airlines/yellow-airlines.png" 
                alt="Yellow Airlines Group"
                className="w-full h-full object-contain p-8 bg-gray-50 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-primary transition-colors">
              Yellow Incorporation
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              黄鶴の背後にある会社を見つける。
            </p>
            <div className="flex items-center text-gray-500 group-hover:text-primary transition-colors mt-auto">
              <div className="border border-current rounded-full p-1 mr-3">
                <ArrowRight className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Yellow Incorporation</span>
            </div>
            </div>
          </div>

          {/* Card */}
          <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://www.lufthansa.com/content/dam/lh/images/local_variations/c-2137798585-mam-2502-FlyingMoreSustainably_v1-16-9-2880x1620.jpg.transform/lh-dcep-transform-width-1440/img.jpg" 
                alt="Yellow Cargo"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-primary transition-colors">
              Yellow Airlines Cargo
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Yellow Airlines Cargoは信頼できる: 私たちはあなたの商品を迅速かつ安全に世界中の目的地に運びます。
            </p>
            <div className="flex items-center text-gray-500 group-hover:text-primary transition-colors mt-auto">
              <div className="border border-current rounded-full p-1 mr-3">
                <ArrowRight className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Yellow Airlines Cargo</span>
            </div>
            </div>
          </div>

          {/* Card */}
          <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519671282429-b44660ead0a7?q=80&w=800&auto=format&fit=crop" 
                alt="Yellow Aviation Training"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-primary transition-colors">
              Yellow Airlines Aviation Training
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              知恵を得るための訓練。安全に飛行する。コクピット、客室、および飛行訓練をカバーします。
            </p>
            <div className="flex items-center text-gray-500 group-hover:text-primary transition-colors mt-auto">
              <div className="border border-current rounded-full p-1 mr-3">
                <ArrowRight className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Yellow Airlines Aviation Training</span>
            </div>
            </div>
          </div>

          {/* Card */}
          <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800&auto=format&fit=crop" 
                alt="Yellow Technics"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-primary transition-colors">
              Yellow Airlines Technics
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              高度な整備、修理、およびオーバーホールサービスプロバイダーについて知る。Yellow Airlines Technicsは、民間航空機、エンジン、および部品の専門家です。
            </p>
            <div className="flex items-center text-gray-500 group-hover:text-primary transition-colors mt-auto">
              <div className="border border-current rounded-full p-1 mr-3">
                <ArrowRight className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Yellow Airlines Technics</span>
            </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
