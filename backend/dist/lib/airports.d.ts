export interface Airport {
    code: string;
    name: string;
    city: string;
    country: string;
    searchText?: string;
}
export declare const airports: Airport[];
/**
 * 搜索机场
 * @param query 搜索关键词
 * @param limit 返回结果数量限制
 */
export declare function searchAirports(query: string, limit?: number): Airport[];
/**
 * 根据机场代码获取机场信息
 */
export declare function getAirportByCode(code: string): Airport | undefined;
//# sourceMappingURL=airports.d.ts.map