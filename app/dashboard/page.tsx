'use client'

import { useAuth, useLanguage } from '@/components/providers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { DemoButton } from '@/components/demo-button'
import {
  TrendingUp, TrendingDown, BookOpen, AlertCircle, CheckCircle,
  ArrowLeft, Activity, BarChart3, Clock, Star, Play, Zap
} from 'lucide-react'
import Link from 'next/link'

const recentSignals = [
  { pair: 'EUR/USD', type: 'BUY', entry: '1.0850', tp: '1.0920', sl: '1.0800', result: '+70 نقطة', status: 'مغلق', profit: true, date: '2025-01-15' },
  { pair: 'GBP/USD', type: 'SELL', entry: '1.2750', tp: '1.2680', sl: '1.2800', result: '+70 نقطة', status: 'مغلق', profit: true, date: '2025-01-14' },
  { pair: 'USD/JPY', type: 'BUY', entry: '149.80', tp: '150.50', sl: '149.20', result: '+65 نقطة', status: 'نشط', profit: true, date: '2025-01-13' },
  { pair: 'BTC/USD', type: 'BUY', entry: '$43,000', tp: '$44,500', sl: '$42,000', result: '-30 نقطة', status: 'مغلق', profit: false, date: '2025-01-12' },
  { pair: 'GOLD', type: 'SELL', entry: '$2,390', tp: '$2,360', sl: '$2,410', result: '+30 نقطة', status: 'نشط', profit: true, date: '2025-01-11' },
]

const courses = [
  { title: 'أساسيات التحليل الفني', progress: 75, lessons: 12, totalLessons: 16, color: '#2563EB' },
  { title: 'إدارة المحفظة والمخاطر', progress: 40, lessons: 6, totalLessons: 15, color: '#7C3AED' },
  { title: 'التداول في الفوركس', progress: 20, lessons: 3, totalLessons: 18, color: '#4F46E5' },
]

