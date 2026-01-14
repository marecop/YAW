'use client'

import Image from 'next/image'
import { Coffee, Wifi, Armchair, Utensils } from 'lucide-react'

export default function LoungesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[50vh]">
        <Image
          src="/images/lounge-hero.jpg"
          alt="Yellow Airlines Lounge"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Salas VIP</h1>
            <p className="text-xl font-light">Su oasis de tranquilidad antes del vuelo</p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Relájese y Recupere Energías</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Escape del bullicio de la terminal en nuestras exclusivas salas VIP. Ya sea que desee ponerse al día con el trabajo, disfrutar de una comida gourmet o simplemente descansar, nuestras instalaciones están diseñadas para satisfacer todas sus necesidades.
        </p>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <Utensils className="w-10 h-10 text-ya-yellow-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Gastronomía Gourmet</h3>
              <p className="text-gray-600 text-sm">Buffet internacional y platos a la carta preparados por nuestros chefs.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <Coffee className="w-10 h-10 text-ya-yellow-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Bar Premium</h3>
              <p className="text-gray-600 text-sm">Selección de vinos finos, licores, cócteles y café de especialidad.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <Armchair className="w-10 h-10 text-ya-yellow-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Zonas de Descanso</h3>
              <p className="text-gray-600 text-sm">Sillones cómodos y suites de descanso privadas para relajarse.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <Wifi className="w-10 h-10 text-ya-yellow-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Productividad</h3>
              <p className="text-gray-600 text-sm">Wi-Fi de alta velocidad, estaciones de carga y áreas de trabajo silenciosas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Access Info */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">¿Quién tiene acceso?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-ya-yellow-600 mb-4">Acceso Gratuito</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Pasajeros de Clase Ejecutiva y Primera Clase
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Miembros Gold y Platinum de Yellow Club
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Titulares de tarjetas de crédito asociadas seleccionadas
                </li>
              </ul>
            </div>

            <div className="border rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Acceso Pago</h3>
              <p className="text-gray-600 mb-4">
                Los pasajeros de Clase Económica y Premium Economy pueden comprar un pase de acceso único.
              </p>
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-gray-900">HKD 450</span>
                <span className="text-gray-500 ml-2">/ persona</span>
              </div>
              <button className="w-full bg-ya-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-ya-yellow-600 transition-colors">
                Comprar Pase de Sala VIP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-ya-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center">Nuestras Ubicaciones</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-bold text-ya-yellow-500 mb-2">Hong Kong (HKG)</h3>
              <p className="text-gray-300">Terminal 1, Cerca de la Puerta 1</p>
              <p className="text-gray-300">Abierto: 05:30 - Último vuelo</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-ya-yellow-500 mb-2">Tokio (NRT)</h3>
              <p className="text-gray-300">Terminal 2, Satélite 4</p>
              <p className="text-gray-300">Abierto: 07:00 - 22:00</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-ya-yellow-500 mb-2">Londres (LHR)</h3>
              <p className="text-gray-300">Terminal 3, Sala C</p>
              <p className="text-gray-300">Abierto: 06:00 - 21:30</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
