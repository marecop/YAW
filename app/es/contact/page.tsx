'use client'

import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contáctenos</h1>
          <p className="text-xl text-gray-600">Estamos aquí para ayudarle con cualquier pregunta o inquietud.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Phone */}
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Atención al Cliente</h3>
            <p className="text-gray-600 mb-2">Disponible 24/7</p>
            <a href="tel:+85221234567" className="text-2xl font-bold text-ya-yellow-600 hover:text-ya-yellow-700">
              +852 2123 4567
            </a>
          </div>

          {/* Email */}
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Correo Electrónico</h3>
            <p className="text-gray-600 mb-2">Respondemos en 24 horas</p>
            <a href="mailto:support@yellowairlines.com" className="text-xl font-bold text-ya-yellow-600 hover:text-ya-yellow-700">
              support@yellowairlines.com
            </a>
          </div>

          {/* Office */}
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Oficina Principal</h3>
            <p className="text-gray-600">
              Yellow City, Terminal 1<br />
              Aeropuerto Internacional de Hong Kong
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-ya-navy-900 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Envíenos un mensaje</h2>
          </div>
          <div className="p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input type="text" id="firstName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                  <input type="text" id="lastName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
                  <select id="subject" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent">
                    <option>Consulta General</option>
                    <option>Reservas</option>
                    <option>Equipaje Perdido</option>
                    <option>Reembolsos</option>
                    <option>Sugerencias</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <textarea id="message" rows={6} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ya-yellow-500 focus:border-transparent"></textarea>
              </div>

              <button type="submit" className="w-full bg-ya-yellow-500 text-black font-bold py-4 rounded-lg hover:bg-ya-yellow-600 transition-colors">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
