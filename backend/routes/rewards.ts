import express from 'express'
import { prisma } from '../lib/prisma'
import { requireAuth, AuthRequest } from '../middleware/auth'

const router = express.Router()

// 獲取獎勵列表
router.get('/', async (req, res) => {
  try {
    const rewards = await prisma.reward.findMany({
      where: { active: true },
      orderBy: { points: 'asc' }
    })
    
    if (rewards.length === 0) {
      const defaultRewards = [
        {
          title: '升艙券 (經濟 -> 商務)',
          description: '單程航班升艙至商務艙',
          points: 25000,
          category: 'UPGRADE',
          imageUrl: '🎫',
          active: true
        },
        {
          title: '貴賓室通行證',
          description: '單次使用全球黃色航空貴賓室',
          points: 5000,
          category: 'LOUNGE',
          imageUrl: '🛋️',
          active: true
        },
        {
          title: '額外行李額 (23kg)',
          description: '增加一件23公斤托運行李',
          points: 8000,
          category: 'BAGGAGE',
          imageUrl: '🧳',
          active: true
        },
        {
          title: '機上免稅品 8 折券',
          description: '購買機上免稅品可享 8 折優惠',
          points: 2000,
          category: 'SHOPPING',
          imageUrl: '🛍️',
          active: true
        },
      ]
      
      for (const reward of defaultRewards) {
        await prisma.reward.create({ data: reward })
      }
      
      const newRewards = await prisma.reward.findMany({
        where: { active: true },
        orderBy: { points: 'asc' }
      })
      
      return res.json(newRewards)
    }
    
    res.json(rewards)
  } catch (error) {
    console.error('Error fetching rewards:', error)
    res.status(500).json({ error: '獲取獎勵失敗' })
  }
})

// 兌換獎勵
router.post('/redeem', requireAuth, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: '未登录' })
    }

    const { rewardId } = req.body

    if (!rewardId) {
      return res.status(400).json({ error: '請選擇要兌換的獎勵' })
    }

    const reward = await prisma.reward.findUnique({
      where: { id: rewardId }
    })

    if (!reward || !reward.active) {
      return res.status(404).json({ error: '獎勵不存在或已停用' })
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    })

    if (!user || (user.points || 0) < reward.points) {
      return res.status(400).json({ error: '積分不足' })
    }

    // 扣除積分
    await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        points: {
          decrement: reward.points
        }
      }
    })

    // 創建兌換記錄
    const redemption = await prisma.redemption.create({
      data: {
        userId: req.user.userId,
        rewardId: rewardId,
        pointsSpent: reward.points
      }
    })

    res.json({
      message: '兌換成功',
      redemption
    })
  } catch (error) {
    console.error('Error redeeming reward:', error)
    res.status(500).json({ error: '兌換失敗' })
  }
})

export default router
