'use client'

import { useState, useEffect } from 'react'
import { Wheelchair, Eye } from 'lucide-react'

export default function AdminSpecialAssistancePage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setRequests([
        {
          id: '1',
          type: 'WHEELCHAIR',
          passengerName: 'Carlos Ruiz',
          flightNumber: 'YA101',
          flightDate: '2026-06-20',
          status: 'PENDING'
        },
        {
          id: '2',
          type: 'MEAL',
          passengerName: 'Ana López',
          flightNumber: 'YA102',
          flightDate: '2026-06-22',
          status: 'APPROVED'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Solicitudes de Asistencia Especial</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pasajero</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vuelo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-4">Cargando...</td></tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {req.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.passengerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.flightNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.flightDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      req.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status === 'APPROVED' ? 'Aprobado' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-ya-yellow-600 hover:text-ya-yellow-900">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
