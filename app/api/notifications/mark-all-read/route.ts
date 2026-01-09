import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// 标记所有通知为已读
export async function POST(request: NextRequest) {
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

    // 获取所有未读通知
    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          { recipientType: 'ALL' },
          { 
            recipientType: 'SPECIFIC_USER',
            recipientUserId: payload.userId
          }
        ],
        reads: {
          none: {
            userId: payload.userId
          }
        }
      },
      select: {
        id: true
      }
    })

    // 批量标记为已读
    await Promise.all(
      notifications.map((notification: any) =>
        prisma.notificationRead.create({
          data: {
            notificationId: notification.id,
            userId: payload.userId
          }
        })
      )
    )

    return NextResponse.json({
      success: true,
      message: `已标记 ${notifications.length} 条通知为已读`,
      count: notifications.length
    })
  } catch (error) {
    console.error('❌ 批量标记已读失败:', error)
    return NextResponse.json(
      { error: '批量标记已读失败' },
      { status: 500 }
    )
  }
}

