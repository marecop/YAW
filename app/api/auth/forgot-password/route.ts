import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: '請提供電子郵件地址' },
        { status: 400 }
      )
    }

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // 出于安全考虑，即使用户不存在也返回成功
    // 这样可以防止攻击者枚举用户邮箱
    if (!user) {
      return NextResponse.json(
        { message: '如果該郵箱已註冊，您將收到重置密碼的郵件' },
        { status: 200 }
      )
    }

    // 生成重置令牌
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24小时后过期

    // 保存令牌到数据库
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetTokenExpiry,
      },
    })

    // 发送邮件
    try {
      await sendPasswordResetEmail(email, resetToken)
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // We still return 200 to not leak that the email failed (which might imply user exists)
      // But in a real app you might want to handle this differently
    }

    return NextResponse.json({
      message: '如果該郵箱已註冊，您將收到重置密碼的郵件',
    })
  } catch (error) {
    console.error('忘記密碼錯誤:', error)
    return NextResponse.json(
      { message: '處理請求時發生錯誤' },
      { status: 500 }
    )
  }
}

