import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { bookingId, seatNumber } = await request.json()

    if (!bookingId || !seatNumber) {
      return NextResponse.json(
        { message: '缺少必要參數' },
        { status: 400 }
      )
    }

    // 查找预订
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        flight: true,
      },
    })

    if (!booking) {
      return NextResponse.json(
        { message: '找不到預訂記錄' },
        { status: 404 }
      )
    }

    // 检查是否已经值机
    if (booking.checkedIn) {
      return NextResponse.json(
        { message: '該預訂已完成值機' },
        { status: 400 }
      )
    }

    // ========== 检查值机时间窗口（48小时限制）==========
    // 构建完整的航班起飞时间
    let flightDateStr: string

    if (booking.flightDate) {
      flightDateStr = booking.flightDate.toISOString().split('T')[0]
    } else {
      console.warn('⚠️ 預訂缺少 flightDate，使用當前日期')
      flightDateStr = new Date().toISOString().split('T')[0]
    }
    
    const departureTimeStr = booking.flight.departureTime // 格式如 "14:30"
    
    // 更安全的日期解析
    let departureDateTime: Date
    try {
      // 尝试解析日期
      departureDateTime = new Date(`${flightDateStr}T${departureTimeStr}:00`)
      
      // 检查日期是否有效
      if (isNaN(departureDateTime.getTime())) {
        console.error('❌ 無效的日期格式:', { flightDateStr, departureTimeStr })
        // 如果日期无效，使用当前日期作为fallback
        departureDateTime = new Date()
        departureDateTime.setHours(parseInt(departureTimeStr.split(':')[0]), parseInt(departureTimeStr.split(':')[1]))
      }
    } catch (error) {
      console.error('❌ 日期解析錯誤:', error)
      // Fallback: 使用当前时间
      departureDateTime = new Date()
    }
    
    const now = new Date()
    const hoursUntilDeparture = (departureDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

    console.log('⏰ 值機時間檢查:', {
      航班日期: flightDateStr,
      起飛時間: departureTimeStr,
      完整起飛時間: departureDateTime.toISOString(),
      當前時間: now.toISOString(),
      距離起飛小時: hoursUntilDeparture.toFixed(2),
      是否有效: !isNaN(departureDateTime.getTime())
    })

    // 值机窗口：起飞前48小时至90分钟
    if (hoursUntilDeparture > 48) {
      return NextResponse.json(
        { 
          message: '在線值機將在航班起飛前48小時開放',
          hoursUntilCheckInOpens: (hoursUntilDeparture - 48).toFixed(1)
        },
        { status: 400 }
      )
    }

    if (hoursUntilDeparture < 1.5) {
      return NextResponse.json(
        { message: '在線值機已關閉。請前往機場櫃台辦理值機' },
        { status: 400 }
      )
    }

    // 检查座位是否已被占用
    const seatTaken = await prisma.booking.findFirst({
      where: {
        flightId: booking.flightId,
        seatNumber,
        checkedIn: true,
        id: { not: bookingId },
      },
    })

    if (seatTaken) {
      return NextResponse.json(
        { message: '該座位已被佔用，請選擇其他座位' },
        { status: 400 }
      )
    }

    // 更新预订状态
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        checkedIn: true,
        seatNumber,
        status: 'CHECKED_IN',
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

    return NextResponse.json({
      message: '值機成功',
      booking: updatedBooking,
    })
  } catch (error) {
    console.error('值機錯誤:', error)
    return NextResponse.json(
      { message: '值機時發生錯誤' },
      { status: 500 }
    )
  }
}

