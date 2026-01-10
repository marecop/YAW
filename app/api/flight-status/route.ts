import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureDailyFlights, updateFlightStatuses } from '@/lib/simulation'

// 避免高頻輪詢時每個請求都觸發「生成/更新」導致記憶體與 DB 壓力飆升
// Flight Status 列表頁目前每 60s 輪詢一次，因此節流間隔對齊 60s
const TODAY_SYNC_MIN_INTERVAL_MS = 60_000
let lastTodaySyncMs = 0
let todaySyncPromise: Promise<void> | null = null
let lastTodayKey: string | null = null

function getLocalDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

async function syncTodayIfNeeded(targetDate: Date) {
  const key = getLocalDateKey(targetDate)
  if (key !== lastTodayKey) {
    // 跨日：重置節流狀態
    lastTodayKey = key
    lastTodaySyncMs = 0
    todaySyncPromise = null
  }

  const now = Date.now()
  if (now - lastTodaySyncMs < TODAY_SYNC_MIN_INTERVAL_MS) return
  if (todaySyncPromise) return todaySyncPromise

  todaySyncPromise = (async () => {
    try {
      await ensureDailyFlights(targetDate)
      await updateFlightStatuses(targetDate)
    } finally {
      lastTodaySyncMs = Date.now()
      todaySyncPromise = null
    }
  })()

  return todaySyncPromise
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dateStr = searchParams.get('date') // YYYY-MM-DD
    const full = searchParams.get('full') === '1'
    
    const targetDate = dateStr ? new Date(dateStr) : new Date()
    // 設置為當天 0 點，避免時區問題導致的偏差，這裡簡單處理
    targetDate.setHours(0, 0, 0, 0)
    
    // 觸發模擬邏輯 (懶加載)
    // 只有請求當天或未來時才嘗試生成/更新
    // 這裡我們假設只關心"今天"的實時狀態。如果是過去日期，直接查詢。
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (targetDate.getTime() === today.getTime()) {
        await syncTodayIfNeeded(targetDate)
    } else if (targetDate > today) {
        // 未來的也可以預生成
        await ensureDailyFlights(targetDate)
    }

    // 查詢
    const instances = await prisma.flightInstance.findMany({
      where: {
        date: targetDate
      },
      // 預設只回傳列表頁需要的欄位；如需完整資訊可加 ?full=1
      select: full
        ? {
            id: true,
            date: true,
            status: true,
            scheduledDeparture: true,
            scheduledArrival: true,
            actualDeparture: true,
            actualArrival: true,
            aircraftType: true,
            aircraftRegistration: true,
            gate: true,
            terminal: true,
            weatherOrigin: true,
            weatherDestination: true,
            flight: {
              select: {
                flightNumber: true,
                airline: true,
                from: true,
                to: true,
                fromCity: true,
                toCity: true,
                duration: true
              }
            }
          }
        : {
            id: true,
            date: true,
            status: true,
            scheduledDeparture: true,
            scheduledArrival: true,
            actualDeparture: true,
            actualArrival: true,
            aircraftRegistration: true,
            flight: {
              select: {
                flightNumber: true,
                airline: true,
                from: true,
                to: true,
                fromCity: true,
                toCity: true,
                duration: true
              }
            }
          },
      orderBy: {
        scheduledDeparture: 'asc'
      }
    })

    return NextResponse.json(instances)
  } catch (error) {
    console.error('獲取航班狀態失敗:', error)
    return NextResponse.json({ error: '獲取航班狀態失敗' }, { status: 500 })
  }
}
