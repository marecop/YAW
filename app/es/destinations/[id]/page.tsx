'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Plane, Info, ArrowLeft } from 'lucide-react'

// This would typically come from an API based on the ID
const destinationDetails = {
  tokyo: {
    name: 'Tokio',
    country: 'Japón',
    code: 'NRT',
    image: '/images/tokyo.png',
    description: 'Tokio es una metrópolis deslumbrante donde la tradición se encuentra con la ultra-modernidad. Desde templos antiguos hasta rascacielos iluminados con neón, ofrece una experiencia sensorial única.',
    highlights: [
      'Visite el histórico Templo Senso-ji en Asakusa',
      'Experimente el cruce más concurrido del mundo en Shibuya',
      'Disfrute de sushi fresco en el mercado de pescado de Tsukiji',
      'Vea la ciudad desde la altura en el Tokyo Skytree'
    ],
    weather: 'Primavera (Mar-May) y Otoño (Sep-Nov) son las mejores épocas para visitar.',
    flightInfo: 'Vuelo directo de 4h 30m desde Hong Kong. Múltiples vuelos diarios disponibles.',
    attractions: [
      { name: 'Monte Fuji', image: '/images/mt-fuji.png' },
      { name: 'Torre de Tokio', image: '/images/tokyo-tower.png' },
      { name: 'Shinjuku', image: '/images/shinjuku.png' }
    ]
  },
  // Default fallback for other IDs for demo purposes
  default: {
    name: 'Destino',
    country: 'Mundo',
    code: 'XYZ',
    image: '/images/hero-bg.jpg',
    description: 'Explore este increíble destino con Yellow Airlines. Disfrute de nuestro servicio premium y vuele con comodidad.',
    highlights: [
      'Lugares históricos',
      'Cocina local',
      'Centros comerciales',
      'Belleza natural'
    ],
    weather: 'El clima es agradable durante todo el año.',
    flightInfo: 'Vuelos directos disponibles todos los días.',
    attractions: []
  }
}

export default function DestinationDetailPage() {
  const params = useParams()
  const id = params.id as string
  const data = (destinationDetails as any)[id] || destinationDetails.default

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={data.image}
          alt={data.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        <div className="absolute top-6 left-6 z-10">
          <Link href="/es/destinations" className="inline-flex items-center text-white/90 hover:text-white bg-black/30 backdrop-blur px-4 py-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver a Destinos
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-ya-yellow-400 font-bold tracking-wider uppercase mb-2">
                  <MapPin className="w-5 h-5" />
                  {data.country}
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{data.name}</h1>
                <div className="inline-block bg-white/20 backdrop-blur px-4 py-1 rounded text-white font-mono text-xl">
                  {data.code}
                </div>
              </div>
              
              <Link 
                href={`/es/flights?to=${data.code}`}
                className="bg-ya-yellow-500 hover:bg-ya-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                <Plane className="w-5 h-5" />
                Reservar Vuelo Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Acerca de {data.name}</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {data.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Puntos Destacados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-ya-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                      <span className="text-ya-yellow-700 font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 font-medium">{highlight}</p>
                  </div>
                ))}
              </div>
            </section>

            {data.attractions && data.attractions.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Atracciones Populares</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {data.attractions.map((attraction: any, index: number) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative h-48 rounded-xl overflow-hidden mb-3">
                        <Image 
                          src={attraction.image} 
                          alt={attraction.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900">{attraction.name}</h3>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Información de Viaje</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Mejor época para visitar</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{data.weather}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0">
                    <Plane className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Información de Vuelo</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{data.flightInfo}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Información de Visa</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Verifique los requisitos de visa para pasaportes españoles antes de viajar.
                    </p>
                    <Link href="/es/immigration-requirements" className="text-ya-yellow-600 text-sm font-semibold hover:underline mt-1 block">
                      Ver requisitos &rarr;
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <Link 
                  href={`/es/flights?to=${data.code}`}
                  className="block w-full bg-black text-white text-center py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  Buscar Vuelos a {data.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
