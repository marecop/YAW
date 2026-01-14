import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { message: '缺少重置令牌' },
        { status: 400 }
      )
    }

    // 查找具有该令牌的用户
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(), // 令牌未过期
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: '重置令牌無效或已過期' },
        { status: 400 }
      )
    }

    return NextResponse.json({ message: '令牌有效' })
  } catch (error) {
    console.error('驗證令牌錯誤:', error)
    return NextResponse.json(
      { message: '驗證令牌時發生錯誤' },
      { status: 500 }
    )
  }
}

