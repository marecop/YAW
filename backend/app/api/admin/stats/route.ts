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

  try {
    const [totalUsers, totalFlights, totalBookings, revenueAgg] = await Promise.all([
      prisma.user.count(),
      prisma.flight.count(),
      prisma.booking.count(),
      prisma.booking.aggregate({
        _sum: {
          totalPrice: true
        }
      })
    ])

    return NextResponse.json({
      totalUsers,
      totalFlights,
      totalBookings,
      revenue: revenueAgg._sum.totalPrice || 0
    })
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
