import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const number = searchParams.get('number')

  if (!number) {
    return NextResponse.json({ error: 'Flight number required' }, { status: 400 })
  }

  // Remove spaces and convert to uppercase
  // e.g. "ya 101" -> "YA101"
  // "101" -> "101"
  const cleanNumber = number.replace(/\s+/g, '').toUpperCase()

  try {
    // Try to find exact match first
    let flight = await prisma.flight.findFirst({
      where: {
        flightNumber: cleanNumber
      }
    })

    // If not found, try contains (e.g. user typed "101" for "YA101")
    if (!flight) {
      flight = await prisma.flight.findFirst({
        where: {
          flightNumber: {
            contains: cleanNumber
          }
        }
      })
    }

    if (!flight) {
      return NextResponse.json(null)
    }

    return NextResponse.json(flight)
  } catch (error) {
    console.error('Error lookup flight:', error)
    return NextResponse.json(
      { error: 'Failed to lookup flight' },
      { status: 500 }
    )
  }
}
