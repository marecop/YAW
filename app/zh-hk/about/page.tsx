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
            黃色航空集團
          </h1>
          <p className="text-xl text-gray-500 font-light">
            航空 - 同心協力，點燃激情
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card */}
          <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
            <div className="relative h-64 overflow-hidden bg-gray-50">
              <img 
                src="/images/airlines/yellow-airlines.png" 
                alt="Yellow Airlines Group"
                className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-primary transition-colors">
                Yellow Airlines Group
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                瞭解黃鶴背後的公司。
              </p>
              <div className="flex items-center text-gray-500 group-hover:text-primary transition-colors mt-auto">
                <div className="border border-current rounded-full p-1 mr-3">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Yellow Airlines Group</span>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://www.lufthansa.com/content/dam/lh/images/local_variations/c-2137798585-mam-2502-FlyingMoreSustainably_v1-16-9-2880x1620.jpg.transform/lh-dcep-transform-width-1440/img.jpg" 
                alt="Yellow Cargo 黃色貨運"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-primary transition-colors">
                Yellow Cargo 黃色貨運
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                黃色貨運的專業航空貨運人員值得信賴：我們將您的貨物迅速、安全地運送至全球各地。
              </p>
              <div className="flex items-center text-gray-500 group-hover:text-primary transition-colors mt-auto">
                <div className="border border-current rounded-full p-1 mr-3">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Yellow Cargo 黃色貨運</span>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519671282429-b44660ead0a7?q=80&w=800&auto=format&fit=crop" 
                alt="Yellow Aviation Training 黃色航空培訓"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-primary transition-colors">
                Yellow Aviation Training 黃色航空培訓
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                培訓大智慧。安全飛行。涵蓋駕駛艙培訓、客艙培訓及飛行培訓。
              </p>
              <div className="flex items-center text-gray-500 group-hover:text-primary transition-colors mt-auto">
                <div className="border border-current rounded-full p-1 mr-3">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Yellow Aviation Training 黃色航空培訓</span>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800&auto=format&fit=crop" 
                alt="Yellow Technics 黃色技術"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-primary transition-colors">
                Yellow Technics 黃色技術
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                瞭解領先的維護、修理和大修服務商的詳細資訊。黃色技術是民航機、民航機發動機及部件專家。
              </p>
              <div className="flex items-center text-gray-500 group-hover:text-primary transition-colors mt-auto">
                <div className="border border-current rounded-full p-1 mr-3">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Yellow Technics 黃色技術</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
