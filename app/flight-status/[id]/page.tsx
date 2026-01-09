'use client'

import { useState, useEffect, use } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { FlightInstance, Flight } from '@prisma/client'
import { format } from 'date-fns'
import Link from 'next/link'
import { Plane, Clock, MapPin, AlertTriangle, CheckCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useLanguage } from '@/contexts/LanguageContext'

// Dynamically import map with no SSR
const FlightStatusMap = dynamic(() => import('@/components/FlightStatusMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 flex items-center justify-center">Loading Map...</div>
})

type FlightInstanceWithFlight = FlightInstance & { flight: Flight }

export default function FlightStatusDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { t } = useLanguage()
  const { id } = use(params)
  const [flight, setFlight] = useState<FlightInstanceWithFlight | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Status Colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-gray-500'
      case 'PREPARING': return 'bg-blue-400'
      case 'DELAYED': return 'bg-yellow-500'
      case 'CANCELLED': return 'bg-red-500'
      case 'BOARDING': return 'bg-green-600'
      case 'GATE_CLOSED': return 'bg-orange-500'
      case 'IN_AIR': return 'bg-green-500' // Using Green as requested/implied for active
      case 'ARRIVED': return 'bg-green-700'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return t('flightStatus.statusScheduled')
      case 'PREPARING': return t('flightStatus.statusPreparing')
      case 'DELAYED': return t('flightStatus.statusDelayed')
      case 'CANCELLED': return t('flightStatus.statusCancelled')
      case 'BOARDING': return t('flightStatus.statusBoarding')
      case 'GATE_CLOSED': return t('flightStatus.statusGateClosed')
      case 'IN_AIR': return t('flightStatus.statusInAir')
      case 'ARRIVED': return t('flightStatus.statusArrived')
      default: return status
    }
  }
  
  const getDiffDisplay = (scheduled: Date, actual: Date) => {
    const diffMs = actual.getTime() - scheduled.getTime()
    const diffMins = Math.round(diffMs / 60000)
    
    if (Math.abs(diffMins) < 2) return null // Ignore < 2 mins
    
    if (diffMins > 0) {
        return <span className="text-red-600 text-xs font-bold ml-2">(+{diffMins}m)</span>
    } else {
        return <span className="text-green-600 text-xs font-bold ml-2">({diffMins}m)</span>
    }
  }

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await fetch(`/api/flight-status/${id}`)
        if (res.ok) {
          const data = await res.json()
          setFlight(data)
        }
      } catch (error) {
        console.error('Error fetching flight details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFlight()
    // Update every 5 seconds
    const interval = setInterval(fetchFlight, 5000)
    return () => clearInterval(interval)
  }, [id])

  // Update progress locally every 1s for smoothness
  useEffect(() => {
    if (!flight) return
    
    const updateProgress = () => {
        const now = new Date().getTime()
        const dep = flight.actualDeparture ? new Date(flight.actualDeparture).getTime() : new Date(flight.scheduledDeparture).getTime()
        const arr = flight.actualArrival ? new Date(flight.actualArrival).getTime() : new Date(flight.scheduledArrival).getTime()

        if (flight.status === 'ARRIVED') {
            setProgress(1)
        } else if (flight.status === 'IN_AIR' || flight.status === 'DEPARTED') {
            const total = arr - dep
            const elapsed = now - dep
            const p = Math.max(0, Math.min(1, elapsed / total))
            setProgress(p)
        } else {
            setProgress(0)
        }
    }
    
    updateProgress()
    const timer = setInterval(updateProgress, 1000)
    return () => clearInterval(timer)
  }, [flight])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-500"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!flight) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-gray-500">{t('flightStatus.notFound')}</p>
        </div>
        <Footer />
      </div>
    )
  }

  const statusBg = getStatusColor(flight.status)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 relative">
        {/* Back Button */}
        <Link 
            href="/flight-status" 
            className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors border border-gray-200"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
        </Link>

        {/* Map Section */}
        <div className="h-[calc(100vh-64px)] w-full relative">
            <FlightStatusMap 
              originCode={flight.flight.from} 
              destinationCode={flight.flight.to} 
              progress={progress} 
            />

            {/* Floating Info Card */}
            <div className="absolute bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-[500px] z-[1000] shadow-2xl rounded-xl overflow-hidden bg-white/95 backdrop-blur-sm border border-gray-100">
                {/* Header */}
                <div className={`${statusBg} px-6 py-4 text-white flex justify-between items-center`}>
                    <div>
                        <h2 className="text-2xl font-bold">{flight.flight.flightNumber}</h2>
                        <p className="text-sm opacity-90">{flight.flight.airline}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold">{getStatusText(flight.status)}</div>
                        <div className="text-sm opacity-90">{format(new Date(flight.date), 'yyyy-MM-dd')}</div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Route */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="text-center w-1/3">
                            <div className="text-3xl font-bold text-gray-900">{flight.flight.from}</div>
                            <div className="text-sm text-gray-500 truncate">{flight.flight.fromCity}</div>
                            {flight.terminal && <div className="text-xs font-mono bg-gray-100 rounded px-1 mt-1 inline-block">{flight.terminal}</div>}
                        </div>
                        <div className="flex-1 px-4 flex flex-col items-center">
                            <Plane className={`w-8 h-8 text-gray-400 transform rotate-90 ${flight.status === 'IN_AIR' ? 'text-ya-yellow-500 animate-pulse' : ''}`} />
                            <div className="w-full h-0.5 bg-gray-300 mt-2 relative">
                                {progress > 0 && progress < 1 && (
                                    <div 
                                        className="absolute h-2 w-2 bg-ya-yellow-500 rounded-full top-1/2 -mt-1"
                                        style={{ left: `${progress * 100}%` }}
                                    ></div>
                                )}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{flight.flight.duration}</div>
                        </div>
                        <div className="text-center w-1/3">
                            <div className="text-3xl font-bold text-gray-900">{flight.flight.to}</div>
                            <div className="text-sm text-gray-500 truncate">{flight.flight.toCity}</div>
                            {flight.gate && <div className="text-xs font-mono bg-gray-100 rounded px-1 mt-1 inline-block">Gate {flight.gate}</div>}
                        </div>
                    </div>

                    {/* Times Grid */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm border-t border-gray-100 pt-4">
                        <div>
                            <div className="text-gray-500 mb-1">{t('flightStatus.detail.scheduledDeparture')}</div>
                            <div className="font-semibold text-lg">{format(new Date(flight.scheduledDeparture), 'HH:mm')}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-gray-500 mb-1">{t('flightStatus.detail.scheduledArrival')}</div>
                            <div className="font-semibold text-lg">
                                {format(new Date(flight.scheduledArrival), 'HH:mm')}
                                {new Date(flight.scheduledArrival).getDate() !== new Date(flight.scheduledDeparture).getDate() && (
                                    <span className="text-xs text-ya-yellow-600 font-bold ml-1 align-top">+1</span>
                                )}
                            </div>
                        </div>
                        
                        <div>
                            {/* Actual/Estimated Departure */}
                            {(flight.status === 'IN_AIR' || flight.status === 'ARRIVED') ? (
                                <>
                                    <div className="text-gray-500 mb-1">{t('flightStatus.detail.actualDeparture')}</div>
                                    <div className="font-semibold text-lg flex items-center">
                                        {format(new Date(flight.actualDeparture!), 'HH:mm')}
                                        {getDiffDisplay(new Date(flight.scheduledDeparture), new Date(flight.actualDeparture!))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-gray-500 mb-1">{t('flightStatus.detail.estimatedDeparture')}</div>
                                    <div className="font-semibold text-lg text-gray-400">
                                        {flight.actualDeparture ? format(new Date(flight.actualDeparture), 'HH:mm') : '--:--'}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="text-right">
                            {/* Actual/Estimated Arrival */}
                            {flight.status === 'ARRIVED' ? (
                                <>
                                    <div className="text-gray-500 mb-1">{t('flightStatus.detail.actualArrival')}</div>
                                    <div className="font-semibold text-lg flex items-center justify-end">
                                        {getDiffDisplay(new Date(flight.scheduledArrival), new Date(flight.actualArrival!))}
                                        <span className="ml-2">{format(new Date(flight.actualArrival!), 'HH:mm')}</span>
                                    </div>
                                </>
                            ) : flight.status === 'IN_AIR' ? (
                                <>
                                    <div className="text-gray-500 mb-1">{t('flightStatus.detail.estimatedArrival')}</div>
                                    <div className="font-semibold text-lg text-ya-yellow-600 flex items-center justify-end">
                                        {flight.actualArrival && getDiffDisplay(new Date(flight.scheduledArrival), new Date(flight.actualArrival))}
                                        <span className="ml-2">{flight.actualArrival ? format(new Date(flight.actualArrival), 'HH:mm') : '--:--'}</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-gray-500 mb-1">{t('flightStatus.detail.estimatedArrival')}</div>
                                    <div className="font-semibold text-lg text-gray-400">
                                        {flight.actualArrival ? format(new Date(flight.actualArrival), 'HH:mm') : '--:--'}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Aircraft Info */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                        <div>
                            <span className="font-medium text-gray-700">{t('flightStatus.detail.aircraft')}:</span> {flight.aircraftType}
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">{t('flightStatus.detail.reg')}:</span> {flight.aircraftRegistration}
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">{t('flightStatus.detail.weather')}:</span> {flight.weatherOrigin} → {flight.weatherDestination}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}
