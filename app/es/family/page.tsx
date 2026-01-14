'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Shield, Smile, Gift, ArrowRight } from 'lucide-react'

export default function FamilyTravelPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/images/family-travel.jpg"
          alt="Viaje en Familia"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold mb-6">
              <Heart className="w-4 h-4 fill-current" />
              Yellow Airlines Families
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Viajes Inolvidables para Toda la Familia</h1>
            <p className="text-xl md:text-2xl font-light mb-8">
              Hacemos que viajar con niños sea fácil, divertido y memorable, desde el momento de la reserva hasta el aterrizaje.
            </p>
            <Link 
              href="/es/flights"
              className="inline-flex items-center bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Planificar Viaje Familiar
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-20 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué viajar con nosotros?</h2>
            <p className="text-xl text-gray-600">Servicios diseñados pensando en los más pequeños</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Prioridad en todo momento</h3>
              <p className="text-gray-600">
                Las familias disfrutan de embarque prioritario para instalarse con calma. También ofrecemos check-in exclusivo en aeropuertos seleccionados.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Smile className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comidas Divertidas</h3>
              <p className="text-gray-600">
                Menús especiales para niños servidos primero, con opciones saludables y deliciosas que les encantarán.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Gift className="w-7 h-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kits de Actividades</h3>
              <p className="text-gray-600">
                Mochilas de regalo con juguetes, libros y actividades para mantenerlos entretenidos durante todo el vuelo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Age Groups Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Viajando con Bebés</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 mt-2 bg-ya-yellow-500 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Moisés a bordo</h4>
                    <p className="text-gray-600">Disponibles en vuelos de larga distancia para bebés de hasta 12kg. Reserve con anticipación.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 mt-2 bg-ya-yellow-500 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Equipaje Extra</h4>
                    <p className="text-gray-600">Lleve un cochecito plegable y una bolsa de pañales sin cargo adicional.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 mt-2 bg-ya-yellow-500 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Tarifas Infantiles</h4>
                    <p className="text-gray-600">Los bebés menores de 2 años viajan por el 10% de la tarifa de adulto cuando van en el regazo.</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Para los Pequeños Exploradores (2-11 años)</h2>
                <p className="text-gray-600 mb-4">
                  Nuestro sistema de entretenimiento tiene una sección dedicada a niños con películas de Disney, dibujos animados y juegos interactivos.
                </p>
                <Link href="/es/special-assistance/unaccompanied-minor" className="text-ya-yellow-600 font-bold hover:underline">
                  ¿Viaja solo? Conozca nuestro servicio de Menor No Acompañado &rarr;
                </Link>
              </div>
            </div>
            
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/kids-flying.jpg"
                alt="Niños en avión"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ya-navy-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">¿Listo para su próxima aventura familiar?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Aproveche nuestras ofertas especiales para familias y cree recuerdos que durarán toda la vida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/es/flights"
              className="bg-ya-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-ya-yellow-400 transition-colors"
            >
              Buscar Vuelos
            </Link>
            <Link 
              href="/es/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-colors"
            >
              Contactar Soporte
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