export default function DashboardPage() {
  const { isLoggedIn, user } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) router.push('/')
  }, [isLoggedIn, router])

  if (!isLoggedIn) return null

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* ============================================================
            WELCOME BANNER
            ============================================================ */}
        <div
          className="rounded-3xl p-6 md:p-8 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #7C3AED 100%)' }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full" style={{ transform: 'translate(30%, -30%)' }} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm font-medium mb-1">مرحباً بعودتك 👋</p>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {language === 'ar' ? `أهلاً ${user?.name}` : `Welcome, ${user?.name}`}
              </h1>
              <p className="text-white/80 text-sm">
                {language === 'ar' ? 'لديك خطة متقدمة نشطة — آخر نشاط: منذ ساعتين' : 'Premium plan active — Last seen: 2 hours ago'}
              </p>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2.5 border border-white/30 text-sm font-semibold">
                ✦ خطة متقدم — نشطة
              </div>
              <p className="text-white/60 text-xs">تنتهي في: 21 يوليو 2025</p>
            </div>
          </div>
        </div>

        {/* ============================================================
            METRIC CARDS
            ============================================================ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: language === 'ar' ? 'إجمالي الأرباح' : 'Total Profit',
              value: '+$2,450',
              change: '+18.4% هذا الشهر',
              icon: TrendingUp,
              up: true,
              bg: '#EFF6FF',
              iconBg: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
              valueColor: '#2563EB',
            },
            {
              label: language === 'ar' ? 'نسبة الفوز' : 'Win Rate',
              value: '89%',
              change: '+5% مقارنة بالشهر الماضي',
              icon: Star,
              up: true,
              bg: '#F5F3FF',
              iconBg: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
              valueColor: '#7C3AED',
            },
            {
              label: language === 'ar' ? 'التوصيات النشطة' : 'Active Signals',
              value: '12',
              change: '3 جديدة اليوم',
              icon: AlertCircle,
              up: true,
              bg: '#EEF2FF',
              iconBg: 'linear-gradient(135deg, #4F46E5, #6366F1)',
              valueColor: '#4F46E5',
            },
            {
              label: language === 'ar' ? 'الدورات المكتملة' : 'Courses Done',
              value: '5/8',
              change: 'الدورة التالية: غداً',
              icon: BookOpen,
              up: true,
              bg: '#E0F2FE',
              iconBg: 'linear-gradient(135deg, #0EA5E9, #06B6D4)',
              valueColor: '#0EA5E9',
            },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="metric-card" style={{ background: stat.bg }}>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ background: stat.iconBg }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-lg ${stat.up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {stat.up ? '▲' : '▼'}
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: stat.valueColor }}>{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.change}</div>
              </div>
            )
          })}
        </div>

        {/* ============================================================
            MAIN CONTENT GRID
            ============================================================ */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* My Courses — 2 columns */}
          <div className="lg:col-span-2 dashboard-card">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <Link href="/dashboard/course">
                <button className="text-sm text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
                  عرض الكل <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </Link>
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                {language === 'ar' ? 'دوراتي التعليمية' : 'My Courses'}
              </h2>
            </div>

            <div className="p-5 space-y-4">
              {courses.map((course, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-4 hover:bg-slate-100 transition-all duration-200 cursor-pointer group border border-slate-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{course.lessons}/{course.totalLessons} درس</span>
                      <div
                        className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                        style={{ background: course.color }}
                      >
                        {course.progress}%
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm text-right">{course.title}</h3>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%`, background: course.color }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/dashboard/course">
                      <button
                        className="flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: course.color }}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        متابعة الدرس
                      </button>
                    </Link>
                    <span className="text-xs text-slate-400">متبقي: {course.totalLessons - course.lessons} درس</span>
                  </div>
                </div>
              ))}

              <Link href="/dashboard/course" className="block">
                <button
                  className="w-full py-3 rounded-2xl border-2 border-dashed border-blue-200 text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  {language === 'ar' ? 'بدء درس جديد' : 'Start New Lesson'}
                </button>
              </Link>
            </div>
          </div>

          {/* Performance Card */}
          <div className="dashboard-card">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 justify-end">
                {language === 'ar' ? 'ملخص الأداء' : 'Performance'}
                <Activity className="w-5 h-5 text-purple-600" />
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: 'الصفقات الرابحة', value: '45', total: '50', color: '#16A34A', pct: 90 },
                { label: 'متوسط الربح', value: '68 نقطة', total: '', color: '#2563EB', pct: 68 },
                { label: 'أفضل صفقة', value: '+245 نقطة', total: '', color: '#7C3AED', pct: 100 },
                { label: 'أسوأ صفقة', value: '-42 نقطة', total: '', color: '#DC2626', pct: 20 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold" style={{ color: item.color }}>{item.value}</span>
                    <span className="text-slate-500 font-medium">{item.label}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${item.pct}%`, background: item.color }}
                    />
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 mt-4 border border-blue-100 text-center">
                <div className="text-2xl font-bold gradient-text mb-1">89%</div>
                <div className="text-xs text-slate-500 font-medium">نسبة النجاح الإجمالية</div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            RECENT SIGNALS TABLE
            ============================================================ */}
        <div className="dashboard-card">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <Link href="/signals">
              <button className="text-sm text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
                عرض الكل <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </Link>
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              {language === 'ar' ? 'آخر التوصيات' : 'Recent Signals'}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th>التاريخ</th>
                  <th>الحالة</th>
                  <th>النتيجة</th>
                  <th>وقف الخسارة</th>
                  <th>هدف الربح</th>
                  <th>الدخول</th>
                  <th>الاتجاه</th>
                  <th>الزوج</th>
                </tr>
              </thead>
              <tbody>
                {recentSignals.map((sig, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                    <td>
                      <span className="text-xs text-slate-400 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" />
                        {sig.date}
                      </span>
                    </td>
                    <td>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                        sig.status === 'نشط' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {sig.status === 'نشط' && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />}
                        {sig.status}
                      </span>
                    </td>
                    <td>
                      <span className={`font-bold text-sm ${sig.profit ? 'text-green-600' : 'text-red-500'}`}>
                        {sig.result}
                      </span>
                    </td>
                    <td><span className="text-sm text-red-500 font-mono font-medium">{sig.sl}</span></td>
                    <td><span className="text-sm text-green-600 font-mono font-medium">{sig.tp}</span></td>
                    <td><span className="text-sm text-slate-600 font-mono">{sig.entry}</span></td>
                    <td>
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                        sig.type === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {sig.type === 'BUY' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {sig.type}
                      </span>
                    </td>
                    <td>
                      <span className="font-bold text-slate-800 text-sm">{sig.pair}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <DemoButton />
    </DashboardLayout>
  )
}
