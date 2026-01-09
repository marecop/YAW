'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  membershipLevel: string
  points: number
  phone?: string
  passportNumber?: string
  nationality?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  refreshUser: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 刷新用戶信息
  const refreshUser = async () => {
    if (!user) return
    try {
      const response = await fetch(`/api/auth/me?email=${encodeURIComponent(user.email)}`)
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        localStorage.setItem('currentUser', JSON.stringify(userData))
      }
    } catch (error) {
      console.error('Failed to refresh user:', error)
    }
  }

  // 从 localStorage 恢复会话
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse saved user:', error)
        localStorage.removeItem('currentUser')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        const userData: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          membershipLevel: data.user.membershipLevel || 'SILVER',
          points: data.user.points || 0,
        }
        setUser(userData)
        localStorage.setItem('currentUser', JSON.stringify(userData))
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    console.log('🚪 執行登出...')
    
    // 1. 清除狀態
    setUser(null)
    
    // 2. 清除所有 localStorage
    console.log('🧹 清除 localStorage...')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    
    // 3. 清除 sessionStorage
    console.log('🧹 清除 sessionStorage...')
    sessionStorage.clear()
    
    console.log('✅ 登出完成，準備跳轉...')
    
    // 4. 延遲跳轉，確保狀態已清除
    setTimeout(() => {
      window.location.href = '/'
    }, 100)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

