import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const flight = await prisma.flight.findUnique({
      where: { id },
    })

    if (!flight) {
      return NextResponse.json(
        { error: 'Flight not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(flight)
  } catch (error) {
    console.error('Error fetching flight:', error)
    return NextResponse.json(
      { error: 'Failed to fetch flight' },
      { status: 500 }
    )
  }
}

