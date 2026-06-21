'use client'

import { createContext, useState, ReactNode } from 'react'

const translations: Record<string, Record<string, string>> = {
  ar: {
    demo_version: 'نسخة تجريبية',
    home: 'الرئيسية',
    signals: 'التوصيات',
    pricing: 'الأسعار',
    dashboard: 'لوحة التحكم',
    admin_panel: 'لوحة الإدارة',
    markets: 'الأسواق',
    telegram_bots: 'روبوتات تليجرام',
    blog: 'المدونة',
    halal_screener: 'فرز الحلال',
    journal: 'دفتر التداول',
    consultation: 'الاستشارة',
    library: 'المكتبة',
    indicators: 'المؤشرات',
    results: 'النتائج',
    courses: 'الدورات التدريبية',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    subscribe: 'اشترك الآن',
    checkout: 'الدفع',
    checkout_success: 'تم بنجاح',
    welcome: 'أهلاً وسهلاً',
    demo_mode: 'تشغيل الديمو',
    language: 'اللغة',
    demo_tour: 'جولة تجريبية',
  },
  en: {
    demo_version: 'Demo Version',
    home: 'Home',
    signals: 'Signals',
    pricing: 'Pricing',
    dashboard: 'Dashboard',
    admin_panel: 'Admin Panel',
    markets: 'Markets',
    telegram_bots: 'Telegram Bots',
    blog: 'Blog',
    halal_screener: 'Halal Screener',
    journal: 'Trade Journal',
    consultation: 'Consultation',
    library: 'Library',
    indicators: 'Indicators',
    results: 'Results',
    courses: 'Courses',
    login: 'Login',
    logout: 'Logout',
    subscribe: 'Subscribe',
    checkout: 'Checkout',
    checkout_success: 'Success',
    welcome: 'Welcome',
    demo_mode: 'Run Demo',
    language: 'Language',
    demo_tour: 'Demo Tour',
  },
}

interface LanguageContextType {
  language: 'ar' | 'en'
  t: (key: string) => string
  toggleLanguage: () => void
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar')
  }

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
