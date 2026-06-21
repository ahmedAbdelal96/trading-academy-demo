'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe } from 'lucide-react'
import { useState } from 'react'
import { LoginModal } from '@/components/modals/login-modal'

export function NavigationBar() {
  const { isLoggedIn, user, setOpenLoginModal, logout } = useAuth()
  const { language, toggleLanguage, t } = useLanguage()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 md:flex-none md:order-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:bg-foreground/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          <Link href="/" className="flex items-center gap-3 md:order-1">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">الصياد</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">أكاديمية الصياد</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 flex-1 justify-end md:order-3">
            <Link href="/" className="nav-link">الرئيسية</Link>
            <Link href="/signals" className="nav-link">التوصيات</Link>
            <Link href="/dashboard" className="nav-link">الدورات</Link>
            <Link href="/markets" className="nav-link">الأسواق</Link>
            <Link href="/telegram-bots" className="nav-link">بوتات تيليجرام</Link>
            {isLoggedIn && (
              <>
                <Link href="/dashboard" className="nav-link">لوحة التحكم</Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="nav-link">الإدارة</Link>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-3 md:order-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-foreground/70 hover:text-foreground hover:bg-foreground/5"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs ml-1 font-semibold">{language === 'ar' ? 'EN' : 'ع'}</span>
            </Button>

            {isLoggedIn ? (
              <>
                <div className="hidden sm:flex items-center gap-2 text-sm border-r border-border pr-3">
                  <span className="text-primary font-semibold">{user?.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-border hover:bg-foreground/5"
                >
                  خروج
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={() => setOpenLoginModal(true)}
                className="btn-primary"
              >
                دخول
              </Button>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-foreground/2 px-4 py-4 flex flex-col gap-3">
            <Link href="/" className="nav-link block">الرئيسية</Link>
            <Link href="/signals" className="nav-link block">التوصيات</Link>
            <Link href="/dashboard" className="nav-link block">الدورات</Link>
            <Link href="/markets" className="nav-link block">الأسواق</Link>
            <Link href="/telegram-bots" className="nav-link block">بوتات تيليجرام</Link>
            {isLoggedIn && (
              <>
                <Link href="/dashboard" className="nav-link block">لوحة التحكم</Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="nav-link block">الإدارة</Link>
                )}
              </>
            )}
          </div>
        )}
      </nav>

      <LoginModal />
    </>
  )
}
