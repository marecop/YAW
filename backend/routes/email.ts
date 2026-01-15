import express from 'express'
import { sendBookingConfirmation } from '../lib/email'

const router = express.Router()

// 發送預訂確認郵件
router.post('/send-booking-email', async (req, res) => {
  try {
    const bookingData = req.body

    await sendBookingConfirmation(bookingData.passengerEmail, bookingData)

    res.json({ message: '郵件發送成功' })
  } catch (error) {
    console.error('Error sending booking email:', error)
    res.status(500).json({ error: '發送郵件失敗' })
  }
})

// 測試郵件
router.post('/test-email', async (req, res) => {
  try {
    const { to } = req.body

    if (!to) {
      return res.status(400).json({ error: 'Email address is required' })
    }

    // 這裡可以添加測試郵件發送邏輯
    res.json({ message: '測試郵件已發送' })
  } catch (error) {
    console.error('Error sending test email:', error)
    res.status(500).json({ error: '發送測試郵件失敗' })
  }
})

export default router
