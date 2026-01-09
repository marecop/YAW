import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 開始更新 Yellow Airlines logo...')

  // 更新所有 Yellow Airlines 的航班
  const result = await prisma.flight.updateMany({
    where: {
      OR: [
        { airline: 'Yellow Airlines' },
        { airlineCode: 'YA' },
        { airline: { contains: 'Yellow' } },
      ],
    },
    data: {
      airline: 'Yellow Airlines',
      airlineCode: 'YA',
      airlineLogo: '/images/airlines/yellow-airlines.png',
    },
  })

  console.log(`✅ 成功更新 ${result.count} 個航班`)

  // 驗證更新
  const yaFlights = await prisma.flight.findMany({
    where: {
      airline: 'Yellow Airlines',
    },
    select: {
      flightNumber: true,
      airline: true,
      airlineCode: true,
      airlineLogo: true,
    },
    take: 5,
  })

  console.log('\n📋 示例航班數據：')
  yaFlights.forEach(f => {
    console.log(`  ${f.flightNumber}: ${f.airline} (${f.airlineCode}) - Logo: ${f.airlineLogo}`)
  })
}

main()
  .catch((e) => {
    console.error('❌ 更新失敗:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

