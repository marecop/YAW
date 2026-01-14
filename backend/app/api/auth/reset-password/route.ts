import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { message: '缺少必要參數' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: '密碼長度至少需要8個字符' },
        { status: 400 }
      )
    }

    // 查找具有该令牌的用户
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: '重置令牌無效或已過期' },
        { status: 400 }
      )
    }

    // 哈希新密码
    const hashedPassword = await bcrypt.hash(password, 10)

    // 更新用户密码并清除重置令牌
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    })

    return NextResponse.json({
      message: '密碼重置成功',
    })
  } catch (error) {
    console.error('重置密碼錯誤:', error)
    return NextResponse.json(
      { message: '重置密碼時發生錯誤' },
      { status: 500 }
    )
  }
}

