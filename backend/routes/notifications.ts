import express from 'express'
import { prisma } from '../lib/prisma'
import { requireAuth, AuthRequest } from '../middleware/auth'

const router = express.Router()

// 獲取用戶通知列表
router.get('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: '未登录' })
    }

    const notifications = await prisma.notification.findMany({
      where: {
        AND: [
          {
            OR: [
              { recipientType: 'ALL' },
              { 
                recipientType: 'SPECIFIC_USER',
                recipientUserId: req.user.userId
              }
            ]
          },
          {
            OR: [
              { expiresAt: null },
              { expiresAt: { gt: new Date() } }
            ]
          }
        ]
      },
      include: {
        reads: {
          where: {
            userId: req.user.userId
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const notificationsWithReadStatus = notifications.map(notification => ({
      ...notification,
      read: notification.reads.length > 0
    }))

    res.json(notificationsWithReadStatus)
  } catch (error) {
    console.error('Error fetching notifications:', error)
    res.status(500).json({ error: '獲取通知失敗' })
  }
})

// 標記通知為已讀
router.post('/:id/read', requireAuth, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: '未登录' })
    }

    const { id } = req.params

    // 檢查是否已讀
    const existing = await prisma.notificationRead.findFirst({
      where: {
        notificationId: id,
        userId: req.user.userId
      }
    })

    if (!existing) {
      await prisma.notificationRead.create({
        data: {
          userId: req.user.userId,
          notificationId: id
        }
      })
    }

    res.json({ message: '通知已標記為已讀' })
  } catch (error) {
    console.error('Error marking notification as read:', error)
    res.status(500).json({ error: '標記通知失敗' })
  }
})

// 標記所有通知為已讀
router.post('/mark-all-read', requireAuth, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: '未登录' })
    }

    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          { recipientType: 'ALL' },
          { 
            recipientType: 'SPECIFIC_USER',
            recipientUserId: req.user.userId
          }
        ]
      }
    })

    // 批量創建已讀記錄（如果不存在）
    for (const notification of notifications) {
      const existing = await prisma.notificationRead.findFirst({
        where: {
          notificationId: notification.id,
          userId: req.user!.userId
        }
      })
      
      if (!existing) {
        await prisma.notificationRead.create({
          data: {
            userId: req.user!.userId,
            notificationId: notification.id
          }
        })
      }
    }

    res.json({ message: '所有通知已標記為已讀' })
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
    res.status(500).json({ error: '標記通知失敗' })
  }
})

export default router
