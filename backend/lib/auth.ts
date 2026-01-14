import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'yellow-airlines-secret-key'

interface TokenPayload {
  userId: string
  email: string
  name: string
}

/**
 * 验证 JWT token 并返回用户信息
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const decoded = verify(token, JWT_SECRET) as TokenPayload
    return decoded
  } catch (error) {
    console.error('Token 验证失败:', error)
    return null
  }
}

/**
 * 从用户信息生成用户对象（兼容现有代码）
 */
export function createUserFromToken(payload: TokenPayload) {
  return {
    id: payload.userId,
    email: payload.email,
    name: payload.name
  }
}

