'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FlightInstance, Flight } from '@prisma/client'
import { format } from 'date-fns'
import Link from 'next/link'
import { Plane, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

type FlightInstanceWithFlight = FlightInstance & { flight: Flight }

export default function FlightStatusPage() {
  const { t } = useLanguage()
  const [flights, setFlights] = useState<FlightInstanceWithFlight[]>([])
  const [filteredFlights, setFilteredFlights] = useState<FlightInstanceWithFlight[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const fetchFlights = async () => {
    try {
      const res = await fetch('/api/flight-status')
      if (res.ok) {
        const data = await res.json()
        setFlights(data)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error('Error fetching flights:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFlights()
    const interval = setInterval(fetchFlights, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  // Filter Logic
  useEffect(() => {
    let result = flights
    
    if (searchQuery) {
        const query = searchQuery.toLowerCase()
        result = result.filter(f => 
            f.flight.flightNumber.toLowerCase().includes(query) ||
            f.flight.from.toLowerCase().includes(query) ||
            f.flight.to.toLowerCase().includes(query) ||
            f.flight.fromCity.toLowerCase().includes(query) ||
            f.flight.toCity.toLowerCase().includes(query)
        )
    }
    
    if (statusFilter !== 'ALL') {
        result = result.filter(f => f.status === statusFilter)
    }
    
    setFilteredFlights(result)
  }, [flights, searchQuery, statusFilter])

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return { label: t('flightStatus.statusScheduled'), color: 'bg-gray-100 text-gray-800', icon: Clock }
      case 'PREPARING': return { label: t('flightStatus.statusPreparing'), color: 'bg-blue-50 text-blue-600', icon: Clock }
      case 'DELAYED': return { label: t('flightStatus.statusDelayed'), color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle }
      case 'CANCELLED': return { label: t('flightStatus.statusCancelled'), color: 'bg-red-100 text-red-800', icon: XCircle }
      case 'BOARDING': return { label: t('flightStatus.statusBoarding'), color: 'bg-green-100 text-green-800', icon: Plane }
      case 'GATE_CLOSED': return { label: t('flightStatus.statusGateClosed'), color: 'bg-orange-100 text-orange-800', icon: Clock }
      case 'IN_AIR': return { label: t('flightStatus.statusInAir'), color: 'bg-blue-100 text-blue-800', icon: Plane }
      case 'ARRIVED': return { label: t('flightStatus.statusArrived'), color: 'bg-green-100 text-green-800', icon: CheckCircle }
      default: return { label: status, color: 'bg-gray-100 text-gray-800', icon: Clock }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('flightStatus.title')}</h1>
          <p className="mt-2 text-gray-600">{t('flightStatus.subtitle')}</p>
          <div className="mt-2 text-sm text-gray-500">
            {t('flightStatus.lastUpdated')} {format(lastUpdated, 'HH:mm:ss')}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">{t('flightStatus.searchLabel')}</label>
                <input
                    type="text"
                    id="search"
                    placeholder={t('flightStatus.searchPlaceholder')}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ya-yellow-500 focus:ring-ya-yellow-500 sm:text-sm p-2 border"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="sm:w-64">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">{t('flightStatus.statusFilterLabel')}</label>
                <select
                    id="status"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ya-yellow-500 focus:ring-ya-yellow-500 sm:text-sm p-2 border"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="ALL">{t('flightStatus.statusAll')}</option>
                    <option value="SCHEDULED">{t('flightStatus.statusScheduled')} (Scheduled)</option>
                    <option value="PREPARING">{t('flightStatus.statusPreparing')} (Preparing)</option>
                    <option value="BOARDING">{t('flightStatus.statusBoarding')} (Boarding)</option>
                    <option value="GATE_CLOSED">{t('flightStatus.statusGateClosed')} (Gate Closed)</option>
                    <option value="IN_AIR">{t('flightStatus.statusInAir')} (In Air)</option>
                    <option value="ARRIVED">{t('flightStatus.statusArrived')} (Arrived)</option>
                    <option value="DELAYED">{t('flightStatus.statusDelayed')} (Delayed)</option>
                    <option value="CANCELLED">{t('flightStatus.statusCancelled')} (Cancelled)</option>
                </select>
            </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-500"></div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('flightStatus.table.flight')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('flightStatus.table.airline')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('flightStatus.table.route')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('flightStatus.table.scheduled')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('flightStatus.table.estimatedActual')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('flightStatus.table.status')}
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">{t('flightStatus.table.details')}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFlights.length > 0 ? (
                    filteredFlights.map((flight) => {
                      const statusConfig = getStatusConfig(flight.status)
                      const StatusIcon = statusConfig.icon
                      
                      return (
                        <tr key={flight.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-gray-900">{flight.flight.flightNumber}</div>
                            <div className="text-xs text-gray-500">{flight.aircraftRegistration || '-'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {/* Logo logic could be added here */}
                              <div className="text-sm font-medium text-gray-900">{flight.flight.airline}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 flex items-center">
                              <span className="font-bold w-8">{flight.flight.from}</span>
                              <span className="mx-2 text-gray-400">✈</span>
                              <span className="font-bold w-8">{flight.flight.to}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.flight.fromCity} - {flight.flight.toCity}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>DEP: {format(new Date(flight.scheduledDeparture), 'HH:mm')}</div>
                            <div>ARR: {format(new Date(flight.scheduledArrival), 'HH:mm')}
                            {new Date(flight.scheduledArrival).getDate() !== new Date(flight.scheduledDeparture).getDate() && (
                                <span className="text-xs text-ya-yellow-600 font-bold ml-1">+1</span>
                            )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className={flight.status === 'DELAYED' ? 'text-red-600 font-bold' : ''}>
                              {flight.actualDeparture ? format(new Date(flight.actualDeparture), 'HH:mm') : '--:--'}
                            </div>
                            <div className={flight.status === 'DELAYED' ? 'text-red-600 font-bold' : ''}>
                               {flight.actualArrival ? format(new Date(flight.actualArrival), 'HH:mm') : '--:--'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${statusConfig.color}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={`/flight-status/${flight.id}`} className="text-ya-yellow-600 hover:text-ya-yellow-900">
                              {t('flightStatus.table.details')}
                            </Link>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                            {t('flightStatus.noFlights')}
                        </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
