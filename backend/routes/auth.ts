import express from 'express'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import crypto from 'crypto'
import { prisma } from '../lib/prisma'
import { sendVerificationEmail, sendPasswordResetEmail } from '../lib/email'
import { requireAuth } from '../middleware/auth'

const router = express.Router()
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'yellow-airlines-secret-key'

// 登錄
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: '请提供邮箱和密码' })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({ error: '邮箱或密码错误' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ error: '邮箱或密码错误' })
    }

    const token = sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    const { password: _, ...userWithoutPassword } = user

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days in milliseconds
      path: '/',
    })

    res.json({
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: '服务器错误，请稍后重试' })
  }
})

// 註冊
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: '请填写所有必填字段' })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(409).json({ error: '该邮箱已被注册' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = crypto.randomBytes(32).toString('hex')

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        membershipLevel: 'SILVER',
        points: 0,
        emailVerificationToken: verificationToken,
      },
    })

    try {
      await sendVerificationEmail(email, verificationToken)
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
    }

    const token = sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    const { password: _, emailVerificationToken: __, ...userWithoutPassword } = user

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 * 1000,
      path: '/',
    })

    res.status(201).json({
      token,
      user: userWithoutPassword,
      message: '註冊成功，請檢查您的郵箱以完成驗證',
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ error: '服务器错误，请稍后重试' })
  }
})

// 獲取當前用戶信息
router.get('/me', requireAuth, async (req: any, res) => {
  try {
    const email = req.query.email || req.user?.email

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        membershipLevel: true,
        points: true,
        phone: true,
        nationality: true,
        passportNumber: true,
      },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('Fetch user error:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// 發送驗證郵件
router.post('/send-verification', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (user.emailVerified) {
      return res.status(400).json({ error: 'Email already verified' })
    }

    const verificationToken = crypto.randomBytes(32).toString('hex')

    await prisma.user.update({
      where: { email },
      data: { emailVerificationToken: verificationToken },
    })

    await sendVerificationEmail(email, verificationToken)

    res.json({ message: 'Verification email sent' })
  } catch (error) {
    console.error('Send verification error:', error)
    res.status(500).json({ error: 'Failed to send verification email' })
  }
})

// 驗證郵箱
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ error: 'Token is required' })
    }

    const user = await prisma.user.findFirst({
      where: { emailVerificationToken: token },
    })

    if (!user) {
      return res.status(400).json({ error: 'Invalid token' })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    })

    res.json({ message: 'Email verified successfully' })
  } catch (error) {
    console.error('Verify email error:', error)
    res.status(500).json({ error: 'Failed to verify email' })
  }
})

// 忘記密碼
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // 為了安全，即使用戶不存在也返回成功
      return res.json({ message: 'If the email exists, a password reset link has been sent' })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetTokenExpiry,
      },
    })

    await sendPasswordResetEmail(email, resetToken)

    res.json({ message: 'If the email exists, a password reset link has been sent' })
  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({ error: 'Failed to send password reset email' })
  }
})

// 驗證重置 token
router.get('/verify-reset-token', async (req, res) => {
  try {
    const { token } = req.query

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ error: 'Token is required' })
    }

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    })

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' })
    }

    res.json({ valid: true })
  } catch (error) {
    console.error('Verify reset token error:', error)
    res.status(500).json({ error: 'Failed to verify token' })
  }
})

// 重置密碼
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      return res.status(400).json({ error: 'Token and password are required' })
    }

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    })

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    })

    res.json({ message: 'Password reset successfully' })
  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({ error: 'Failed to reset password' })
  }
})

export default router
