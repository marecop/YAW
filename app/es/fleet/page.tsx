'use client'

import Link from 'next/link'
import { Plane, Users, Gauge, Calendar } from 'lucide-react'

export default function FleetPage() {
  
  const fleetData = [
    {
      id: 1,
      model: 'Boeing 787-9 Dreamliner',
      count: 10,
      description: 'El Boeing 787 Dreamliner utiliza tecnología y diseño de vanguardia para brindar una experiencia de pasajero superior. Cabinas espaciosas, ventanas grandes y calidad de aire mejorada hacen que su viaje sea más cómodo.',
      specs: {
        capacity: '290 personas',
        range: '14,140 km',
        cruiseSpeed: '900 km/h',
        introduced: '2019'
      }
    },
    {
      id: 2,
      model: 'Airbus A350-900',
      count: 8,
      description: 'El Airbus A350 cuenta con tecnología innovadora y un diseño de alta eficiencia, proporcionando un entorno de cabina silencioso y cómodo y una excelente eficiencia de combustible.',
      specs: {
        capacity: '325 personas',
        range: '15,000 km',
        cruiseSpeed: '910 km/h',
        introduced: '2020'
      }
    },
    {
      id: 3,
      model: 'Airbus A320neo',
      count: 15,
      description: 'El A320neo es el caballo de batalla de nuestras rutas regionales, ofreciendo una experiencia de vuelo eficiente en distancias cortas, con tecnologías avanzadas de ahorro de combustible que reducen el impacto ambiental.',
      specs: {
        capacity: '180 personas',
        range: '6,500 km',
        cruiseSpeed: '840 km/h',
        introduced: '2021'
      }
    }
  ]

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/es/" className="text-gray-500 hover:text-gray-700">
              Inicio
            </Link>
          </li>
          <li className="flex items-center">
            <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-gray-900 font-medium">Nuestra Flota</span>
          </li>
        </ol>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Nuestra Flota</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Yellow Airlines opera una flota moderna y eficiente, comprometida a brindar una experiencia de vuelo segura y cómoda.
        </p>
      </div>

      <div className="mb-16">
        <div className="bg-ya-yellow-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Resumen de la Flota</h2>
          <p className="text-lg mb-6 text-gray-700">
            A partir de 2024, Yellow Airlines opera 33 aeronaves con una edad promedio de menos de 5 años, una de las flotas más jóvenes en Asia-Pacífico.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-2">
                <Plane className="w-8 h-8 text-ya-yellow-600" />
              </div>
              <div className="text-4xl font-bold text-ya-yellow-500 mb-2">33</div>
              <div className="text-gray-600">Aeronaves Totales</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-8 h-8 text-ya-yellow-600" />
              </div>
              <div className="text-4xl font-bold text-ya-yellow-500 mb-2">&lt;5</div>
              <div className="text-gray-600">Edad Promedio (Años)</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-ya-yellow-500 mb-2">3</div>
              <div className="text-gray-600">Tipos de Aeronaves</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {fleetData.map((aircraft) => (
          <div key={aircraft.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto bg-gradient-to-br from-ya-yellow-100 to-ya-yellow-200">
                <div className="h-full w-full flex items-center justify-center">
                  <Plane className="w-32 h-32 text-ya-yellow-600 opacity-50" />
                </div>
              </div>
              <div className="p-6 lg:p-8">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-gray-900">{aircraft.model}</h3>
                  <span className="bg-ya-yellow-100 text-ya-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    {aircraft.count} Unidades
                  </span>
                </div>
                <p className="mt-4 text-gray-600">{aircraft.description}</p>
                
                <div className="mt-6">
                  <h4 className="font-semibold text-lg mb-3 text-gray-900">Especificaciones Técnicas</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Users className="w-5 h-5 text-ya-yellow-600 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-500">Capacidad</div>
                        <div className="font-medium">{aircraft.specs.capacity}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-ya-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <div>
                        <div className="text-sm text-gray-500">Alcance</div>
                        <div className="font-medium">{aircraft.specs.range}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Gauge className="w-5 h-5 text-ya-yellow-600 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-500">Velocidad de Crucero</div>
                        <div className="font-medium">{aircraft.specs.cruiseSpeed}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-5 h-5 text-ya-yellow-600 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-500">Introducido</div>
                        <div className="font-medium">{aircraft.specs.introduced}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Plan de Desarrollo de Flota</h2>
        <p className="text-lg mb-4 text-gray-700">
          Yellow Airlines está expandiendo activamente su flota, con planes para los próximos cinco años que incluyen:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ya-yellow-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Introducir 5 nuevos Boeing 787-9 Dreamliner</h3>
              <p className="text-sm text-gray-600 mt-1">Aumentar la capacidad en rutas de larga distancia</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ya-yellow-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Añadir 10 Airbus A320neo</h3>
              <p className="text-sm text-gray-600 mt-1">Aumentar la densidad en rutas regionales</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ya-yellow-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Evaluar la introducción del Airbus A321XLR</h3>
              <p className="text-sm text-gray-600 mt-1">Explorar más rutas de larga distancia</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ya-yellow-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Actualizar continuamente las instalaciones de la cabina</h3>
              <p className="text-sm text-gray-600 mt-1">Mejorar la experiencia del pasajero</p>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Commitment */}
      <div className="mt-16 bg-green-50 border-2 border-green-200 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-900 text-center">Compromiso Ambiental</h2>
        <p className="text-lg text-green-800 text-center mb-6">
          Yellow Airlines se compromete a reducir las emisiones de carbono, nuestra flota moderna ahorra hasta un 25% de combustible en comparación con aviones más antiguos.
        </p>
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="font-medium text-gray-900">25% Reducción en Consumo de Combustible</span>
          </div>
        </div>
      </div>
    </main>
  )
}
