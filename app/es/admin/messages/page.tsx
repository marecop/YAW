'use client'

import { useState, useEffect } from 'react'
import { Mail, MessageSquare, CheckCircle, Trash2 } from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'UNREAD' | 'READ' | 'REPLIED'
  createdAt: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setMessages([
        {
          id: '1',
          name: 'Juan Pérez',
          email: 'juan@example.com',
          subject: 'Pregunta sobre reserva',
          message: 'Hola, me gustaría cambiar mi vuelo del próximo martes...',
          status: 'UNREAD',
          createdAt: '2026-05-20T10:30:00'
        },
        {
          id: '2',
          name: 'María García',
          email: 'maria@example.com',
          subject: 'Equipaje perdido',
          message: 'Mi maleta no llegó a la cinta transportadora...',
          status: 'READ',
          createdAt: '2026-05-19T15:45:00'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mensajes de Usuarios</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="md:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden h-[calc(100vh-200px)] flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold text-gray-700">Bandeja de Entrada</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Cargando...</div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-gray-900">{msg.name}</span>
                    <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 truncate">{msg.subject}</p>
                  <p className="text-xs text-gray-500 truncate">{msg.message}</p>
                  <div className="mt-2 flex items-center gap-2">
                    {msg.status === 'UNREAD' && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Nuevo</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6 h-[calc(100vh-200px)] flex flex-col justify-center items-center text-gray-500">
          <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
          <p>Seleccione un mensaje para ver los detalles</p>
        </div>
      </div>
    </div>
  )
}
