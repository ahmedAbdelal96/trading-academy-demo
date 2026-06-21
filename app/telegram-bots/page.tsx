'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/providers'
import { NavigationBar } from '@/components/navigation-bar'
import { DemoButton } from '@/components/demo-button'
import {
  MessageSquare, Zap, Bot, CheckCircle, Bell, Activity,
  RefreshCw, ChevronRight, X, AlertTriangle
} from 'lucide-react'

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border min-w-72 animate-fade-in-up ${
      type === 'success' ? 'bg-white border-green-200 text-green-800' : 'bg-white border-red-200 text-red-800'
    }`}>
      {type === 'success'
        ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
        : <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />}
      <span className="font-semibold text-sm">{message}</span>
      <button onClick={onClose} className="mr-auto text-slate-400 hover:text-slate-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

const bots = [
  {
    id: 'broadcast',
    name: 'Signal Broadcast Bot',
    nameAr: 'بوت بث التوصيات',
    desc: 'يستقبل توصيات المحللين ويبثها فورياً لجميع المشتركين مع تفاصيل الدخول والأهداف.',
    icon: Bell,
    color: '#2563EB',
    bg: '#EFF6FF',
    features: ['إشعارات فورية', 'بث جماعي', 'تفاصيل الدخول والأهداف', 'فلترة حسب الخطة'],
  },
  {
    id: 'webhook',
    name: 'TradingView Webhook Bot',
    nameAr: 'بوت TradingView Webhook',
    desc: 'يربط TradingView Alerts مباشرة بقناة التيليجرام لإرسال إشعارات تلقائية فور تفعيل المؤشر.',
    icon: Zap,
    color: '#7C3AED',
    bg: '#F5F3FF',
    features: ['ربط TradingView', 'Webhook تلقائي', 'تنبيهات المؤشرات', 'إرسال فوري'],
  },
  {
    id: 'ai',
    name: 'AI Stock Analysis Bot',
    nameAr: 'بوت تحليل الأسهم بالذكاء الاصطناعي',
    desc: 'يحلل الأسهم والأسواق باستخدام نماذج AI ويرسل تقارير أسبوعية مفصّلة وتوصيات تحليلية.',
    icon: Bot,
    color: '#4F46E5',
    bg: '#EEF2FF',
    features: ['تحليل AI متقدم', 'تقارير أسبوعية', 'تحليل مشاعر السوق', 'فلترة شرعية'],
  },
]

export default function TelegramBotsPage() {
  const { language } = useLanguage()
  const [connected, setConnected] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [botStates, setBotStates] = useState<Record<string, 'inactive' | 'active' | 'loading'>>({
    broadcast: 'inactive',
    webhook: 'inactive',
    ai: 'inactive',
  })
  const [testingWebhook, setTestingWebhook] = useState(false)
  const [copied, setCopied] = useState(false)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
  }

  const handleConnect = () => {
    setConnected(true)
    showToast('✅ تم ربط تيليجرام بنجاح! ستستقبل الآن جميع التوصيات والإشعارات.', 'success')
  }

  const handleTestWebhook = () => {
    setTestingWebhook(true)
    showToast('⏳ جاري إرسال رسالة اختبار...', 'success')
    setTimeout(() => {
      setTestingWebhook(false)
      showToast('✅ تم استلام رسالة الاختبار بنجاح على تيليجرام!', 'success')
    }, 2000)
  }

  const handleActivateBot = (botId: string) => {
    if (!connected) {
      showToast('يجب ربط تيليجرام أولاً قبل تفعيل البوت', 'error')
      return
    }
    setBotStates(prev => ({ ...prev, [botId]: 'loading' }))
    setTimeout(() => {
      setBotStates(prev => ({ ...prev, [botId]: 'active' }))
      showToast('✅ تم تفعيل البوت بنجاح!', 'success')
    }, 1500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText('@AlsayadTradingBot')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Hero */}
      <section
        className="py-14 text-white"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4F46E5 60%, #7C3AED 100%)' }}
      >
        <div className="container-page text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-5 border border-white/30">
            <MessageSquare className="w-4 h-4" />
            منظومة بوتات تيليجرام المتكاملة
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">بوتات تيليجرام الاحترافية</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            ربط متكامل بين منصتك وتيليجرام — من إشعارات التوصيات حتى تحليل الذكاء الاصطناعي
          </p>
        </div>
      </section>

      <main className="container-page py-12 space-y-12">

        {/* Connection Card */}
        <div
          className="rounded-3xl p-6 md:p-8 border"
          style={connected ? {
            background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)',
            borderColor: '#86EFAC',
          } : {
            background: 'linear-gradient(135deg, #F8FAFF, #EEF2FF)',
            borderColor: '#C7D2FE',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">

            {/* Left: Connect Form */}
            <div className="flex-1 space-y-5">
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full ${
                  connected ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
                  {connected ? 'متصل بتيليجرام' : 'غير متصل'}
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  {connected ? '✅ تم ربط تيليجرام بنجاح' : 'ربط تيليجرام بحسابك'}
                </h2>
              </div>

              {!connected ? (
                <>
                  <p className="text-slate-600 text-sm text-right">
                    اتبع الخطوات التالية لربط حسابك بنظام إشعارات تيليجرام:
                  </p>
                  <ol className="space-y-2 text-sm text-slate-600 text-right">
                    {['افتح تيليجرام وابحث عن: @AlsayadTradingBot', 'اضغط /start لبدء البوت', 'اضغط على زر "ربط الآن" أدناه'].map((s, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-right flex-1">{s}</span>
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                          style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
                        >
                          {i + 1}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div className="flex items-center justify-between bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm">
                    <button
                      onClick={handleCopy}
                      className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-200 font-medium flex items-center gap-1.5"
                    >
                      {copied ? <><CheckCircle className="w-3.5 h-3.5 text-green-500" /> تم النسخ</> : <>نسخ</>}
                    </button>
                    <code className="font-mono text-sm text-slate-700 font-semibold">@AlsayadTradingBot</code>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleTestWebhook}
                      disabled={testingWebhook}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-all duration-200 text-sm font-semibold disabled:opacity-60"
                    >
                      <RefreshCw className={`w-4 h-4 ${testingWebhook ? 'animate-spin' : ''}`} />
                      {testingWebhook ? 'جاري الاختبار...' : 'اختبار Webhook'}
                    </button>
                    <button
                      onClick={handleConnect}
                      className="flex-1 py-3 rounded-2xl text-white font-bold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', boxShadow: '0 8px 24px -4px rgba(79,70,229,0.4)' }}
                    >
                      <MessageSquare className="w-5 h-5" />
                      ربط الآن
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'البوت المتصل', value: '@AlsayadTradingBot', color: '#16A34A' },
                      { label: 'المشتركون', value: '1,284 عضو', color: '#16A34A' },
                      { label: 'آخر إرسال', value: 'منذ ساعتين', color: '#2563EB' },
                      { label: 'نسبة التسليم', value: '99.8%', color: '#7C3AED' },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white rounded-2xl p-3.5 border border-green-200">
                        <div className="text-xs text-slate-500 mb-1 text-right">{item.label}</div>
                        <div className="font-bold text-sm text-right" style={{ color: item.color }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleTestWebhook}
                    disabled={testingWebhook}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-green-300 text-green-700 hover:bg-green-100 transition-all duration-200 text-sm font-semibold disabled:opacity-60"
                  >
                    <RefreshCw className={`w-4 h-4 ${testingWebhook ? 'animate-spin' : ''}`} />
                    {testingWebhook ? 'جاري الاختبار...' : 'اختبار Webhook'}
                  </button>
                </div>
              )}
            </div>

            {/* Workflow Diagram */}
            <div className="md:w-72 space-y-3">
              <h3 className="text-sm font-bold text-slate-700 text-right mb-4">مسار البث التلقائي</h3>
              {[
                { label: 'TradingView Alert', icon: Activity, color: '#2563EB' },
                { label: 'Backend Webhook', icon: Zap, color: '#4F46E5' },
                { label: 'Telegram Bot', icon: Bot, color: '#7C3AED' },
                { label: 'إشعار الطالب', icon: Bell, color: '#0EA5E9' },
              ].map((step, idx, arr) => {
                const Icon = step.icon
                return (
                  <div key={idx}>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex-1 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-slate-200 shadow-sm"
                      >
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${step.color}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: step.color }} />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{step.label}</span>
                      </div>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="flex justify-center my-1">
                        <div className="w-0.5 h-4 bg-slate-300 rounded-full" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bot Product Cards */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 badge-purple mb-4">المنتجات</div>
            <h2 className="section-title mb-3">بوتات تيليجرام المتخصصة</h2>
            <p className="section-subtitle mx-auto">ثلاثة بوتات متكاملة لتغطية كل احتياجاتك في التداول</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {bots.map((bot) => {
              const Icon = bot.icon
              const state = botStates[bot.id]
              return (
                <div
                  key={bot.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  style={{ borderTopWidth: 3, borderTopColor: bot.color }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    {state === 'active' && (
                      <span className="badge-success text-xs flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        نشط
                      </span>
                    )}
                    <div className="text-right">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 mr-auto"
                        style={{ background: bot.bg }}
                      >
                        <Icon className="w-7 h-7" style={{ color: bot.color }} />
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">{bot.nameAr}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{bot.name}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed text-right mb-5">{bot.desc}</p>

                  <div className="space-y-2 mb-6 flex-1">
                    {bot.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-sm text-right">
                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: bot.color }} />
                        <span className="text-slate-600 flex-1">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleActivateBot(bot.id)}
                    disabled={state === 'loading' || state === 'active'}
                    className="w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                    style={
                      state === 'active' ? {
                        background: '#F0FDF4',
                        color: '#16A34A',
                        border: '2px solid #86EFAC',
                      } : state === 'loading' ? {
                        background: `${bot.color}20`,
                        color: bot.color,
                        border: `2px solid ${bot.color}40`,
                      } : {
                        background: `${bot.color}15`,
                        color: bot.color,
                        border: `2px solid ${bot.color}30`,
                      }
                    }
                  >
                    {state === 'loading' ? (
                      <><RefreshCw className="w-4 h-4 animate-spin" /> جاري التفعيل...</>
                    ) : state === 'active' ? (
                      <><CheckCircle className="w-4 h-4" /> مفعّل</>
                    ) : (
                      <>{connected ? 'تفعيل البوت' : 'اربط تيليجرام أولاً'}</>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

      </main>

      <DemoButton />
    </div>
  )
}
