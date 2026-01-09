'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'de' | 'en' | 'zh-cn' | 'zh-hk'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh-hk')
  const [translations, setTranslations] = useState<Record<string, string>>({})

  useEffect(() => {
    // 从 localStorage 读取保存的语言设置
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && ['de', 'en', 'zh-cn', 'zh-hk'].includes(savedLang)) {
      setLanguageState(savedLang)
    }
  }, [])

  useEffect(() => {
    // 加载翻译文件
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}.json?v=${new Date().getTime()}`)
        const data = await response.json()
        setTranslations(data)
      } catch (error) {
        console.error('Failed to load translations:', error)
      }
    }
    loadTranslations()
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

