/**
 * 座位占用系統
 * 根據航班、日期、艙位智能生成座位占用狀態
 */

// 簡單的哈希函數，用於生成確定性的隨機數
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// 偽隨機數生成器（基於種子）
class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }
}

// 判斷是否為周末
function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6 // 周日或周六
}

// 判斷是否為節假日（簡化版本）
function isHoliday(date: Date): boolean {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // 主要節假日
  const holidays = [
    { month: 1, day: 1 },   // 元旦
    { month: 2, day: 14 },  // 情人節
    { month: 4, day: 5 },   // 清明節（簡化）
    { month: 5, day: 1 },   // 勞動節
    { month: 6, day: 1 },   // 兒童節
    { month: 10, day: 1 },  // 國慶節
    { month: 12, day: 25 }, // 聖誕節
  ]
  
  return holidays.some(h => h.month === month && h.day === day)
}

// 判斷是否為黃金期（旺季）
function isPeakSeason(date: Date): boolean {
  const month = date.getMonth() + 1
  
  // 暑假、寒假、春節前後
  return (
    (month >= 7 && month <= 8) ||  // 暑假
    (month === 12 || month === 1) || // 寒假/春節
    (month === 2) ||                 // 春節後
    (month === 10)                   // 國慶黃金周
  )
}

/**
 * 計算座位占用率（確定性）
 * @param flightDate 航班日期
 * @param flightId 航班ID（用於生成確定性隨機數）
 * @returns 占用率 (0-1)
 */
export function calculateOccupancyRate(flightDate: string | Date, flightId?: string): number {
  const date = typeof flightDate === 'string' ? new Date(flightDate) : flightDate
  const dateStr = date.toISOString().split('T')[0]
  
  // 使用日期（和可選的航班ID）生成確定性種子
  const seed = hashCode(`${dateStr}-${flightId || 'default'}-occupancy`)
  const rng = new SeededRandom(seed)
  
  // 基礎占用率：50-70%（使用確定性隨機）
  let baseRate = 0.5 + rng.next() * 0.2
  
  // 周末增加 10-20%（使用確定性隨機）
  if (isWeekend(date)) {
    baseRate += 0.1 + rng.next() * 0.1
  }
  
  // 節假日增加 15-25%（使用確定性隨機）
  if (isHoliday(date)) {
    baseRate += 0.15 + rng.next() * 0.1
  }
  
  // 黃金期/旺季增加 10-15%（使用確定性隨機）
  if (isPeakSeason(date)) {
    baseRate += 0.1 + rng.next() * 0.05
  }
  
  // 確保在合理範圍內
  return Math.min(Math.max(baseRate, 0.3), 0.95)
}

/**
 * 生成座位占用狀態
 * @param flightId 航班ID
 * @param flightDate 航班日期
 * @param cabinClass 艙位等級
 * @param totalSeats 總座位數
 * @returns 已占用座位的索引陣列
 */
export function generateOccupiedSeats(
  flightId: string,
  flightDate: string | Date,
  cabinClass: string,
  totalSeats: number
): Set<number> {
  const date = typeof flightDate === 'string' ? new Date(flightDate) : flightDate
  const dateStr = date.toISOString().split('T')[0] // 只取日期部分 YYYY-MM-DD
  
  // 生成唯一的種子：航班ID + 日期 + 艙位
  const seed = hashCode(`${flightId}-${dateStr}-${cabinClass}`)
  const rng = new SeededRandom(seed)
  
  // 計算該日期的占用率（傳入flightId以確保一致性）
  const occupancyRate = calculateOccupancyRate(date, flightId)
  const occupiedCount = Math.floor(totalSeats * occupancyRate)
  
  // 生成占用座位的索引
  const occupiedSeats = new Set<number>()
  const availableIndices = Array.from({ length: totalSeats }, (_, i) => i)
  
  // 隨機選擇座位（使用確定性隨機數）
  for (let i = 0; i < occupiedCount; i++) {
    if (availableIndices.length === 0) break
    
    const randomIndex = Math.floor(rng.next() * availableIndices.length)
    const seatIndex = availableIndices[randomIndex]
    occupiedSeats.add(seatIndex)
    availableIndices.splice(randomIndex, 1)
  }
  
  return occupiedSeats
}

/**
 * 檢查特定座位是否被占用
 * @param seatIndex 座位索引
 * @param flightId 航班ID
 * @param flightDate 航班日期
 * @param cabinClass 艙位等級
 * @param totalSeats 總座位數
 * @returns 是否被占用
 */
export function isSeatOccupied(
  seatIndex: number,
  flightId: string,
  flightDate: string | Date,
  cabinClass: string,
  totalSeats: number
): boolean {
  const occupiedSeats = generateOccupiedSeats(flightId, flightDate, cabinClass, totalSeats)
  return occupiedSeats.has(seatIndex)
}

/**
 * 獲取可用座位數量
 * @param flightId 航班ID
 * @param flightDate 航班日期
 * @param cabinClass 艙位等級
 * @param totalSeats 總座位數
 * @returns 可用座位數量
 */
export function getAvailableSeatsCount(
  flightId: string,
  flightDate: string | Date,
  cabinClass: string,
  totalSeats: number
): number {
  const occupiedSeats = generateOccupiedSeats(flightId, flightDate, cabinClass, totalSeats)
  return totalSeats - occupiedSeats.size
}

/**
 * 獲取占用率百分比（用於顯示）
 * @param flightId 航班ID
 * @param flightDate 航班日期
 * @param cabinClass 艙位等級
 * @param totalSeats 總座位數
 * @returns 占用率百分比
 */
export function getOccupancyPercentage(
  flightId: string,
  flightDate: string | Date,
  cabinClass: string,
  totalSeats: number
): number {
  const occupiedSeats = generateOccupiedSeats(flightId, flightDate, cabinClass, totalSeats)
  return (occupiedSeats.size / totalSeats) * 100
}

