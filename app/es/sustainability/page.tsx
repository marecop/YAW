'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Leaf, Droplet, Wind, Recycle } from 'lucide-react'

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/sustainability-hero.jpg"
          alt="Sostenibilidad"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-green-900/40 mix-blend-multiply"></div>
        <div className="relative z-10 max-w-4xl px-4 text-center text-white">
          <div className="inline-block p-3 rounded-full bg-green-500/20 backdrop-blur-sm mb-6">
            <Leaf className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Volando Hacia un Futuro Verde</h1>
          <p className="text-xl md:text-2xl font-light text-green-50">
            Nuestro compromiso de alcanzar cero emisiones netas para 2050 a través de la innovación y la responsabilidad.
          </p>
        </div>
      </div>

      {/* Main Initiatives */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-green-50 p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
              <Wind className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flota Eficiente</h3>
              <p className="text-gray-600">
                Invertimos en aviones modernos que consumen un 25% menos de combustible que los modelos anteriores.
              </p>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
              <Droplet className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">SAF</h3>
              <p className="text-gray-600">
                Comprometidos con el uso del 10% de Combustible de Aviación Sostenible (SAF) para 2030.
              </p>
            </div>

            <div className="bg-orange-50 p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
              <Recycle className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cero Plástico</h3>
              <p className="text-gray-600">
                Eliminamos el 90% de los plásticos de un solo uso a bordo reemplazándolos con materiales compostables.
              </p>
            </div>

            <div className="bg-teal-50 p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
              <Leaf className="w-10 h-10 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Compensación</h3>
              <p className="text-gray-600">
                Ofrecemos a los pasajeros la opción de compensar su huella de carbono apoyando proyectos de reforestación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/sustainable-food.jpg"
                alt="Comida Sostenible"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Del Granja al Vuelo</h2>
              <p className="text-lg text-gray-600 mb-6">
                Nuestra iniciativa de comida sostenible prioriza los ingredientes de origen local, reduciendo las millas de alimentos y apoyando a los agricultores locales. Hemos rediseñado nuestros menús para incluir más opciones a base de plantas, que tienen una huella de carbono significativamente menor.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Además, utilizamos tecnología de inteligencia artificial para predecir con mayor precisión las necesidades de comida, reduciendo el desperdicio de alimentos a bordo en un 40% durante el último año.
              </p>
              <Link href="/es/experience#dining" className="text-green-700 font-bold hover:text-green-800 flex items-center">
                Descubra nuestra gastronomía <span className="ml-2">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Carbon Calculator Promo */}
      <section className="bg-green-900 py-24 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Vuele Carbono Neutral</h2>
          <p className="text-xl text-green-100 mb-10">
            Utilice nuestra calculadora de carbono al reservar para ver el impacto exacto de su vuelo y elija contribuir a proyectos climáticos certificados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="bg-white text-green-900 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-colors">
               Calcular mi Huella
             </button>
             <Link 
               href="/es/flights"
               className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-green-900 transition-colors"
             >
               Reservar Vuelo Ecológico
             </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
