'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Globe, Bell, Lock, User, Mail, CreditCard, Smartphone } from 'lucide-react'

export default function SettingsPage() {
    const router = useRouter()
  const language = 'es'
  const setLanguage = (code: string) => {
    router.push(`/${code}/settings`)
  }
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', name: 'General', icon: User },
    { id: 'language', name: 'Idioma y Región', icon: Globe },
    { id: 'notifications', name: 'Notificaciones', icon: Bell },
    { id: 'privacy', name: 'Privacidad y Seguridad', icon: Lock },
    { id: 'payment', name: 'Métodos de Pago', icon: CreditCard },
  ]

  const languages = [
    { code: 'zh-hk', name: 'Chino Tradicional', nativeName: '繁體中文' },
    { code: 'en', name: 'Inglés', nativeName: 'English' },
    { code: 'zh-cn', name: 'Chino Simplificado', nativeName: '简体中文' },
    { code: 'de', name: 'Alemán', nativeName: 'Deutsch' },
    { code: 'jp', name: 'Japonés', nativeName: '日本語' },
    { code: 'es', name: 'Español', nativeName: 'Español' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input-field"
                    placeholder="Ingrese su nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    placeholder="su@correo.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="input-field"
                    placeholder="+852 9123 4567"
                  />
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <button className="px-6 py-2 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors">
                Guardar Cambios
              </button>
            </div>
          </div>
        )

      case 'language':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seleccionar Idioma</h3>
              <p className="text-sm text-gray-600 mb-4">
                Elija su idioma preferido para el sitio web
              </p>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <label
                    key={lang.code}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      language === lang.code
                        ? 'border-ya-yellow-500 bg-ya-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="language"
                        value={lang.code}
                        checked={language === lang.code}
                        onChange={(e) => setLanguage(e.target.value as any)}
                        className="w-4 h-4 text-ya-yellow-600"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{lang.name}</div>
                        <div className="text-sm text-gray-600">{lang.nativeName}</div>
                      </div>
                    </div>
                    {language === lang.code && (
                      <svg className="w-5 h-5 text-ya-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Zona Horaria</h3>
              <select className="select-field">
                <option>Hora de Hong Kong (GMT+8)</option>
                <option>Hora de Taipéi (GMT+8)</option>
                <option>Hora de Singapur (GMT+8)</option>
                <option>Hora de Tokio (GMT+9)</option>
                <option>Hora de Londres (GMT+0)</option>
                <option>Hora de Nueva York (GMT-5)</option>
              </select>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificaciones por Correo</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Actualizaciones de Vuelo</div>
                    <div className="text-sm text-gray-600">Recibir cambios de horario y retrasos</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Ofertas y Promociones</div>
                    <div className="text-sm text-gray-600">Recibir ofertas especiales y descuentos</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Confirmación de Reserva</div>
                    <div className="text-sm text-gray-600">Recibir confirmaciones de reserva y pago</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Puntos de Miembro</div>
                    <div className="text-sm text-gray-600">Recibir notificaciones de puntos y recompensas</div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-ya-yellow-600 rounded" />
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificaciones Push</h3>
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Smartphone className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900 mb-1">Descarga nuestra App</div>
                  <div className="text-sm text-blue-800">Recibe notificaciones push en tiempo real en tu móvil</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cambiar Contraseña</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña Actual
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="input-field"
                    placeholder="Ingrese contraseña actual"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="input-field"
                    placeholder="Ingrese nueva contraseña"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="input-field"
                    placeholder="Confirme nueva contraseña"
                  />
                </div>
              </div>
              <button className="mt-4 px-6 py-2 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 transition-colors">
                Actualizar Contraseña
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Autenticación de Dos Factores</h3>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg mb-4">
                <Lock className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 mb-1">Mejorar seguridad de la cuenta</div>
                  <div className="text-sm text-gray-600">Active la autenticación de dos factores para mayor seguridad</div>
                </div>
              </div>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Activar 2FA
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Datos y Privacidad</h3>
              <div className="space-y-3">
                <Link href="/es/privacy" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">Ver Política de Privacidad</div>
                  <div className="text-sm text-gray-600">Conozca cómo protegemos su información</div>
                </Link>
                <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">Descargar mis datos</div>
                  <div className="text-sm text-gray-600">Obtenga una copia de sus datos personales almacenados</div>
                </button>
              </div>
            </div>
          </div>
        )

      case 'payment':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Métodos de Pago Guardados</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">Visa •••• 1234</div>
                      <div className="text-sm text-gray-600">Expira: 12/25</div>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Eliminar
                  </button>
                </div>
                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                  + Agregar nuevo método de pago
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dirección de Facturación</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="input-field"
                    placeholder="Ingrese su dirección"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="input-field"
                      placeholder="Ciudad"
                    />
                  </div>
                  <div>
                    <label htmlFor="postal" className="block text-sm font-medium text-gray-700 mb-2">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      id="postal"
                      className="input-field"
                      placeholder="Código Postal"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
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
              <span className="ml-2 text-gray-900 font-medium">Configuración</span>
            </li>
          </ol>
        </nav>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
          <p className="mt-2 text-gray-600">Administre las preferencias de su cuenta y perfil</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-ya-yellow-500 text-black font-medium'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
