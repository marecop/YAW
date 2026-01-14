import { NextResponse } from 'next/server'
import { verifyEmailConnection, sendBookingConfirmation } from '@/lib/email'

export async function GET() {
  try {
    // 測試 SMTP 連接
    const isConnected = await verifyEmailConnection()
    
    if (!isConnected) {
      return NextResponse.json(
        { 
          success: false, 
          message: '❌ SMTP 連接失敗',
          smtp: {
            host: 'webhost.dynadot.com',
            port: 587,
            user: 'noreply@flaps1f.com'
          }
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '✅ SMTP 連接成功！郵件服務器準備就緒',
      smtp: {
        host: 'webhost.dynadot.com',
        port: 587,
        user: 'noreply@flaps1f.com',
        status: 'Ready'
      }
    })
  } catch (error) {
    console.error('SMTP test error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: '❌ SMTP 測試失敗',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// POST - 發送測試郵件
export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: '請提供測試郵箱地址' },
        { status: 400 }
      )
    }

    // 發送測試郵件
    await sendBookingConfirmation(email, {
      bookingNumber: 'TEST-' + Date.now(),
      passengerName: '測試用戶',
      flightNumber: 'YA809',
      from: 'HKG',
      fromCity: '香港',
      to: 'FRA',
      toCity: '法蘭克福',
      departureTime: '23:45',
      arrivalTime: '06:30+1',
      flightDate: new Date().toISOString(),
      cabinClass: 'BUSINESS',
      seatNumber: '12A',
      totalPrice: 10805,
    })

    return NextResponse.json({
      success: true,
      message: `✅ 測試郵件已發送至 ${email}`,
      email
    })
  } catch (error) {
    console.error('Send test email error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: '❌ 發送測試郵件失敗',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

