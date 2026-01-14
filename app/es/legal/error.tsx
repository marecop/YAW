'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Algo salió mal</h2>
      <p className="text-gray-600 mb-6">Lo sentimos, ha ocurrido un error inesperado.</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-ya-yellow-500 text-black font-semibold rounded-lg hover:bg-ya-yellow-600 transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
