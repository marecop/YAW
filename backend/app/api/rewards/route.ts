import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const rewards = await prisma.reward.findMany({
      where: { active: true },
      orderBy: { points: 'asc' }
    })
    
    // 如果没有奖励商品，创建一些默认的
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
      
      return NextResponse.json(newRewards)
    }

    return NextResponse.json(rewards)
  } catch (error) {
    console.error('获取积分商品失败:', error)
    return NextResponse.json(
      { error: '获取积分商品失败' },
      { status: 500 }
    )
  }
}
