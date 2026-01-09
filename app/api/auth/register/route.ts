import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import crypto from 'crypto'
import { sendVerificationEmail } from '@/lib/email'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'yellow-airlines-secret-key'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        membershipLevel: 'SILVER', // Default membership level
        points: 0,
        emailVerificationToken: verificationToken,
      },
    })

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken)
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      // We don't fail registration if email fails, but we log it
    }

    // Create JWT token
    const token = sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Return user data (without password) and token
    const { password: _, emailVerificationToken: __, ...userWithoutPassword } = user

    // 創建響應並設置 cookie
    const response = NextResponse.json(
      {
        token,
        user: userWithoutPassword,
        message: '註冊成功，請檢查您的郵箱以完成驗證',
      },
      { status: 201 }
    )

    // 設置 httpOnly cookie（7天過期）
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: '服务器错误，请稍后重试' },
      { status: 500 }
    )
  }
}

