import express from 'express'
import { prisma } from '../lib/prisma'

const router = express.Router()

// 根據郵箱獲取用戶
router.get('/by-email', async (req, res) => {
  try {
    const { email } = req.query

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const user = await prisma.user.findUnique({
      where: { email: email as string },
      select: {
        id: true,
        name: true,
        email: true,
        membershipLevel: true,
        points: true,
        phone: true,
        nationality: true,
        passportNumber: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: '獲取用戶失敗' })
  }
})

export default router
