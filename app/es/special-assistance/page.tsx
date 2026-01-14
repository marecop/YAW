'use client'

import Link from 'next/link'
import { 
  Utensils, 
  Baby, 
  Accessibility, 
  Dog, 
  Heart, 
  Route, 
  Plane,
  ChevronRight 
} from 'lucide-react'

export default function SpecialAssistancePage() {
  const services = [
    {
      id: 'special-meal',
      icon: Utensils,
      title: 'Comidas Especiales',
      description: 'Ofrecemos comidas especiales que cumplen con requisitos religiosos, de salud o dietéticos',
      href: '/special-assistance/special-meal',
      color: 'bg-orange-500'
    },
    {
      id: 'unaccompanied-minor',
      icon: Baby,
      title: 'Menor No Acompañado',
      description: 'Servicio de cuidado completo para niños de 5 a 17 años que viajan solos',
      href: '/special-assistance/unaccompanied-minor',
      color: 'bg-pink-500'
    },
    {
      id: 'disability-care',
      icon: Accessibility,
      title: 'Servicios de Accesibilidad',
      description: 'Servicios de apoyo para pasajeros con movilidad reducida o que requieren asistencia en silla de ruedas',
      href: '/special-assistance/disability-care',
      color: 'bg-blue-500'
    },
    {
      id: 'pet-in-cabin',
      icon: Dog,
      title: 'Mascota en Cabina',
      description: 'Mascotas pequeñas pueden acompañarlo en la cabina (requiere solicitud previa)',
      href: '/special-assistance/pet-in-cabin',
      color: 'bg-green-500'
    },
    {
      id: 'medical-care',
      icon: Heart,
      title: 'Asistencia Médica',
      description: 'Asistencia para pasajeros con necesidades médicas o condiciones de salud',
      href: '/special-assistance/medical-care',
      color: 'bg-red-500'
    },
    {
      id: 'transfer-assistance',
      icon: Route,
      title: 'Asistencia en Tránsito',
      description: 'Orientación y asistencia necesaria para pasajeros en tránsito',
      href: '/special-assistance/transfer-assistance',
      color: 'bg-purple-500'
    },
    {
      id: 'priority-boarding',
      icon: Plane,
      title: 'Embarque Prioritario',
      description: 'Servicio de embarque prioritario para ancianos, mujeres embarazadas, pasajeros con bebés o movilidad reducida',
      href: '/special-assistance/priority-boarding',
      color: 'bg-yellow-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ya-yellow-500 to-ya-yellow-600 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Servicios de Asistencia Especial
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl">
            Estamos comprometidos a brindar una experiencia de vuelo cómoda y segura para todos los pasajeros. Sean cuales sean sus necesidades especiales, haremos todo lo posible para ayudarle.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                href={service.href}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-ya-yellow-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center text-ya-yellow-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span>Solicitar Ahora</span>
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Important Information */}
        <div className="mt-16 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Información Importante
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Por favor envíe su solicitud al menos 48 horas antes de la salida del vuelo.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Algunos servicios pueden requerir certificados médicos o documentos relevantes.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Después de enviar la solicitud, confirmaremos con usted por correo electrónico o teléfono.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>En caso de emergencia, comuníquese con el servicio al cliente de inmediato.</span>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            ¿Necesita Ayuda?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2">📞</div>
              <div className="font-semibold text-gray-900">
                Teléfono
              </div>
              <div className="text-gray-600">+852 2345 6789</div>
            </div>
            <div>
              <div className="text-4xl mb-2">✉️</div>
              <div className="font-semibold text-gray-900">
                Correo Electrónico
              </div>
              <div className="text-gray-600">assist@yellowairlines.com</div>
            </div>
            <div>
              <div className="text-4xl mb-2">⏰</div>
              <div className="font-semibold text-gray-900">
                Horario de Atención
              </div>
              <div className="text-gray-600">24/7</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
