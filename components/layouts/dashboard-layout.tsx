'use client'

import { useState } from 'react'
import { useAuth, useLanguage } from '@/components/providers'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  BarChart3,
  BookOpen,
  LogOut,
  Menu,
  X,
  Home,
  MessageCircle,
  TrendingUp,
  Shield,
  Bot,
  ChevronLeft,
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const menuItems = [
    {
      label: language === 'ar' ? 'لوحة التحكم' : 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      label: language === 'ar' ? 'الدورات' : 'Courses',
      href: '/dashboard/course',
      icon: BookOpen,
    },
    {
      label: language === 'ar' ? 'التوصيات' : 'Signals',
      href: '/signals',
      icon: TrendingUp,
    },
    {
      label: language === 'ar' ? 'الأسواق' : 'Markets',
      href: '/markets',
      icon: BarChart3,
    },
    {
      label: language === 'ar' ? 'تيليجرام' : 'Telegram',
      href: '/telegram-bots',
      icon: MessageCircle,
    },
    ...(user?.role === 'admin'
      ? [
          {
            label: language === 'ar' ? 'الإدارة' : 'Admin',
            href: '/admin',
            icon: Shield,
          },
        ]
      : []),
  ]

  return (
    <div className="flex h-screen bg-background" style={{ direction: 'rtl' }}>
      {/* Sidebar — Right side for RTL */}
      <aside
        className={`fixed right-0 top-0 h-full w-64 bg-white border-l border-slate-200 shadow-xl transform transition-transform duration-300 z-40 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0 md:relative md:shadow-none`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-slate-100 flex-shrink-0">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
            >
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">أكاديمية الصياد</div>
              <div className="text-xs text-slate-500">للأسواق المالية</div>
            </div>
          </Link>

          {/* User Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-3 border border-blue-100">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base font-bold flex-shrink-0"
                style={{
                  background: user?.role === 'admin'
                    ? 'linear-gradient(135deg, #7C3AED, #4F46E5)'
                    : 'linear-gradient(135deg, #2563EB, #0EA5E9)'
                }}
              >
                {user?.name?.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm text-slate-800 truncate">{user?.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-xs text-slate-500">
                    {user?.role === 'admin' ? 'مدير النظام' : `خطة ${user?.subscriptionPlan === 'premium' ? 'متقدم' : user?.subscriptionPlan === 'vip' ? 'VIP' : 'أساسي'}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
            {language === 'ar' ? 'القائمة الرئيسية' : 'Main Menu'}
          </div>
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={idx} href={item.href} onClick={() => setSidebarOpen(false)}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-blue-700 font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)',
                    border: '1px solid #DBEAFE',
                  } : {}}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="text-sm">{item.label}</span>
                  {isActive && <ChevronLeft className="w-4 h-4 mr-auto text-blue-400" />}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 flex-shrink-0 space-y-2">
          <Link href="/" className="block">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all duration-200 cursor-pointer text-sm">
              <Home className="w-4 h-4" />
              {language === 'ar' ? 'الصفحة الرئيسية' : 'Home'}
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 left-6 md:hidden z-50 w-12 h-12 bg-white border border-slate-200 shadow-xl rounded-2xl flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all duration-200"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-4 md:p-8 max-w-full">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
