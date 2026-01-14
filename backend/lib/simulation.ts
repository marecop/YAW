import { prisma } from './prisma'
import { Flight, FlightInstance } from '@prisma/client'

// 飛機註冊號前綴映射
const AIRLINE_REG_PREFIX: Record<string, string> = {
  'Yellow Airlines': 'B',
  'Cathay Pacific': 'B',
  'China Southern': 'B',
  'Emirates': 'A6',
  'Lufthansa': 'D',
  'British Airways': 'G',
  'Singapore Airlines': '9V',
  'ANA': 'JA',
  'Japan Airlines': 'JA',
  'United Airlines': 'N',
  'American Airlines': 'N',
  'Delta Air Lines': 'N',
  'Air France': 'F',
  'Qantas': 'VH',
  // Default fallback
  'default': 'XX'
}

// 獲取航空公司對應的註冊號前綴
function getRegPrefix(airline: string): string {
  for (const [key, prefix] of Object.entries(AIRLINE_REG_PREFIX)) {
    if (airline.includes(key)) return prefix
  }
  return 'B' // Default for HK based or generic
}

// 生成隨機註冊號
function generateRegistration(airline: string, usedRegs: Set<string>): string {
  const prefix = getRegPrefix(airline)
  let reg = ''
  do {
    const num = Math.floor(Math.random() * 9000) + 1000
    // 部分航空公司使用字母後綴，這裡簡化為數字
    reg = `${prefix}-${num}`
  } while (usedRegs.has(reg))
  usedRegs.add(reg)
  return reg
}

// 模擬天氣
const WEATHER_CONDITIONS = ['SUNNY', 'CLOUDY', 'RAINY', 'STORMY', 'SNOWY', 'FOGGY']
function getRandomWeather(): string {
  const rand = Math.random()
  if (rand > 0.95) return 'STORMY'
  if (rand > 0.9) return 'SNOWY'
  if (rand > 0.8) return 'FOGGY'
  if (rand > 0.6) return 'RAINY'
  if (rand > 0.3) return 'CLOUDY'
  return 'SUNNY'
}

