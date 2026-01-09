import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingNumber = searchParams.get('bookingNumber')

    if (!bookingNumber) {
      return NextResponse.json(
        { error: '請提供預訂編號' },
        { status: 400 }
      )
    }

    console.log('🔍 查找預訂編號:', bookingNumber)

    // 查找预订信息
    const booking = await prisma.booking.findFirst({
      where: {
        bookingNumber: bookingNumber.toUpperCase()
      },
      include: {
        flight: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    })

    if (!booking) {
      console.log('❌ 找不到預訂編號:', bookingNumber)
      return NextResponse.json(
        { error: '找不到此預訂編號' },
        { status: 404 }
      )
    }

    console.log('✅ 找到預訂:', booking.bookingNumber)
    console.log('   航班:', booking.flight.flightNumber)
    console.log('   日期:', booking.flightDate)

    // 返回预订和航班信息
    return NextResponse.json({
      booking: {
        id: booking.id,
        bookingNumber: booking.bookingNumber,
        passengerName: booking.passengerName,
        passengerEmail: booking.passengerEmail,
        flightDate: booking.flightDate,
        cabinClass: booking.cabinClass
      },
      flight: {
        id: booking.flight.id,
        flightNumber: booking.flight.flightNumber,
        from: booking.flight.from,
        fromCity: booking.flight.fromCity,
        to: booking.flight.to,
        toCity: booking.flight.toCity,
        departureTime: booking.flight.departureTime,
        arrivalTime: booking.flight.arrivalTime,
        aircraft: booking.flight.aircraft
      },
      flightDate: booking.flightDate
    })
  } catch (error) {
    console.error('❌ 查找預訂失敗:', error)
    return NextResponse.json(
      { error: '查找預訂失敗' },
      { status: 500 }
    )
  }
}

