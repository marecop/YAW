import { NextRequest, NextResponse } from 'next/server'
import { sendBookingConfirmation } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      bookingNumber,
      passengerName,
      flightNumber,
      from,
      fromCity,
      to,
      toCity,
      departureTime,
      arrivalTime,
      flightDate,
      cabinClass,
      seatNumber,
      totalPrice,
    } = body

    // 驗證必填字段
    if (!email || !bookingNumber || !passengerName || !flightNumber || !flightDate) {
      return NextResponse.json(
        { error: '缺少必填字段' },
        { status: 400 }
      )
    }

    // 發送郵件
    await sendBookingConfirmation(email, {
      bookingNumber,
      passengerName,
      flightNumber,
      from,
      fromCity,
      to,
      toCity,
      departureTime,
      arrivalTime,
      flightDate,
      cabinClass,
      seatNumber,
      totalPrice,
    })

    return NextResponse.json({
      success: true,
      message: '預訂確認郵件已發送',
    })
  } catch (error) {
    console.error('Error sending booking email:', error)
    return NextResponse.json(
      { error: '發送郵件失敗', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

