'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe, TrendingUp, LogOut, LayoutDashboard, Shield } from 'lucide-react'
import { useState } from 'react'
import { LoginModal } from '@/components/modals/login-modal'

export function NavigationBar() {
  const { isLoggedIn, user, setOpenLoginModal, logout } = useAuth()
  const { language, toggleLanguage } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/')
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/signals', label: 'التوصيات' },
    { href: '/markets', label: 'الأسواق' },
    { href: '/telegram-bots', label: 'بوتات تيليجرام' },
    ...(isLoggedIn ? [{ href: '/dashboard', label: 'الدورات' }] : [{ href: '/signals', label: 'الدورات' }]),
    ...(isLoggedIn ? [{ href: '/dashboard', label: 'لوحة التحكم' }] : []),
    ...(isLoggedIn && user?.role === 'admin' ? [{ href: '/admin', label: 'الإدارة' }] : []),
  ]

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo — Right side (RTL) */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
              >
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-slate-900 leading-tight block">أكاديمية الصياد</span>
                <span className="text-xs text-slate-500 leading-tight block">للأسواق المالية</span>
              </div>
            </Link>

            {/* Desktop Nav Links — Center */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200 text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-semibold">{language === 'ar' ? 'EN' : 'ع'}</span>
              </button>

              {isLoggedIn ? (
                <div className="hidden sm:flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: user?.role === 'admin' ? 'linear-gradient(135deg, #7C3AED, #4F46E5)' : 'linear-gradient(135deg, #2563EB, #0EA5E9)' }}
                    >
                      {user?.name?.charAt(0)}
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-slate-800">{user?.name}</div>
                      <div className="text-xs text-slate-500">{user?.role === 'admin' ? 'مدير' : 'طالب'}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setOpenLoginModal(true)}
                    className="btn-primary text-sm px-5"
                  >
                    دخول تجريبي
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setOpenLoginModal(true)}
                    className="btn-outline-purple text-sm px-4"
                  >
                    <Shield className="w-3.5 h-3.5 ml-1.5" />
                    عرض الإدارة
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:bg-slate-100 transition-all duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white animate-fade-in-up">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <div className="pt-4 border-t border-slate-100 space-y-2">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
                      >
                        {user?.name?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{user?.name}</div>
                        <div className="text-xs text-slate-500">{user?.role === 'admin' ? 'مدير النظام' : 'طالب'}</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      تسجيل الخروج
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { setOpenLoginModal(true); setMobileMenuOpen(false) }}
                      className="w-full btn-primary text-sm py-3 rounded-xl text-center font-semibold text-white"
                      style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
                    >
                      دخول تجريبي كطالب
                    </button>
                    <button
                      onClick={() => { setOpenLoginModal(true); setMobileMenuOpen(false) }}
                      className="w-full border-2 border-purple-600 text-purple-600 bg-transparent hover:bg-purple-50 rounded-xl py-3 text-sm font-semibold transition-all duration-200 text-center"
                    >
                      عرض لوحة الإدارة
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <LoginModal />
    </>
  )
}
