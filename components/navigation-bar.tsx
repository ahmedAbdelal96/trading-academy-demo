'use client'

import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe } from 'lucide-react'
import { useState } from 'react'

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
    <nav className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">الصياد</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline">أكاديمية الصياد</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition">
            {t('home')}
          </Link>
          <Link href="/signals" className="text-foreground hover:text-primary transition">
            {t('signals')}
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/dashboard" className="text-foreground hover:text-primary transition">
                {t('dashboard')}
              </Link>
              {user?.role === 'admin' && (
                <Link href="/admin" className="text-foreground hover:text-primary transition">
                  {t('admin_panel')}
                </Link>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="text-foreground"
            title={`Switch to ${language === 'ar' ? 'English' : 'العربية'}`}
          >
            <Globe className="w-5 h-5" />
            <span className="text-xs ml-1">{language === 'ar' ? 'EN' : 'AR'}</span>
          </Button>

          {isLoggedIn ? (
            <>
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{user?.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                خروج
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => setOpenLoginModal(true)}
              className="bg-primary hover:bg-primary/90"
            >
              دخول
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border px-4 py-4 flex flex-col gap-4">
          <Link href="/" className="text-foreground hover:text-primary">
            {t('home')}
          </Link>
          <Link href="/signals" className="text-foreground hover:text-primary">
            {t('signals')}
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/dashboard" className="text-foreground hover:text-primary">
                {t('dashboard')}
              </Link>
              {user?.role === 'admin' && (
                <Link href="/admin" className="text-foreground hover:text-primary">
                  {t('admin_panel')}
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  )
}
