/**
 * 座位占用系統
 * 根據航班、日期、艙位智能生成座位占用狀態
 */
/**
 * 計算座位占用率（確定性）
 * @param flightDate 航班日期
 * @param flightId 航班ID（用於生成確定性隨機數）
 * @returns 占用率 (0-1)
 */
export declare function calculateOccupancyRate(flightDate: string | Date, flightId?: string): number;
/**
 * 生成座位占用狀態
 * @param flightId 航班ID
 * @param flightDate 航班日期
 * @param cabinClass 艙位等級
 * @param totalSeats 總座位數
 * @returns 已占用座位的索引陣列
 */
export declare function generateOccupiedSeats(flightId: string, flightDate: string | Date, cabinClass: string, totalSeats: number): Set<number>;
/**
 * 檢查特定座位是否被占用
 * @param seatIndex 座位索引
 * @param flightId 航班ID
 * @param flightDate 航班日期
 * @param cabinClass 艙位等級
 * @param totalSeats 總座位數
 * @returns 是否被占用
 */
export declare function isSeatOccupied(seatIndex: number, flightId: string, flightDate: string | Date, cabinClass: string, totalSeats: number): boolean;
/**
 * 獲取可用座位數量
 * @param flightId 航班ID
 * @param flightDate 航班日期
 * @param cabinClass 艙位等級
 * @param totalSeats 總座位數
 * @returns 可用座位數量
 */
export declare function getAvailableSeatsCount(flightId: string, flightDate: string | Date, cabinClass: string, totalSeats: number): number;
/**
 * 獲取占用率百分比（用於顯示）
 * @param flightId 航班ID
 * @param flightDate 航班日期
 * @param cabinClass 艙位等級
 * @param totalSeats 總座位數
 * @returns 占用率百分比
 */
export declare function getOccupancyPercentage(flightId: string, flightDate: string | Date, cabinClass: string, totalSeats: number): number;
//# sourceMappingURL=seatOccupancy.d.ts.map