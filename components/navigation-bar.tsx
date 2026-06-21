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
      <nav className="sticky top-0 z-40 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          <Link href="/" className="flex items-center gap-2 mx-auto md:mx-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-primary rounded-lg flex items-center justify-center glow-primary">
              <span className="text-white font-bold text-lg">الصياد</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">أكاديمية الصياد</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 flex-1">
            <Link href="/" className="text-foreground/80 hover:text-primary transition-colors duration-200 text-sm">
              الرئيسية
            </Link>
            <Link href="/signals" className="text-foreground/80 hover:text-primary transition-colors duration-200 text-sm">
              التوصيات
            </Link>
            <Link href="/markets" className="text-foreground/80 hover:text-primary transition-colors duration-200 text-sm">
              الأسواق
            </Link>
            {isLoggedIn && (
              <>
                <Link href="/dashboard" className="text-foreground/80 hover:text-primary transition-colors duration-200 text-sm">
                  لوحة التحكم
                </Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="text-foreground/80 hover:text-primary transition-colors duration-200 text-sm">
                    الإدارة
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-foreground/80 hover:text-primary hover:bg-white/10 transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs ml-1 font-semibold">{language === 'ar' ? 'EN' : 'ع'}</span>
            </Button>

            {isLoggedIn ? (
              <>
                <div className="hidden sm:flex items-center gap-2 text-sm border-r border-white/10 pr-3">
                  <span className="text-primary font-semibold">{user?.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-white/20 hover:bg-white/10"
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
          <div className="md:hidden border-t border-white/10 px-4 py-4 flex flex-col gap-4 bg-white/5 backdrop-blur-md">
            <Link href="/" className="text-foreground/80 hover:text-primary text-sm">
              الرئيسية
            </Link>
            <Link href="/signals" className="text-foreground/80 hover:text-primary text-sm">
              التوصيات
            </Link>
            <Link href="/markets" className="text-foreground/80 hover:text-primary text-sm">
              الأسواق
            </Link>
            {isLoggedIn && (
              <>
                <Link href="/dashboard" className="text-foreground/80 hover:text-primary text-sm">
                  لوحة التحكم
                </Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="text-foreground/80 hover:text-primary text-sm">
                    الإدارة
                  </Link>
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
