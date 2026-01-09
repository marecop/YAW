import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 開始處理里程積分...')
    const now = new Date()
    
    // 1. 查找所有未發放里程且已確認的預訂
    // 注意：這裡先獲取所有未發放的，然後在內存中過濾時間，因為 SQL 直接比較時間字符串和日期組合比較複雜
    const pendingBookings = await prisma.booking.findMany({
      where: {
        pointsAwarded: false,
        status: {
          in: ['CONFIRMED', 'CHECKED_IN', 'COMPLETED']
        }
      },
      include: {
        flight: true,
        user: true
      }
    })

    console.log(`📋 找到 ${pendingBookings.length} 個待處理預訂`)

    let processedCount = 0

    for (const booking of pendingBookings) {
      // 計算抵達時間
      // flightDate 是出發日期 (00:00:00)
      const flightDate = new Date(booking.flightDate)
      const arrivalTimeStr = booking.flight.arrivalTime
      
      // 處理跨天 (+1)
      let arrivalDate = new Date(flightDate)
      let timeStr = arrivalTimeStr
      
      if (arrivalTimeStr.includes('+1')) {
        arrivalDate.setDate(arrivalDate.getDate() + 1)
        timeStr = arrivalTimeStr.replace('+1', '').trim()
      }
      
      const [hours, minutes] = timeStr.split(':').map(Number)
      arrivalDate.setHours(hours, minutes, 0, 0)
      
      // 加上 3 小時緩衝
      const pointsAwardTime = new Date(arrivalDate.getTime() + 3 * 60 * 60 * 1000)
      
      // 檢查是否已過發放時間
      if (now >= pointsAwardTime) {
        // 確定目標用戶
        // 優先使用輸入的 memberNumber 查找用戶（這裡假設 memberNumber 就是 email 或某種標識，
        // 但根據當前系統設計，我們可能只能通過 memberNumber 匹配 user.id 或 user.email，或者如果 memberNumber 為空則使用 booking.userId）
        
        let targetUser = null
        
        if (booking.memberNumber) {
            // 嘗試通過會員號碼（這裡假設是 ID 或 Email）查找
            // 如果你沒有專門的 memberNumber 字段在 User 表，這裡可能需要邏輯調整
            // 假設 memberNumber 是用戶 ID 或者是 Email
            // 為了兼容性，我們先嘗試匹配 User ID，然後 Email
            targetUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { id: booking.memberNumber },
                        { email: booking.memberNumber }
                    ]
                }
            })
        }
        
        // 如果沒找到指定會員，或者沒填寫會員號，則歸屬給預訂人
        if (!targetUser && booking.userId) {
            targetUser = await prisma.user.findUnique({
                where: { id: booking.userId }
            })
        }
        
        if (targetUser) {
            // 解析飛行時間以估算距離
            // 格式通常為 "2h 30m" 或 "4h"
            const durationStr = booking.flight.duration;
            let flightHours = 0;
            
            const hoursMatch = durationStr.match(/(\d+)h/);
            const minsMatch = durationStr.match(/(\d+)m/);
            
            if (hoursMatch) flightHours += parseInt(hoursMatch[1]);
            if (minsMatch) flightHours += parseInt(minsMatch[1]) / 60;
            
            // 估算飛行距離 (英里) - 假設平均時速 500 英里
            const distance = Math.round(flightHours * 500);

            // 1. 計算 BaseMiles = 飛行距離（英里） × 基礎係數
            // 基礎係數：
            // 經濟艙：1.0
            // 高端經濟艙：1.2
            // 商務艙：1.5
            // 頭等艙：2.0
            let baseCoef = 1.0;
            if (booking.cabinClass === 'PREMIUM_ECONOMY') baseCoef = 1.2;
            if (booking.cabinClass === 'BUSINESS') baseCoef = 1.5;
            if (booking.cabinClass === 'FIRST_CLASS') baseCoef = 2.0;

            const baseMiles = distance * baseCoef;

            // 2. 計算 RevenueBonus = 機票淨價 × 收入係數
            // 收入係數：
            // 經濟艙：0.5
            // 高端經濟艙：0.75 (推算)
            // 商務艙：1.0
            // 頭等艙：1.5
            let revenueCoef = 0.5;
            if (booking.cabinClass === 'PREMIUM_ECONOMY') revenueCoef = 0.75;
            if (booking.cabinClass === 'BUSINESS') revenueCoef = 1.0;
            if (booking.cabinClass === 'FIRST_CLASS') revenueCoef = 1.5;

            // 會員等級額外加成 (可選，用戶未明確指定但保留原有邏輯作為額外獎勵可能更好，
            // 但為了嚴格遵守用戶公式，這裡可以暫時註釋掉或作為最後的乘數。
            // 考慮到用戶強調了公式，這裡我們僅在 BaseMiles 或 RevenueBonus 基礎上可能會有等級加成?
            // 用戶沒有提到等級加成，所以嚴格按照用戶給出的公式計算 TotalMiles = BaseMiles + RevenueBonus)
            // 
            // 註：原有邏輯有等級加成 (GOLD +0.25, PLATINUM +0.5)。
            // 為了保持會員權益，我們可以假設這些係數應用在 RevenueBonus 或者 BaseMiles 上? 
            // 用戶只給了 TotalMiles = BaseMiles + RevenueBonus。
            // 為了不破壞現有會員體系價值，我將在 TotalMiles 基礎上再乘上會員等級係數 (或者保持用戶的簡單公式)。
            // 鑑於用戶說"這樣公平公正"，可能暗示不需要額外等級加成。
            // 但通常高級會員都有累積加成。
            // 這裡我選擇遵守用戶公式，但如果是高級會員，可以在最終結果上給予額外獎勵，
            // 或者嚴格遵守用戶公式。讓我們嚴格遵守用戶公式。
            
            const revenueBonus = booking.totalPrice * revenueCoef;
            
            // TotalMiles
            let totalMiles = baseMiles + revenueBonus;

            // 雖然用戶沒提，但保留會員等級加成通常是好的體驗。
            // 如果嚴格按照用戶說的"這樣公平公正"，可能意味著移除等級加成。
            // 不過，通常等級加成是常識。
            // 讓我們僅僅使用用戶的公式。
            
            const points = Math.floor(totalMiles);
            
            // 更新用戶積分
            await prisma.user.update({
                where: { id: targetUser.id },
                data: {
                    points: { increment: points }
                }
            })
            
            // 標記為已發放
            await prisma.booking.update({
                where: { id: booking.id },
                data: {
                    pointsAwarded: true,
                    status: 'COMPLETED' // 同時將狀態更新為已完成
                }
            })
            
            console.log(`✅ 為用戶 ${targetUser.email} 發放 ${points} 積分 (預訂: ${booking.bookingNumber})`)
            processedCount++
        } else {
            console.log(`⚠️ 預訂 ${booking.bookingNumber} 無法找到對應的會員賬戶`)
        }
      }
    }

    return NextResponse.json({
      success: true,
      processed: processedCount,
      totalPending: pendingBookings.length
    })
  } catch (error) {
    console.error('❌ 處理積分失敗:', error)
    return NextResponse.json(
      { error: '處理積分失敗' },
      { status: 500 }
    )
  }
}
