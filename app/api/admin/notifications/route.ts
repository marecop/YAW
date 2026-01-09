import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// 管理员创建通知
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

    // 检查是否是管理员
    // TODO: 添加实际的管理员权限检查
    // 这里暂时假设 email 包含 'admin' 的是管理员
    if (!payload.email.includes('admin')) {
      return NextResponse.json(
        { error: '无管理员权限' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const {
      type,
      title,
      message,
      recipientType,
      recipientUserId,
      relatedType,
      relatedId,
      priority,
      icon,
      link,
      expiresAt,
      // 多语言
      titleDe,
      titleEn,
      titleZhCn,
      titleZhHk,
      messageDe,
      messageEn,
      messageZhCn,
      messageZhHk
    } = body

    // 验证必填字段
    if (!type || !title || !message || !recipientType) {
      return NextResponse.json(
        { error: '缺少必填字段' },
        { status: 400 }
      )
    }

    // 如果是发送给特定用户，验证用户ID
    if (recipientType === 'SPECIFIC_USER' && !recipientUserId) {
      return NextResponse.json(
        { error: '发送给特定用户时需要提供用户ID' },
        { status: 400 }
      )
    }

    // 创建通知
    const notification = await prisma.notification.create({
      data: {
        type,
        title,
        message,
        recipientType,
        recipientUserId: recipientUserId || null,
        relatedType: relatedType || null,
        relatedId: relatedId || null,
        priority: priority || 'NORMAL',
        icon: icon || null,
        link: link || null,
        senderId: payload.userId,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        // 多语言
        titleDe: titleDe || null,
        titleEn: titleEn || null,
        titleZhCn: titleZhCn || null,
        titleZhHk: titleZhHk || null,
        messageDe: messageDe || null,
        messageEn: messageEn || null,
        messageZhCn: messageZhCn || null,
        messageZhHk: messageZhHk || null,
      }
    })

    console.log('✅ 通知已创建:', notification.id)

    return NextResponse.json({
      success: true,
      notification
    })
  } catch (error) {
    console.error('❌ 创建通知失败:', error)
    return NextResponse.json(
      { error: '创建通知失败' },
      { status: 500 }
    )
  }
}

// 获取所有通知（管理员）
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
    if (!payload || !payload.email.includes('admin')) {
      return NextResponse.json(
        { error: '无管理员权限' },
        { status: 403 }
      )
    }

    const notifications = await prisma.notification.findMany({
      include: {
        reads: true,
        _count: {
          select: {
            reads: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      notifications
    })
  } catch (error) {
    console.error('❌ 获取通知列表失败:', error)
    return NextResponse.json(
      { error: '获取通知列表失败' },
      { status: 500 }
    )
  }
}

