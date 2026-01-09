import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// 获取用户的通知列表
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: '未登录' },
        { status: 401 }
      )
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { error: '无效的token' },
        { status: 401 }
      )
    }

    // 获取所有发送给该用户或所有人的通知
    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          { recipientType: 'ALL' },
          { 
            recipientType: 'SPECIFIC_USER',
            recipientUserId: payload.userId
          }
        ],
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ]
      },
      include: {
        reads: {
          where: {
            userId: payload.userId
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // 计算未读数量
    const unreadCount = notifications.filter(n => n.reads.length === 0).length

    return NextResponse.json({
      notifications: notifications.map(n => ({
        ...n,
        isRead: n.reads.length > 0,
        reads: undefined // 移除 reads 数组，只保留 isRead 布尔值
      })),
      unreadCount
    })
  } catch (error) {
    console.error('❌ 获取通知失败:', error)
    return NextResponse.json(
      { error: '获取通知失败' },
      { status: 500 }
    )
  }
}

