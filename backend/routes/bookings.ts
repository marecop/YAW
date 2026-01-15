import express from 'express'
import { prisma } from '../lib/prisma'
import { requireAuth } from '../middleware/auth'

const router = express.Router()

function generateBookingNumber(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  
  let bookingNumber = 'YA'
  
  for (let i = 0; i < 2; i++) {
    bookingNumber += letters.charAt(Math.floor(Math.random() * letters.length))
  }
  
  for (let i = 0; i < 6; i++) {
    bookingNumber += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }
  
  return bookingNumber
}

// 創建預訂
router.post('/', async (req, res) => {
  try {
    const {
      flightId,
      flightDate,
      cabinClass,
      seatNumber,
      passengerName,
      passengerEmail,
      passengerPhone,
      passportNumber,
      nationality,
      dateOfBirth,
      memberNumber,
      totalPrice,
      userEmail
    } = req.body

    console.log('📥 收到預訂請求:', {
      flightId,
      flightDate,
      cabinClass,
      passengerName,
      passengerEmail,
      totalPrice
    })

    if (!flightId || !flightDate || !cabinClass || !passengerName || !totalPrice) {
      console.error('❌ 缺少必填字段')
      return res.status(400).json({ error: '缺少必填字段' })
    }

    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
    })

    if (!flight) {
      console.error('❌ 航班不存在:', flightId)
      const sampleFlights = await prisma.flight.findMany({
        take: 5,
        select: { id: true, flightNumber: true, from: true, to: true }
      })
      console.log('📋 數據庫中的航班樣本:', sampleFlights)
      return res.status(404).json({ error: '航班不存在', flightId, sampleFlights })
    }
    
    console.log('✅ 找到航班:', flight.flightNumber, `${flight.from} → ${flight.to}`)

    const bookingUserEmail = userEmail
    
    if (!bookingUserEmail) {
      return res.status(401).json({ error: '未登錄，無法創建預訂' })
    }

    let user = await prisma.user.findFirst({
      where: { email: bookingUserEmail }
    })

    if (!user) {
      console.log('👤 用戶不存在，自動創建新用戶:', bookingUserEmail)
      user = await prisma.user.create({
        data: {
          email: bookingUserEmail,
          name: passengerName || 'Guest User',
          password: '',
          membershipLevel: 'MEMBER',
        }
      })
      console.log('✅ 新用戶已創建:', user.id)
    } else {
      console.log('✅ 找到已存在用戶:', user.email)
    }
    
    console.log('📋 預訂將關聯到用戶:', user.email)
    console.log('📧 確認郵件將發送到:', passengerEmail)

    const bookingNumber = generateBookingNumber()
      
    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        userId: user.id,
        flightId: flight.id,
        flightDate: new Date(flightDate),
        passengerName,
        passengerEmail: passengerEmail,
        passengerPhone: passengerPhone || '',
        passportNumber: passportNumber || '',
        cabinClass: cabinClass.toUpperCase(),
        seatNumber: seatNumber || null,
        memberNumber,
        totalPrice,
        status: 'CONFIRMED',
        checkedIn: false,
      },
      include: {
        flight: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            membershipLevel: true,
          }
        }
      },
    })

    const updateData: any = {}
    if (cabinClass.toUpperCase() === 'ECONOMY') {
      updateData.economySeats = { decrement: 1 }
    } else if (cabinClass.toUpperCase() === 'BUSINESS') {
      updateData.businessSeats = { decrement: 1 }
    } else if (cabinClass.toUpperCase() === 'FIRST_CLASS') {
      updateData.firstClassSeats = { decrement: 1 }
    }

    await prisma.flight.update({
      where: { id: flightId },
      data: updateData,
    })

    res.json({
      message: '預訂成功',
      booking
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    res.status(500).json({ error: '创建预订失败' })
  }
})

// 獲取預訂列表
router.get('/', async (req, res) => {
  try {
    const { userId, userEmail, bookingNumber } = req.query

    let bookings

    if (bookingNumber) {
      bookings = await prisma.booking.findMany({
        where: { bookingNumber: bookingNumber as string },
        include: {
          flight: true,
        },
      })
    } else if (userId) {
      bookings = await prisma.booking.findMany({
        where: { userId: userId as string },
        include: {
          flight: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    } else if (userEmail) {
      const user = await prisma.user.findFirst({
        where: { email: userEmail as string }
      })
      
      if (!user) {
        return res.json([])
      }

      bookings = await prisma.booking.findMany({
        where: { userId: user.id },
        include: {
          flight: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    } else {
      return res.json([])
    }

    res.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    res.status(500).json({ error: '获取预订失败' })
  }
})

// 獲取單個預訂
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        flight: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            membershipLevel: true,
          }
        }
      }
    })

    if (!booking) {
      return res.status(404).json({ message: '找不到預訂' })
    }

    res.json(booking)
  } catch (error) {
    console.error('Error fetching booking:', error)
    res.status(500).json({ message: '獲取預訂時發生錯誤' })
  }
})

// 查找預訂
router.get('/lookup', async (req, res) => {
  try {
    const { bookingNumber, passengerEmail } = req.query

    if (!bookingNumber && !passengerEmail) {
      return res.status(400).json({ error: '請提供預訂號或乘客郵箱' })
    }

    const where: any = {}
    if (bookingNumber) {
      where.bookingNumber = bookingNumber as string
    }
    if (passengerEmail) {
      where.passengerEmail = passengerEmail as string
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        flight: true,
      },
    })

    res.json(bookings)
  } catch (error) {
    console.error('Error looking up booking:', error)
    res.status(500).json({ error: '查找預訂失敗' })
  }
})

export default router
