import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'yellow-airlines-secret-key'

export interface JWTPayload {
  userId: string
  email: string
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

export function getUser() {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function logout() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/'
}

export function isAuthenticated(): boolean {
  const token = getAuthToken()
  if (!token) return false
  
  const payload = verifyToken(token)
  return payload !== null
}

