'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  const { t, language, setLanguage } = useLanguage()

  const languageOptions = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh-cn', name: '简体中文', flag: '🇨🇳' },
    { code: 'zh-hk', name: '繁體中文', flag: '🇭🇰' },
  ]

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌资讯 */}
          <div>
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10 mr-2">
                <Image 
                  src="/images/logoremovebkgnd.png" 
                  alt="黃色航空標誌"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold">{t('site.title')} | Yellow Airlines</h3>
            </div>
            <p className="text-gray-300">
              {t('site.tagline')}
            </p>
          </div>
          
          {/* 關於我們 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.aboutUs')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.aboutUsLink')}
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.ourFleet')}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.careers')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 乘客服務 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.help')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/baggage" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.baggage')}
                </Link>
              </li>
              <li>
                <Link href="/special-assistance" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.specialRequests')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link href="/admin/clear-cache" className="text-gray-200 hover:text-white transition-colors text-sm opacity-70">
                  清除緩存
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 聯絡我們 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.followUs')}</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">客服電話: +86 181 2231 7910</li>
              <a className="text-gray-300" href="https://contact.flaps1f.com">在綫客服</a>
              <li className="text-gray-300">郵箱: yellowaircontact@flaps1f.com</li>
              <li className="text-gray-300">地址: 埃森兰共和国青城市太平川區機場路45號</li>
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

        {/* Language Switcher */}
        <div className="border-t border-gray-700 mt-8 pt-8 mb-8">
          <h3 className="text-white font-semibold mb-4">Language / 语言 / Sprache</h3>
          <div className="flex flex-wrap gap-3">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => setLanguage(option.code)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  language === option.code
                    ? 'bg-ya-yellow-500 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span className="mr-2">{option.flag}</span>{option.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">{t('footer.copyright')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
              {t('footer.termsOfService')}
            </Link>
            <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <Link href="/legal" className="text-gray-300 hover:text-white transition-colors">
              法律聲明
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
