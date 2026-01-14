import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 解析時長字符串（如 "2h 30m"）為分鐘數
function parseDuration(duration: string): number {
  const hourMatch = duration.match(/(\d+)h/)
  const minuteMatch = duration.match(/(\d+)m/)
  const hours = hourMatch ? parseInt(hourMatch[1]) : 0
  const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0
  return hours * 60 + minutes
}

// 計算兩個時間之間的差異（分鐘）
function getTimeDifferenceMinutes(time1: string, time2: string): number {
  const [h1, m1] = time1.split(':').map(Number)
  const [h2, m2] = time2.split(':').map(Number)
  return (h2 * 60 + m2) - (h1 * 60 + m1)
}

// 格式化航班數據
function formatFlight(flight: any, departureDate: string, cabinClass: string, passengers: number) {
  let pricePerPassenger = 0
  let availableSeats = 0

  switch (cabinClass) {
    case 'BUSINESS':
      pricePerPassenger = flight.businessPrice
      availableSeats = flight.businessSeats
      break
    case 'FIRST_CLASS':
      pricePerPassenger = flight.firstClassPrice
      availableSeats = flight.firstClassSeats
      break
    default: // ECONOMY
      pricePerPassenger = flight.economyPrice
      availableSeats = flight.economySeats
  }

  // 計算到達時間（處理跨天情況）
  const depTime = flight.departureTime.split(':').map(Number)
  const arrTime = flight.arrivalTime.replace('+1', '').split(':').map(Number)
  
  let arrivalDate = new Date(departureDate)
  // 如果到達時間小於出發時間，說明是次日到達
  if (arrTime[0] < depTime[0] || (arrTime[0] === depTime[0] && arrTime[1] < depTime[1])) {
    arrivalDate.setDate(arrivalDate.getDate() + 1)
  }
  
  const arrivalDateStr = arrivalDate.toISOString().split('T')[0]
  const arrivalTimeStr = flight.arrivalTime.replace('+1', '')

  return {
    id: flight.id,
    flightNumber: flight.flightNumber,
    airline: flight.airline,
    airlineCode: flight.airlineCode,
    airlineLogo: flight.airlineLogo,
    from: flight.from,
    fromCity: flight.fromCity,
    fromAirport: flight.fromAirport,
    to: flight.to,
    toCity: flight.toCity,
    toAirport: flight.toAirport,
    departureTime: `${departureDate}T${flight.departureTime}:00`,
    arrivalTime: `${arrivalDateStr}T${arrivalTimeStr}:00`,
    duration: parseDuration(flight.duration),
    durationStr: flight.duration,
    aircraft: flight.aircraft,
    status: flight.status,
    pricePerPassenger,
    totalPrice: pricePerPassenger * passengers,
    availableSeats,
    cabinClass,
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const departureDate = searchParams.get('departureDate')
    const cabinClass = searchParams.get('cabinClass') || 'ECONOMY'
    const passengers = parseInt(searchParams.get('passengers') || '1')
    const maxLayoverHours = parseInt(searchParams.get('maxLayoverHours') || '12') // 最大中轉時間（小時）
    const minLayoverMinutes = parseInt(searchParams.get('minLayoverMinutest(') || ')90') // 最小中轉時間（分鐘）

    if (!from || !to || !departureDate) {
      return NextResponse.json(
        { error: '缺少必要的搜索參數' },
        { status: 400 }
      )
    }

    // 檢查出發日期的星期幾
    const depDate = new Date(departureDate)
    const depDayOfWeek = depDate.getDay()
    const depFlightDay = depDayOfWeek === 0 ? 7 : depDayOfWeek

    // 首先查詢是否有直飛航班，用於比較時間效率
    const directFlights = await prisma.flight.findMany({
      where: {
        from: { equals: from.toUpperCase() },
        to: { equals: to.toUpperCase() },
        status: { in: ['SCHEDULED', 'BOARDING'] },
        operatingDays: { contains: depFlightDay.toString() },
        ...(cabinClass === 'ECONOMY' && { economySeats: { gte: passengers } }),
        ...(cabinClass === 'BUSINESS' && { businessSeats: { gte: passengers } }),
        ...(cabinClass === 'FIRST_CLASS' && { firstClassSeats: { gte: passengers } }),
      },
    })

    // 獲取最短直飛時間（如果有直飛航班）
    let shortestDirectFlightMinutes: number | null = null
    if (directFlights.length > 0) {
      shortestDirectFlightMinutes = Math.min(
          ...directFlights.map((f: any) => parseDuration(f.duration))
      )
    }

    // 1. 查找所有可能的中轉機場（排除出發地和目的地）
    const allAirports = await prisma.flight.findMany({
      select: {
        from: true,
        to: true,
      },
      distinct: ['from', 'to'],
    })

    // 獲取所有唯一機場代碼
    const airportSet = new Set<string>()
    allAirports.forEach((f: any) => {
      airportSet.add(f.from)
      airportSet.add(f.to)
    })
    
    // 排除出發地和目的地
    const potentialHubs = Array.from(airportSet).filter(
      code => code !== from.toUpperCase() && code !== to.toUpperCase()
    )

    const connections: any[] = []

    // 2. 對每個可能的中轉機場，查找航班組合
    for (const hub of potentialHubs) {
      // 查找第一程：出發地 -> 中轉地
      const firstLeg = await prisma.flight.findMany({
        where: {
          from: { equals: from.toUpperCase() },
          to: { equals: hub },
          status: { in: ['SCHEDULED', 'BOARDING'] },
          operatingDays: { contains: depFlightDay.toString() },
          ...(cabinClass === 'ECONOMY' && { economySeats: { gte: passengers } }),
          ...(cabinClass === 'BUSINESS' && { businessSeats: { gte: passengers } }),
          ...(cabinClass === 'FIRST_CLASS' && { firstClassSeats: { gte: passengers } }),
        },
      })

      if (firstLeg.length === 0) continue

      // 查找第二程：中轉地 -> 目的地
      const secondLeg = await prisma.flight.findMany({
        where: {
          from: { equals: hub },
          to: { equals: to.toUpperCase() },
          status: { in: ['SCHEDULED', 'BOARDING'] },
          operatingDays: { contains: depFlightDay.toString() },
          ...(cabinClass === 'ECONOMY' && { economySeats: { gte: passengers } }),
          ...(cabinClass === 'BUSINESS' && { businessSeats: { gte: passengers } }),
          ...(cabinClass === 'FIRST_CLASS' && { firstClassSeats: { gte: passengers } }),
        },
      })

      if (secondLeg.length === 0) continue

      // 3. 匹配合理的中轉時間
      for (const leg1 of firstLeg) {
        for (const leg2 of secondLeg) {
          // 計算中轉時間
          const arrivalTime1 = leg1.arrivalTime.replace('+1', '')
          const departureTime2 = leg2.departureTime
          
          const layoverMinutes = getTimeDifferenceMinutes(arrivalTime1, departureTime2)
          
          // 如果第二程出發時間早於第一程到達時間，跳過（除非跨天）
          if (layoverMinutes < 0) continue
          
          // 檢查中轉時間是否合理
          if (layoverMinutes >= minLayoverMinutes && layoverMinutes <= maxLayoverHours * 60) {
            const formatted1 = formatFlight(leg1, departureDate, cabinClass, passengers)
            const formatted2 = formatFlight(leg2, departureDate, cabinClass, passengers)
            
            const totalDuration = formatted1.duration + formatted2.duration + layoverMinutes
            const totalPrice = formatted1.totalPrice + formatted2.totalPrice
            
            // 過濾不合理的中轉：
            // 1. 如果有直飛航班，且中轉總時長超過直飛時長的 2 倍，則不推薦
            if (shortestDirectFlightMinutes !== null) {
              if (totalDuration > shortestDirectFlightMinutes * 2) {
                continue // 跳過這個不合理的組合
              }
            }
            
            // 2. 如果沒有直飛，至少保證中轉時長不超過純飛行時間的 2 倍
            const pureFlyingTime = formatted1.duration + formatted2.duration
            const timeEfficiency = totalDuration / pureFlyingTime
            if (timeEfficiency > 2.0) {
              continue // 跳過這個不合理的組合
            }

            connections.push({
              id: `${leg1.id}-${leg2.id}`,
              type: 'connection',
              segments: [formatted1, formatted2],
              layoverMinutes,
              layoverAirport: hub,
              layoverAirportName: leg1.toCity,
              totalDuration,
              totalPrice,
              pricePerPassenger: totalPrice / passengers,
              from: from.toUpperCase(),
              fromCity: leg1.fromCity,
              to: to.toUpperCase(),
              toCity: leg2.toCity,
              departureTime: formatted1.departureTime,
              arrivalTime: formatted2.arrivalTime,
              stops: 1,
            })
          }
        }
      }
    }

    // 4. 按總價排序
    connections.sort((a, b) => a.totalPrice - b.totalPrice)

    return NextResponse.json({
      connections,
      count: connections.length,
      searchParams: {
        from,
        to,
        departureDate,
        cabinClass,
        passengers,
        maxLayoverHours,
        minLayoverMinutes,
      },
    })
  } catch (error) {
    console.error('Connection flight search error:', error)
    return NextResponse.json(
      { error: '搜索中轉航班時出錯' },
      { status: 500 }
    )
  }
}

