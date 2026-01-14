import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// Helper to check admin permission
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
  const page = parseInt(searchParams.get('page') || '1')
  const search = searchParams.get('search') || ''
  const pageSize = 10

  const where: any = {}
  if (search) {
    where.OR = [
      { flightNumber: { contains: search } },
      { from: { contains: search } },
      { to: { contains: search } },
      { fromCity: { contains: search } },
      { toCity: { contains: search } }
    ]
  }

  try {
    const [flights, total] = await Promise.all([
      prisma.flight.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { flightNumber: 'asc' }
      }),
      prisma.flight.count({ where })
    ])

    return NextResponse.json({
      flights,
      pagination: {
        total,
        pages: Math.ceil(total / pageSize),
        currentPage: page
      }
    })
  } catch (error) {
    console.error('Failed to fetch flights:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!(await checkAdmin(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const flight = await prisma.flight.create({
      data: {
        flightNumber: body.flightNumber,
        airline: body.airline || 'Yellow Airlines',
        airlineCode: body.airlineCode || 'YA',
        airlineLogo: body.airlineLogo || null,
        from: body.from,
        fromCity: body.fromCity,
        fromAirport: body.fromAirport || body.fromCity + ' Airport', // 必需字段
        to: body.to,
        toCity: body.toCity,
        toAirport: body.toAirport || body.toCity + ' Airport', // 必需字段
        departureTime: body.departureTime,
        arrivalTime: body.arrivalTime,
        duration: body.duration || '0h 0m', // Should be calculated or provided
        aircraft: body.aircraft,
        status: body.status || 'SCHEDULED',
        economyPrice: parseFloat(body.economyPrice),
        premiumEconomyPrice: parseFloat(body.premiumEconomyPrice || 0),
        businessPrice: parseFloat(body.businessPrice),
        firstClassPrice: parseFloat(body.firstClassPrice),
        economySeats: parseInt(body.economySeats),
        premiumEconomySeats: parseInt(body.premiumEconomySeats || 0),
        businessSeats: parseInt(body.businessSeats),
        firstClassSeats: parseInt(body.firstClassSeats),
        operatingDays: body.operatingDays || '1234567',
        hasEconomy: body.hasEconomy !== undefined ? body.hasEconomy : true,
        hasBusiness: body.hasBusiness !== undefined ? body.hasBusiness : true,
        hasFirstClass: body.hasFirstClass !== undefined ? body.hasFirstClass : true,
        hasPremiumEconomy: body.hasPremiumEconomy !== undefined ? body.hasPremiumEconomy : false,
      }
    })
    return NextResponse.json(flight)
  } catch (error) {
    console.error('Failed to create flight:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAdmin(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  try {
    await prisma.flight.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete flight:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
