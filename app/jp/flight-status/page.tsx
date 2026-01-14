'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import type { FlightInstance, Flight } from '@prisma/client'
import { format } from 'date-fns'
import Link from 'next/link'
import { Plane, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

type FlightInstanceWithFlight = FlightInstance & { flight: Flight }

function FlightStatusContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const dateParam = searchParams.get('date') || ''
  
  const PAGE_SIZE = 25

  const [flights, setFlights] = useState<FlightInstanceWithFlight[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [hasMore, setHasMore] = useState(false)
  const [nextOffset, setNextOffset] = useState<number | null>(0)
  const loadedCountRef = useRef(0)
  
  // Filters
  const [searchInput, setSearchInput] = useState(initialSearch)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [statusFilter, setStatusFilter] = useState('ALL')

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchQuery(searchInput.trim())
    }, 300)
    return () => clearTimeout(t)
  }, [searchInput])

  useEffect(() => {
    loadedCountRef.current = flights.length
  }, [flights.length])

  const buildUrl = (offset: number) => {
    const sp = new URLSearchParams()
    if (dateParam) sp.set('date', dateParam)
    sp.set('limit', String(PAGE_SIZE))
    sp.set('offset', String(offset))
    if (searchQuery) sp.set('search', searchQuery)
    if (statusFilter !== 'ALL') sp.set('status', statusFilter)
    return `/api/flight-status?${sp.toString()}`
  }

  const fetchPage = async (offset: number, append: boolean) => {
    try {
      const url = buildUrl(offset)
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        const items = (data?.items || []) as FlightInstanceWithFlight[]
        const more = Boolean(data?.hasMore)
        const next = (data?.nextOffset ?? null) as number | null

        setFlights(prev => (append ? [...prev, ...items] : items))
        setHasMore(more)
        setNextOffset(next)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error('Error fetching flights:', error)
    }
  }

  useEffect(() => {
    // dateパラメータがある場合（例：フライト番号検索ページからの遷移）、指定された日付のフライト状況を取得
    setLoading(true)
    setFlights([])
    setHasMore(false)
    setNextOffset(0)
    ;(async () => {
      await fetchPage(0, false)
      setLoading(false)
    })()

    const interval = setInterval(async () => {
      // 若使用者已載入更多，避免每分鐘整批刷新造成大量流量/記憶體壓力
      if (loadedCountRef.current <= PAGE_SIZE) {
        await fetchPage(0, false)
      }
    }, 60000) // Refresh every minute

    return () => clearInterval(interval)
  }, [dateParam, searchQuery, statusFilter])

  const handleLoadMore = async () => {
    if (!hasMore || !nextOffset || loadingMore) return
    setLoadingMore(true)
    try {
      await fetchPage(nextOffset, true)
    } finally {
      setLoadingMore(false)
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return { label: '定刻', color: 'bg-gray-100 text-gray-800', icon: Clock }
      case 'PREPARING': return { label: '準備中', color: 'bg-blue-50 text-blue-600', icon: Clock }
      case 'DELAYED': return { label: '遅延', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle }
      case 'CANCELLED': return { label: '欠航', color: 'bg-red-100 text-red-800', icon: XCircle }
      case 'BOARDING': return { label: '搭乗中', color: 'bg-green-100 text-green-800', icon: Plane }
      case 'GATE_CLOSED': return { label: '搭乗締切', color: 'bg-orange-100 text-orange-800', icon: Clock }
      case 'IN_AIR': return { label: '飛行中', color: 'bg-blue-100 text-blue-800', icon: Plane }
      case 'ARRIVED': return { label: '到着済み', color: 'bg-green-100 text-green-800', icon: CheckCircle }
      default: return { label: status, color: 'bg-gray-100 text-gray-800', icon: Clock }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">フライト運航状況</h1>
          <p className="mt-2 text-gray-600">本日のフライト状況をリアルタイムで表示</p>
          <div className="mt-2 text-sm text-gray-500">
            最終更新: {format(lastUpdated, 'HH:mm:ss')}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">フライト検索</label>
                <input
                    type="text"
                    id="search"
                    placeholder="便名 / 都市 / 空港コード"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ya-yellow-500 focus:ring-ya-yellow-500 sm:text-sm p-2 border"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <div className="sm:w-64">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">状況で絞り込み</label>
                <select
                    id="status"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-ya-yellow-500 focus:ring-ya-yellow-500 sm:text-sm p-2 border"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="ALL">すべての状況</option>
                    <option value="SCHEDULED">定刻 (Scheduled)</option>
                    <option value="PREPARING">準備中 (Preparing)</option>
                    <option value="BOARDING">搭乗中 (Boarding)</option>
                    <option value="GATE_CLOSED">搭乗締切 (Gate Closed)</option>
                    <option value="IN_AIR">飛行中 (In Air)</option>
                    <option value="ARRIVED">到着済み (Arrived)</option>
                    <option value="DELAYED">遅延 (Delayed)</option>
                    <option value="CANCELLED">欠航 (Cancelled)</option>
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
                      便名
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      航空会社
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      区間
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      定刻
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      予想/実際
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状況
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">詳細</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {flights.length > 0 ? (
                    flights.map((flight) => {
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
                            <div>発: {format(new Date(flight.scheduledDeparture), 'HH:mm')}</div>
                            <div>着: {format(new Date(flight.scheduledArrival), 'HH:mm')}
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
                            <Link href={`/jp/flight-status/${flight.id}`} className="text-ya-yellow-600 hover:text-ya-yellow-900">
                              詳細
                            </Link>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                            条件に一致するフライトが見つかりません
                        </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {hasMore && (
              <div className="flex justify-center py-4 border-t border-gray-100">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-6 py-2 rounded-md bg-ya-yellow-500 text-black font-medium hover:bg-ya-yellow-600 disabled:opacity-50"
                >
                  {loadingMore ? '読み込み中...' : 'さらに表示'}
                </button>
              </div>
            )}
          </div>
        )}
    </div>
  )
}

export default function FlightStatusPage() {
    return (
        <Suspense fallback={<div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-500"></div></div>}>
            <FlightStatusContent />
        </Suspense>
    )
}
