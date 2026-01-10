import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    
    const instance = await prisma.flightInstance.findUnique({
      where: { id },
      select: {
        id: true,
        date: true,
        status: true,
        scheduledDeparture: true,
        scheduledArrival: true,
        actualDeparture: true,
        actualArrival: true,
        aircraftType: true,
        aircraftRegistration: true,
        gate: true,
        terminal: true,
        weatherOrigin: true,
        weatherDestination: true,
        flight: {
          select: {
            flightNumber: true,
            airline: true,
            from: true,
            to: true,
            fromCity: true,
            toCity: true,
            duration: true
          }
        }
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
