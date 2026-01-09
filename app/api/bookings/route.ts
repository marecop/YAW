import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateBookingNumber(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  
  let bookingNumber = 'YA'
  
  // 添加2个字母
  for (let i = 0; i < 2; i++) {
    bookingNumber += letters.charAt(Math.floor(Math.random() * letters.length))
  }
  
  // 添加6个数字
  for (let i = 0; i < 6; i++) {
    bookingNumber += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }
  
  return bookingNumber
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      flightId,
      flightDate,
      cabinClass,
      seatNumber,
      passengerName,
      passengerEmail,
      passengerPhone,
      passportNumber,
      nationality,
      dateOfBirth,
      memberNumber,
      totalPrice
    } = body

    console.log('📥 收到預訂請求:', {
      flightId,
      flightDate,
      cabinClass,
      passengerName,
      passengerEmail,
      totalPrice
    })

    // 验证必填字段
    if (!flightId || !flightDate || !cabinClass || !passengerName || !totalPrice) {
      console.error('❌ 缺少必填字段')
      return NextResponse.json(
        { error: '缺少必填字段' },
        { status: 400 }
      )
    }

    // 获取航班信息
    console.log('🔍 查找航班 ID:', flightId)
    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
    })

    if (!flight) {
      console.error('❌ 航班不存在:', flightId)
      
      // 查詢數據庫中前5個航班作為參考
      const sampleFlights = await prisma.flight.findMany({
        take: 5,
        select: { id: true, flightNumber: true, from: true, to: true }
      })
      console.log('📋 數據庫中的航班樣本:', sampleFlights)
      
      return NextResponse.json(
        { error: '航班不存在', flightId, sampleFlights },
        { status: 404 }
      )
    }
    
    console.log('✅ 找到航班:', flight.flightNumber, `${flight.from} → ${flight.to}`)

    // 获取实际登录用户的邮箱（用于关联预订）
    const bookingUserEmail = body.userEmail  // 登录用户的邮箱
    
    if (!bookingUserEmail) {
      return NextResponse.json(
        { error: '未登錄，無法創建預訂' },
        { status: 401 }
      )
    }

    // 根据登录用户邮箱获取或创建用户（用于关联预订）
    let user = await prisma.user.findFirst({
      where: { email: bookingUserEmail }
    })

    if (!user) {
      console.log('👤 用戶不存在，自動創建新用戶:', bookingUserEmail)
      // 自動創建訪客用戶（使用登录用户的邮箱）
      user = await prisma.user.create({
        data: {
          email: bookingUserEmail,
          name: passengerName || 'Guest User',
          password: '', // 訪客用戶無密碼
          membershipLevel: 'MEMBER',
        }
      })
      console.log('✅ 新用戶已創建:', user.id)
    } else {
      console.log('✅ 找到已存在用戶:', user.email)
    }
    
    console.log('📋 預訂將關聯到用戶:', user.email, '（登錄用戶）')
    console.log('📧 確認郵件將發送到:', passengerEmail, '（乘客郵箱）')

    // 生成预订号
    const bookingNumber = generateBookingNumber()
      
    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        userId: user.id,
        flightId: flight.id,
        flightDate: new Date(flightDate),
        passengerName,
        passengerEmail: passengerEmail,  // 使用乘客的邮箱（用于发送通知）
        passengerPhone: passengerPhone || '',
        passportNumber: passportNumber || '',
        cabinClass: cabinClass.toUpperCase(),
        seatNumber: seatNumber || null,
      memberNumber,
      totalPrice,
      status: 'CONFIRMED',
      checkedIn: false,
    },
    include: {
      flight: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            membershipLevel: true,
          }
        }
      },
    })

    // 更新航班座位数
    const updateData: any = {}
    if (cabinClass.toUpperCase() === 'ECONOMY') {
      updateData.economySeats = { decrement: 1 }
    } else if (cabinClass.toUpperCase() === 'BUSINESS') {
      updateData.businessSeats = { decrement: 1 }
    } else if (cabinClass.toUpperCase() === 'FIRST_CLASS') {
      updateData.firstClassSeats = { decrement: 1 }
    }

    await prisma.flight.update({
      where: { id: flightId },
      data: updateData,
    })

    return NextResponse.json({
      message: '預訂成功',
      booking
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: '创建预订失败' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const userEmail = searchParams.get('userEmail')
    const bookingNumber = searchParams.get('bookingNumber')

    let bookings

    if (bookingNumber) {
      // 根据预订号查询（仅返回匹配的预订）
      bookings = await prisma.booking.findMany({
        where: { bookingNumber },
        include: {
          flight: true,
        },
      })
    } else if (userId) {
      // 根据用户ID查询（数据隔离）
      bookings = await prisma.booking.findMany({
        where: { userId },
        include: {
          flight: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    } else if (userEmail) {
      // 根据用户邮箱查询（数据隔离）
      const user = await prisma.user.findFirst({
        where: { email: userEmail }
      })
      
      if (!user) {
        return NextResponse.json([]) // 用户不存在，返回空数组
      }

      bookings = await prisma.booking.findMany({
        where: { userId: user.id },
        include: {
          flight: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    } else {
      // 未提供用户信息，返回空数组（安全策略）
      return NextResponse.json([])
    }

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: '获取预订失败' },
      { status: 500 }
    )
  }
}
