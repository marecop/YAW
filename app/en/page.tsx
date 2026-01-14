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
  // Check database version
  useEffect(() => {
    const versionMatches = checkAndUpdateDBVersion()
    if (!versionMatches) {
      console.log('✅ 缓存已清除，页面即将刷新...')
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }, [])

  // Popular destinations data - Upgraded visuals
  const popularDestinations = [
    { id: 1, name: 'Tokyo', code: 'NRT', imageUrl: '/images/tokyo.png', price: 'HK$4,500', tags: ['Shopping', 'Food'] },
    { id: 2, name: 'London', code: 'LHR', imageUrl: '/images/london.png', price: 'HK$6,500', tags: ['History', 'Culture'] },
    { id: 3, name: 'New York', code: 'JFK', imageUrl: '/images/newyork.png', price: 'HK$7,800', tags: ['Modern', 'Art'] },
    { id: 4, name: 'Singapore', code: 'SIN', imageUrl: '/images/Singapore.png', price: 'HK$4,200', tags: ['Garden City'] },
  ]

  // Explore themes data
  const exploreThemes = [
    {
      id: 1,
      title: 'Sustainable Flying',
      desc: 'Join us in reducing carbon footprint',
      icon: Leaf,
      color: 'bg-green-100 text-green-600',
      link: '/en/sustainability',
      imageColor: 'bg-green-600'
    },
    {
      id: 2,
      title: 'Premium Experience',
      desc: 'Discover our business class service',
      icon: Coffee,
      color: 'bg-blue-100 text-blue-600',
      link: '/en/experience',
      imageColor: 'bg-ya-navy-800'
    },
    {
      id: 3,
      title: 'Family Travel',
      desc: 'Thoughtful services for the whole family',
      icon: Heart,
      color: 'bg-orange-100 text-orange-600',
      link: '/en/family',
      imageColor: 'bg-orange-500'
    },
    {
      id: 4,
      title: 'Member Privileges',
      desc: 'Earn points and redeem rewards',
      icon: CreditCard,
      color: 'bg-yellow-100 text-yellow-600',
      link: '/en/auth/register',
      imageColor: 'bg-ya-yellow-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Optimized */}
      <section className="relative bg-gradient-to-br from-ya-yellow-400 via-ya-yellow-500 to-ya-yellow-600 pb-64 pt-28 overflow-hidden">
        {/* Background decoration pattern */}
        <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 0 L100 100 Z" fill="white" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Brand Copy */}
            <div className="lg:col-span-5 text-white lg:text-left text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                New Summer Flights Now Available
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-black mb-6 leading-tight">
                Explore the World<br/>
                <span className="text-white drop-shadow-md">Start From Here</span>
              </h1>
              <p className="text-xl text-black/80 font-medium mb-8 leading-relaxed">
                Whether for business or leisure, Yellow Airlines provides you with the most comfortable and safe flying experience.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                     <Shield className="w-5 h-5 text-black" />
                   </div>
                   <div className="text-left">
                     <p className="text-xs text-black/60 font-bold uppercase">Safety Certified</p>
                     <p className="text-sm text-black font-bold">5-Star Safety</p>
                   </div>
                </div>
                <div className="w-px h-10 bg-black/10"></div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                     <Clock className="w-5 h-5 text-black" />
                   </div>
                   <div className="text-left">
                     <p className="text-xs text-black/60 font-bold uppercase">On-time Rate</p>
                     <p className="text-sm text-black font-bold">98.5%</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Right: Search Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 transform transition-transform hover:scale-[1.01] duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Plane className="w-6 h-6 text-ya-yellow-600" />
                    Flights
                  </h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Multiple Payment Methods</span>
                </div>
                <FlightSearchForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More Themes - NEW SECTION */}
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
                      Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Popular Destinations</h2>
              <p className="text-gray-500 text-lg">Selected popular routes, prices you cannot miss</p>
            </div>
            <Link href="/en/destinations" className="hidden md:flex items-center px-6 py-3 rounded-xl bg-gray-50 text-gray-900 font-semibold hover:bg-gray-100 transition-colors">
              View All Destinations <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularDestinations.map((destination) => (
              <Link 
                href={`/en/flights?to=${destination.code}`} 
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
                    {/* Decorative Plane */}
                    <div className="absolute -top-6 right-6 w-12 h-12 bg-ya-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Plane className="w-6 h-6 text-black" />
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-1">Fly to</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{destination.name}</h3>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Roundtrip incl. tax</p>
                        <p className="text-xl font-bold text-ya-yellow-600">{destination.price}<span className="text-sm text-gray-400 font-normal">*</span></p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 group-hover:text-ya-yellow-600 transition-colors">Book Now &rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/en/destinations" className="inline-block px-8 py-4 bg-gray-100 rounded-xl font-bold text-gray-900">
              View More Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Yellow Airlines Experience */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Yellow Airlines Experience</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Why choose Yellow Airlines?</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-ya-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                <Cloud className="w-8 h-8 text-ya-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comfortable Cabin</h3>
              <p className="text-gray-600 leading-relaxed">
                Ergonomic seat design with spacious legroom, keeping you comfortable even on long-haul flights.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
               <div className="w-16 h-16 bg-ya-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                <Utensils className="w-8 h-8 text-ya-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">In-flight Dining</h3>
              <p className="text-gray-600 leading-relaxed">
                In-flight menus designed by star chefs, paired with selected wines, bringing you a feast in the clouds.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
               <div className="w-16 h-16 bg-ya-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-ya-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Attentive Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Our professional cabin crew is always attentive to your needs, providing meticulous service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
