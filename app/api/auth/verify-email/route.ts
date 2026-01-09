import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { message: '缺少驗證令牌' },
        { status: 400 }
      )
    }

    // 查找具有该令牌的用户
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: '驗證令牌無效' },
        { status: 400 }
      )
    }

    // 更新用户状态为已验证
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    })

    return NextResponse.json({
      message: '電子郵箱驗證成功',
    })
  } catch (error) {
    console.error('驗證郵箱錯誤:', error)
    return NextResponse.json(
      { message: '驗證郵箱時發生錯誤' },
      { status: 500 }
    )
  }
}
