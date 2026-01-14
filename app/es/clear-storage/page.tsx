'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ClearStoragePage() {
  const router = useRouter()
  const [cleared, setCleared] = useState(false)
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    // Show current items
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) keys.push(key)
    }
    setItems(keys)
  }, [])

  const handleClear = () => {
    // Clear all
    localStorage.clear()
    setCleared(true)
    setItems([])
    
    // Redirect after 3s
    setTimeout(() => {
      router.push('/es/auth/login')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Borrar Datos del Navegador
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Solucionar problemas de inicio de sesión
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!cleared ? (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Datos almacenados actualmente:
                </h3>
                {items.length > 0 ? (
                  <ul className="space-y-2">
                    {items.map((key) => (
                      <li key={key} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {key}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No hay datos almacenados</p>
                )}
              </div>

              <button
                onClick={handleClear}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Borrar todos los datos
              </button>

              <div className="mt-4 text-center">
                <Link href="/es/" className="text-sm text-ya-yellow-600 hover:text-ya-yellow-500">
                  Volver al inicio
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ¡Borrado exitoso!
              </h3>
              <p className="text-sm text-gray-600">
                Redirigiendo a la página de inicio de sesión...
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            💡 ¿Qué hace esto?
          </h4>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>• Información de inicio de sesión antigua</li>
            <li>• Preferencias de idioma</li>
            <li>• Selección de moneda</li>
            <li>• Todos los otros datos locales</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
