import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// 在 Next.js 可能存在多個模組載入上下文（或重新載入）的情況下，
// 將 PrismaClient 放到 globalThis 可以避免重複建立 client 造成記憶體/檔案鎖/FD 壓力。
globalForPrisma.prisma = prisma

export default prisma

