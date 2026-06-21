'use client'

import { useState } from 'react'
import { useAuth, useLanguage } from '@/components/providers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  BookOpen,
  LogOut,
  Menu,
  X,
  Home,
  Bot,
  TrendingUp,
  MessageCircle,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const menuItems = [
    {
      label: language === 'ar' ? 'الرئيسية' : 'Home',
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
      label: language === 'ar' ? 'تليجرام' : 'Telegram',
      href: '/telegram-bots',
      icon: MessageCircle,
    },
    ...(user?.role === 'admin'
      ? [
          {
            label: language === 'ar' ? 'الإدارة' : 'Admin',
            href: '/admin',
            icon: Bot,
          },
        ]
      : []),
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - RTL positioned on the right */}
      <aside
        className={`fixed right-0 top-0 h-full w-64 bg-sidebar border-l border-sidebar-border transform transition-transform duration-200 z-40 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0 md:relative`}
      >
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sidebar-primary to-sidebar-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">الصياد</span>
            </div>
            <span className="font-bold">{language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</span>
          </Link>
          <p className="text-xs text-sidebar-foreground/60">
            {user?.name}
          </p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <Link key={idx} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent gap-3"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full gap-2"
          >
            <LogOut className="w-4 h-4" />
            {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
          </Button>
        </div>
      </aside>

      {/* Mobile Menu Toggle */}
      <Button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        variant="ghost"
        size="icon"
        className="fixed bottom-6 left-6 md:hidden z-50 bg-card border border-border"
      >
        {sidebarOpen ? <X /> : <Menu />}
      </Button>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
