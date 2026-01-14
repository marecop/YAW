'use client'

import { useEffect } from 'react'
import FlightSearchForm from '@/components/FlightSearchForm'
import Link from 'next/link'
import Image from 'next/image'
import { checkAndUpdateDBVersion } from '@/lib/dbVersion'
import { 
  Cloud, 
  Utensils, 
  Users, 
  ArrowRight, 
  Plane, 
  Clock, 
  Shield, 
  Leaf, 
  Coffee, 
  Heart,
  CreditCard 
} from 'lucide-react'

export default function Home() {
  // 检查数据库版本
  useEffect(() => {
    const versionMatches = checkAndUpdateDBVersion()
    if (!versionMatches) {
      console.log('✅ 缓存已清除，页面即将刷新...')
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }, [])

  // 热门目的地数据 - 升级版视觉
  const popularDestinations = [
    { id: 1, name: '東京', code: 'NRT', imageUrl: '/images/tokyo.png', price: 'HK$4,500', tags: ['購物', '美食'] },
    { id: 2, name: '倫敦', code: 'LHR', imageUrl: '/images/london.png', price: 'HK$6,500', tags: ['歷史', '文化'] },
    { id: 3, name: '紐約', code: 'JFK', imageUrl: '/images/newyork.png', price: 'HK$7,800', tags: ['繁華', '藝術'] },
    { id: 4, name: '新加坡', code: 'SIN', imageUrl: '/images/Singapore.png', price: 'HK$4,200', tags: ['花園城市'] },
  ]

  // 主题探索数据
  const exploreThemes = [
    {
      id: 1,
      title: '永續飛行',
      desc: '與我們一起減少碳足跡',
      icon: Leaf,
      color: 'bg-green-100 text-green-600',
      link: '/sustainability',
      imageColor: 'bg-green-600'
    },
    {
      id: 2,
      title: '尊尚體驗',
      desc: '探索我們的商務艙服務',
      icon: Coffee,
      color: 'bg-blue-100 text-blue-600',
      link: '/experience',
      imageColor: 'bg-ya-navy-800'
    },
    {
      id: 3,
      title: '家庭出行',
      desc: '為全家提供貼心服務',
      icon: Heart,
      color: 'bg-orange-100 text-orange-600',
      link: '/family',
      imageColor: 'bg-orange-500'
    },
    {
      id: 4,
      title: '會員禮遇',
      desc: '賺取積分，兌換獎勵',
      icon: CreditCard,
      color: 'bg-yellow-100 text-yellow-600',
      link: '/auth/register',
      imageColor: 'bg-ya-yellow-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - 优化版 */}
      <section className="relative bg-gradient-to-br from-ya-yellow-400 via-ya-yellow-500 to-ya-yellow-600 pb-64 pt-28 overflow-hidden">
        {/* 背景装饰图案 */}
        <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 0 L100 100 Z" fill="white" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* 左侧：品牌文案 */}
            <div className="lg:col-span-5 text-white lg:text-left text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulset("></span>
                全新夏季航班現已開售
              </div>
              <h1 className=")text-5xl lg:text-6xl font-extrabold text-black mb-6 leading-tight">
                探索世界<br/>
                <span className="text-white drop-shadow-md">從這裡出發</span>
              </h1>
              <p className="text-xl text-black/80 font-medium mb-8 leading-relaxed">
                無論是商務出行還是休閒度假，黃色航空都為您提供最舒適、安全的飛行體驗。
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                     <Shield className="w-5 h-5 text-black" />
                   </div>
                   <div className="text-left">
                     <p className="text-xs text-black/60 font-bold uppercaset(">安全認證</p>
                     <p className=")text-sm text-black font-bold">五星級安全</p>
                   </div>
                </div>
                <div className="w-px h-10 bg-black/10"></div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                     <Clock className="w-5 h-5 text-black" />
                   </div>
                   <div className="text-left">
                     <p className="text-xs text-black/60 font-bold uppercaset(">準點率</p>
                     <p className=")text-sm text-black font-bold">98.5%</p>
                   </div>
                </div>
              </div>
            </div>

            {/* 右侧：搜索表单 */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 transform transition-transform hover:scale-[1.01] duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Plane className="w-6 h-6 text-ya-yellow-600" />
                    航班
                  </h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">多種支付方式</span>
                </div>
                <FlightSearchForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 探索更多主题 - NEW SECTION */}
      <section className="py-20 -mt-32 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exploreThemes.map((theme) => (
              <Link href={theme.link} key={theme.id} className="group">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                  <div className={`h-32 ${theme.imageColor} relative flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                    <theme.icon className="w-12 h-12 text-white/90 transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ya-yellow-600 transition-colors">
                      {theme.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 flex-1">
                      {theme.desc}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-ya-yellow-600 mt-auto">
                      了解更多 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 热门目的地 - 仿航班优惠卡片风格 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">熱門目的地</h2>
              <p className="text-gray-500 text-lg">精選熱門航線，優惠價格不容錯過</p>
            </div>
            <Link href="/zh-cn/destinations" className="hidden md:flex items-center px-6 py-3 rounded-xl bg-gray-50 text-gray-900 font-semibold hover:bg-gray-100 transition-colors">
              查看所有目的地 <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularDestinations.map((destination) => (
              <Link 
                href={`/zh-cn/flights?to=${destination.code}`} 
                key={destination.id}
                className="group block"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={destination.imageUrl}
                    alt={destination.name}
                    fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                    <div className="absolute top-4 left-4 flex gap-2">
                       {destination.tags.map(tag => (
                         <span key={tag} className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-gray-800 shadow-sm">
                           {tag}
                         </span>
                       ))}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between bg-white relative">
                    {/* 装饰性小飞机 */}
                    <div className="absolute -top-6 right-6 w-12 h-12 bg-ya-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Plane className="w-6 h-6 text-black" />
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-1">飛往</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{destination.name}</h3>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">往返含稅</p>
                        <p className="text-xl font-bold text-ya-yellow-600">{destination.price}<span className="text-sm text-gray-400 font-normal">*</span></p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 group-hover:text-ya-yellow-600 transition-colors">立即預訂 &rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/zh-cn/destinations" className="inline-block px-8 py-4 bg-gray-100 rounded-xl font-bold text-gray-900">
              查看更多目的地
            </Link>
          </div>
        </div>
      </section>

      {/* 黄色航空体验 - 重新设计 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">黃色航空體驗</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">為什麼選擇黃色航空？</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 卡片 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-ya-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                <Cloud className="w-8 h-8 text-ya-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">舒適客艙</h3>
              <p className="text-gray-600 leading-relaxed">
                人體工學座椅設計，寬敞的腿部空間，讓您的長途飛行依然舒適愜意。
              </p>
            </div>
            
            {/* 卡片 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
               <div className="w-16 h-16 bg-ya-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                <Utensils className="w-8 h-8 text-ya-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">機上餐飲</h3>
              <p className="text-gray-600 leading-relaxed">
                由星級大廚設計的機上菜單，搭配精選酒水，為您帶來雲端味蕾盛宴。
              </p>
            </div>
            
            {/* 卡片 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
               <div className="w-16 h-16 bg-ya-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-ya-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">貼心服務</h3>
              <p className="text-gray-600 leading-relaxed">
                我們專業的機組人員時刻關注您的需求，為您提供無微不至的貼心服務。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

