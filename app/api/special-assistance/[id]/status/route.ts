import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// 更新特殊需求申请状态
export async function PATCH(
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

    // 检查是否是管理员
    if (!payload.email.includes('admin')) {
      return NextResponse.json(
        { error: '无管理员权限' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { status } = body
    
    // Next.js 15: params 现在是 Promise，必须 await
    const { id } = await params

    if (!status) {
      return NextResponse.json(
        { error: '缺少状态参数' },
        { status: 400 }
      )
    }

    // 验证状态值
    const validStatuses = ['PENDING', 'PROCESSING', 'APPROVED', 'REJECTED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: '无效的状态值' },
        { status: 400 }
      )
    }

    // 更新状态
    const updatedRequest = await prisma.specialAssistanceRequest.update({
      where: { id },
      data: { status }
    })

    console.log('✅ 特殊需求状态已更新:', updatedRequest.requestNumber, '→', status)

    return NextResponse.json({
      success: true,
      request: updatedRequest
    })
  } catch (error) {
    console.error('❌ 更新状态失败:', error)
    return NextResponse.json(
      { error: '更新状态失败' },
      { status: 500 }
    )
  }
}

