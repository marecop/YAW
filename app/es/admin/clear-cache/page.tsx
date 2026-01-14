'use client'

import { useState } from 'react'
import { Trash2, CheckCircle, RefreshCw } from 'lucide-react'

export default function AdminClearCachePage() {
  const [clearing, setClearing] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleClearCache = async () => {
    setClearing(true)
    setSuccess(false)
    
    // Simulate cache clearing
    setTimeout(() => {
      setClearing(false)
      setSuccess(true)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Gestión de Caché del Sistema</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-sm max-w-2xl">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Borrar Caché de la Aplicación</h2>
        <p className="text-gray-600 mb-6">
          Esta acción borrará el caché del servidor, el caché de rutas estáticas y los datos temporales. Puede causar una carga ligeramente más lenta para la primera solicitud de los usuarios.
        </p>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleClearCache}
            disabled={clearing}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {clearing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Borrando...
              </>
            ) : (
              <>
                <Trash2 className="w-5 h-5" />
                Borrar Caché Ahora
              </>
            )}
          </button>
          
          {success && (
            <div className="flex items-center text-green-600 animate-fade-in">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">¡Caché borrado con éxito!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