// 確保當天的航班實例已創建
export async function ensureDailyFlights(date: Date = new Date()) {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  console.log(`🔍 檢查 ${startOfDay.toISOString().split('T')[0]} 的航班實例...`)

  // 獲取當前所有活躍航班（模擬模板）
  // 只選必要欄位，避免每次請求拉回大量不需要的欄位造成記憶體壓力
  const flights = await prisma.flight.findMany({
    select: {
      id: true,
      operatingDays: true,
      departureTime: true,
      arrivalTime: true,
      aircraft: true,
      airline: true,
      from: true,
      to: true,
      flightNumber: true
    }
  })
  const dayOfWeek = startOfDay.getDay() || 7 // 1-7 (Mon-Sun)
  
  const todaysFlights = flights.filter(f => {
    return f.operatingDays.includes(dayOfWeek.toString())
  })
  
  console.log(`✈️ 計劃航班數量: ${todaysFlights.length}`)

  // 檢查已存在的實例
  const existingInstances = await prisma.flightInstance.findMany({
    where: { date: startOfDay },
    select: {
      id: true,
      flightId: true,
      aircraftRegistration: true
    }
  })

  console.log(`✅ 今日已存在實例: ${existingInstances.length} 條`)

  // 找出缺失的航班 (未生成實例的)
  const existingFlightIds = new Set(existingInstances.map(i => i.flightId))
  const missingFlights = todaysFlights.filter(f => !existingFlightIds.has(f.id))

  if (missingFlights.length === 0) {
    console.log('✨ 所有航班實例已就緒')
    return
  }

  console.log(`⚡️ 為 ${missingFlights.length} 個新航班創建實例...`)

  const instances: any[] = []
  
  // 3. 創建缺失的實例對象
  for (const flight of missingFlights) {
    // 解析時間
    const [depH, depM] = flight.departureTime.split(':').map(Number)
    
    // 處理到達時間字符串，移除可能的 "+1" 等後綴
    const cleanArrivalTime = flight.arrivalTime.split('+')[0].trim()
    const [arrH, arrM] = cleanArrivalTime.split(':').map(Number)
    
    // 檢查解析結果是否有效
    if (isNaN(depH) || isNaN(depM) || isNaN(arrH) || isNaN(arrM)) {
        console.error(`Skipping flight ${flight.flightNumber}: Invalid time format (Dep: ${flight.departureTime}, Arr: ${flight.arrivalTime})`)
        continue
    }
    
    const scheduledDeparture = new Date(startOfDay)
    scheduledDeparture.setHours(depH, depM, 0, 0)
    
    let scheduledArrival = new Date(startOfDay)
    scheduledArrival.setHours(arrH, arrM, 0, 0)
    
    // 處理跨天
    if (flight.arrivalTime.includes('+')) {
         const daysMatch = flight.arrivalTime.match(/\+(\d+)/);
         const daysToAdd = daysMatch ? parseInt(daysMatch[1]) : 0;
         scheduledArrival.setDate(scheduledArrival.getDate() + daysToAdd)
    } else if (scheduledArrival < scheduledDeparture) {
      scheduledArrival.setDate(scheduledArrival.getDate() + 1)
    }

    // 添加隨機偏差 (實際時間不完全等於計劃時間)
    // 出發: -10分鐘 (早起飛) 到 +20分鐘 (晚起飛)
    const depOffset = Math.floor(Math.random() * 31) - 10
    const actualDeparture = new Date(scheduledDeparture.getTime() + depOffset * 60000)

    // 飛行時間偏差: -20分鐘 (早到) 到 +10分鐘 (晚到)
    const durOffset = Math.floor(Math.random() * 31) - 20
    // 預計到達 = 實際起飛 + 原計劃飛行時間 + 飛行偏差
    // 原計劃飛行時間
    const scheduledDuration = scheduledArrival.getTime() - scheduledDeparture.getTime()
    const actualArrival = new Date(actualDeparture.getTime() + scheduledDuration + durOffset * 60000)

    instances.push({
      flightId: flight.id,
      date: startOfDay,
      status: 'SCHEDULED',
      scheduledDeparture,
      scheduledArrival,
      actualDeparture: actualDeparture, // 這裡存儲的是"預計/實際"時間
      actualArrival: actualArrival,     // 這裡存儲的是"預計/實際"時間
      aircraftType: flight.aircraft,
      airline: flight.airline, // 用於後續分配
      origin: flight.from,
      destination: flight.to,
      flightNumber: flight.flightNumber,
      gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 5))}${Math.floor(Math.random() * 20) + 1}`, // Random Gate
      terminal: `T${Math.floor(Math.random() * 2) + 1}`,
      weatherOrigin: getRandomWeather(),
      weatherDestination: getRandomWeather()
    })
  }

  // 4. 分配飛機註冊號 (核心邏輯) - 僅針對新實例
  // 注意：這裡應該考慮已有的實例佔用的飛機，但為了簡化，我們先獨立分配，
  // 或者我們可以讀取現有實例的飛機狀態。
  // 為了防止衝突，我們可以假設新航班使用新飛機，或者簡單隨機分配。
  // 為了保持系統簡單且魯棒，這裡重新初始化一個簡單池，避免複雜的狀態同步。
  
  // 按出發時間排序
  instances.sort((a, b) => a.scheduledDeparture.getTime() - b.scheduledDeparture.getTime())

  // 模擬飛機池
  const aircraftPool = new Map<string, { location: string, availableTime: number, airline: string }>()
  const usedRegs = new Set<string>()
  
  // 將已存在的註冊號加入已使用列表，避免重複
  existingInstances.forEach(i => {
      if (i.aircraftRegistration) usedRegs.add(i.aircraftRegistration)
  })

  // 識別往返航班對 (僅在新實例中)
  const flightPairMap = new Map<string, string>() 
  
  for (let i = 0; i < instances.length; i++) {
    const outbound = instances[i]
    if (flightPairMap.has(i.toString()) || Array.from(flightPairMap.values()).includes(i.toString())) continue
    
    // 找回程
    for (let j = i + 1; j < instances.length; j++) {
       const inbound = instances[j]
       if (Array.from(flightPairMap.values()).includes(j.toString())) continue 
       
       if (outbound.airline === inbound.airline &&
           outbound.destination === inbound.origin &&
           outbound.origin === inbound.destination &&
           inbound.scheduledDeparture.getTime() > outbound.scheduledArrival.getTime() + 60*60*1000 
       ) {
           flightPairMap.set(i.toString(), j.toString())
           break 
       }
    }
  }

  // 遍歷分配
  for (let i = 0; i < instances.length; i++) {
    const instance = instances[i]
    
    if (instance.aircraftRegistration) continue

    let assignedReg = null

    // 嘗試從池中找可用飛機
    const suitableAircraftReq = Array.from(aircraftPool.entries()).find(([reg, state]) => {
      if (!state.airline.includes(instance.airline) && !instance.airline.includes(state.airline)) return false
      if (state.location !== instance.origin) return false
      
      const minGap = 1.5 * 60 * 60 * 1000 
      if (instance.scheduledDeparture.getTime() - state.availableTime < minGap) return false
      
      return true
    })

    if (suitableAircraftReq) {
      assignedReg = suitableAircraftReq[0]
    } else {
      assignedReg = generateRegistration(instance.airline, usedRegs)
    }

    instance.aircraftRegistration = assignedReg
    
    // 檢查是否是往返航班的去程
    const pairIdxStr = flightPairMap.get(i.toString())
    if (pairIdxStr) {
        const pairIdx = parseInt(pairIdxStr)
        const inbound = instances[pairIdx]
        
        if (inbound.scheduledDeparture.getTime() - instance.scheduledArrival.getTime() >= 1.5 * 60 * 60 * 1000) {
            inbound.aircraftRegistration = assignedReg
            aircraftPool.set(assignedReg, {
                location: inbound.destination, 
                availableTime: inbound.scheduledArrival.getTime(), 
                airline: inbound.airline
            })
        } else {
             aircraftPool.set(assignedReg, {
                location: instance.destination,
                availableTime: instance.scheduledArrival.getTime(),
                airline: instance.airline
            })
        }
    } else {
        aircraftPool.set(assignedReg, {
            location: instance.destination,
            availableTime: instance.scheduledArrival.getTime(),
            airline: instance.airline
        })
    }
  }

  // 5. 批量寫入數據庫
  console.log('💾 保存新航班實例到數據庫...')
  
  const dbData = instances.map(inst => ({
    flightId: inst.flightId,
    date: inst.date,
    status: inst.status,
    scheduledDeparture: inst.scheduledDeparture,
    scheduledArrival: inst.scheduledArrival,
    actualDeparture: inst.actualDeparture,
    actualArrival: inst.actualArrival,
    aircraftRegistration: inst.aircraftRegistration,
    aircraftType: inst.aircraftType,
    gate: inst.gate,
    terminal: inst.terminal,
    weatherOrigin: inst.weatherOrigin,
    weatherDestination: inst.weatherDestination
  }))

  const BATCH_SIZE = 50
  for (let i = 0; i < dbData.length; i += BATCH_SIZE) {
    const batch = dbData.slice(i, i + BATCH_SIZE)
    await prisma.flightInstance.createMany({
      data: batch
    })
  }
  
  console.log('✅ 所有航班實例同步完成')
}

// 更新當天航班狀態
export async function updateFlightStatuses(date: Date = new Date()) {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  
  const now = new Date()
  
  // 僅選需要的欄位；這個函式不需要 flight 關聯資料
  const instances = await prisma.flightInstance.findMany({
    where: { date: startOfDay },
    select: {
      id: true,
      status: true,
      scheduledDeparture: true,
      scheduledArrival: true,
      actualDeparture: true,
      actualArrival: true,
      weatherOrigin: true,
      weatherDestination: true
    }
  })

  console.log(`🔄 更新 ${instances.length} 個航班的狀態...`)

  for (const instance of instances) {
    let newStatus = instance.status
    let newActualDep = instance.actualDeparture
    let newActualArr = instance.actualArrival
    
    // 如果已經是終態，跳過 (COMPLETED? ARRIVED, CANCELLED)
    if (['ARRIVED', 'CANCELLED'].includes(newStatus)) continue;

    // 模擬取消 (基於天氣)
    // 如果還沒取消且是 SCHEDULED，且天氣很差
    if (newStatus === 'SCHEDULED' && 
       (instance.weatherOrigin === 'STORMY' || instance.weatherDestination === 'STORMY')) {
       // 20% 機率取消
       if (Math.random() < 0.2) {
         newStatus = 'CANCELLED'
         // 如果當天取消，第二天顯示計劃（這在創建第二天數據時處理，這裡只處理當天）
         // 取消時實際起降時間設為 null
         newActualDep = null
         newActualArr = null
         
         await prisma.flightInstance.update({
             where: { id: instance.id },
             data: { status: newStatus, actualDeparture: newActualDep, actualArrival: newActualArr }
         })
         continue;
       }
    }

    // 模擬延誤
    // 條件：還未起飛，時間快到了或天氣不好
    const isBadWeather = ['RAINY', 'SNOWY', 'FOGGY'].includes(instance.weatherOrigin || '')
    const delayChance = isBadWeather ? 0.4 : 0.1
    
    // 如果還沒起飛 (SCHEDULED, DELAYED)
    if (['SCHEDULED', 'DELAYED'].includes(newStatus)) {
        // 隨機產生延誤
        if (Math.random() < delayChance && newStatus !== 'DELAYED') {
            newStatus = 'DELAYED'
            // 推遲 30-120 分鐘
            const delayMinutes = Math.floor(Math.random() * 90) + 30
            if (newActualDep) {
                newActualDep = new Date(newActualDep.getTime() + delayMinutes * 60000)
            }
            if (newActualArr) {
                newActualArr = new Date(newActualArr.getTime() + delayMinutes * 60000)
            }
        }
    }

    // 狀態流轉
    // 1. Boarding: 起飛前 45 分鐘
    // 2. Departed/In Air: 達到實際起飛時間
    // 3. Landed/Arrived: 達到實際到達時間
    
    // 補救措施：如果發現實際時間與計劃時間完全一致（且不是剛生成的），則添加隨機偏差
    // 這確保了舊數據也能獲得模擬偏差
    if (newStatus !== 'CANCELLED' && newActualDep && newActualArr && 
        newActualDep.getTime() === instance.scheduledDeparture.getTime() &&
        newActualArr.getTime() === instance.scheduledArrival.getTime()) {
        
        // 出發: -10分鐘 (早起飛) 到 +20分鐘 (晚起飛)
        const depOffset = Math.floor(Math.random() * 31) - 10
        newActualDep = new Date(instance.scheduledDeparture.getTime() + depOffset * 60000)

        // 飛行時間偏差: -20分鐘 (早到) 到 +10分鐘 (晚到)
        const durOffset = Math.floor(Math.random() * 31) - 20
        const scheduledDuration = instance.scheduledArrival.getTime() - instance.scheduledDeparture.getTime()
        newActualArr = new Date(newActualDep.getTime() + scheduledDuration + durOffset * 60000)
    }

    if (newStatus !== 'CANCELLED') {
        const depTime = newActualDep ? newActualDep.getTime() : instance.scheduledDeparture.getTime()
        const arrTime = newActualArr ? newActualArr.getTime() : instance.scheduledArrival.getTime()
        
        // 狀態流轉優先級：
        // ARRIVED > IN_AIR > DEPARTED > GATE_CLOSED > BOARDING > PREPARING > SCHEDULED
        
        // 1. ARRIVED (已到達)
        if (now.getTime() >= arrTime) {
            newStatus = 'ARRIVED'
        }
        // 2. IN_AIR / DEPARTED (飛行中)
        else if (now.getTime() >= depTime) {
            newStatus = 'IN_AIR'
        }
        // 3. GATE_CLOSED (登機結束): 起飛前 20 分鐘
        else if (now.getTime() >= depTime - 20 * 60000) {
            if (newStatus === 'SCHEDULED' || newStatus === 'DELAYED' || newStatus === 'PREPARING' || newStatus === 'BOARDING') {
                newStatus = 'GATE_CLOSED'
            }
        }
        // 4. BOARDING (登機中): 起飛前 50 分鐘
        else if (now.getTime() >= depTime - 50 * 60000) {
            if (newStatus === 'SCHEDULED' || newStatus === 'DELAYED' || newStatus === 'PREPARING') {
                newStatus = 'BOARDING'
            }
        }
        // 5. PREPARING (準備中): 前序航班已降落，且未開始登機
        else {
            // 這裡需要判斷前序航班狀態
            // 如果我們有 assigned aircraft, 我們可以假設前序航班已經抵達
            // 這裡我們用一個簡單的邏輯：如果距離起飛 2 小時以內，且飛機已經到位（我們假設飛機在池中標記為可用），則為 PREPARING
            // 更準確的做法是查詢 flightPairMap 或 aircraftPool，但這在 update 中比較困難
            // 我們可以根據時間：起飛前 30m - 2h
            if (now.getTime() >= depTime - 2 * 60 * 60 * 1000) {
                // 如果是始發航班（沒有前序），或者前序已到。
                // 為了簡化，我們假設所有航班在起飛前 2 小時進入準備狀態
                if (newStatus === 'SCHEDULED' || newStatus === 'DELAYED') {
                    newStatus = 'PREPARING'
                }
            }
        }
    }

    // 只有狀態或時間改變才更新
    if (newStatus !== instance.status || 
        newActualDep?.getTime() !== instance.actualDeparture?.getTime() ||
        newActualArr?.getTime() !== instance.actualArrival?.getTime()) {
        
        await prisma.flightInstance.update({
            where: { id: instance.id },
            data: {
                status: newStatus,
                actualDeparture: newActualDep,
                actualArrival: newActualArr
            }
        })
    }
  }
  console.log('✅ 狀態更新完成')
}
