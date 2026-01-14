import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

async function checkAdmin(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  if (!token) return false
  const payload = await verifyToken(token)
  return payload && payload.email.includes('admin')
}

export async function GET(request: NextRequest) {
  if (!(await checkAdmin(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  
  const where: any = {}
  if (search) {
    where.OR = [
      { bookingNumber: { contains: search } },
      { passengerName: { contains: search } },
      { passengerEmail: { contains: search } }
    ]
  }

  try {
    const bookings = await prisma.booking.findMany({
      where,
      include: {
        flight: true
      },
      orderBy: { createdAt: 'desc' },
      take: 50 // Limit for now
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAdmin(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, status } = body

    const booking = await prisma.booking.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Failed to update booking:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
