'use client'

import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  userRole: 'student' | 'admin' | null
  login: (role: 'student' | 'admin') => void
  logout: () => void
}

interface LanguageContextType {
  language: 'ar' | 'en'
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

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null)
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')
  const [isDemoRunning, setIsDemoRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const login = (role: 'student' | 'admin') => {
    setIsLoggedIn(true)
    setUserRole(role)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
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
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      <LanguageContext.Provider value={{ language, toggleLanguage }}>
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
