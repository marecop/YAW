import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureDailyFlights, updateFlightStatuses } from '@/lib/simulation'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dateStr = searchParams.get('date') // YYYY-MM-DD
    
    const targetDate = dateStr ? new Date(dateStr) : new Date()
    // 設置為當天 0 點，避免時區問題導致的偏差，這裡簡單處理
    targetDate.setHours(0, 0, 0, 0)
    
    // 觸發模擬邏輯 (懶加載)
    // 只有請求當天或未來時才嘗試生成/更新
    // 這裡我們假設只關心"今天"的實時狀態。如果是過去日期，直接查詢。
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (targetDate.getTime() === today.getTime()) {
        await ensureDailyFlights(targetDate)
        await updateFlightStatuses(targetDate)
    } else if (targetDate > today) {
        // 未來的也可以預生成
        await ensureDailyFlights(targetDate)
    }

    // 查詢
    const instances = await prisma.flightInstance.findMany({
      where: {
        date: targetDate
      },
      include: {
        flight: true
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
