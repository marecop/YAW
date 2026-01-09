import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { userId, rewardId } = await request.json()

    if (!userId || !rewardId) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      )
    }

    // 1. 获取用户和商品信息
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    const reward = await prisma.reward.findUnique({
      where: { id: rewardId }
    })

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    if (!reward) {
      return NextResponse.json(
        { error: '商品不存在' },
        { status: 404 }
      )
    }

    // 2. 检查积分是否足够
    if (user.points < reward.points) {
      return NextResponse.json(
        { error: '积分不足' },
        { status: 400 }
      )
    }

    // 3. 检查库存 (如果有限制)
    if (reward.stock !== null && reward.stock <= 0) {
      return NextResponse.json(
        { error: '商品库存不足' },
        { status: 400 }
      )
    }

    // 4. 执行兑换事务
    const result = await prisma.$transaction(async (tx) => {
      // 扣除用户积分
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          points: { decrement: reward.points }
        }
      })

      // 扣除库存 (如果有)
      if (reward.stock !== null) {
        await tx.reward.update({
          where: { id: rewardId },
          data: {
            stock: { decrement: 1 }
          }
        })
      }

      // 创建兑换记录
      const redemption = await tx.redemption.create({
        data: {
          userId,
          rewardId,
          pointsSpent: reward.points,
          status: 'COMPLETED'
        }
      })

      return { updatedUser, redemption }
    })

    return NextResponse.json({
      success: true,
      message: '兑换成功',
      user: {
        points: result.updatedUser.points
      },
      redemption: result.redemption
    })

  } catch (error) {
    console.error('兑换失败:', error)
    return NextResponse.json(
      { error: '兑换失败，请稍后重试' },
      { status: 500 }
    )
  }
}
