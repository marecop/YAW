'use client'

import { useEffect } from 'react'
import FlightSearchForm from '@/components/FlightSearchForm'
import Link from 'next/link'
import Image from 'next/image'
import { checkAndUpdateDBVersion } from '@/lib/dbVersion'
import { 
  Cloud, 
  Utensils, 
  Users, 
  ArrowRight, 
  Plane, 
  Clock, 
  Shield, 
  Leaf, 
  Coffee, 
  Heart,
  CreditCard 
} from 'lucide-react'

export default function Home() {
  // Comprobar la versión de la base de datos
  useEffect(() => {
    const versionMatches = checkAndUpdateDBVersion()
    if (!versionMatches) {
      console.log('✅ Caché borrada, la página se actualizará pronto...')
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }, [])

  // Datos de destinos populares - Visual mejorado
  const popularDestinations = [
    { id: 1, name: 'Tokio', code: 'NRT', imageUrl: '/images/tokyo.png', price: 'HK$4,500', tags: ['Compras', 'Gastronomía'] },
    { id: 2, name: 'Londres', code: 'LHR', imageUrl: '/images/london.png', price: 'HK$6,500', tags: ['Historia', 'Cultura'] },
    { id: 3, name: 'Nueva York', code: 'JFK', imageUrl: '/images/newyork.png', price: 'HK$7,800', tags: ['Bullicioso', 'Arte'] },
    { id: 4, name: 'Singapur', code: 'SIN', imageUrl: '/images/Singapore.png', price: 'HK$4,200', tags: ['Ciudad Jardín'] },
  ]

  // Datos de exploración temática
  const exploreThemes = [
    {
      id: 1,
      title: 'Vuelo sostenible',
      desc: 'Reduzca su huella de carbono con nosotros',
      icon: Leaf,
      color: 'bg-green-100 text-green-600',
      link: '/es/sustainability',
      imageColor: 'bg-green-600'
    },
    {
      id: 2,
      title: 'Experiencia Premium',
      desc: 'Descubra nuestro servicio de clase ejecutiva',
      icon: Coffee,
      color: 'bg-blue-100 text-blue-600',
      link: '/es/experience',
      imageColor: 'bg-ya-navy-800'
    },
    {
      id: 3,
      title: 'Viajes en familia',
      desc: 'Servicios atentos para toda la familia',
      icon: Heart,
      color: 'bg-orange-100 text-orange-600',
      link: '/es/family',
      imageColor: 'bg-orange-500'
    },
    {
      id: 4,
      title: 'Beneficios para miembros',
      desc: 'Gane puntos y canjee recompensas',
      icon: CreditCard,
      color: 'bg-yellow-100 text-yellow-600',
      link: '/es/auth/register',
      imageColor: 'bg-ya-yellow-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Optimizado */}
      <section className="relative bg-gradient-to-br from-ya-yellow-400 via-ya-yellow-500 to-ya-yellow-600 pb-64 pt-28 overflow-hidden">
        {/* Patrón de decoración de fondo */}
        <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 0 L100 100 Z" fill="white" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Izquierda: Texto de marca */}
            <div className="lg:col-span-5 text-white lg:text-left text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Nuevos vuelos de verano ya a la venta
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-black mb-6 leading-tight">
                Explore el mundo<br/>
                <span className="text-white drop-shadow-md">Comience aquí</span>
              </h1>
              <p className="text-xl text-black/80 font-medium mb-8 leading-relaxed">
                Ya sea por negocios o placer, Yellow Airlines le ofrece la experiencia de vuelo más cómoda y segura.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                     <Shield className="w-5 h-5 text-black" />
                   </div>
                   <div className="text-left">
                     <p className="text-xs text-black/60 font-bold uppercase">Certificado de seguridad</p>
                     <p className="text-sm text-black font-bold">Seguridad 5 estrellas</p>
                   </div>
                </div>
                <div className="w-px h-10 bg-black/10"></div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                     <Clock className="w-5 h-5 text-black" />
                   </div>
                   <div className="text-left">
                     <p className="text-xs text-black/60 font-bold uppercase">Puntualidad</p>
                     <p className="text-sm text-black font-bold">98.5%</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Derecha: Formulario de búsqueda */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 transform transition-transform hover:scale-[1.01] duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Plane className="w-6 h-6 text-ya-yellow-600" />
                    Vuelos
                  </h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Múltiples métodos de pago</span>
                </div>
                <FlightSearchForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explorar más temas - NUEVA SECCIÓN */}
      <section className="py-20 -mt-32 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exploreThemes.map((theme) => (
              <Link href={theme.link} key={theme.id} className="group">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                  <div className={`h-32 ${theme.imageColor} relative flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                    <theme.icon className="w-12 h-12 text-white/90 transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ya-yellow-600 transition-colors">
                      {theme.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 flex-1">
                      {theme.desc}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-ya-yellow-600 mt-auto">
                      Saber más <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destinos populares - Estilo de tarjeta de oferta de vuelo */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Destinos populares</h2>
              <p className="text-gray-500 text-lg">Rutas populares seleccionadas, precios que no se puede perder</p>
            </div>
            <Link href="/es/destinations" className="hidden md:flex items-center px-6 py-3 rounded-xl bg-gray-50 text-gray-900 font-semibold hover:bg-gray-100 transition-colors">
              Ver todos los destinos <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularDestinations.map((destination) => (
              <Link 
                href={`/es/flights?to=${destination.code}`} 
                key={destination.id}
                className="group block"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={destination.imageUrl}
                    alt={destination.name}
                    fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                    <div className="absolute top-4 left-4 flex gap-2">
                       {destination.tags.map(tag => (
                         <span key={tag} className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-gray-800 shadow-sm">
                           {tag}
                         </span>
                       ))}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between bg-white relative">
                    {/* Avión pequeño decorativo */}
                    <div className="absolute -top-6 right-6 w-12 h-12 bg-ya-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Plane className="w-6 h-6 text-black" />
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-1">Volar a</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{destination.name}</h3>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Ida y vuelta impuestos incluidos</p>
                        <p className="text-xl font-bold text-ya-yellow-600">{destination.price}<span className="text-sm text-gray-400 font-normal">*</span></p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 group-hover:text-ya-yellow-600 transition-colors">Reservar ahora &rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/es/destinations" className="inline-block px-8 py-4 bg-gray-100 rounded-xl font-bold text-gray-900">
              Ver más destinos
            </Link>
          </div>
        </div>
      </section>

      {/* Experiencia Yellow Airlines - Rediseñada */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experiencia Yellow Airlines</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">¿Por qué elegir Yellow Airlines?</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-ya-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                <Cloud className="w-8 h-8 text-ya-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cabina cómoda</h3>
              <p className="text-gray-600 leading-relaxed">
                Diseño de asientos ergonómicos y amplio espacio para las piernas para que su vuelo de larga distancia sea cómodo y relajante.
              </p>
            </div>
            
            {/* Tarjeta 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
               <div className="w-16 h-16 bg-ya-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                <Utensils className="w-8 h-8 text-ya-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comidas a bordo</h3>
              <p className="text-gray-600 leading-relaxed">
                Menús diseñados por chefs estrella, acompañados de vinos seleccionados, para un festín en las nubes.
              </p>
            </div>
            
            {/* Tarjeta 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
               <div className="w-16 h-16 bg-ya-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-ya-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Servicio atento</h3>
              <p className="text-gray-600 leading-relaxed">
                Nuestra tripulación profesional está siempre atenta a sus necesidades, brindándole un servicio meticuloso.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
