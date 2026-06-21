'use client'

import Link from 'next/link'
import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import {
  TrendingUp, TrendingDown, BarChart3, Zap, Users, Award, BookOpen,
  ArrowLeft, Wallet, MessageSquare, CheckCircle, Smartphone, Play,
  Bot, Shield, ChevronRight, Star, Activity
} from 'lucide-react'
import { NavigationBar } from '@/components/navigation-bar'
import { DemoButton } from '@/components/demo-button'

const tickerItems = [
  { symbol: 'TASI', value: '+1.24%', up: true, price: '12,450' },
  { symbol: 'BTC/USD', value: '+2.8%', up: true, price: '$43,250' },
  { symbol: 'NASDAQ', value: '-0.6%', up: false, price: '18,920' },
  { symbol: 'XAU/USD', value: '+0.4%', up: true, price: '$2,385' },
  { symbol: 'EUR/USD', value: '-0.2%', up: false, price: '1.0850' },
  { symbol: 'S&P 500', value: '+0.78%', up: true, price: '5,280' },
  { symbol: 'OIL/USD', value: '-0.87%', up: false, price: '$78.45' },
  { symbol: 'ETH/USD', value: '+1.9%', up: true, price: '$2,280' },
]

const chartBars = [35, 55, 45, 70, 60, 80, 65, 75, 85, 72, 90, 78]

