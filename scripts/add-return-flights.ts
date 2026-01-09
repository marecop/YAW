import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addReturnFlights() {
  try {
    console.log('🔍 开始查找现有航班...')

    // 获取所有现有航班
    const existingFlights = await prisma.flight.findMany()
    console.log(`📊 找到 ${existingFlights.length} 个现有航班`)

    let addedCount = 0
    let skippedCount = 0

    for (const flight of existingFlights) {
      // 检查是否已经存在返程航班（from 和 to 互换）
      const returnFlightExists = await prisma.flight.findFirst({
        where: {
          from: flight.to,
          to: flight.from,
          airline: flight.airline,
        },
      })

      if (returnFlightExists) {
        console.log(`⏭️  已存在返程航班: ${flight.to} → ${flight.from} (${flight.airline})`)
        skippedCount++
        continue
      }

      // 创建返程航班
      // 航班号：如果原航班号是 YA123，返程改为 YA124（+1）
      const flightNumMatch = flight.flightNumber.match(/([A-Z]+)(\d+)/)
      let returnFlightNumber = flight.flightNumber
      
      if (flightNumMatch) {
        const prefix = flightNumMatch[1]
        const number = parseInt(flightNumMatch[2])
        // 如果是偶数，+1；如果是奇数，-1（航空公司通常用奇偶数区分去返程）
        const returnNumber = number % 2 === 0 ? number + 1 : number - 1
        returnFlightNumber = `${prefix}${returnNumber}`
      }

      // 检查这个返程航班号是否已存在
      const flightNumberExists = await prisma.flight.findFirst({
        where: {
          flightNumber: returnFlightNumber,
        },
      })

      // 如果航班号已存在，添加后缀 'R'
      if (flightNumberExists) {
        returnFlightNumber = `${flight.flightNumber}R`
      }

      // 创建返程航班（交换 from/to 和相关信息）
      await prisma.flight.create({
        data: {
          flightNumber: returnFlightNumber,
          airline: flight.airline,
          airlineCode: flight.airlineCode,
          airlineLogo: flight.airlineLogo,
          // 交换出发地和目的地
          from: flight.to,
          fromCity: flight.toCity,
          fromAirport: flight.toAirport,
          to: flight.from,
          toCity: flight.fromCity,
          toAirport: flight.fromAirport,
          // 时间保持相同（实际应该调整，但为了简化，暂时使用相同时间）
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          duration: flight.duration,
          // 运营日期保持相同
          operatingDays: flight.operatingDays,
          // 座位和价格信息
          economySeats: flight.economySeats,
          economyPrice: flight.economyPrice,
          businessSeats: flight.businessSeats,
          businessPrice: flight.businessPrice,
          firstClassSeats: flight.firstClassSeats,
          firstClassPrice: flight.firstClassPrice,
          // 其他信息
          aircraft: flight.aircraft,
          status: flight.status,
        },
      })

      console.log(`✅ 创建返程航班: ${flight.to} → ${flight.from} (${returnFlightNumber}, ${flight.airline})`)
      addedCount++
    }

    console.log('\n📈 统计结果:')
    console.log(`   ✅ 新增返程航班: ${addedCount}`)
    console.log(`   ⏭️  跳过已存在: ${skippedCount}`)
    console.log(`   📊 总航班数量: ${existingFlights.length + addedCount}`)

  } catch (error) {
    console.error('❌ 错误:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addReturnFlights()

