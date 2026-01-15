import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { prisma } from '../lib/prisma'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'yellow-airlines-secret-key'

export interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
    name: string
  }
}

// 從 cookie 或 Authorization header 獲取 token
function getToken(req: Request): string | null {
  // 優先從 cookie 獲取
  if (req.cookies?.token) {
    return req.cookies.token
  }
  
  // 其次從 Authorization header 獲取
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  return null
}

// 認證中間件（可選，用於獲取用戶信息但不強制要求登錄）
export async function optionalAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = getToken(req)
    if (token) {
      const decoded = verify(token, JWT_SECRET) as any
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        name: decoded.name,
      }
    }
  } catch (error) {
    // 忽略錯誤，繼續執行（可選認證）
  }
  next()
}

// 認證中間件（必須登錄）
export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = getToken(req)
    
    if (!token) {
      return res.status(401).json({ error: '未授權，請先登錄' })
    }
    
    const decoded = verify(token, JWT_SECRET) as any
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name,
    }
    
    next()
  } catch (error) {
    return res.status(401).json({ error: '無效的 token' })
  }
}

// 管理員認證中間件
export async function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = getToken(req)
    
    if (!token) {
      return res.status(401).json({ error: '未授權，請先登錄' })
    }
    
    const decoded = verify(token, JWT_SECRET) as any
    
    // 檢查是否為管理員
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: { email: true },
    })
    
    if (!user || user.email !== 'admin@yellowairlines.com') {
      return res.status(403).json({ error: '需要管理員權限' })
    }
    
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name,
    }
    
    next()
  } catch (error) {
    return res.status(401).json({ error: '無效的 token' })
  }
}
