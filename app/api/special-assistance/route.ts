import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateRequestNumber(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  
  let requestNumber = 'SA'
  
  for (let i = 0; i < 2; i++) {
    requestNumber += letters.charAt(Math.floor(Math.random() * letters.length))
  }
  
  for (let i = 0; i < 6; i++) {
    requestNumber += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }
  
  return requestNumber
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      type,
      passengerName,
      email,
      phone,
      bookingNumber,
      flightNumber,
      flightDate,
      details,
      notes
    } = body

    console.log('📥 收到特殊需求申请:', {
      type,
      passengerName,
      email
    })

    // 验证必填字段
    if (!type || !passengerName || !email || !phone) {
      return NextResponse.json(
        { error: '缺少必填字段' },
        { status: 400 }
      )
    }

    // 生成请求号
    const requestNumber = generateRequestNumber()

    // 创建特殊需求申请
    const assistanceRequest = await prisma.specialAssistanceRequest.create({
      data: {
        requestNumber,
        type,
        passengerName,
        email,
        phone,
        bookingNumber: bookingNumber || null,
        flightNumber: flightNumber || null,
        flightDate: flightDate || null,
        details,
        notes: notes || null,
        status: 'PENDING'
      }
    })

    console.log('✅ 特殊需求申请已创建:', requestNumber)

    return NextResponse.json({
      success: true,
      requestNumber: assistanceRequest.requestNumber,
      request: assistanceRequest
    })
  } catch (error) {
    console.error('❌ 创建特殊需求申请失败:', error)
    return NextResponse.json(
      { error: '创建申请失败' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const requestNumber = searchParams.get('requestNumber')

    let where: any = {}

    if (email) {
      where.email = email
    }

    if (requestNumber) {
      where.requestNumber = requestNumber
    }

    const requests = await prisma.specialAssistanceRequest.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(requests)
  } catch (error) {
    console.error('❌ 获取特殊需求申请失败:', error)
    return NextResponse.json(
      { error: '获取申请失败' },
      { status: 500 }
    )
  }
}

