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
    const returnDate = searchParams.get('returnDate')
    const cabinClass = searchParams.get('cabinClass') || 'ECONOMY'
    const passengers = parseInt(searchParams.get('passengers') || '1')

    if (!from || !to || !departureDate || !returnDate) {
      return NextResponse.json(
        { error: '缺少必要的搜索参数' },
        { status: 400 }
      )
    }

    // 檢查去程日期的星期幾
    const depDate = new Date(departureDate)
    const depDayOfWeek = depDate.getDay()
    const depFlightDay = depDayOfWeek === 0 ? 7 : depDayOfWeek

    // 檢查返程日期的星期幾
    const retDate = new Date(returnDate)
    const retDayOfWeek = retDate.getDay()
    const retFlightDay = retDayOfWeek === 0 ? 7 : retDayOfWeek

    // 搜索去程航班
    const outboundFlights = await prisma.flight.findMany({
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
        operatingDays: {
          contains: depFlightDay.toString(),
        },
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
      orderBy: {
        departureTime: 'asc',
      },
    })

    // 搜索返程航班（from 和 to 反過來）
    const returnFlights = await prisma.flight.findMany({
      where: {
        from: {
          equals: to.toUpperCase(),
        },
        to: {
          equals: from.toUpperCase(),
        },
        status: {
          in: ['SCHEDULED', 'BOARDING'],
        },
        operatingDays: {
          contains: retFlightDay.toString(),
        },
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
      orderBy: {
        departureTime: 'asc',
      },
    })

    // 格式化航班數據
    const formatFlights = (flights: any[], date: string) => {
      return flights.map((flight) => {
        // 准备所有舱等信息
        const cabinClasses = [
          {
            type: 'ECONOMY',
            price: flight.economyPrice,
            available: flight.hasEconomy && flight.economySeats >= passengers,
            seats: flight.economySeats
          },
          {
            type: 'PREMIUM_ECONOMY',
            price: flight.premiumEconomyPrice,
            available: flight.hasPremiumEconomy && flight.premiumEconomySeats >= passengers,
            seats: flight.premiumEconomySeats
          },
          {
            type: 'BUSINESS',
            price: flight.businessPrice,
            available: flight.hasBusiness && flight.businessSeats >= passengers,
            seats: flight.businessSeats
          },
          {
            type: 'FIRST_CLASS',
            price: flight.firstClassPrice,
            available: flight.hasFirstClass && flight.firstClassSeats >= passengers,
            seats: flight.firstClassSeats
          }
        ]

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

        // 處理跨日到達的情況（如 "06:30+1"）
        let arrivalTimeStr = flight.arrivalTime
        let arrivalDate = new Date(date)
        
        if (arrivalTimeStr.includes('+1')) {
          arrivalTimeStr = arrivalTimeStr.replace('+1', '')
          arrivalDate.setDate(arrivalDate.getDate() + 1)
        } else if (arrivalTimeStr.includes('+2')) {
          arrivalTimeStr = arrivalTimeStr.replace('+2', '')
          arrivalDate.setDate(arrivalDate.getDate() + 2)
        }
        
        const arrivalDateStr = arrivalDate.toISOString().split('T')[0]

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
          departureTime: `${date}T${flight.departureTime}:00`,
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
          cabinClasses, // 包含所有舱等信息
        }
      })
    }

    const outbound = formatFlights(outboundFlights, departureDate)
    const inbound = formatFlights(returnFlights, returnDate)

    return NextResponse.json({
      outbound,
      inbound,
      totalCombinations: outbound.length * inbound.length,
      searchParams: {
        from,
        to,
        departureDate,
        returnDate,
        cabinClass,
        passengers,
      },
    })
  } catch (error) {
    console.error('Roundtrip flight search error:', error)
    return NextResponse.json(
      { error: '搜索往返航班時出錯' },
      { status: 500 }
    )
  }
}

