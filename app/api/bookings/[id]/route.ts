import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        flight: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            membershipLevel: true,
          }
        }
      }
    })

    if (!booking) {
      return NextResponse.json({ message: '找不到預訂' }, { status: 404 })
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json({ message: '獲取預訂時發生錯誤' }, { status: 500 })
  }
}

