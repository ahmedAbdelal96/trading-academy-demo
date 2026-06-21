'use client'

import { useState } from 'react'
import { useAuth, useLanguage } from '@/components/providers'
import { NavigationBar } from '@/components/navigation-bar'
import { DemoButton } from '@/components/demo-button'
import {
  TrendingUp, TrendingDown, CheckCircle, Calendar, ArrowLeft,
  Zap, Shield, Bot, BarChart3, Activity, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const recentSignals = [
  { pair: 'EUR/USD', type: 'BUY', entry: '1.0850', tp: '1.0920', sl: '1.0800', result: '+70 نقطة', date: '2025-01-15', status: 'مغلق', profit: true },
  { pair: 'GBP/USD', type: 'SELL', entry: '1.2750', tp: '1.2680', sl: '1.2800', result: '+70 نقطة', date: '2025-01-14', status: 'مغلق', profit: true },
  { pair: 'USD/JPY', type: 'BUY', entry: '149.80', tp: '150.50', sl: '149.20', result: '+65 نقطة', date: '2025-01-13', status: 'مغلق', profit: true },
  { pair: 'BTC/USD', type: 'SELL', entry: '$43,500', tp: '$42,000', sl: '$44,200', result: '-30 نقطة', date: '2025-01-12', status: 'مغلق', profit: false },
  { pair: 'XAU/USD', type: 'BUY', entry: '$2,385', tp: '$2,415', sl: '$2,360', result: '+30 نقطة', date: '2025-01-11', status: 'نشط', profit: true },
]

const plans = [
  {
    name: 'مجاني',
    price: '0',
    icon: '🎓',
    highlight: false,
    color: '#64748B',
    features: [
      '5 توصيات شهرية',
      'نتائج سابقة',
      'لوحة متابعة أساسية',
      'دعم عبر البريد',
      'كورس تمهيدي مجاني',
    ],
  },
  {
    name: 'أساسي',
    price: '99',
    icon: '📚',
    highlight: false,
    color: '#2563EB',
    features: [
      'توصيات يومية (5/يوم)',
      'تنبيهات تيليجرام',
      'لوحة متابعة شخصية',
      'كورسات تعليمية',
      'نتائج سابقة',
      'دعم فني',
      'تحليل أسبوعي',
      'فلترة شرعية',
    ],
  },
  {
    name: 'متقدم',
    price: '199',
    icon: '⭐',
    highlight: true,
    color: '#4F46E5',
    features: [
      'توصيات غير محدودة',
      'تنبيهات تيليجرام فورية',
      'لوحة تحليل متقدمة',
      'جميع الكورسات',
      'مؤشرات TradingView',
      'دعم فني مباشر',
      'تحليل شهري + أسبوعي',
      'فلترة شرعية متقدمة',
      'سجل تداول كامل',
    ],
  },
  {
    name: 'VIP',
    price: '399',
    icon: '👑',
    highlight: false,
    color: '#7C3AED',
    features: [
      'كل ميزات متقدم',
      'توصيات VIP حصرية',
      'استشارة شخصية',
      'دعم أولوية 24/7',
      'بوت تيليجرام خاص',
      'تقارير AI تحليلية',
      'كورسات حصرية',
      'مجموعة VIP',
    ],
  },
]

export default function SignalsPage() {
  const { isLoggedIn, setOpenLoginModal } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('الكل')

  const handleSubscribe = () => {
    if (!isLoggedIn) {
      setOpenLoginModal(true)
      return
    }
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      {/* Hero Section */}
      <section
        className="py-16 lg:py-20 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 60%, #7C3AED 100%)' }}
      >
        <div className="container-page">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            توصيات مباشرة — 78% نسبة نجاح
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            توصيات التداول الاحترافية
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            إشارات يومية موثوقة مع تحليل فني متكامل وإشعارات فورية على تيليجرام
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { value: '+4,500', label: 'توصية مرسلة' },
              { value: '78%', label: 'نسبة النجاح' },
              { value: '+12K', label: 'مشترك نشط' },
              { value: '+8 سنوات', label: 'خبرة' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="container-page py-12 space-y-16">

        {/* Recent Signals */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              {['الكل', 'فوركس', 'أسهم', 'عملات رقمية'].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeFilter === f
                      ? 'text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'
                  }`}
                  style={activeFilter === f ? { background: 'linear-gradient(135deg, #2563EB, #7C3AED)' } : {}}
                >
                  {f}
                </button>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              أحدث التوصيات
              <Zap className="w-6 h-6 text-blue-600" />
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentSignals.map((signal, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                      signal.profit ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {signal.profit ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {signal.result}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                      <Calendar className="w-3 h-3" />
                      {signal.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-slate-900">{signal.pair}</div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      signal.type === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {signal.type}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 border-t border-slate-100 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-mono font-semibold text-slate-700">{signal.entry}</span>
                    <span className="text-slate-400">سعر الدخول</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-mono font-semibold text-green-600">{signal.tp}</span>
                    <span className="text-slate-400">هدف الربح</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-mono font-semibold text-red-500">{signal.sl}</span>
                    <span className="text-slate-400">وقف الخسارة</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    signal.status === 'نشط' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {signal.status === 'نشط' && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />}
                    {signal.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Plans */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 badge-blue mb-4">خطط الاشتراك</div>
            <h2 className="section-title mb-3">اختر خطتك المثالية</h2>
            <p className="section-subtitle mx-auto">ابدأ بالمجاني وارقَ حسب احتياجاتك</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? 'border-indigo-300 shadow-2xl shadow-indigo-500/15'
                    : 'border-slate-200 shadow-md hover:shadow-xl bg-white'
                }`}
              >
                {plan.highlight && (
                  <div
                    className="rounded-t-3xl py-2.5 px-6 text-center text-white text-xs font-bold"
                    style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
                  >
                    ✦ الأكثر شعبية
                  </div>
                )}

                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div className="text-center">
                    <div className="text-3xl mb-2">{plan.icon}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold" style={{ color: plan.color }}>{plan.price}</span>
                      <span className="text-slate-400 text-xs">ريال/شهر</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: plan.color }} />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleSubscribe}
                    className="w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 mt-auto"
                    style={plan.highlight ? {
                      background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                      color: 'white',
                      boxShadow: '0 8px 24px -4px rgba(79,70,229,0.4)',
                    } : {
                      background: `${plan.color}15`,
                      color: plan.color,
                      border: `2px solid ${plan.color}30`,
                    }}
                  >
                    {plan.price === '0' ? 'ابدأ مجاناً' : 'اشترك الآن'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 badge-purple mb-4">آلية العمل</div>
            <h2 className="section-title mb-3">كيف تعمل منظومة التوصيات؟</h2>
            <p className="section-subtitle mx-auto">من التحليل حتى وصول الإشعار إلى هاتفك</p>
          </div>

          <div className="flex flex-wrap items-stretch justify-center gap-4">
            {[
              { icon: Shield, title: 'المحلل', desc: 'يدرس السوق ويضع التوصية', color: '#2563EB', bg: '#EFF6FF' },
              { icon: BarChart3, title: 'Backend', desc: 'معالجة وتحقق من التوصية', color: '#4F46E5', bg: '#EEF2FF' },
              { icon: Bot, title: 'Telegram Bot', desc: 'إرسال إشعار فوري', color: '#7C3AED', bg: '#F5F3FF' },
              { icon: Activity, title: 'إشعار الطالب', desc: 'يصلك على هاتفك فوراً', color: '#0EA5E9', bg: '#E0F2FE' },
            ].map((step, idx, arr) => {
              const Icon = step.icon
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div
                    className="bg-white rounded-2xl p-5 text-center border border-slate-200 hover:shadow-lg transition-all duration-200 w-36"
                    style={{ borderTopColor: step.color, borderTopWidth: 3 }}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                      style={{ background: step.bg }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>
                    <div className="font-bold text-slate-800 text-sm mb-1">{step.title}</div>
                    <div className="text-xs text-slate-500">{step.desc}</div>
                  </div>
                  {idx < arr.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-slate-300 flex-shrink-0" />
                  )}
                </div>
              )
            })}
          </div>
        </section>

      </main>

      <DemoButton />
    </div>
  )
}
