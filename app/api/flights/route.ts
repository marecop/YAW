import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 禁用缓存
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const date = searchParams.get('departDate')
    const passengers = searchParams.get('passengers')
    const cabinClass = searchParams.get('cabinClass')
    const sortBy = searchParams.get('sortBy') || 'price'

    console.log('🔍 Flight API called with params:', {
      from,
      to,
      date,
      passengers,
      cabinClass,
      sortBy
    })

    const where: any = {}

    if (from) {
      where.from = from
    }

    if (to) {
      where.to = to
    }

    // 新的數據結構：航班時刻表不包含具體日期
    // 所以我們獲取所有匹配航線的航班
    const flights = await prisma.flight.findMany({
      where,
      orderBy: sortBy === 'duration' 
        ? { duration: 'asc' } 
        : { economyPrice: 'asc' }
    })

    // 如果提供了日期，檢查該航班是否在該日期運營
    let filteredFlights = flights
    if (date) {
      const searchDate = new Date(date)
      // JavaScript getDay(): 0=Sunday, 1=Monday, 2=Tuesday... 6=Saturday
      // operatingDays 格式: "1234567" 其中 1=Monday, 2=Tuesday... 7=Sunday
      const jsDay = searchDate.getDay() // 0-6
      const dayOfWeek = jsDay === 0 ? 7 : jsDay // 轉換：0(Sunday)→7, 1(Monday)→1, etc.
      
      console.log('🔍 Flight Search Debug:', {
        searchDate: date,
        jsDay,
        dayOfWeek,
        totalFlights: flights.length
      })
      
      filteredFlights = flights.filter((flight: any) => {
        const operates = flight.operatingDays.includes(dayOfWeek.toString())
        if (operates) {
          console.log('✅ Flight operates:', flight.flightNumber, 'operatingDays:', flight.operatingDays)
        }
        return operates
      })
      
      console.log('📊 Filtered flights count:', filteredFlights.length)
    }

    // 為前端返回的數據添加完整的日期時間
    const flightsWithDates = filteredFlights.map(flight => {
      let departureTime = flight.departureTime
      let arrivalTime = flight.arrivalTime
      
      // 如果提供了日期，組合日期和時間
      if (date) {
        const [depHour, depMin] = flight.departureTime.split(':')
        const [arrHour, arrMin] = flight.arrivalTime.split(':').map(t => t.replace('+1', ''))
        const isNextDay = flight.arrivalTime.includes('+1')
        
        const depDate = new Date(date)
        depDate.setHours(parseInt(depHour), parseInt(depMin), 0, 0)
        
        const arrDate = new Date(date)
        if (isNextDay) {
          arrDate.setDate(arrDate.getDate() + 1)
        }
        arrDate.setHours(parseInt(arrHour), parseInt(arrMin), 0, 0)
        
        return {
          ...flight,
          departureTimeISO: depDate.toISOString(),
          arrivalTimeISO: arrDate.toISOString(),
        }
      }
      
      return flight
    })

    // 添加 no-cache headers
    return NextResponse.json(flightsWithDates, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Error fetching flights:', error)
    return NextResponse.json(
      { error: '獲取航班失敗' },
      { status: 500 }
    )
  }
}
