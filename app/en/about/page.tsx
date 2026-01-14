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
            Yellow Airlines - About
          </h1>
          <p className="text-xl text-gray-500 font-light">
            Aviation - United Efforts, Igniting Passion
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
              Discover the company behind the Yellow Crane.
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
              Yellow Cargo
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Yellow Airlines Cargo is reliable: we transport your goods quickly and safely to destinations worldwide.
            </p>
            <div className="flex items-center text-gray-500 group-hover:text-primary transition-colors mt-auto">
              <div className="border border-current rounded-full p-1 mr-3">
                <ArrowRight className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Yellow Cargo</span>
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
              Educating next generation of pilots and aircrews.
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
              Learn about the leading maintenance, repair, and overhaul service provider. Yellow Airlines Technics is an expert in civil aircraft, engines, and components.
            </p>
            <div className="flex items-center text-gray-500 group-hover:text-primary transition-colors mt-auto">
              <div className="border border-current rounded-full p-1 mr-3">
                <ArrowRight className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Yellow Technics</span>
            </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
