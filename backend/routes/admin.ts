import express from 'express'
import { prisma } from '../lib/prisma'
import { requireAdmin } from '../middleware/auth'

const router = express.Router()

// 所有 admin 路由都需要管理員權限
router.use(requireAdmin)

// 獲取用戶列表
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        membershipLevel: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json({ users })
  } catch (error) {
    console.error('❌ 获取用户列表失败:', error)
    res.status(500).json({ error: '获取用户列表失败' })
  }
})

// 獲取航班列表
router.get('/flights', async (req, res) => {
  try {
    const flights = await prisma.flight.findMany({
      orderBy: { flightNumber: 'asc' }
    })
    res.json(flights)
  } catch (error) {
    console.error('Error fetching flights:', error)
    res.status(500).json({ error: '獲取航班失敗' })
  }
})

// 創建航班
router.post('/flights', async (req, res) => {
  try {
    const data = req.body
    const flight = await prisma.flight.create({
      data: {
        flightNumber: data.flightNumber,
        airline: data.airline || 'Yellow Airlines',
        from: data.from,
        to: data.to,
        fromCity: data.fromCity || data.from,
        toCity: data.toCity || data.to,
        fromAirport: data.fromAirport || data.from,
        toAirport: data.toAirport || data.to,
        departureTime: data.departureTime,
        arrivalTime: data.arrivalTime,
        duration: data.duration || 0,
        economyPrice: data.economyPrice || 0,
        businessPrice: data.businessPrice || 0,
        firstClassPrice: data.firstClassPrice || 0,
        operatingDays: data.operatingDays || '1234567',
        economySeats: data.economySeats || 0,
        businessSeats: data.businessSeats || 0,
        firstClassSeats: data.firstClassSeats || 0,
        aircraft: data.aircraft || data.aircraftType || 'Boeing 737',
      }
    })
    res.status(201).json(flight)
  } catch (error) {
    console.error('Error creating flight:', error)
    res.status(500).json({ error: '創建航班失敗' })
  }
})

// 獲取預訂列表
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        flight: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    res.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    res.status(500).json({ error: '獲取預訂失敗' })
  }
})

// 獲取統計信息
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalBookings, totalFlights, totalRevenue] = await Promise.all([
      prisma.user.count(),
      prisma.booking.count(),
      prisma.flight.count(),
      prisma.booking.aggregate({
        _sum: { totalPrice: true }
      })
    ])

    res.json({
      totalUsers,
      totalBookings,
      totalFlights,
      totalRevenue: totalRevenue._sum.totalPrice || 0
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({ error: '獲取統計失敗' })
  }
})

// 獲取通知列表
router.get('/notifications', async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(notifications)
  } catch (error) {
    console.error('Error fetching notifications:', error)
    res.status(500).json({ error: '獲取通知失敗' })
  }
})

// 創建通知
router.post('/notifications', async (req, res) => {
  try {
    const { title, message, recipientType, recipientUserId, expiresAt } = req.body

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        type: 'SYSTEM',
        recipientType: recipientType || 'ALL',
        recipientUserId: recipientUserId || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      }
    })

    res.status(201).json(notification)
  } catch (error) {
    console.error('Error creating notification:', error)
    res.status(500).json({ error: '創建通知失敗' })
  }
})

export default router
