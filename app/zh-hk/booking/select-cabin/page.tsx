'use client'

import { use, useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, Luggage, Utensils, RefreshCw, X, Plane, Leaf, Zap } from 'lucide-react'

interface CabinOption {
  id: string
  name: string
  nameEn: string
  price: number
  seatsAvailable: number
  recommended?: boolean
  features: {
    modifications: {
      allowed: boolean
      fee?: number
      notes?: string
    }
    refund: {
      allowed: boolean
      fee?: number
      notes?: string
    }
    cabinBaggage: {
      pieces: number
      weight: number
      size: string
    }
    checkedBaggage: {
      pieces: number
      weight: number
    }
    personalItem: {
      allowed: boolean
      size?: string
    }
    meals: {
      included: boolean
      type?: string
    }
    seatSelection: {
      included: boolean
      type?: string
    }
    specialFeatures?: string[]
  }
}

function SelectCabinContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const flightId = searchParams.get('flightId')
  const cabinClass = searchParams.get('cabinClass')
  const passengers = parseInt(searchParams.get('passengers') || '1')

  const [flight, setFlight] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (flightId) {
      fetch(`/api/flights/${flightId}`)
        .then(res => res.json())
        .then(data => {
          setFlight(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Failed to fetch flight:', err)
          setLoading(false)
        })
    }
  }, [flightId])

  if (loading || !flight) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">載入中...</p>
        </div>
      </div>
    )
  }

  // 定义舱位选项
  const economyOptions: CabinOption[] = [
    {
      id: 'economy-basic',
      name: '經濟艙基本',
      nameEn: 'Economy Basic',
      price: flight.economyPrice,
      seatsAvailable: flight.economySeats,
      features: {
        modifications: {
          allowed: true,
          fee: 1810,
          notes: '每位旅客最高 HKD 1,810，另加差額'
        },
        refund: {
          allowed: false,
          notes: '不允許'
        },
        cabinBaggage: {
          pieces: 1,
          weight: 8,
          size: '最大55 x 40 x 23厘米'
        },
        checkedBaggage: {
          pieces: 2,
          weight: 23
        },
        personalItem: {
          allowed: true,
          size: '最大40 x 30 x 15厘米'
        },
        meals: {
          included: true,
          type: '餐點, 小食'
        },
        seatSelection: {
          included: false
        }
      }
    },
    {
      id: 'economy-plus',
      name: '經濟艙基本增強',
      nameEn: 'Economy Basic Plus',
      price: flight.economyPrice * 1.16,
      seatsAvailable: flight.economySeats,
      features: {
        modifications: {
          allowed: true,
          fee: 1810,
          notes: '每位旅客最高 HKD 1,810，另加差額'
        },
        refund: {
          allowed: true,
          fee: 1810,
          notes: '可退票，但須扣除 HKD 1,810'
        },
        cabinBaggage: {
          pieces: 1,
          weight: 8,
          size: '最大55 x 40 x 23厘米'
        },
        checkedBaggage: {
          pieces: 2,
          weight: 23
        },
        personalItem: {
          allowed: true,
          size: '最大40 x 30 x 15厘米'
        },
        meals: {
          included: true,
          type: '餐點, 小食'
        },
        seatSelection: {
          included: false
        }
      }
    }
  ]

  const premiumEconomyOptions: CabinOption[] = [
    {
      id: 'premium-basic',
      name: '高級經濟艙基本',
      nameEn: 'Premium Economy Basic',
      price: flight.economyPrice * 2.42,
      seatsAvailable: 4,
      features: {
        modifications: {
          allowed: true,
          fee: 1810,
          notes: '每位旅客最高 HKD 1,810，另加差額'
        },
        refund: {
          allowed: false,
          notes: '不允許'
        },
        cabinBaggage: {
          pieces: 1,
          weight: 8,
          size: '最大55 x 40 x 23厘米'
        },
        checkedBaggage: {
          pieces: 2,
          weight: 23
        },
        personalItem: {
          allowed: true,
          size: '最大40 x 30 x 15厘米'
        },
        meals: {
          included: true,
          type: '餐點, 小食'
        },
        seatSelection: {
          included: false
        }
      }
    },
    {
      id: 'premium-plus',
      name: '高級經濟艙基本增強',
      nameEn: 'Premium Economy Basic Plus',
      price: flight.economyPrice * 2.58,
      seatsAvailable: 4,
      features: {
        modifications: {
          allowed: true,
          fee: 1810,
          notes: '每位旅客最高 HKD 1,810，另加差額'
        },
        refund: {
          allowed: true,
          fee: 1810,
          notes: '可退票，但須扣除 HKD 1,810'
        },
        cabinBaggage: {
          pieces: 1,
          weight: 8,
          size: '最大55 x 40 x 23厘米'
        },
        checkedBaggage: {
          pieces: 2,
          weight: 23
        },
        personalItem: {
          allowed: true,
          size: '最大40 x 30 x 15厘米'
        },
        meals: {
          included: true,
          type: '餐點, 小食'
        },
        seatSelection: {
          included: false
        }
      }
    },
    {
      id: 'premium-green',
      name: '高級經濟艙環保',
      nameEn: 'Premium Economy Green',
      price: flight.economyPrice * 2.68,
      seatsAvailable: 4,
      recommended: true,
      features: {
        modifications: {
          allowed: true,
          fee: 0,
          notes: '允許修改預訂\n允許加差額'
        },
        refund: {
          allowed: true,
          fee: 1810,
          notes: '可退票，但須扣除 HKD 1,810'
        },
        cabinBaggage: {
          pieces: 1,
          weight: 8,
          size: '最大55 x 40 x 23厘米'
        },
        checkedBaggage: {
          pieces: 2,
          weight: 23
        },
        personalItem: {
          allowed: true,
          size: '最大40 x 30 x 15厘米'
        },
        meals: {
          included: true,
          type: '餐點, 小食'
        },
        seatSelection: {
          included: true,
          type: '已包括'
        },
        specialFeatures: [
          '更永續的飛行方式',
          '10% 永續航空燃料 (SAF)',
          '90% 氣候專案',
          '額外 10% 獎勵哩程和 10% 積分和資格積分'
        ]
      }
    },
    {
      id: 'premium-flex',
      name: '高級經濟艙靈活',
      nameEn: 'Premium Economy Flex',
      price: flight.economyPrice * 2.74,
      seatsAvailable: 4,
      features: {
        modifications: {
          allowed: true,
          fee: 0,
          notes: '允許修改預訂\n允許加差額'
        },
        refund: {
          allowed: true,
          fee: 0,
          notes: '允許'
        },
        cabinBaggage: {
          pieces: 1,
          weight: 8,
          size: '最大55 x 40 x 23厘米'
        },
        checkedBaggage: {
          pieces: 2,
          weight: 23
        },
        personalItem: {
          allowed: true,
          size: '最大40 x 30 x 15厘米'
        },
        meals: {
          included: true,
          type: '餐點, 小食'
        },
        seatSelection: {
          included: true,
          type: '預訂座位（若有）\n已包括'
        }
      }
    }
  ]

  const businessOptions: CabinOption[] = [
    {
      id: 'business-flex',
      name: '商務艙靈活',
      nameEn: 'Business Flex',
      price: flight.businessPrice,
      seatsAvailable: flight.businessSeats,
      features: {
        modifications: {
          allowed: true,
          fee: 0,
          notes: '允許修改預訂\n允許加差額'
        },
        refund: {
          allowed: true,
          fee: 0,
          notes: '允許'
        },
        cabinBaggage: {
          pieces: 2,
          weight: 16,
          size: '最大55 x 40 x 23厘米'
        },
        checkedBaggage: {
          pieces: 3,
          weight: 32
        },
        personalItem: {
          allowed: true,
          size: '最大40 x 30 x 15厘米'
        },
        meals: {
          included: true,
          type: '高級餐點, 飲品'
        },
        seatSelection: {
          included: true,
          type: '平躺座椅\n已包括'
        },
        specialFeatures: [
          '優先登機',
          '機場貴賓室',
          '額外行李額',
          '免費WiFi'
        ]
      }
    }
  ]

  let options: CabinOption[] = []
  if (cabinClass === 'ECONOMY') {
    options = economyOptions
  } else if (cabinClass === 'PREMIUM_ECONOMY') {
    options = premiumEconomyOptions
  } else if (cabinClass === 'BUSINESS') {
    options = businessOptions
  }

  const handleSelectOption = (optionId: string) => {
    const option = options.find(o => o.id === optionId)
    if (!option) return

    const params = new URLSearchParams({
      flightId: flight.id,
      cabinOption: optionId,
      passengers: passengers.toString(),
      price: (option.price * passengers).toString()
    })
    router.push(`/zh-hk/booking/passenger-info?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 面包屑 */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/zh-hk/" className="text-gray-500 hover:text-gray-700">
                首頁
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/zh-hk/flights" className="ml-2 text-gray-500 hover:text-gray-700">
                航班搜索
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">選取票價</span>
            </li>
          </ol>
        </nav>

        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">選取票價</h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <button className="flex items-center gap-1 text-ya-yellow-600 hover:text-ya-yellow-700">
              <RefreshCw className="w-4 h-4" />
              <span>比較票價和預訂餘額</span>
            </button>
            <span>•</span>
            <button className="flex items-center gap-1 hover:text-ya-yellow-600">
              <Plane className="w-4 h-4" />
              <span>查看座位圖</span>
            </button>
          </div>
        </div>

        {/* 舱位选项卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option) => (
            <div 
              key={option.id}
              className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
                option.recommended ? 'ring-2 ring-ya-yellow-500' : ''
              }`}
            >
              {/* 推荐标签 */}
              {option.recommended && (
                <div className="absolute top-0 right-0 bg-ya-yellow-500 text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                  我們的建議
                </div>
              )}

              {/* 顶部颜色条 */}
              <div className={`h-2 ${option.recommended ? 'bg-ya-yellow-500' : 'bg-ya-navy-700'}`}></div>

              {/* 内容 */}
              <div className="p-6">
                {/* 座位数 */}
                <div className="text-xs text-gray-600 mb-2">{option.seatsAvailable} 有空座</div>

                {/* 价格 */}
                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    HKD {(option.price * passengers).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">{option.nameEn}</div>
                  <div className="text-xs text-gray-500">{option.name}</div>
                </div>

                {/* 功能列表 */}
                <div className="space-y-3 mb-6">
                  {/* 修改预订 */}
                  <div className="flex items-start gap-2">
                    <RefreshCw className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">修改預訂</div>
                      <div className="text-gray-600 whitespace-pre-line">{option.features.modifications.notes}</div>
                    </div>
                  </div>

                  {/* 退款 */}
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">退款</div>
                      <div className="text-gray-600">{option.features.refund.notes}</div>
                    </div>
                  </div>

                  {/* 随身行李 */}
                  <div className="flex items-start gap-2">
                    <Luggage className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">隨身行李</div>
                      <div className="text-gray-600">
                        {option.features.cabinBaggage.pieces} x {option.features.cabinBaggage.weight}kg ({option.features.cabinBaggage.size})
                      </div>
                    </div>
                  </div>

                  {/* 个人物品 */}
                  {option.features.personalItem.allowed && (
                    <div className="flex items-start gap-2">
                      <Luggage className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs">
                        <div className="font-medium text-gray-900">1件個人物品</div>
                        <div className="text-gray-600">{option.features.personalItem.size}</div>
                      </div>
                    </div>
                  )}

                  {/* 托运行李 */}
                  <div className="flex items-start gap-2">
                    <Luggage className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">託運行李</div>
                      <div className="text-gray-600">
                        {option.features.checkedBaggage.pieces} x {option.features.checkedBaggage.weight}kg (50lb)
                      </div>
                    </div>
                  </div>

                  {/* 座位选择 */}
                  {option.features.seatSelection.included && (
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs">
                        <div className="font-medium text-gray-900">預訂座位（若有）</div>
                        <div className="text-gray-600 whitespace-pre-line">{option.features.seatSelection.type}</div>
                      </div>
                    </div>
                  )}

                  {/* 特殊功能 */}
                  {option.features.specialFeatures && (
                    <>
                      {option.features.specialFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          {feature.includes('永續') ? (
                            <Leaf className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : feature.includes('獎勵') ? (
                            <Zap className="w-4 h-4 text-ya-yellow-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Check className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="text-xs text-gray-600">{feature}</div>
                        </div>
                      ))}
                    </>
                  )}

                  {/* 机上餐饮 */}
                  <div className="flex items-start gap-2">
                    <Utensils className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">機上餐飲</div>
                      <div className="text-gray-600">{option.features.meals.type}</div>
                    </div>
                  </div>
                </div>

                {/* 选择按钮 */}
                <button
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    option.recommended
                      ? 'bg-ya-yellow-500 text-black hover:bg-ya-yellow-600'
                      : 'bg-ya-navy-700 text-white hover:bg-ya-navy-800'
                  }`}
                >
                  選擇
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SelectCabinPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ya-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">載入中...</p>
        </div>
      </div>
    }>
      <SelectCabinContent />
    </Suspense>
  )
}
