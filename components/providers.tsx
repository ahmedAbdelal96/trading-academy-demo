'use client'

import React, { createContext, useContext, useState } from 'react'

export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'admin'
  subscriptionPlan?: 'basic' | 'premium' | 'vip'
  subscriptionActive?: boolean
}

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  loginAsStudent: () => void
  loginAsAdmin: () => void
  logout: () => void
  openLoginModal: boolean
  setOpenLoginModal: (open: boolean) => void
  activateSubscription: (plan: 'basic' | 'premium' | 'vip') => void
}

interface LanguageContextType {
  language: 'ar' | 'en'
  t: (key: string) => string
  toggleLanguage: () => void
}

interface DemoContextType {
  isDemoRunning: boolean
  currentStep: number
  startDemo: () => void
  endDemo: () => void
  nextStep: () => void
  navigateToStep: (step: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)
const DemoContext = createContext<DemoContextType | undefined>(undefined)

const translations: Record<string, Record<string, string>> = {
  ar: {
    home: 'الرئيسية',
    signals: 'التوصيات',
    pricing: 'الأسعار',
    dashboard: 'لوحة التحكم',
    admin_panel: 'لوحة الإدارة',
    markets: 'الأسواق',
    telegram_bots: 'روبوتات تليجرام',
    demo_mode: 'تشغيل الديمو',
    language: 'اللغة',
  },
  en: {
    home: 'Home',
    signals: 'Signals',
    pricing: 'Pricing',
    dashboard: 'Dashboard',
    admin_panel: 'Admin Panel',
    markets: 'Markets',
    telegram_bots: 'Telegram Bots',
    demo_mode: 'Run Demo',
    language: 'Language',
  },
}

const mockStudentUser: User = {
  id: '1',
  name: 'محمد السالم',
  email: 'student@example.com',
  role: 'student',
  subscriptionPlan: 'premium',
  subscriptionActive: true,
}

const mockAdminUser: User = {
  id: '2',
  name: 'أحمد الإدارة',
  email: 'admin@example.com',
  role: 'admin',
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')
  const [isDemoRunning, setIsDemoRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const loginAsStudent = () => {
    setUser(mockStudentUser)
    setIsLoggedIn(true)
    setOpenLoginModal(false)
  }

  const loginAsAdmin = () => {
    setUser(mockAdminUser)
    setIsLoggedIn(true)
    setOpenLoginModal(false)
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  const activateSubscription = (plan: 'basic' | 'premium' | 'vip') => {
    if (user) {
      setUser({
        ...user,
        subscriptionPlan: plan,
        subscriptionActive: true,
      })
    }
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'ar' ? 'en' : 'ar')
  }

  const startDemo = () => {
    setIsDemoRunning(true)
    setCurrentStep(0)
  }

  const endDemo = () => {
    setIsDemoRunning(false)
    setCurrentStep(0)
  }

  const nextStep = () => {
    setCurrentStep(step => step + 1)
  }

  const navigateToStep = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loginAsStudent, loginAsAdmin, logout, openLoginModal, setOpenLoginModal, activateSubscription }}>
      <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
        <DemoContext.Provider value={{ isDemoRunning, currentStep, startDemo, endDemo, nextStep, navigateToStep }}>
          {children}
        </DemoContext.Provider>
      </LanguageContext.Provider>
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within Providers')
  return context
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within Providers')
  return context
}

export function useDemo() {
  const context = useContext(DemoContext)
  if (!context) throw new Error('useDemo must be used within Providers')
  return context
}
