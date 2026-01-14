import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 根据邮箱查找用户ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: '缺少邮箱参数' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      userId: user.id,
      email: user.email,
      name: user.name
    })
  } catch (error) {
    console.error('❌ 查找用户失败:', error)
    return NextResponse.json(
      { error: '查找用户失败' },
      { status: 500 }
    )
  }
}

