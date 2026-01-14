'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || '發送重置郵件失敗')
      }

      setIsSubmitted(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              檢查您的郵箱
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              我們已向 <span className="font-medium text-gray-900">{email}</span> 發送了一封包含重置密碼鏈接的郵件。
            </p>
            <p className="mt-4 text-sm text-gray-600">
              請檢查您的收件箱（如果沒收到，請查看垃圾郵件文件夾）。該鏈接將在24小時後過期。
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/zh-hk/auth/login"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-ya-yellow-500 hover:bg-ya-yellow-600"
            >
              <ArrowLeft className="w-4 h-4" />
              返回登錄
            </Link>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setIsSubmitted(false)
                setEmail('')
              }}
              className="text-sm text-ya-yellow-600 hover:text-ya-yellow-700"
            >
              沒有收到郵件？重新發送
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href="/zh-hk/" className="flex justify-center">
            <img
              src="/images/logoremovebkgnd.png"
              alt="Yellow Airlines"
              className="h-16 w-auto"
            />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            忘記密碼
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            輸入您的電子郵件地址，我們將向您發送重置密碼的鏈接
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              電子郵件
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-ya-yellow-500 focus:border-ya-yellow-500"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-ya-yellow-500 hover:bg-ya-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ya-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  發送中...
                </>
              ) : (
                '發送重置鏈接'
              )}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <Link
              href="/zh-hk/auth/login"
              className="flex items-center gap-2 text-sm font-medium text-ya-yellow-600 hover:text-ya-yellow-700"
            >
              <ArrowLeft className="w-4 h-4" />
              返回登錄
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

