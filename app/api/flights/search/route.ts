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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const departureDate = searchParams.get('departureDate')
    const cabinClass = searchParams.get('cabinClass') || 'ECONOMY'
    const passengers = parseInt(searchParams.get('passengers') || '1')
    const directOnly = searchParams.get('directOnly') === 'true'

    if (!from || !to || !departureDate) {
      return NextResponse.json(
        { error: '缺少必要的搜索参数' },
        { status: 400 }
      )
    }

    // 檢查是否是出發日期所在的星期幾運營
    const depDate = new Date(departureDate)
    const dayOfWeek = depDate.getDay() // 0=周日, 1=周一, ..., 6=周六
    // 轉換為航班數據庫格式：1=周一, 7=周日
    const flightDay = dayOfWeek === 0 ? 7 : dayOfWeek

    // Build search query
    const flights = await prisma.flight.findMany({
      where: {
        from: {
          equals: from.toUpperCase(),
        },
        to: {
          equals: to.toUpperCase(),
        },
        status: {
          in: ['SCHEDULED', 'BOARDING'],
        },
        // 檢查該航班是否在這個星期幾運營
        operatingDays: {
          contains: flightDay.toString(),
        },
        // Ensure enough seats are available
        ...(cabinClass === 'ECONOMY' && {
          economySeats: { gte: passengers },
        }),
        ...(cabinClass === 'BUSINESS' && {
          businessSeats: { gte: passengers },
        }),
        ...(cabinClass === 'FIRST_CLASS' && {
          firstClassSeats: { gte: passengers },
        }),
      },
      select: {
        id: true,
        flightNumber: true,
        airline: true,
        airlineCode: true,
        airlineLogo: true,
        from: true,
        fromCity: true,
        fromAirport: true,
        to: true,
        toCity: true,
        toAirport: true,
        departureTime: true,
        arrivalTime: true,
        duration: true,
        aircraft: true,
        status: true,
        operatingDays: true,
        economyPrice: true,
        premiumEconomyPrice: true,
        businessPrice: true,
        firstClassPrice: true,
        economySeats: true,
        premiumEconomySeats: true,
        businessSeats: true,
        firstClassSeats: true,
        hasEconomy: true,
        hasPremiumEconomy: true,
        hasBusiness: true,
        hasFirstClass: true,
      },
      orderBy: {
        departureTime: 'asc',
      },
    })

    // Return all cabin classes with their pricing and availability
    const flightsWithPricing = flights.map((flight) => {
      // Debug log
      if (flight.flightNumber === 'CX831') {
        console.log('=== CX831 Debug ===')
        console.log('hasEconomy:', flight.hasEconomy, typeof flight.hasEconomy)
        console.log('hasPremiumEconomy:', flight.hasPremiumEconomy, typeof flight.hasPremiumEconomy)
        console.log('hasBusiness:', flight.hasBusiness, typeof flight.hasBusiness)
        console.log('hasFirstClass:', flight.hasFirstClass, typeof flight.hasFirstClass)
        console.log('economySeats:', flight.economySeats)
        console.log('premiumEconomySeats:', flight.premiumEconomySeats)
        console.log('passengers:', passengers)
      }
      
      const cabinClasses = [
        {
          type: 'ECONOMY',
          price: flight.economyPrice,
          available: Boolean(flight.hasEconomy) && flight.economySeats >= passengers,
          seats: flight.economySeats
        },
        {
          type: 'PREMIUM_ECONOMY',
          price: flight.premiumEconomyPrice,
          available: Boolean(flight.hasPremiumEconomy) && flight.premiumEconomySeats >= passengers,
          seats: flight.premiumEconomySeats
        },
        {
          type: 'BUSINESS',
          price: flight.businessPrice,
          available: Boolean(flight.hasBusiness) && flight.businessSeats >= passengers,
          seats: flight.businessSeats
        },
        {
          type: 'FIRST_CLASS',
          price: flight.firstClassPrice,
          available: Boolean(flight.hasFirstClass) && flight.firstClassSeats >= passengers,
          seats: flight.firstClassSeats
        }
      ]

      // For backwards compatibility, still calculate the selected cabin class
      let pricePerPassenger = flight.economyPrice
      let availableSeats = flight.economySeats

      switch (cabinClass) {
        case 'PREMIUM_ECONOMY':
          pricePerPassenger = flight.premiumEconomyPrice
          availableSeats = flight.premiumEconomySeats
          break
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

      const result = {
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
        aircraft: flight.aircraft,
        status: flight.status,
        isDirect: true,
        stops: 0,
        pricePerPassenger,
        totalPrice: pricePerPassenger * passengers,
        availableSeats,
        cabinClass,
        cabinClasses: cabinClasses.map(c => ({
          type: c.type,
          price: c.price || 0,
          available: c.available || false,
          seats: c.seats || 0
        })), // All cabin classes with availability
      }
      
      // Debug log for first flight
      if (flight.flightNumber === 'CX831') {
        console.log('CX831 cabinClasses:', JSON.stringify(cabinClasses, null, 2))
      }
      
      return result
    })

    return NextResponse.json({
      flights: flightsWithPricing,
      count: flightsWithPricing.length,
      searchParams: {
        from,
        to,
        departureDate,
        cabinClass,
        passengers,
      },
    })
  } catch (error) {
    console.error('Flight search error:', error)
    return NextResponse.json(
      { error: '搜索航班时出错' },
      { status: 500 }
    )
  }
}

