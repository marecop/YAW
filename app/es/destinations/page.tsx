'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight, Search } from 'lucide-react'

// Mock data
const destinations = [
  {
    id: 'tokyo',
    name: 'Tokio',
    country: 'Japón',
    code: 'NRT',
    image: '/images/tokyo.png',
    description: 'Experimente la fusión perfecta entre la cultura tradicional y la tecnología moderna',
    region: 'asia',
    price: 4500
  },
  {
    id: 'london',
    name: 'Londres',
    country: 'Reino Unido',
    code: 'LHR',
    image: '/images/london.png',
    description: 'Explore la historia y cultura real británica',
    region: 'europe',
    price: 6500
  },
  {
    id: 'new-york',
    name: 'Nueva York',
    country: 'Estados Unidos',
    code: 'JFK',
    image: '/images/newyork.png',
    description: 'La ciudad que nunca duerme, capital mundial de la moda y las finanzas',
    region: 'americas',
    price: 7800
  },
  {
    id: 'singapore',
    name: 'Singapur',
    country: 'Singapur',
    code: 'SIN',
    image: '/images/Singapore.png',
    description: 'La Ciudad Jardín de Asia, un paraíso gastronómico',
    region: 'asia',
    price: 4200
  },
  {
    id: 'sydney',
    name: 'Sídney',
    country: 'Australia',
    code: 'SYD',
    image: '/images/Sydney.png',
    description: 'Disfrute del sol, la playa y la icónica Ópera',
    region: 'oceania',
    price: 5500
  },
  {
    id: 'paris',
    name: 'París',
    country: 'Francia',
    code: 'CDG',
    image: '/images/paris.png',
    description: 'La ciudad del romance, centro de arte y gastronomía',
    region: 'europe',
    price: 6200
  }
]

export default function DestinationsPage() {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDestinations = destinations.filter(dest => {
    const matchesRegion = filter === 'all' || dest.region === filter
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.code.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRegion && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-ya-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Nuestros Destinos</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Volamos a más de 50 destinos en todo el mundo, llevándolo a explorar culturas y paisajes únicos en cada lugar.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Buscar ciudad, país o código de aeropuerto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-ya-yellow-500 pl-14"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'asia', label: 'Asia' },
            { id: 'europe', label: 'Europa' },
            { id: 'americas', label: 'América' },
            { id: 'oceania', label: 'Oceanía' }
          ].map((region) => (
            <button
              key={region.id}
              onClick={() => setFilter(region.id)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                filter === region.id
                  ? 'bg-ya-yellow-500 text-black'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <Link href={`/es/destinations/${dest.id}`} key={dest.id} className="group block">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-gray-900">
                    {dest.code}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-ya-yellow-600 transition-colors">
                        {dest.name}
                      </h3>
                      <div className="flex items-center text-gray-500 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {dest.country}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-2 flex-1">
                    {dest.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div>
                      <p className="text-xs text-gray-400">Ida y vuelta desde</p>
                      <p className="text-xl font-bold text-ya-yellow-600">HKD {dest.price.toLocaleString()}</p>
                    </div>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-900 group-hover:bg-ya-yellow-500 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No se encontraron destinos</h3>
            <p className="text-gray-500 mt-2">Intente ajustar sus criterios de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}
