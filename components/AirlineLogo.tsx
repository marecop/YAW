import Image from 'next/image'

interface AirlineLogoProps {
  airline: string
  airlineCode?: string
  airlineLogo?: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function AirlineLogo({ 
  airline, 
  airlineCode, 
  airlineLogo,
  size = 'md',
  className = ''
}: AirlineLogoProps) {
  // 尺寸映射
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const sizeClass = sizeMap[size]

  // 如果有 logo，顯示 logo
  if (airlineLogo) {
    return (
      <div className={`relative ${sizeClass} ${className}`}>
        <Image
          src={airlineLogo}
          alt={airline}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 32px, 48px"
        />
      </div>
    )
  }

  // 沒有 logo 則顯示航空公司代碼或首字母
  const displayText = airlineCode || airline.substring(0, 2).toUpperCase()

  return (
    <div className={`${sizeClass} ${className} flex items-center justify-center bg-gradient-to-br from-ya-yellow-400 to-ya-yellow-600 rounded-lg text-white font-bold`}>
      <span className={size === 'sm' ? 'text-xs' : size === 'lg' || size === 'xl' ? 'text-xl' : 'text-sm'}>
        {displayText}
      </span>
    </div>
  )
}

