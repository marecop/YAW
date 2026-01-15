"use strict";
// 数据库版本管理
// 每次运行 seed 时更新这个版本号
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_VERSION_KEY = exports.DB_VERSION = void 0;
exports.checkAndUpdateDBVersion = checkAndUpdateDBVersion;
exports.forceUpdateDBVersion = forceUpdateDBVersion;
exports.DB_VERSION = '2.3.2'; // 修復Prisma Client字段識別 // 168条航班，含多航空公司
exports.DB_VERSION_KEY = 'yellow-airlines-db-version';
/**
 * 检查数据库版本是否匹配
 * 如果不匹配，清除所有缓存并刷新页面
 */
function checkAndUpdateDBVersion() {
    if (typeof window === 'undefined')
        return true;
    const storedVersion = localStorage.getItem(exports.DB_VERSION_KEY);
    if (storedVersion !== exports.DB_VERSION) {
        console.log('🔄 数据库版本已更新，清除缓存...');
        console.log(`   旧版本: ${storedVersion || '未知'}`);
        console.log(`   新版本: ${exports.DB_VERSION}`);
        // 清除所有缓存
        localStorage.clear();
        sessionStorage.clear();
        // 设置新版本
        localStorage.setItem(exports.DB_VERSION_KEY, exports.DB_VERSION);
        return false; // 需要刷新
    }
    return true; // 版本匹配
}
/**
 * 强制更新数据库版本标记
 */
function forceUpdateDBVersion() {
    if (typeof window === 'undefined')
        return;
    localStorage.setItem(exports.DB_VERSION_KEY, exports.DB_VERSION);
}
//# sourceMappingURL=dbVersion.js.map