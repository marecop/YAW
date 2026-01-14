import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const bookingNumber = searchParams.get('bookingNumber')
    const lastName = searchParams.get('lastName')

    if (!bookingNumber || !lastName) {
      return NextResponse.json(
        { message: '請提供預訂編號和姓氏' },
        { status: 400 }
      )
    }

    // 搜索预订
    const booking = await prisma.booking.findFirst({
      where: {
        bookingNumber: bookingNumber.toUpperCase(),
        passengerName: {
          contains: lastName,
        },
      },
      include: {
        flight: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            membershipLevel: true,
          },
        },
      },
    })

    if (!booking) {
      return NextResponse.json(
        { message: '找不到預訂記錄，請檢查預訂編號和姓氏是否正確' },
        { status: 404 }
      )
    }

    // 检查航班状态
    const departureTime = new Date(booking.flight.departureTime)
    const now = new Date()
    const hoursUntilDeparture = (departureTime.getTime() - now.getTime()) / (1000 * 60 * 60)

    // 值机窗口：起飞前48小时至90分钟
    if (hoursUntilDeparture > 48) {
      return NextResponse.json(
        { message: '在線值機將在航班起飛前48小時開放' },
        { status: 400 }
      )
    }

    if (hoursUntilDeparture < 1.5) {
      return NextResponse.json(
        { message: '在線值機已關閉。請前往機場櫃台辦理值機' },
        { status: 400 }
      )
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('搜索預訂錯誤:', error)
    return NextResponse.json(
      { message: '搜索預訂時發生錯誤' },
      { status: 500 }
    )
  }
}

