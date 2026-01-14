'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Briefcase, ShoppingBag, AlertTriangle, Scale } from 'lucide-react'

export default function BaggageInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Información de Equipaje</h1>
          <p className="text-xl text-gray-600">Todo lo que necesita saber sobre su equipaje</p>
        </div>

        {/* Carry On */}
        <section className="bg-white rounded-2xl shadow-sm overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/3 bg-blue-50 p-10 flex flex-col justify-center items-center text-center">
              <ShoppingBag className="w-20 h-20 text-blue-600 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900">Equipaje de Mano</h2>
              <p className="text-blue-600 font-bold mt-2">Incluido en todos los billetes</p>
            </div>
            <div className="md:w-2/3 p-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Límites de Peso</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Economy: 1 pieza hasta 7kg</li>
                    <li>Premium Economy: 1 pieza hasta 7kg</li>
                    <li>Business: 2 piezas, total hasta 14kg</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Dimensiones</h3>
                  <p className="text-gray-600 mb-2">Máximo: 56 x 36 x 23 cm</p>
                  <p className="text-sm text-gray-500">Debe caber en el compartimento superior.</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Artículo Personal Adicional</h3>
                  <p className="text-gray-600">
                    Se permite 1 artículo personal pequeño (bolso, laptop, cámara) que debe caber debajo del asiento delantero (Máx: 40 x 30 x 10 cm).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Checked Baggage */}
        <section className="bg-white rounded-2xl shadow-sm overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/3 bg-orange-50 p-10 flex flex-col justify-center items-center text-center">
              <Briefcase className="w-20 h-20 text-orange-600 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900">Equipaje Facturado</h2>
            </div>
            <div className="md:w-2/3 p-10">
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 border rounded-xl">
                    <p className="font-bold text-gray-900">Economy Light</p>
                    <p className="text-2xl font-bold text-orange-600 my-2">0kg</p>
                    <p className="text-xs text-gray-500">Solo compra adicional</p>
                  </div>
                  <div className="p-4 border rounded-xl bg-orange-50/30 border-orange-200">
                    <p className="font-bold text-gray-900">Economy Standard</p>
                    <p className="text-2xl font-bold text-orange-600 my-2">23kg</p>
                    <p className="text-xs text-gray-500">1 pieza</p>
                  </div>
                  <div className="p-4 border rounded-xl">
                    <p className="font-bold text-gray-900">Business</p>
                    <p className="text-2xl font-bold text-orange-600 my-2">2 x 32kg</p>
                    <p className="text-xs text-gray-500">Total 64kg</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Dimensiones</h3>
                  <p className="text-gray-600">La suma de las dimensiones totales (largo + ancho + alto) no debe exceder los 158 cm.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>¿Necesita más equipaje?</strong> Puede comprar equipaje adicional en línea hasta 24 horas antes de la salida con hasta un 30% de descuento sobre las tarifas del aeropuerto.
                  </p>
                  <Link href="/es/bookings/manage" className="text-ya-yellow-600 font-bold text-sm hover:underline mt-2 inline-block">
                    Gestionar Reserva &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Restricted Items */}
        <section className="bg-white rounded-2xl shadow-sm p-10 mb-12">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Artículos Restringidos</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-red-600 mb-2">Prohibidos (Cabina y Bodega)</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Explosivos, fuegos artificiales, bengalas</li>
                    <li>Gases comprimidos inflamables</li>
                    <li>Sustancias corrosivas o tóxicas</li>
                    <li>Baterías de litio dañadas</li>
                    <li>Dispositivos de transporte personal motorizados (hoverboards)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-orange-600 mb-2">Solo Equipaje de Mano</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Baterías externas (Power banks)</li>
                    <li>Cigarrillos electrónicos</li>
                    <li>Fósforos o encendedores (1 por persona)</li>
                    <li>Objetos de valor y documentos importantes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">¿Tiene equipos deportivos, instrumentos musicales o viaja con mascotas?</p>
          <Link 
            href="/es/contact"
            className="inline-block border-2 border-ya-yellow-500 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-ya-yellow-500 transition-colors"
          >
            Contáctenos para Asistencia
          </Link>
        </div>
      </div>
    </div>
  )
}
