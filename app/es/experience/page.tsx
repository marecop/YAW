'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Coffee, Wifi, Tv, Armchair } from 'lucide-react'

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center">
        <Image
          src="/images/cabin-bg.jpg"
          alt="Experiencia Yellow Airlines"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Vuele con Confort</h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
            Redefiniendo la experiencia de viaje aéreo con un servicio excepcional y comodidad incomparable.
          </p>
        </div>
      </div>

      {/* Cabin Classes Navigation */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-8 py-4 overflow-x-auto">
            <a href="#economy" className="text-gray-600 hover:text-ya-yellow-600 font-medium whitespace-nowrap">Clase Económica</a>
            <a href="#business" className="text-gray-600 hover:text-ya-yellow-600 font-medium whitespace-nowrap">Clase Ejecutiva</a>
            <a href="#dining" className="text-gray-600 hover:text-ya-yellow-600 font-medium whitespace-nowrap">Gastronomía</a>
            <a href="#entertainment" className="text-gray-600 hover:text-ya-yellow-600 font-medium whitespace-nowrap">Entretenimiento</a>
          </div>
        </div>
      </div>

      {/* Economy Class */}
      <section id="economy" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-ya-yellow-100 rounded-full z-0"></div>
              <Image 
                src="/images/economy-seat.jpg"
                alt="Clase Económica"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl relative z-10"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Clase Económica</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nuestra Clase Económica está diseñada para ofrecer más que solo un asiento. Disfrute de un espacio generoso para las piernas, asientos ergonómicos y un servicio atento que hace que su viaje sea placentero desde el despegue hasta el aterrizaje.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-6 h-6 text-ya-yellow-500 mr-3" />
                  Hasta 32 pulgadas de espacio entre asientos
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-6 h-6 text-ya-yellow-500 mr-3" />
                  Reposacabezas ajustable en 4 direcciones
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-6 h-6 text-ya-yellow-500 mr-3" />
                  Pantalla táctil personal de 11 pulgadas
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Business Class */}
      <section id="business" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="md:w-1/2">
               <Image 
                src="/images/business-seat.jpg"
                alt="Clase Ejecutiva"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Clase Ejecutiva</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Experimente la máxima privacidad y confort. Nuestros asientos de Clase Ejecutiva se convierten en camas totalmente planas, permitiéndole llegar a su destino descansado y renovado.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <Armchair className="w-8 h-8 text-ya-yellow-600 mb-4" />
                  <h3 className="font-bold mb-2">Cama Totalmente Plana</h3>
                  <p className="text-sm text-gray-500">Cama de 2 metros con acceso directo al pasillo</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <Coffee className="w-8 h-8 text-ya-yellow-600 mb-4" />
                  <h3 className="font-bold mb-2">Comida Premium</h3>
                  <p className="text-sm text-gray-500">Cene a la carta cuando lo desee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="dining" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Servicios A Bordo</h2>
            <p className="text-xl text-gray-600">Detalles pensados para su disfrute</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group rounded-2xl overflow-hidden cursor-pointer relative h-96">
              <Image src="/images/food.jpg" alt="Dining" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Cocina Mundial</h3>
                <p className="text-gray-300">Menús elaborados por chefs galardonados, acompañados de vinos finos.</p>
              </div>
            </div>

            <div id="entertainment" className="group rounded-2xl overflow-hidden cursor-pointer relative h-96">
              <Image src="/images/entertainment.jpg" alt="Entertainment" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Entretenimiento</h3>
                <p className="text-gray-300">Más de 2000 horas de películas, TV y música a la carta.</p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden cursor-pointer relative h-96">
              <Image src="/images/wifi.jpg" alt="Connectivity" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Conectividad</h3>
                <p className="text-gray-300">Wi-Fi de alta velocidad disponible en toda la flota para mantenerlo conectado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ya-yellow-500 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">¿Listo para experimentar la diferencia?</h2>
          <p className="text-xl text-black/80 mb-10">
            Reserve su próximo vuelo con Yellow Airlines y descubra por qué somos la aerolínea preferida de Asia.
          </p>
          <Link 
            href="/es/flights"
            className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Reservar Ahora
          </Link>
        </div>
      </section>
    </div>
  )
}
