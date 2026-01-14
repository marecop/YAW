'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Search } from 'lucide-react'

// Mock data for route map
const regions = [
  { id: 'asia', name: 'Asia' },
  { id: 'europe', name: 'Europa' },
  { id: 'americas', name: 'Américas' },
  { id: 'oceania', name: 'Oceanía' }
]

const destinations = [
  { city: 'Hong Kong', country: 'China', region: 'asia', type: 'hub' },
  { city: 'Tokio', country: 'Japón', region: 'asia', type: 'dest' },
  { city: 'Seúl', country: 'Corea del Sur', region: 'asia', type: 'dest' },
  { city: 'Singapur', country: 'Singapur', region: 'asia', type: 'dest' },
  { city: 'Bangkok', country: 'Tailandia', region: 'asia', type: 'dest' },
  { city: 'Londres', country: 'Reino Unido', region: 'europe', type: 'dest' },
  { city: 'París', country: 'Francia', region: 'europe', type: 'dest' },
  { city: 'Frankfurt', country: 'Alemania', region: 'europe', type: 'dest' },
  { city: 'Nueva York', country: 'EE.UU.', region: 'americas', type: 'dest' },
  { city: 'Los Ángeles', country: 'EE.UU.', region: 'americas', type: 'dest' },
  { city: 'Vancouver', country: 'Canadá', region: 'americas', type: 'dest' },
  { city: 'Sídney', country: 'Australia', region: 'oceania', type: 'dest' },
  { city: 'Melbourne', country: 'Australia', region: 'oceania', type: 'dest' },
]

export default function WhereWeFlyPage() {
  const [activeRegion, setActiveRegion] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDestinations = destinations.filter(dest => {
    const matchesRegion = activeRegion === 'all' || dest.region === activeRegion
    const matchesSearch = dest.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dest.country.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesRegion && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-ya-navy-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Mapa de Rutas</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Conectando Hong Kong con más de 50 destinos principales en todo el mundo.
          </p>
          
          {/* Map Placeholder */}
          <div className="relative w-full h-[400px] md:h-[600px] bg-blue-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
             <Image
               src="/images/world-map.svg" // You would need this asset
               alt="Mapa Mundial"
               fill
               className="object-cover opacity-50"
             />
             <div className="absolute inset-0 flex items-center justify-center">
               <p className="text-white text-lg font-mono">[Mapa Interactivo Aquí]</p>
             </div>
          </div>
        </div>
      </div>

      {/* Destination List */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Region Tabs */}
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar w-full md:w-auto">
            <button
              onClick={() => setActiveRegion('all')}
              className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-colors ${
                activeRegion === 'all' ? 'bg-ya-yellow-500 text-black' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Todos
            </button>
            {regions.map(region => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(region.id)}
                className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-colors ${
                  activeRegion === region.id ? 'bg-ya-yellow-500 text-black' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {region.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar ciudad o país"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ya-yellow-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest, index) => (
            <Link 
              href={`/es/flights?to=${dest.city}`} 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${dest.type === 'hub' ? 'bg-ya-yellow-100' : 'bg-blue-50'}`}>
                  <MapPin className={`w-6 h-6 ${dest.type === 'hub' ? 'text-ya-yellow-600' : 'text-blue-500'}`} />
                </div>
                {dest.type === 'hub' && (
                   <span className="bg-ya-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">HUB</span>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-ya-yellow-600 transition-colors">
                {dest.city}
              </h3>
              <p className="text-gray-500 text-sm">{dest.country}</p>
            </Link>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron destinos que coincidan con su búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
