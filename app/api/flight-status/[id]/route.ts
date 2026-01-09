import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    
    const instance = await prisma.flightInstance.findUnique({
      where: { id },
      include: {
        flight: true
      }
    })

    if (!instance) {
      return NextResponse.json({ error: '找不到航班信息' }, { status: 404 })
    }

    return NextResponse.json(instance)
  } catch (error) {
    console.error('獲取航班詳情失敗:', error)
    return NextResponse.json({ error: '獲取航班詳情失敗' }, { status: 500 })
  }
}
