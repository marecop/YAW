'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCurrency } from '@/contexts/CurrencyContext'
import { useAuth } from '@/contexts/AuthContext'
import { checkAndUpdateDBVersion } from '@/lib/dbVersion'
import Link from 'next/link'
import { CreditCard, Lock, CheckCircle2, Plane } from 'lucide-react'

function PaymentPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { formatPrice } = useCurrency()
  const { user } = useAuth()

  const flightId = searchParams.get('flightId')
  const flightDate = searchParams.get('flightDate') || searchParams.get('departureDate') || ''  // 接受兩種參數名
  const cabinClass = searchParams.get('cabinClass')
  const seatNumber = searchParams.get('seatNumber')
  const passengersParam = searchParams.get('passengers')
  const totalPrice = parseFloat(searchParams.get('totalPrice') || '0')
  
  // 中转航班参数
  const connectionId = searchParams.get('connectionId')
  const segment1Id = searchParams.get('segment1')
  const segment2Id = searchParams.get('segment2')
  const isConnectionFlight = !!(connectionId && segment1Id && segment2Id)
  
  // 往返航班参数
  const outboundFlightId = searchParams.get('outboundFlightId')
  const inboundFlightId = searchParams.get('inboundFlightId')
  const returnDate = searchParams.get('returnDate')
  const outboundCabinClass = searchParams.get('outboundCabinClass')
  const inboundCabinClass = searchParams.get('inboundCabinClass')
  const isRoundtrip = searchParams.get('isRoundtrip') === 'true' && outboundFlightId && inboundFlightId

  const [passengers, setPassengers] = useState<any[]>([])
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  // データベースバージョンを確認
  useEffect(() => {
    const versionMatches = checkAndUpdateDBVersion()
    if (!versionMatches) {
      console.log('🔄 データベースのバージョンが更新されました。キャッシュをクリアして更新します...')
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }, [])

  useEffect(() => {
    if (passengersParam) {
      try {
        const parsed = JSON.parse(passengersParam)
        setPassengers(parsed)
        console.log('👥 乗客情報をロードしました:', parsed.length, '名')
      } catch (e) {
        console.error('❌ 乗客情報の解析に失敗しました:', e)
      }
    }
  }, [passengersParam])

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    const chunks = cleaned.match(/.{1,4}/g) || []
    return chunks.join(' ')
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '')
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(value)
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4)
    }
    if (value.length <= 5) {
      setExpiryDate(value)
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsProcessing(true)

    // 简单验证
    if (cardNumber.length !== 16) {
      setError('有効な16桁のカード番号を入力してください')
      setIsProcessing(false)
      return
    }

    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
      setError('有効な有効期限 (MM/YY) を入力してください')
      setIsProcessing(false)
      return
    }

    if (cvv.length !== 3) {
      setError('3桁のCVVを入力してください')
      setIsProcessing(false)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      if (isRoundtrip) {
        // ========== 往返航班处理逻辑 ==========
        console.log('💳 往復フライトの支払いを処理中...')
        console.log('   往路フライト:', outboundFlightId)
        console.log('   復路フライト:', inboundFlightId)
        console.log('   出発日:', flightDate)
        console.log('   復路日:', returnDate)
        console.log('   往路クラス:', outboundCabinClass || cabinClass)
        console.log('   復路クラス:', inboundCabinClass || cabinClass)
        console.log('   乗客数:', passengers.length)
        console.log('   フロントエンドからの総額:', totalPrice)

        // 1. 獲取去程航班信息和價格
        const outboundFlightResponse = await fetch(`/api/flights/${outboundFlightId}?_t=${new Date().getTime()}`, {
          cache: 'no-store'
        })
        if (!outboundFlightResponse.ok) {
          throw new Error('往路フライト情報を取得できませんでした')
        }
        const outboundFlight = await outboundFlightResponse.json()
        
        // 2. 獲取返程航班信息和價格
        const inboundFlightResponse = await fetch(`/api/flights/${inboundFlightId}?_t=${new Date().getTime()}`, {
          cache: 'no-store'
        })
        if (!inboundFlightResponse.ok) {
          throw new Error('復路フライト情報を取得できませんでした')
        }
        const inboundFlight = await inboundFlightResponse.json()

        console.log('✅ フライト情報の取得に成功')
        
        // 3. 計算實際價格（從數據庫獲取）
        const outboundCabinType = (outboundCabinClass || cabinClass || 'ECONOMY').toUpperCase()
        const inboundCabinType = (inboundCabinClass || cabinClass || 'ECONOMY').toUpperCase()
        
        let outboundPrice = 0
        let inboundPrice = 0
        
        // 根據艙位獲取價格
        switch (outboundCabinType) {
          case 'ECONOMY':
            outboundPrice = outboundFlight.economyPrice
            break
          case 'PREMIUM_ECONOMY':
            outboundPrice = outboundFlight.premiumEconomyPrice
            break
          case 'BUSINESS':
            outboundPrice = outboundFlight.businessPrice
            break
          case 'FIRST_CLASS':
            outboundPrice = outboundFlight.firstClassPrice
            break
        }
        
        switch (inboundCabinType) {
          case 'ECONOMY':
            inboundPrice = inboundFlight.economyPrice
            break
          case 'PREMIUM_ECONOMY':
            inboundPrice = inboundFlight.premiumEconomyPrice
            break
          case 'BUSINESS':
            inboundPrice = inboundFlight.businessPrice
            break
          case 'FIRST_CLASS':
            inboundPrice = inboundFlight.firstClassPrice
            break
        }
        
        console.log('   往路単価:', outboundPrice, '復路単価:', inboundPrice)
        console.log('   計算された総額:', (outboundPrice + inboundPrice) * passengers.length)

        // 4. 為每個乘客創建去程和返程預訂
        for (let i = 0; i < passengers.length; i++) {
          const passenger = passengers[i]
          
          // 創建去程預訂
          console.log(`📝 往路予約を作成中 ${i + 1}/${passengers.length}:`, `${passenger.firstName} ${passenger.lastName}`)
          const outboundBookingData = {
            flightId: outboundFlightId,
            flightDate: flightDate,
            cabinClass: outboundCabinType,
            passengerName: `${passenger.firstName} ${passenger.lastName}`,
            passengerEmail: passenger.email,
            passengerPhone: '+852 0000 0000',
            passportNumber: passenger.passportNumber,
            nationality: passenger.nationality,
            dateOfBirth: passenger.dateOfBirth,
            memberNumber: passenger.memberNumber || '',
            totalPrice: outboundPrice, // 去程單人價格
            paymentMethod: 'CREDIT_CARD',
            paymentDetails: {
              cardLast4: cardNumber.slice(-4),
              cardHolder: cardName,
            },
            isRoundtrip: true,
            userEmail: user?.email || passenger.email,
          }

          const outboundResponse = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(outboundBookingData),
          })

          if (!outboundResponse.ok) {
            const errorData = await outboundResponse.json()
            throw new Error(`往路予約に失敗しました: ${errorData.error || '不明なエラー'}`)
          }
          
          // 創建返程預訂
          console.log(`📝 復路予約を作成中 ${i + 1}/${passengers.length}:`, `${passenger.firstName} ${passenger.lastName}`)
          const inboundBookingData = {
            flightId: inboundFlightId,
            flightDate: returnDate,
            cabinClass: inboundCabinType,
            passengerName: `${passenger.firstName} ${passenger.lastName}`,
            passengerEmail: passenger.email,
            passengerPhone: '+852 0000 0000',
            passportNumber: passenger.passportNumber,
            nationality: passenger.nationality,
            dateOfBirth: passenger.dateOfBirth,
            memberNumber: passenger.memberNumber || '',
            totalPrice: inboundPrice, // 返程單人價格
            paymentMethod: 'CREDIT_CARD',
            paymentDetails: {
              cardLast4: cardNumber.slice(-4),
              cardHolder: cardName,
            },
            isRoundtrip: true,
            userEmail: user?.email || passenger.email,
          }

          const inboundResponse = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(inboundBookingData),
          })

          if (!inboundResponse.ok) {
            const errorData = await inboundResponse.json()
            throw new Error(`復路予約に失敗しました: ${errorData.error || '不明なエラー'}`)
          }
        }
        
        console.log('✅ 往復フライト予約成功！')
        alert(`予約完了！\n合計: HKD ${(outboundPrice + inboundPrice) * passengers.length}`)
        router.push('/jp/member/bookings')
        return
      } else if (isConnectionFlight) {
        // 中转航班处理逻辑
        console.log('💳 乗り継ぎ便の支払いを処理中...')
        console.log('   フライト1:', segment1Id)
        console.log('   フライト2:', segment2Id)
        console.log('   フライト日:', flightDate)
        console.log('   クラス:', cabinClass)
        console.log('   乗客数:', passengers.length)
        console.log('   総額:', totalPrice)

        // 为每个航班段创建预订
        for (const segmentFlightId of [segment1Id, segment2Id]) {
          for (let i = 0; i < passengers.length; i++) {
            const passenger = passengers[i]
            console.log(`📝 乗り継ぎ予約を作成中:`, `${passenger.firstName} ${passenger.lastName}`, segmentFlightId)
            
            const bookingData = {
              flightId: segmentFlightId,
              flightDate,
              cabinClass: cabinClass?.toUpperCase(),
              passengerName: `${passenger.firstName} ${passenger.lastName}`,
              passengerEmail: passenger.email,
              passengerPhone: '+852 0000 0000',
              passportNumber: passenger.passportNumber,
              nationality: passenger.nationality,
              dateOfBirth: passenger.dateOfBirth,
              memberNumber: passenger.memberNumber || '',
              totalPrice: totalPrice / 2, // 假设两程价格平分
              paymentMethod: 'CREDIT_CARD',
              paymentDetails: {
                cardLast4: cardNumber.slice(-4),
                cardHolder: cardName,
              },
              isConnection: true,
              connectionId: connectionId,
            }

            const response = await fetch('/api/bookings', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
              },
              body: JSON.stringify(bookingData),
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.error || '予約に失敗しました')
            }
          }
        }
        
        console.log('✅ 乗り継ぎ便予約成功！')
        router.push('/jp/member/bookings')
        return
      }

      // ========== 单程航班处理逻辑 ==========
      console.log('💳 片道フライトの支払いを処理中...')
      console.log('   フライト ID:', flightId)
      console.log('   フライト日:', flightDate)
      console.log('   クラス:', cabinClass)
      console.log('   乗客数:', passengers.length)
      console.log('   フロントエンドからの総額:', totalPrice)

      // 1. 获取航班信息
      const timestamp = new Date().getTime()
      const flightResponse = await fetch(`/api/flights/${flightId}?_t=${timestamp}`, {
        cache: 'no-store'
      })
      
      if (!flightResponse.ok) {
        throw new Error('フライト情報を取得できませんでした')
      }
      
      const flightData = await flightResponse.json()
      console.log('✅ フライト情報を取得しました:', flightData.flightNumber)
      
      // 2. 從數據庫獲取實際價格
      const cabinType = (cabinClass || 'ECONOMY').toUpperCase()
      let singlePrice = 0
      
      switch (cabinType) {
        case 'ECONOMY':
          singlePrice = flightData.economyPrice
          break
        case 'PREMIUM_ECONOMY':
          singlePrice = flightData.premiumEconomyPrice
          break
        case 'BUSINESS':
          singlePrice = flightData.businessPrice
          break
        case 'FIRST_CLASS':
          singlePrice = flightData.firstClassPrice
          break
        default:
          singlePrice = flightData.economyPrice
      }
      
      console.log('   単価:', singlePrice)
      console.log('   計算された総額:', singlePrice * passengers.length)

      // 3. 创建预订
      const bookings = []
      const emailResults: { email: string; success: boolean }[] = []
      
      for (let i = 0; i < passengers.length; i++) {
        const passenger = passengers[i]
        console.log(`📝 予約を作成中 ${i + 1}/${passengers.length}:`, `${passenger.firstName} ${passenger.lastName}`)
        
        const bookingData = {
          flightId,
          flightDate,
          cabinClass: cabinType,
          seatNumber,
          passengerName: `${passenger.firstName} ${passenger.lastName}`,
          passengerEmail: passenger.email,
          passengerPhone: '+852 0000 0000',
          passportNumber: passenger.passportNumber,
          nationality: passenger.nationality,
          dateOfBirth: passenger.dateOfBirth,
          memberNumber: passenger.memberNumber,
          totalPrice: singlePrice, // 使用從數據庫獲取的單人價格
          userEmail: user?.email || passenger.email,
        }
        
        console.log('   予約データ:', bookingData)
        
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        })

        console.log('   API レスポンスステータス:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          bookings.push(data.booking)

          // 发送预订确认邮件
          try {
            const emailResponse = await fetch('/api/send-booking-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: passenger.email,
                bookingNumber: data.booking.bookingNumber,
                passengerName: `${passenger.firstName} ${passenger.lastName}`,
                flightNumber: flightData.flightNumber,
                from: flightData.from,
                fromCity: flightData.fromCity,
                to: flightData.to,
                toCity: flightData.toCity,
                departureTime: flightData.departureTime,
                arrivalTime: flightData.arrivalTime,
                flightDate: flightDate,
                cabinClass: cabinClass?.toUpperCase(),
                seatNumber: seatNumber,
                totalPrice: totalPrice / passengers.length,
              }),
            })
            
            if (emailResponse.ok) {
              emailResults.push({ email: passenger.email, success: true })
              console.log('✅ 予約確認メールを送信しました:', passenger.email)
            } else {
              emailResults.push({ email: passenger.email, success: false })
              console.error('❌ メールの送信に失敗しました:', passenger.email)
            }
          } catch (emailError) {
            emailResults.push({ email: passenger.email, success: false })
            console.error('❌ メールの送信に失敗しました:', emailError)
            // 不中断预订流程，即使邮件发送失败
          }
        }
      }

      // 显示邮件发送结果提示
      if (emailResults.length > 0) {
        const successCount = emailResults.filter(r => r.success).length
        if (successCount === emailResults.length) {
          alert(`✅ 予約完了！\n\n確認メールを送信しました：\n${emailResults.map(r => `  • ${r.email}`).join('\n')}\n\nメールをご確認ください（迷惑メールフォルダもご確認ください）`)
        } else if (successCount > 0) {
          alert(`⚠️ 予約完了！\n\n一部のメール送信に成功しました：\n${emailResults.filter(r => r.success).map(r => `  ✅ ${r.email}`).join('\n')}\n${emailResults.filter(r => !r.success).map(r => `  ❌ ${r.email}`).join('\n')}`)
        } else {
          alert(`⚠️ 予約完了！\n\nメールの送信に失敗しました。"予約確認"で詳細をご確認ください。`)
        }
      }

      // 跳转到"我的预订"页面
      if (bookings.length > 0) {
        router.push('/jp/bookings')
      }
    } catch (err: any) {
      setError('支払処理に失敗しました。もう一度お試しください')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 面包屑 */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/jp/" className="text-gray-500 hover:text-gray-700">トップページ</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">支払い</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 支付表单 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-ya-yellow-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-ya-yellow-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">支払い情報</h2>
                  <p className="text-sm text-gray-600">クレジットカード情報を入力してください</p>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 卡号 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カード番号 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={formatCardNumber(cardNumber)}
                      onChange={handleCardNumberChange}
                      className="w-full px-4 pl-11 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ya-yellow-500 focus:border-ya-yellow-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    これはデモ用の支払いシステムです。実際の請求は発生しません
                  </p>
                </div>

                {/* 持卡人姓名 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カード名義人 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="input-field"
                    placeholder="カード名義人を入力してください"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* 到期日期 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      有効期限 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      className="input-field"
                      placeholder="MM/YY"
                    />
                  </div>

                  {/* CVV */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      セキュリティコード (CVV) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={cvv}
                      onChange={handleCvvChange}
                      className="input-field"
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>

                {/* 安全提示 */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">安全な支払い</p>
                    <p>お支払い情報は暗号化され保護されています。これはデモシステムであり、実際の請求は行われません。</p>
                  </div>
                </div>

                {/* 提交按钮 */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isProcessing}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    戻る
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-ya-yellow-500 text-black font-medium rounded-lg hover:bg-ya-yellow-600 disabled:opacity-50 transition-colors"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                        処理中...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        支払いを確定する {formatPrice(totalPrice)}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 订单摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">注文概要</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">乗客数:</span>
                  <span className="font-medium">{passengers.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">クラス:</span>
                  <span className="font-medium">
                    {cabinClass === 'economy' && 'エコノミークラス'}
                    {cabinClass === 'business' && 'ビジネスクラス'}
                    {cabinClass === 'firstClass' && 'ファーストクラス'}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">乗客リスト:</h4>
                <ul className="space-y-1">
                  {passengers.map((p, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      {i + 1}. {p.firstName} {p.lastName}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>合計:</span>
                  <span className="text-ya-yellow-700">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
        </div>
      </div>
    }>
      <PaymentPageContent />
    </Suspense>
  )
}
