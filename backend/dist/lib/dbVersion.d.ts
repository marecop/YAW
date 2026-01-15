export declare const DB_VERSION = "2.3.2";
export declare const DB_VERSION_KEY = "yellow-airlines-db-version";
/**
 * 检查数据库版本是否匹配
 * 如果不匹配，清除所有缓存并刷新页面
 */
export declare function checkAndUpdateDBVersion(): boolean;
/**
 * 强制更新数据库版本标记
 */
export declare function forceUpdateDBVersion(): void;
//# sourceMappingURL=dbVersion.d.ts.map