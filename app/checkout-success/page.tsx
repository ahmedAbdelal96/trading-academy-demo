'use client'

import { useAuth, useLanguage } from '@/components/providers'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NavigationBar } from '@/components/navigation-bar'
import { DemoButton } from '@/components/demo-button'
import { CheckCircle, Download, ArrowLeft, TrendingUp, MessageSquare, BookOpen, Headphones } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const { isLoggedIn, activateSubscription } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
      return
    }
    activateSubscription('premium')
    const t = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(t)
  }, [isLoggedIn, router, activateSubscription])

  if (!isLoggedIn) return null

  const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <main className="container-page py-12">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Success Icon + Message */}
          <div
            className={`text-center py-10 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="relative inline-flex items-center justify-center mb-6">
              <div
                className="absolute inset-0 rounded-full animate-pulse-ring"
                style={{ background: 'rgba(22, 163, 74, 0.15)' }}
              />
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center shadow-2xl relative"
                style={{ background: 'linear-gradient(135deg, #16A34A, #22C55E)' }}
              >
                <CheckCircle className="w-14 h-14 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">تم بنجاح! 🎉</h1>
            <p className="text-lg text-slate-500">
              {language === 'ar' ? 'تم تفعيل اشتراكك في خطة متقدم بنجاح' : 'Your Premium subscription is now active'}
            </p>
          </div>

          {/* Receipt Card */}
          <div
            className={`bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden transition-all duration-700 delay-100 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {/* Receipt Header */}
            <div
              className="px-6 py-4 text-white flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
            >
              <span className="text-white/70 text-sm font-mono">#ORD-2025-0001</span>
              <span className="font-bold">إيصال الشراء</span>
            </div>

            {/* Receipt Details */}
            <div className="p-6 space-y-3">
              {[
                { label: 'رقم الطلب', value: '#ORD-2025-0001', mono: true },
                { label: 'الخطة المفعّلة', value: 'متقدم ⭐', mono: false },
                { label: 'المبلغ المدفوع', value: '199 ر.س', bold: true },
                { label: 'طريقة الدفع', value: 'بطاقة ائتمانية •••• 1111', mono: true },
                { label: 'تاريخ الشراء', value: new Date().toLocaleDateString('ar-SA'), mono: false },
                { label: 'صلاحية الاشتراك حتى', value: expiryDate, mono: false },
              ].map((item, idx) => (
                <div key={idx} className={`flex justify-between items-center py-2.5 ${idx < 5 ? 'border-b border-slate-100' : ''}`}>
                  <span className={`${item.mono ? 'font-mono' : 'font-semibold'} text-slate-800 text-sm ${(item as any).bold ? 'font-bold text-blue-600 text-base' : ''}`}>
                    {item.value}
                  </span>
                  <span className="text-sm text-slate-500">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Download */}
            <div className="px-6 pb-6">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-200 text-sm font-semibold">
                <Download className="w-4 h-4" />
                تحميل الإيصال PDF
              </button>
            </div>
          </div>

          {/* What's Included */}
          <div
            className={`rounded-3xl p-6 border transition-all duration-700 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ background: 'linear-gradient(135deg, #F0F9FF, #EEF2FF)', borderColor: '#BFDBFE' }}
          >
            <h2 className="text-lg font-bold text-slate-800 text-right mb-5 flex items-center gap-2 justify-end">
              ما تحصل عليه الآن
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: TrendingUp, label: 'توصيات غير محدودة', color: '#2563EB', bg: '#EFF6FF' },
                { icon: MessageSquare, label: 'Telegram Bot فوري', color: '#7C3AED', bg: '#F5F3FF' },
                { icon: BookOpen, label: 'جميع الكورسات', color: '#4F46E5', bg: '#EEF2FF' },
                { icon: Headphones, label: 'دعم مباشر 24/7', color: '#0EA5E9', bg: '#E0F2FE' },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-white rounded-2xl p-4 border border-white/80 shadow-sm flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: item.bg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 text-right">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Link href="/dashboard" className="flex-1">
              <button
                className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-xl text-base"
                style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', boxShadow: '0 8px 24px -4px rgba(37,99,235,0.4)' }}
              >
                <span>ذهاب إلى لوحة التحكم</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/signals">
              <button className="w-full sm:w-auto px-6 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 font-semibold transition-all duration-200 hover:-translate-y-0.5 text-sm">
                عرض التوصيات
              </button>
            </Link>
          </div>

        </div>
      </main>

      <DemoButton />
    </div>
  )
}
