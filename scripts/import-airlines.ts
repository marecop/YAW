import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

// 航空公司代码映射
const airlineMapping: Record<string, {name: string, code: string, logo: string}> = {
  'cathay-pacific': { name: '國泰航空', code: 'CX', logo: '/images/airlines/cathaypacific.png' },
  'singapore-airlines': { name: '新加坡航空', code: 'SQ', logo: '/images/airlines/sq.svg' },
  'air-china': { name: '中國國際航空', code: 'CA', logo: '/images/airlines/airchina.png' },
  'china-eastern': { name: '中國東方航空', code: 'MU', logo: '/images/airlines/chinaeastern.png' },
  'china-southern': { name: '中國南方航空', code: 'CZ', logo: '/images/airlines/chinasouthern.png' },
  'japan-airlines': { name: '日本航空', code: 'JL', logo: '/images/airlines/japanair.png' },
  'all-nippon': { name: '全日空', code: 'NH', logo: '/images/airlines/ana.png' },
  'air-france': { name: '法國航空', code: 'AF', logo: '/images/airlines/airfrance.png' },
  'lufthansa': { name: '漢莎航空', code: 'LH', logo: '/images/airlines/icon-LH.svg' },
  'emirates': { name: '阿聯酋航空', code: 'EK', logo: '/images/airlines/emirates.png' },
  'delta': { name: '達美航空', code: 'DL', logo: '/images/airlines/delta.svg' },
  'united': { name: '聯合航空', code: 'UA', logo: '/images/airlines/unitedairlines.svg' },
  'american-airlines': { name: '美國航空', code: 'AA', logo: '/images/airlines/americanair.png' },
  'qantas': { name: '澳洲航空', code: 'QF', logo: '/images/airlines/qantas.svg' },
  'swiss': { name: '瑞士國際航空', code: 'LX', logo: '/images/airlines/swiss.svg' },
}

// 城市代碼映射（擴展）
const cityMapping: Record<string, string> = {
  'HKG': '香港',
  'CAN': '廣州',
  'TPE': '台北',
  'JFK': '紐約',
  'LHR': '倫敦',
  'SIN': '新加坡',
  'CDG': '巴黎',
  'FRA': '法蘭克福',
  'NRT': '東京',
  'PVG': '上海',
  'PEK': '北京',
  'DXB': '迪拜',
  'LAX': '洛杉磯',
  'SFO': '舊金山',
  'SYD': '悉尼',
  'AMS': '阿姆斯特丹',
  'ZRH': '蘇黎世',
  'ICN': '首爾',
}

// 機場名稱映射
const airportMapping: Record<string, string> = {
  'HKG': '香港國際機場',
  'CAN': '廣州白雲國際機場',
  'TPE': '台北桃園國際機場',
  'JFK': '紐約甘迺迪國際機場',
  'LHR': '倫敦希思羅機場',
  'SIN': '新加坡樟宜機場',
  'CDG': '巴黎戴高樂機場',
  'FRA': '法蘭克福國際機場',
  'NRT': '東京成田國際機場',
  'PVG': '上海浦東國際機場',
  'PEK': '北京首都國際機場',
  'DXB': '迪拜國際機場',
  'LAX': '洛杉磯國際機場',
  'SFO': '舊金山國際機場',
  'SYD': '悉尼金斯福德·史密斯國際機場',
  'AMS': '阿姆斯特丹史基浦機場',
  'ZRH': '蘇黎世機場',
  'ICN': '首爾仁川國際機場',
}

// 計算飛行時長
function calculateDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

// 計算到達時間
function calculateArrivalTime(departureTime: string, durationMinutes: number): string {
  const [hours, minutes] = departureTime.split(':').map(Number)
  const totalMinutes = hours * 60 + minutes + durationMinutes
  const arrivalHours = Math.floor(totalMinutes / 60) % 24
  const arrivalMinutes = totalMinutes % 60
  return `${String(arrivalHours).padStart(2, '0')}:${String(arrivalMinutes).padStart(2, '0')}`
}

async function importAirlineData(filename: string) {
  const filePath = path.join(process.cwd(), 'public/data/airlines', filename)
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  文件不存在: ${filename}`)
    return
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const airlineData = JSON.parse(fileContent)
  
  const airlineKey = filename.replace('.json', '')
  const airlineInfo = airlineMapping[airlineKey]
  
  if (!airlineInfo) {
    console.log(`⚠️  未找到航空公司映射: ${airlineKey}`)
    return
  }

  console.log(`\n📦 導入 ${airlineInfo.name} (${airlineInfo.code}) 數據...`)

  for (const flight of airlineData.flights) {
    try {
      const departureCode = flight.departureAirportCode
      const arrivalCode = flight.arrivalAirportCode
      
      const departureTime = flight.departureTime.substring(0, 5) // "09:30:00" -> "09:30"
      const arrivalTime = calculateArrivalTime(departureTime, flight.durationMinutes)
      const duration = calculateDuration(flight.durationMinutes)

      const flightData = {
        flightNumber: flight.flightNumber,
        airline: airlineInfo.name,
        airlineCode: airlineInfo.code,
        airlineLogo: airlineInfo.logo,
        from: departureCode,
        fromCity: cityMapping[departureCode] || departureCode,
        fromAirport: airportMapping[departureCode] || flight.departureAirport,
        to: arrivalCode,
        toCity: cityMapping[arrivalCode] || arrivalCode,
        toAirport: airportMapping[arrivalCode] || flight.arrivalAirport,
        departureTime,
        arrivalTime,
        duration,
        aircraft: flight.aircraftType,
        economyPrice: flight.prices.CNY.economy,
        businessPrice: flight.prices.CNY.business,
        firstClassPrice: flight.prices.CNY.first || 0,
        economySeats: Math.floor(flight.seatsAvailable * 0.7),
        businessSeats: Math.floor(flight.seatsAvailable * 0.2),
        firstClassSeats: flight.hasFirstClass ? Math.floor(flight.seatsAvailable * 0.1) : 0,
        operatingDays: '1234567', // 每天運營
      }

      await prisma.flight.upsert({
        where: { flightNumber: flight.flightNumber },
        update: flightData,
        create: flightData,
      })

      console.log(`✅ ${flight.flightNumber}: ${departureCode} → ${arrivalCode}`)
    } catch (error) {
      console.error(`❌ 導入失敗 ${flight.flightNumber}:`, error)
    }
  }
}

async function main() {
  console.log('🚀 開始導入航空公司數據...\n')

  const airlinesToImport = [
    'cathay-pacific.json',
    'singapore-airlines.json',
    'air-china.json',
    'china-eastern.json',
    'china-southern.json',
    'japan-airlines.json',
    'all-nippon.json',
    'air-france.json',
    'lufthansa.json',
    'emirates.json',
    'delta.json',
    'united.json',
    'american-airlines.json',
    'qantas.json',
    'swiss.json',
  ]

  for (const filename of airlinesToImport) {
    await importAirlineData(filename)
  }

  console.log('\n✅ 所有航空公司數據導入完成！')
  
  // 統計
  const totalFlights = await prisma.flight.count()
  const airlines = await prisma.flight.groupBy({
    by: ['airline'],
    _count: true
  })
  
  console.log(`\n📊 統計信息：`)
  console.log(`總航班數: ${totalFlights}`)
  console.log(`\n各航空公司航班數：`)
  airlines.forEach(a => {
    console.log(`  ${a.airline}: ${a._count} 航班`)
  })
}

main()
  .catch((e) => {
    console.error('❌ 導入過程中發生錯誤:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

