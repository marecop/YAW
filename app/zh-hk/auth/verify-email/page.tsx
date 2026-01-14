'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle } from 'lucide-react'

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      verifyToken(token)
    } else {
      setStatus('error')
      setMessage('缺少驗證令牌')
    }
  }, [searchParams])

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || '驗證失敗')
      }

      setStatus('success')
      setMessage('您的電子郵箱已成功驗證')
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || '驗證鏈接無效或已過期')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                正在驗證您的郵箱...
              </h2>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                驗證成功！
              </h2>
              <p className="mt-2 text-gray-600">
                {message}
              </p>
              <div className="mt-6">
                <Link
                  href="/zh-hk/auth/login"
                  className="flex items-center justify-center w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-ya-yellow-500 hover:bg-ya-yellow-600"
                >
                  立即登錄
                </Link>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="mx-auto h-16 w-16 text-red-500" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                驗證失敗
              </h2>
              <p className="mt-2 text-gray-600">
                {message}
              </p>
              <div className="mt-6 space-y-3">
                <Link
                  href="/zh-hk/auth/login"
                  className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  返回登錄
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
