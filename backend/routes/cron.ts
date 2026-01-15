import express from 'express'
import { prisma } from '../lib/prisma'

const router = express.Router()

// 處理積分（定時任務）
router.post('/process-points', async (req, res) => {
  try {
    // 這裡可以添加處理積分的邏輯
    // 例如：根據飛行記錄自動添加積分
    
    res.json({ message: '積分處理完成' })
  } catch (error) {
    console.error('Error processing points:', error)
    res.status(500).json({ error: '處理積分失敗' })
  }
})

export default router
