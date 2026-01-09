import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// 标记通知为已读
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Next.js 15: params 现在是 Promise，必须 await
    const { id: notificationId } = await params

    // 检查通知是否存在
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId }
    })

    if (!notification) {
      return NextResponse.json(
        { error: '通知不存在' },
        { status: 404 }
      )
    }

    // 检查通知是否发送给该用户
    if (
      notification.recipientType === 'SPECIFIC_USER' &&
      notification.recipientUserId !== payload.userId
    ) {
      return NextResponse.json(
        { error: '无权访问此通知' },
        { status: 403 }
      )
    }

    // 标记为已读（如果尚未标记）
    await prisma.notificationRead.upsert({
      where: {
        notificationId_userId: {
          notificationId,
          userId: payload.userId
        }
      },
      update: {},
      create: {
        notificationId,
        userId: payload.userId
      }
    })

    return NextResponse.json({
      success: true,
      message: '已标记为已读'
    })
  } catch (error) {
    console.error('❌ 标记已读失败:', error)
    return NextResponse.json(
      { error: '标记已读失败' },
      { status: 500 }
    )
  }
}

