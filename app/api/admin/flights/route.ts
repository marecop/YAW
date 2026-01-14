/**
 * 占位符路由文件 - 僅用於滿足 Next.js 類型檢查
 * 
 * 注意：實際的 API 處理邏輯已移至 backend/app/api/admin/flights/route.ts
 * 在生產環境中，請求會通過 next.config.ts 中的 rewrites 代理到後端服務
 * 這個文件僅在開發環境或類型檢查時使用
 */

import { NextRequest, NextResponse } from 'next/server'

const apiBaseUrl = (process.env.API_BASE_URL || 'http://localhost:3001').replace(/\/+$/, '')

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const backendUrl = `${apiBaseUrl}/api/admin/flights${url.search}`
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Cookie': request.headers.get('cookie') || '',
      },
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to proxy request to backend' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const backendUrl = `${apiBaseUrl}/api/admin/flights`
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
      body,
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to proxy request to backend' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const backendUrl = `${apiBaseUrl}/api/admin/flights${url.search}`
    const response = await fetch(backendUrl, {
      method: 'DELETE',
      headers: {
        'Cookie': request.headers.get('cookie') || '',
      },
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to proxy request to backend' },
      { status: 500 }
    )
  }
}
