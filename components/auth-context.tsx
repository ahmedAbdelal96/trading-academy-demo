'use client'

import { createContext, useState, ReactNode } from 'react'

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

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [openLoginModal, setOpenLoginModal] = useState(false)

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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        loginAsStudent,
        loginAsAdmin,
        logout,
        openLoginModal,
        setOpenLoginModal,
        activateSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
