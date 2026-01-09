import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: '請提供電子郵件地址' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { message: '用戶不存在' },
        { status: 404 }
      )
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: '該郵箱已驗證' },
        { status: 400 }
      )
    }

    // 生成验证令牌
    const verificationToken = crypto.randomBytes(32).toString('hex')

    // 更新用户
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: verificationToken,
      },
    })

    // 发送邮件
    try {
      await sendVerificationEmail(email, verificationToken)
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      return NextResponse.json(
        { message: '發送驗證郵件失敗' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: '驗證郵件已發送',
    })
  } catch (error) {
    console.error('發送驗證郵件錯誤:', error)
    return NextResponse.json(
      { message: '處理請求時發生錯誤' },
      { status: 500 }
    )
  }
}
