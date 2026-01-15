import express from 'express'
import { prisma } from '../lib/prisma'

const router = express.Router()

// 獲取航班列表
router.get('/', async (req, res) => {
  try {
    const { from, to, departDate: date, passengers, cabinClass, sortBy = 'price' } = req.query

    console.log('🔍 Flight API called with params:', {
      from,
      to,
      date,
      passengers,
      cabinClass,
      sortBy
    })

    const where: any = {}

    if (from) {
      where.from = from as string
    }

    if (to) {
      where.to = to as string
    }

    const flights = await prisma.flight.findMany({
      where,
      orderBy: sortBy === 'duration' 
        ? { duration: 'asc' } 
        : { economyPrice: 'asc' }
    })

    let filteredFlights = flights
    if (date) {
      const searchDate = new Date(date as string)
      const jsDay = searchDate.getDay()
      const dayOfWeek = jsDay === 0 ? 7 : jsDay
      
      console.log('🔍 Flight Search Debug:', {
        searchDate: date,
        jsDay,
        dayOfWeek,
        totalFlights: flights.length
      })
      
      filteredFlights = flights.filter((flight: any) => {
        const operates = flight.operatingDays.includes(dayOfWeek.toString())
        if (operates) {
          console.log('✅ Flight operates:', flight.flightNumber, 'operatingDays:', flight.operatingDays)
        }
        return operates
      })
      
      console.log('📊 Filtered flights count:', filteredFlights.length)
    }

    const flightsWithDates = filteredFlights.map((flight: any) => {
      if (date) {
        const [depHour, depMin] = flight.departureTime.split(':')
        const [arrHour, arrMin] = flight.arrivalTime.split(':').map((t: string) => t.replace('+1', ''))
        const isNextDay = flight.arrivalTime.includes('+1')
        
        const depDate = new Date(date as string)
        depDate.setHours(parseInt(depHour), parseInt(depMin), 0, 0)
        
        const arrDate = new Date(date as string)
        if (isNextDay) {
          arrDate.setDate(arrDate.getDate() + 1)
        }
        arrDate.setHours(parseInt(arrHour), parseInt(arrMin), 0, 0)
        
        return {
          ...flight,
          departureTimeISO: depDate.toISOString(),
          arrivalTimeISO: arrDate.toISOString(),
        }
      }
      
      return flight
    })

    res.set({
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    })

    res.json(flightsWithDates)
  } catch (error) {
    console.error('Error fetching flights:', error)
    res.status(500).json({ error: '獲取航班失敗' })
  }
})

// 獲取單個航班詳情
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const flight = await prisma.flight.findUnique({
      where: { id },
    })

    if (!flight) {
      return res.status(404).json({ error: '航班不存在' })
    }

    res.json(flight)
  } catch (error) {
    console.error('Error fetching flight:', error)
    res.status(500).json({ error: '獲取航班失敗' })
  }
})

// 搜索航班
router.get('/search', async (req, res) => {
  try {
    const { from, to, date } = req.query

    const where: any = {}
    if (from) where.from = from as string
    if (to) where.to = to as string

    const flights = await prisma.flight.findMany({
      where,
      orderBy: { economyPrice: 'asc' }
    })

    let filteredFlights = flights
    if (date) {
      const searchDate = new Date(date as string)
      const jsDay = searchDate.getDay()
      const dayOfWeek = jsDay === 0 ? 7 : jsDay
      
      filteredFlights = flights.filter((flight: any) => {
        return flight.operatingDays.includes(dayOfWeek.toString())
      })
    }

    res.json(filteredFlights)
  } catch (error) {
    console.error('Error searching flights:', error)
    res.status(500).json({ error: '搜索航班失敗' })
  }
})

// 查找航班
router.get('/lookup', async (req, res) => {
  try {
    const { flightNumber, date } = req.query

    if (!flightNumber) {
      return res.status(400).json({ error: 'Flight number is required' })
    }

    const flight = await prisma.flight.findFirst({
      where: { flightNumber: flightNumber as string },
    })

    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' })
    }

    res.json(flight)
  } catch (error) {
    console.error('Error looking up flight:', error)
    res.status(500).json({ error: '查找航班失敗' })
  }
})

// 往返航班
router.get('/roundtrip', async (req, res) => {
  try {
    const { from, to, departDate, returnDate } = req.query

    if (!from || !to || !departDate || !returnDate) {
      return res.status(400).json({ error: 'Missing required parameters' })
    }

    const outboundFlights = await prisma.flight.findMany({
      where: { from: from as string, to: to as string },
      orderBy: { economyPrice: 'asc' }
    })

    const returnFlights = await prisma.flight.findMany({
      where: { from: to as string, to: from as string },
      orderBy: { economyPrice: 'asc' }
    })

    res.json({
      outbound: outboundFlights,
      return: returnFlights,
    })
  } catch (error) {
    console.error('Error fetching roundtrip flights:', error)
    res.status(500).json({ error: '獲取往返航班失敗' })
  }
})

// 中轉航班
router.get('/connections', async (req, res) => {
  try {
    const { from, to, date } = req.query

    if (!from || !to) {
      return res.status(400).json({ error: 'Missing required parameters' })
    }

    // 查找所有可能的連接點
    const firstLeg = await prisma.flight.findMany({
      where: { from: from as string },
    })

    const connections: any[] = []

    for (const flight1 of firstLeg) {
      const secondLeg = await prisma.flight.findMany({
        where: {
          from: flight1.to,
          to: to as string,
        },
      })

      for (const flight2 of secondLeg) {
        connections.push({
          firstLeg: flight1,
          secondLeg: flight2,
          totalPrice: flight1.economyPrice + flight2.economyPrice,
        })
      }
    }

    res.json(connections)
  } catch (error) {
    console.error('Error fetching connections:', error)
    res.status(500).json({ error: '獲取中轉航班失敗' })
  }
})

export default router
