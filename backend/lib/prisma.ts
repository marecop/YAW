import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 優化 PrismaClient 配置以減少內存使用
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  // 禁用連接池擴展（減少內存開銷）
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

// 在 Next.js 可能存在多個模組載入上下文（或重新載入）的情況下，
// 將 PrismaClient 放到 globalThis 可以避免重複建立 client 造成記憶體/檔案鎖/FD 壓力。
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// 優雅關閉：在進程退出時斷開 Prisma 連接
if (typeof process !== 'undefined') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect()
  })
  
  process.on('SIGINT', async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  
  process.on('SIGTERM', async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
}

export default prisma

