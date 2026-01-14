'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Globe } from 'lucide-react'

export default function Footer() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const languages = [
    { code: 'zh-hk', name: '繁體中文' },
    { code: 'zh-cn', name: '简体中文' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'jp', name: '日本語' },
    { code: 'es', name: 'Español' },
  ]

  const getLangPrefix = () => {
    const segments = pathname.split('/').filter(Boolean)
    const currentLang = ['en', 'zh-hk', 'zh-cn', 'de', 'jp', 'es'].includes(segments[0]) ? segments[0] : 'zh-hk'
    return currentLang === 'zh-hk' ? '' : `/${currentLang}`
  }

  const langPrefix = getLangPrefix()
  // Determine current language code (without slash) for translations
  const currentLangCode = langPrefix ? langPrefix.substring(1) : 'zh-hk'

  const translations: Record<string, any> = {
    'zh-hk': {
      brand: '黃色航空 | Yellow Airlines',
      slogan: '探索我哋下次旅行嘅最佳目的地',
      aboutTitle: '關於我們',
      aboutUs: '關於我哋',
      fleet: '我哋嘅機隊',
      careers: '就業機會',
      helpTitle: '幫助',
      baggage: '行李',
      specialAssistance: '特別需求',
      faq: '常見問題',
      immigration: '出入境要求查詢',
      flightLookup: '航班號查詢',
      clearCache: '清除緩存',
      contactTitle: '聯絡我們',
      phone: '客服電話',
      onlineChat: '在綫客服',
      email: '郵箱',
      address: '地址',
      addressText: '埃森兰共和国青城市太平川區機場路45號',
      copyright: '© 2025 黃色航空。版權所有。',
      terms: '服務條款',
      privacy: '私隱政策',
      legal: '法律聲明'
    },
    'zh-cn': {
      brand: '黄色航空 | Yellow Airlines',
      slogan: '探索我们下次旅行的最佳目的地',
      aboutTitle: '关于我们',
      aboutUs: '关于我们',
      fleet: '我们的机队',
      careers: '就业机会',
      helpTitle: '帮助',
      baggage: '行李',
      specialAssistance: '特别需求',
      faq: '常见问题',
      immigration: '出入境要求查询',
      flightLookup: '航班号查询',
      clearCache: '清除缓存',
      contactTitle: '联系我们',
      phone: '客服电话',
      onlineChat: '在线客服',
      email: '邮箱',
      address: '地址',
      addressText: '埃森兰共和国青城市太平川区机场路45号',
      copyright: '© 2025 黄色航空。版权所有。',
      terms: '服务条款',
      privacy: '隐私政策',
      legal: '法律声明'
    },
    'en': {
      brand: 'Yellow Airlines',
      slogan: 'Discover your next best destination',
      aboutTitle: 'About Us',
      aboutUs: 'Our Story',
      fleet: 'Our Fleet',
      careers: 'Careers',
      helpTitle: 'Help',
      baggage: 'Baggage',
      specialAssistance: 'Special Assistance',
      faq: 'FAQ',
      immigration: 'Immigration Requirements',
      flightLookup: 'Flight Lookup',
      clearCache: 'Clear Cache',
      contactTitle: 'Contact Us',
      phone: 'Customer Service',
      onlineChat: 'Online Chat',
      email: 'Email',
      address: 'Address',
      addressText: '45 Airport Road, Taipingchuan District, Qing City, Republic of Eisenland',
      copyright: '© 2025 Yellow Airlines. All rights reserved.',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      legal: 'Legal'
    },
    'de': {
      brand: 'Yellow Airlines',
      slogan: 'Entdecken Sie Ihr nächstes Reiseziel',
      aboutTitle: 'Über uns',
      aboutUs: 'Unsere Geschichte',
      fleet: 'Unsere Flotte',
      careers: 'Karriere',
      helpTitle: 'Hilfe',
      baggage: 'Gepäck',
      specialAssistance: 'Besondere Unterstützung',
      faq: 'FAQ',
      immigration: 'Einreisebestimmungen',
      flightLookup: 'Flugsuche',
      clearCache: 'Cache leeren',
      contactTitle: 'Kontakt',
      phone: 'Kundenservice',
      onlineChat: 'Online-Chat',
      email: 'E-Mail',
      address: 'Adresse',
      addressText: '45 Flughafenstraße, Bezirk Taipingchuan, Qing City, Republik Eisenland',
      copyright: '© 2025 Yellow Airlines. Alle Rechte vorbehalten.',
      terms: 'Nutzungsbedingungen',
      privacy: 'Datenschutz',
      legal: 'Rechtliches'
    },
    'jp': {
      brand: 'イエロー航空 | Yellow Airlines',
      slogan: '次の最高の目的地を見つけよう',
      aboutTitle: '会社概要',
      aboutUs: '私たちについて',
      fleet: '機材紹介',
      careers: '採用情報',
      helpTitle: 'ヘルプ',
      baggage: '手荷物',
      specialAssistance: '特別なサポート',
      faq: 'よくある質問',
      immigration: '出入国要件',
      flightLookup: 'フライト検索',
      clearCache: 'キャッシュを消去',
      contactTitle: 'お問い合わせ',
      phone: 'カスタマーサービス',
      onlineChat: 'オンラインチャット',
      email: 'メール',
      address: '住所',
      addressText: 'エイゼンラント共和国青城市太平川区空港路45号',
      copyright: '© 2025 Yellow Airlines. All rights reserved.',
      terms: '利用規約',
      privacy: 'プライバシーポリシー',
      legal: '法的通知'
    },
    'es': {
      brand: 'Yellow Airlines',
      slogan: 'Descubre tu próximo mejor destino',
      aboutTitle: 'Sobre nosotros',
      aboutUs: 'Nuestra historia',
      fleet: 'Nuestra flota',
      careers: 'Carreras',
      helpTitle: 'Ayuda',
      baggage: 'Equipaje',
      specialAssistance: 'Asistencia especial',
      faq: 'Preguntas frecuentes',
      immigration: 'Requisitos de inmigración',
      flightLookup: 'Búsqueda de vuelos',
      clearCache: 'Borrar caché',
      contactTitle: 'Contáctenos',
      phone: 'Servicio al cliente',
      onlineChat: 'Chat en línea',
      email: 'Correo electrónico',
      address: 'Dirección',
      addressText: '45 Airport Road, Distrito de Taipingchuan, Ciudad de Qing, República de Eisenland',
      copyright: '© 2025 Yellow Airlines. Todos los derechos reservados.',
      terms: 'Términos de servicio',
      privacy: 'Política de privacidad',
      legal: 'Legal'
    }
  }

  const t = translations[currentLangCode] || translations['zh-hk']

  const handleLanguageSwitch = (langCode: string) => {
    const segments = pathname.split('/').filter(Boolean)
    const currentLang = ['en', 'zh-hk', 'zh-cn', 'de', 'jp', 'es'].includes(segments[0]) ? segments[0] : null
    
    let newPath
    if (currentLang) {
      segments[0] = langCode
      newPath = '/' + segments.join('/')
    } else {
      // If no language prefix currently, prepend it (handling root)
      newPath = `/${langCode}${pathname === '/' ? '' : pathname}`
    }
    
    // Preserve query parameters
    const params = searchParams.toString()
    if (params) {
      newPath += `?${params}`
    }

    router.push(newPath)
  }

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10 mr-2">
                <Image 
                  src="/images/logoremovebkgnd.png" 
                  alt="Yellow Airlines Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold">{t.brand}</h3>
            </div>
            <p className="text-gray-300">
              {t.slogan}
            </p>
          </div>
          
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.aboutTitle}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`${langPrefix}/about`} className="text-gray-300 hover:text-white transition-colors">
                  {t.aboutUs}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/fleet`} className="text-gray-300 hover:text-white transition-colors">
                  {t.fleet}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/careers`} className="text-gray-300 hover:text-white transition-colors">
                  {t.careers}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Passenger Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.helpTitle}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`${langPrefix}/baggage`} className="text-gray-300 hover:text-white transition-colors">
                  {t.baggage}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/special-assistance`} className="text-gray-300 hover:text-white transition-colors">
                  {t.specialAssistance}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/faq`} className="text-gray-300 hover:text-white transition-colors">
                  {t.faq}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/immigration-requirements`} className="text-gray-300 hover:text-white transition-colors">
                  {t.immigration}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/flights/lookup`} className="text-gray-300 hover:text-white transition-colors">
                  {t.flightLookup}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/admin/clear-cache`} className="text-gray-200 hover:text-white transition-colors text-sm opacity-70">
                  {t.clearCache}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.contactTitle}</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">{t.phone}: +86 181 2231 7910</li>
              <a className="text-gray-300" href="https://contact.flaps1f.com">{t.onlineChat}</a>
              <li className="text-gray-300">{t.email}: yellowaircontact@flaps1f.com</li>
              <li className="text-gray-300">{t.address}: {t.addressText}</li>
              <li className="flex space-x-4 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/yellowairlines" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">YouTube</span>
                  <Youtube className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Language Switcher & Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center space-x-4 mb-4 md:mb-0 overflow-x-auto max-w-full pb-2 md:pb-0">
              <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex space-x-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSwitch(lang.code)}
                    className="text-sm text-gray-400 hover:text-white whitespace-nowrap transition-colors"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">{t.copyright}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href={`${langPrefix}/terms`} className="text-gray-300 hover:text-white transition-colors">
                {t.terms}
              </Link>
              <Link href={`${langPrefix}/privacy`} className="text-gray-300 hover:text-white transition-colors">
                {t.privacy}
              </Link>
              <Link href={`${langPrefix}/legal`} className="text-gray-300 hover:text-white transition-colors">
                {t.legal}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