export default function HomePage() {
  const auth = useAuth()
  const language = useLanguage()

  if (!auth || !language) return null

  const { isLoggedIn, setOpenLoginModal, user } = auth

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      {/* ============================================================
          MARKET TICKER BAR
          ============================================================ */}
      <div className="bg-white border-b border-slate-200 py-3 overflow-hidden">
        <div className="ticker-wrapper">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div
                key={idx}
                className={`market-ticker flex-shrink-0 ${item.up ? 'up' : 'down'}`}
              >
                <span className="font-bold">{item.symbol}</span>
                <span className="font-mono text-xs opacity-80">{item.price}</span>
                <span className="font-bold flex items-center gap-0.5">
                  {item.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #2563EB, transparent)', transform: 'translate(30%, -30%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #7C3AED, transparent)', transform: 'translate(-30%, 30%)' }}
          />
        </div>

        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Right Column — Text Content */}
            <div className="space-y-8 text-right order-2 lg:order-1 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                منصة عربية متكاملة للتداول والتعليم
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  تعلم التداول{' '}
                  <span className="gradient-text">باحتراف</span>{' '}
                  مع توصيات ذكية وبيانات سوق مباشرة
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  منصة واحدة تجمع بين الكورسات، الاشتراكات، توصيات التداول، TradingView، Telegram Bots، ولوحة تحكم احترافية للطلاب والإدارة.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {isLoggedIn && user?.role === 'student' ? (
                  <Link href="/dashboard">
                    <button
                      className="btn-primary flex items-center gap-2 justify-center px-6 py-3 rounded-xl text-white font-semibold"
                      style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
                    >
                      <BarChart3 className="w-5 h-5" />
                      لوحة التحكم
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </Link>
                ) : isLoggedIn && user?.role === 'admin' ? (
                  <Link href="/admin">
                    <button
                      className="flex items-center gap-2 justify-center px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:opacity-90 shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' }}
                    >
                      <Shield className="w-5 h-5" />
                      لوحة الإدارة
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setOpenLoginModal(true)}
                      className="flex items-center gap-2 justify-center px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg shadow-blue-500/30"
                      style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
                    >
                      <Play className="w-5 h-5 fill-white" />
                      دخول تجريبي كطالب
                    </button>
                    <button
                      onClick={() => setOpenLoginModal(true)}
                      className="flex items-center gap-2 justify-center px-6 py-3 rounded-xl font-semibold border-2 border-purple-600 text-purple-700 hover:bg-purple-50 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <Shield className="w-5 h-5" />
                      عرض لوحة الإدارة
                    </button>
                  </>
                )}
                <Link href="/signals">
                  <button className="flex items-center gap-2 justify-center px-6 py-3 rounded-xl font-semibold border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5 shadow-sm w-full sm:w-auto">
                    مشاهدة خطط الاشتراك
                  </button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 text-sm text-slate-500 pt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>بيانات آمنة 100%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>دعم عربي متكامل</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>فلترة شرعية</span>
                </div>
              </div>
            </div>

            {/* Left Column — Dashboard Mockup */}
            <div className="relative order-1 lg:order-2 min-h-[540px] flex items-center justify-center">
              {/* Main Dashboard Card */}
              <div
                className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 floating-slow"
                style={{ boxShadow: '0 32px 64px -12px rgba(37,99,235,0.15), 0 0 0 1px rgba(37,99,235,0.05)' }}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-slate-500 font-medium">مباشر الآن</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-700">لوحة التحكم الشخصية</h3>
                </div>

                {/* Metric Cards Row */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div
                    className="rounded-2xl p-4 text-white"
                    style={{ background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)' }}
                  >
                    <div className="text-xs font-medium text-white/70 mb-1">إجمالي التوصيات</div>
                    <div className="text-2xl font-bold">4,500</div>
                    <div className="text-xs text-white/70 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +12% هذا الشهر
                    </div>
                  </div>
                  <div
                    className="rounded-2xl p-4 text-white floating-fast"
                    style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' }}
                  >
                    <div className="text-xs font-medium text-white/70 mb-1">إجمالي الأرباح</div>
                    <div className="text-2xl font-bold">+4.2K</div>
                    <div className="text-xs text-white/70 mt-1 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> 78% نسبة نجاح
                    </div>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="bg-slate-50 rounded-2xl p-4 mb-5 border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-500 font-medium">أداء آخر 12 أسبوع</span>
                    <span className="text-xs font-bold text-green-600">↑ 23.4%</span>
                  </div>
                  <div className="flex items-end gap-1 h-16">
                    {chartBars.map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          background: `linear-gradient(to top, #2563EB${i === chartBars.length - 1 ? '' : '99'}, #0EA5E9${i === chartBars.length - 1 ? '' : '66'})`,
                          opacity: i === chartBars.length - 1 ? 1 : 0.7 + (i / chartBars.length) * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Market Mini Cards */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {[
                    { s: 'TASI', v: '+1.24%', up: true },
                    { s: 'BTC', v: '+2.8%', up: true },
                    { s: 'NASDAQ', v: '-0.6%', up: false },
                    { s: 'XAU/USD', v: '+0.4%', up: true },
                  ].map((m, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs border ${
                        m.up
                          ? 'bg-green-50 border-green-200 text-green-700'
                          : 'bg-red-50 border-red-200 text-red-700'
                      }`}
                    >
                      <span className="font-semibold">{m.s}</span>
                      <span className="font-bold">{m.v}</span>
                    </div>
                  ))}
                </div>

                {/* Telegram Connected Badge */}
                <div className="flex items-center gap-3 bg-blue-50 rounded-2xl p-3 border border-blue-100">
                  <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-xs font-semibold text-slate-700">Telegram متصل</div>
                    <div className="text-xs text-slate-500">@AlsayadTradingBot</div>
                  </div>
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Floating Signal Card */}
              <div
                className="absolute -bottom-4 -right-4 md:-right-8 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 w-52 floating-fast"
                style={{ animationDelay: '1s', boxShadow: '0 16px 40px -8px rgba(37,99,235,0.2)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="badge-success text-xs">شراء ↑</span>
                  <span className="font-bold text-sm text-slate-800">BUY AAPL</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-800">185.20 $</span>
                    <span className="text-slate-400">دخول:</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-green-600">192.00 $</span>
                    <span className="text-slate-400">هدف:</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-red-500">181.00 $</span>
                    <span className="text-slate-400">وقف:</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS SECTION
          ============================================================ */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: 'طالب نشط', value: '+12,000', color: 'blue' as const, bg: '#EFF6FF', iconColor: '#2563EB' },
              { icon: TrendingUp, label: 'توصية مرسلة', value: '+4,500', color: 'purple' as const, bg: '#F5F3FF', iconColor: '#7C3AED' },
              { icon: Award, label: 'نسبة النجاح', value: '78%', color: 'indigo' as const, bg: '#EEF2FF', iconColor: '#4F46E5' },
              { icon: Zap, label: 'سنوات الخبرة', value: '+8', color: 'blue' as const, bg: '#E0F2FE', iconColor: '#0EA5E9' },
            ].map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="metric-card text-center group">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200"
                    style={{ background: stat.bg }}
                  >
                    <Icon className="w-7 h-7" style={{ color: stat.iconColor }} />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1" style={{ color: stat.iconColor }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SERVICES SECTION
          ============================================================ */}
      <section className="section-padding">
        <div className="container-page">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge-blue mb-4">خدماتنا</div>
            <h2 className="section-title mb-4">خدماتنا المتكاملة</h2>
            <p className="section-subtitle mx-auto">
              جميع الأدوات التي تحتاجها للتداول الاحترافي والتعليم المستمر في منصة واحدة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'الدورات التعليمية',
                desc: 'محتوى تعليمي متقدم من خبراء التداول العرب. شاهد، تعلم، وطبّق مباشرة.',
                bg: '#EFF6FF',
                iconColor: '#2563EB',
                gradient: 'from-blue-50 to-blue-100/50',
              },
              {
                icon: TrendingUp,
                title: 'توصيات التداول',
                desc: 'إشارات يومية مباشرة مع تحليل فني كامل ونسبة نجاح تجاوزت 78%.',
                bg: '#F5F3FF',
                iconColor: '#7C3AED',
                gradient: 'from-purple-50 to-purple-100/50',
              },
              {
                icon: BarChart3,
                title: 'مؤشرات TradingView',
                desc: 'تحليل فني متقدم وفوري مع مؤشرات مخصصة ورسوم بيانية تفاعلية.',
                bg: '#EEF2FF',
                iconColor: '#4F46E5',
                gradient: 'from-indigo-50 to-indigo-100/50',
              },
              {
                icon: MessageSquare,
                title: 'بوتات تيليجرام',
                desc: 'إشعارات فورية على هاتفك لكل توصية جديدة وتحديثات السوق.',
                bg: '#E0F2FE',
                iconColor: '#0EA5E9',
                gradient: 'from-sky-50 to-sky-100/50',
              },
              {
                icon: CheckCircle,
                title: 'الفلترة الشرعية',
                desc: 'أسهم مفلترة وفق الضوابط الشرعية بشكل آلي ودقيق.',
                bg: '#F0FDF4',
                iconColor: '#16A34A',
                gradient: 'from-green-50 to-green-100/50',
              },
              {
                icon: Wallet,
                title: 'سجل التداول',
                desc: 'تحليل أداء محفظتك الكامل مع إحصائيات تفصيلية وتقارير أسبوعية.',
                bg: '#FFF7ED',
                iconColor: '#EA580C',
                gradient: 'from-orange-50 to-orange-100/50',
              },
            ].map((service, idx) => {
              const Icon = service.icon
              return (
                <div
                  key={idx}
                  className="premium-card p-6 text-right group cursor-default"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200"
                    style={{ background: service.bg }}
                  >
                    <Icon className="w-7 h-7" style={{ color: service.iconColor }} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                  <div
                    className="mt-4 flex items-center gap-1 text-xs font-semibold"
                    style={{ color: service.iconColor }}
                  >
                    <span>اعرف أكثر</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          DEMO FLOW SECTION
          ============================================================ */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container-page">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 badge-purple mb-4">كيف يعمل</div>
            <h2 className="section-title mb-4">رحلة المستخدم الكاملة</h2>
            <p className="section-subtitle mx-auto">من التسجيل حتى التداول الاحترافي في خطوات بسيطة</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: 'زائر', icon: Users, color: '#2563EB' },
              { label: 'اشتراك', icon: CheckCircle, color: '#0EA5E9' },
              { label: 'دفع', icon: Wallet, color: '#4F46E5' },
              { label: 'لوحة الطالب', icon: BarChart3, color: '#7C3AED' },
              { label: 'توصيات', icon: TrendingUp, color: '#6D28D9' },
              { label: 'تيليجرام', icon: MessageSquare, color: '#4F46E5' },
              { label: 'لوحة الإدارة', icon: Shield, color: '#2563EB' },
            ].map((step, idx, arr) => {
              const Icon = step.icon
              return (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md"
                      style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}CC)` }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 text-center max-w-16">{step.label}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-slate-300 flex-shrink-0" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          PRICING SECTION
          ============================================================ */}
      <section className="section-padding">
        <div className="container-page">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge-blue mb-4">الأسعار</div>
            <h2 className="section-title mb-4">خطط الاشتراك المميزة</h2>
            <p className="section-subtitle mx-auto">اختر الخطة المناسبة لمستوى تداولك واحتياجاتك</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
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
                  'دعم فني أساسي',
                  'تحليل أسبوعي',
                  'فلترة شرعية',
                ],
              },
              {
                name: 'متقدم',
                price: '199',
                icon: '⭐',
                highlight: false,
                color: '#4F46E5',
                features: [
                  'توصيات غير محدودة',
                  'تنبيهات تيليجرام فورية',
                  'لوحة تحليل متقدمة',
                  'جميع الكورسات',
                  'مؤشرات TradingView',
                  'دعم فني مباشر',
                  'تحليل أسبوعي + شهري',
                  'فلترة شرعية متقدمة',
                  'سجل تداول كامل',
                ],
              },
              {
                name: 'VIP',
                price: '399',
                icon: '👑',
                highlight: true,
                color: '#7C3AED',
                features: [
                  'كل ميزات متقدم',
                  'توصيات VIP حصرية',
                  'استشارة شخصية أسبوعية',
                  'دعم أولوية 24/7',
                  'بوت تيليجرام خاص',
                  'تقارير AI تحليلية',
                  'كورسات حصرية',
                  'مجموعة VIP خاصة',
                  'فلترة شرعية + إسلامية',
                  'تقرير أداء شهري',
                ],
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? 'border-purple-300 shadow-2xl shadow-purple-500/15'
                    : 'border-slate-200 shadow-md hover:shadow-xl bg-white'
                }`}
                style={plan.highlight ? {
                  background: 'linear-gradient(160deg, #7C3AED05 0%, #4F46E510 100%)',
                } : {}}
              >
                {plan.highlight && (
                  <>
                    <div
                      className="rounded-t-3xl py-3 px-6 text-center text-white text-sm font-bold"
                      style={{ background: 'linear-gradient(135deg, #7C3AED, #4F46E5)' }}
                    >
                      ⭐ الأكثر تميزاً وشمولاً
                    </div>
                    <div className="absolute -top-px left-0 right-0 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #7C3AED, #4F46E5)' }} />
                  </>
                )}

                <div className="p-6 flex flex-col gap-5 flex-1">
                  <div className="text-center">
                    <div className="text-4xl mb-3">{plan.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold" style={{ color: plan.color }}>{plan.price}</span>
                      <span className="text-slate-400 text-sm">ريال /شهر</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2.5">
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/checkout" className="block mt-auto">
                    <button
                      className="w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                      style={plan.highlight ? {
                        background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                        color: 'white',
                        boxShadow: '0 8px 24px -4px rgba(124,58,237,0.4)',
                      } : {
                        background: `${plan.color}15`,
                        color: plan.color,
                        border: `2px solid ${plan.color}30`,
                      }}
                    >
                      {plan.price === '0' ? 'ابدأ مجاناً' : 'اشترك الآن'}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <section className="py-16 px-4">
        <div className="container-page">
          <div
            className="rounded-3xl p-12 text-center text-white relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 40%, #7C3AED 100%)' }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full" style={{ transform: 'translate(-50%, -50%)' }} />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full" style={{ transform: 'translate(50%, 50%)' }} />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Activity className="w-4 h-4" />
                جاهز للبدء؟
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">جاهز لتجربة المنصة؟</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                ابدأ رحلتك في التداول الاحترافي اليوم وتعلم من أفضل الخبراء في المنطقة العربية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setOpenLoginModal(true)}
                  className="flex items-center gap-2 justify-center px-8 py-4 bg-white rounded-2xl font-bold text-blue-700 hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl text-base"
                >
                  <Play className="w-5 h-5 fill-blue-600" />
                  تشغيل الديمو
                </button>
                <button
                  onClick={() => setOpenLoginModal(true)}
                  className="flex items-center gap-2 justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl font-bold text-white hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5 text-base"
                >
                  <Shield className="w-5 h-5" />
                  دخول لوحة الإدارة
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4">
        <div className="container-page">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
              >
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">أكاديمية الصياد للأسواق المالية</div>
                <div className="text-xs text-slate-500">منصة تداول عربية متكاملة</div>
              </div>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/signals" className="hover:text-white transition-colors">التوصيات</Link>
              <Link href="/markets" className="hover:text-white transition-colors">الأسواق</Link>
              <Link href="/telegram-bots" className="hover:text-white transition-colors">تيليجرام</Link>
            </div>
            <div className="text-center text-xs">
              <p>© 2025 أكاديمية الصياد — جميع الحقوق محفوظة</p>
              <p className="text-slate-600 mt-1">منصة توضيحية — بيانات وهمية فقط</p>
            </div>
          </div>
        </div>
      </footer>

      <DemoButton />
    </div>
  )
}
