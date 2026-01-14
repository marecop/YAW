'use client'

import Link from 'next/link'
import { ChevronLeft, Gift, ShoppingBag, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'

interface Reward {
  id: string
  title: string
  description: string
  points: number
  imageUrl: string
  category: string
}

export default function RewardsPage() {
  const { user, refreshUser } = useAuth()
  const [rewards, setRewards] = useState<Reward[]>([])
  const [loading, setLoading] = useState(true)
  const [redeemingId, setRedeemingId] = useState<string | null>(null)

  useEffect(() => {
    fetchRewards()
  }, [])

  const fetchRewards = async () => {
    try {
      const response = await fetch('/api/rewards')
      if (response.ok) {
        const data = await response.json()
        setRewards(data)
      }
    } catch (error) {
      console.error('Failed to fetch rewards:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRedeem = async (reward: Reward) => {
    if (!user) return
    
    if (user.points < reward.points) {
      alert('¡Puntos insuficientes!')
      return
    }

    if (!confirm(`¿Está seguro de que desea canjear "${reward.title}" por ${reward.points.toLocaleString()} puntos?`)) {
      return
    }

    setRedeemingId(reward.id)
    try {
      const response = await fetch('/api/rewards/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          rewardId: reward.id
        })
      })

      const data = await response.json()

      if (response.ok) {
        alert(`¡Canje exitoso! ${reward.title} se ha añadido a su cuenta.`)
        // Refresh user info to update points
        if (refreshUser) {
            await refreshUser()
        } else {
            // If refreshUser is not available, reload page manually
            window.location.reload() 
        }
      } else {
        alert(data.error || 'Canje fallido')
      }
    } catch (error) {
      console.error('Redemption failed:', error)
      alert('Ocurrió un error durante el canje, por favor intente nuevamente más tarde')
    } finally {
      setRedeemingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/es/member" className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tienda de Puntos</h1>
            <p className="text-gray-500">Canjee sus puntos por recompensas increíbles</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-yellow-100 rounded-full text-yellow-600">
              <Gift className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Puntos Disponibles</p>
              <p className="text-3xl font-bold text-gray-900">{user?.points?.toLocaleString() || 0}</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Recompensas Populares</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-10 h-10 animate-spin text-ya-yellow-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map(reward => (
              <div key={reward.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                <div className="h-40 bg-gray-100 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {reward.imageUrl}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-1" title={reward.title}>{reward.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1" title={reward.description}>{reward.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-ya-yellow-600 font-bold">{reward.points.toLocaleString()} Puntos</span>
                    <button 
                      onClick={() => handleRedeem(reward)}
                      disabled={redeemingId === reward.id || (user?.points || 0) < reward.points}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        (user?.points || 0) >= reward.points 
                          ? 'bg-gray-900 text-white hover:bg-gray-800' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {redeemingId === reward.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'Canjear'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center text-gray-500">
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>Más productos próximamente...</p>
        </div>
      </div>
    </div>
  )
}
