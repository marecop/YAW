"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const globalForPrisma = globalThis;
// 優化 PrismaClient 配置以減少內存使用
exports.prisma = globalForPrisma.prisma ?? new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // 禁用連接池擴展（減少內存開銷）
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});
// 在 Next.js 可能存在多個模組載入上下文（或重新載入）的情況下，
// 將 PrismaClient 放到 globalThis 可以避免重複建立 client 造成記憶體/檔案鎖/FD 壓力。
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = exports.prisma;
}
// 優雅關閉：在進程退出時斷開 Prisma 連接
if (typeof process !== 'undefined') {
    process.on('beforeExit', async () => {
        await exports.prisma.$disconnect();
    });
    process.on('SIGINT', async () => {
        await exports.prisma.$disconnect();
        process.exit(0);
    });
    process.on('SIGTERM', async () => {
        await exports.prisma.$disconnect();
        process.exit(0);
    });
}
exports.default = exports.prisma;
//# sourceMappingURL=prisma.js.map