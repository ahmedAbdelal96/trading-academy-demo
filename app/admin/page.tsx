'use client'

import { useState, useEffect } from 'react'
import { useAuth, useLanguage } from '@/components/providers'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { DemoButton } from '@/components/demo-button'
import {
  Send, Users, TrendingUp, DollarSign, Zap, CheckCircle,
  Activity, MessageSquare, X, AlertTriangle, Bot, RefreshCw
} from 'lucide-react'

interface Signal {
  id: string
  pair: string
  market: string
  type: string
  entry: string
  tp: string
  sl: string
  message: string
  sendTelegram: boolean
  date: string
  status: 'sent' | 'pending'
}

const initialSignals: Signal[] = [
  { id: '1', pair: 'EUR/USD', market: 'فوركس', type: 'BUY', entry: '1.0850', tp: '1.0920', sl: '1.0800', message: 'توصية قوية — اختراق مستوى مقاومة', sendTelegram: true, date: '2025-01-15 14:30', status: 'sent' },
  { id: '2', pair: 'AAPL', market: 'أسهم', type: 'BUY', entry: '185.20', tp: '192.00', sl: '181.00', message: 'نموذج صعودي مع حجم تداول مرتفع', sendTelegram: true, date: '2025-01-15 11:00', status: 'sent' },
  { id: '3', pair: 'BTC/USD', market: 'عملات رقمية', type: 'SELL', entry: '43,500', tp: '42,000', sl: '44,200', message: 'مقاومة قوية — فرصة بيع', sendTelegram: false, date: '2025-01-14 16:45', status: 'sent' },
  { id: '4', pair: 'XAU/USD', market: 'سلع', type: 'BUY', entry: '2385', tp: '2415', sl: '2365', message: 'ذهب — دعم قوي عند هذا المستوى', sendTelegram: true, date: '2025-01-14 09:15', status: 'sent' },
]

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border min-w-72 animate-fade-in-up ${
      type === 'success'
        ? 'bg-white border-green-200 text-green-800'
        : 'bg-white border-red-200 text-red-800'
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

export default function AdminPage() {
  const { isLoggedIn, user } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()

  const [signals, setSignals] = useState<Signal[]>(initialSignals)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [webhookStatus, setWebhookStatus] = useState<'connected' | 'testing' | 'disconnected'>('connected')

  const [form, setForm] = useState({
    pair: '',
    market: 'فوركس',
    type: 'BUY',
    entry: '',
    tp: '',
    sl: '',
    message: '',
    sendTelegram: true,
  })

  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'admin') router.push('/')
  }, [isLoggedIn, user, router])

  if (!isLoggedIn || user?.role !== 'admin') return null

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
  }

  const handleSendSignal = () => {
    if (!form.pair || !form.entry || !form.tp || !form.sl) {
      showToast('يرجى تعبئة جميع الحقول المطلوبة', 'error')
      return
    }

    const newSignal: Signal = {
      id: Date.now().toString(),
      ...form,
      date: new Date().toLocaleString('ar-SA'),
      status: 'sent',
    }

    setSignals(prev => [newSignal, ...prev])
    setForm({ pair: '', market: 'فوركس', type: 'BUY', entry: '', tp: '', sl: '', message: '', sendTelegram: true })
    showToast(form.sendTelegram ? '✅ تم إرسال التوصية وإشعار تيليجرام بنجاح!' : '✅ تم إرسال التوصية بنجاح!')
  }

  const handleTestWebhook = () => {
    setWebhookStatus('testing')
    showToast('⏳ جاري اختبار الاتصال...', 'success')
    setTimeout(() => {
      setWebhookStatus('connected')
      showToast('✅ تم اختبار Webhook بنجاح — الاتصال مستقر', 'success')
    }, 2000)
  }

  const statsCards = [
    { label: 'المستخدمون النشطون', value: '1,284', change: '+12%', icon: Users, bg: '#EFF6FF', iconBg: 'linear-gradient(135deg, #2563EB, #0EA5E9)' },
    { label: 'الاشتراكات النشطة', value: '847', change: '+8%', icon: CheckCircle, bg: '#F5F3FF', iconBg: 'linear-gradient(135deg, #7C3AED, #4F46E5)' },
    { label: 'الإيرادات الشهرية', value: '42,350 ر', change: '+23%', icon: DollarSign, bg: '#EEF2FF', iconBg: 'linear-gradient(135deg, #4F46E5, #6366F1)' },
    { label: 'التوصيات المرسلة', value: '4,512', change: '+47 اليوم', icon: Zap, bg: '#E0F2FE', iconBg: 'linear-gradient(135deg, #0EA5E9, #06B6D4)' },
  ]

  return (
    <DashboardLayout>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <div className="space-y-8">

        {/* Welcome Banner */}
        <div
          className="rounded-3xl p-6 md:p-8 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 50%, #2563EB 100%)' }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full" style={{ transform: 'translate(-30%, -30%)' }} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm mb-1">👑 صلاحيات مدير النظام</p>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {language === 'ar' ? `مرحباً، ${user?.name}` : `Welcome, ${user?.name}`}
              </h1>
              <p className="text-white/80 text-sm">إدارة المنصة والتوصيات وإحصائيات المستخدمين</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2.5 border border-white/30 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-semibold">النظام يعمل</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat, idx) => {
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
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-lg">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Signal Form — 2 columns */}
          <div className="lg:col-span-2 dashboard-card">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 justify-end">
                {language === 'ar' ? 'إرسال توصية جديدة' : 'Send New Signal'}
                <Send className="w-5 h-5 text-blue-600" />
              </h2>
            </div>

            <div className="p-5 space-y-5">
              {/* Row 1: Symbol + Market + Direction */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="form-label">الاتجاه</label>
                  <select
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                    className="form-select text-right"
                  >
                    <option value="BUY">🟢 BUY — شراء</option>
                    <option value="SELL">🔴 SELL — بيع</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">السوق</label>
                  <select
                    value={form.market}
                    onChange={e => setForm({ ...form, market: e.target.value })}
                    className="form-select text-right"
                  >
                    <option>فوركس</option>
                    <option>أسهم</option>
                    <option>عملات رقمية</option>
                    <option>سلع</option>
                    <option>مؤشرات</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">الرمز / الزوج</label>
                  <input
                    type="text"
                    placeholder="EUR/USD أو AAPL"
                    value={form.pair}
                    onChange={e => setForm({ ...form, pair: e.target.value })}
                    className="form-input text-right"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Row 2: Entry + TP + SL */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="form-label flex items-center gap-1 justify-end">
                    وقف الخسارة (SL)
                    <span className="text-red-400 text-xs">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="1.0800"
                    value={form.sl}
                    onChange={e => setForm({ ...form, sl: e.target.value })}
                    className="form-input text-left border-red-200 focus:border-red-400 focus:ring-red-400/30"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="form-label flex items-center gap-1 justify-end">
                    هدف الربح (TP)
                    <span className="text-green-500 text-xs">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="1.0920"
                    value={form.tp}
                    onChange={e => setForm({ ...form, tp: e.target.value })}
                    className="form-input text-left border-green-200 focus:border-green-400 focus:ring-green-400/30"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="form-label flex items-center gap-1 justify-end">
                    سعر الدخول
                    <span className="text-blue-500 text-xs">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="1.0850"
                    value={form.entry}
                    onChange={e => setForm({ ...form, entry: e.target.value })}
                    className="form-input text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="form-label">رسالة التوصية</label>
                <textarea
                  rows={3}
                  placeholder="أدخل تفاصيل إضافية عن هذه التوصية..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="form-input resize-none text-right"
                />
              </div>

              {/* Telegram Toggle */}
              <div className="flex items-center justify-between bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setForm({ ...form, sendTelegram: !form.sendTelegram })}
                    className={`w-12 h-6 rounded-full transition-all duration-200 relative flex-shrink-0 ${
                      form.sendTelegram ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                        form.sendTelegram ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                  <span className={`text-sm font-semibold ${form.sendTelegram ? 'text-blue-700' : 'text-slate-500'}`}>
                    {form.sendTelegram ? 'تفعيل — سيتم إرسال إشعار تيليجرام' : 'معطل — بدون إشعار تيليجرام'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm font-bold">Telegram</span>
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendSignal}
                className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-3 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', boxShadow: '0 8px 24px -4px rgba(37,99,235,0.4)' }}
              >
                <Send className="w-5 h-5" />
                {language === 'ar' ? 'إرسال التوصية' : 'Send Signal'}
                {form.sendTelegram && <MessageSquare className="w-4 h-4 opacity-70" />}
              </button>
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="space-y-4">

            {/* Telegram Webhook Status */}
            <div className="dashboard-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                  webhookStatus === 'connected' ? 'bg-green-100 text-green-700'
                  : webhookStatus === 'testing' ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-100 text-red-700'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    webhookStatus === 'connected' ? 'bg-green-500 animate-pulse'
                    : webhookStatus === 'testing' ? 'bg-amber-500 animate-pulse'
                    : 'bg-red-500'
                  }`} />
                  {webhookStatus === 'connected' ? 'متصل' : webhookStatus === 'testing' ? 'يختبر...' : 'منقطع'}
                </div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  Webhook Status
                  <Bot className="w-4 h-4 text-blue-600" />
                </h3>
              </div>

              <div className="space-y-3 mb-4">
                <div className="bg-slate-50 rounded-xl p-3 font-mono text-xs text-slate-600 text-left break-all border border-slate-100">
                  @AlsayadTradingBot
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span className="text-green-600 font-semibold">1,284 مشترك</span>
                  <span>المشتركون</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span className="text-blue-600 font-semibold">آخر إرسال: منذ 2 ساعة</span>
                  <span>آخر رسالة</span>
                </div>
              </div>

              <button
                onClick={handleTestWebhook}
                disabled={webhookStatus === 'testing'}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-200 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${webhookStatus === 'testing' ? 'animate-spin' : ''}`} />
                {webhookStatus === 'testing' ? 'جاري الاختبار...' : 'اختبار Webhook'}
              </button>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-card p-5">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 justify-end">
                النشاط الأخير
                <Activity className="w-4 h-4 text-purple-600" />
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'توصية EUR/USD مرسلة', time: 'منذ 2 دقيقة', color: '#2563EB', dot: 'bg-blue-500' },
                  { action: 'مستخدم جديد مسجّل', time: 'منذ 15 دقيقة', color: '#7C3AED', dot: 'bg-purple-500' },
                  { action: 'اشتراك VIP جديد', time: 'منذ 45 دقيقة', color: '#16A34A', dot: 'bg-green-500' },
                  { action: 'توصية AAPL مغلقة', time: 'منذ ساعة', color: '#64748B', dot: 'bg-slate-400' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                    <span className="text-xs text-slate-400 flex-shrink-0">{item.time}</span>
                    <div className="flex-1 text-right">
                      <span className="text-xs text-slate-600 font-medium">{item.action}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Signals Table */}
        <div className="dashboard-card">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">{signals.length} توصية إجمالية</span>
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              {language === 'ar' ? 'التوصيات المرسلة' : 'Sent Signals'}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th>التاريخ</th>
                  <th>تيليجرام</th>
                  <th>الرسالة</th>
                  <th>SL</th>
                  <th>TP</th>
                  <th>الدخول</th>
                  <th>الاتجاه</th>
                  <th>الزوج</th>
                </tr>
              </thead>
              <tbody>
                {signals.map((sig) => (
                  <tr key={sig.id}>
                    <td className="text-xs text-slate-400">{sig.date}</td>
                    <td>
                      {sig.sendTelegram
                        ? <span className="badge-success text-xs">أُرسل</span>
                        : <span className="badge-warning text-xs">لا</span>
                      }
                    </td>
                    <td className="max-w-xs">
                      <span className="text-xs text-slate-500 line-clamp-1 text-right block">{sig.message || '—'}</span>
                    </td>
                    <td><span className="text-xs text-red-500 font-mono font-medium">{sig.sl}</span></td>
                    <td><span className="text-xs text-green-600 font-mono font-medium">{sig.tp}</span></td>
                    <td><span className="text-xs text-slate-600 font-mono">{sig.entry}</span></td>
                    <td>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        sig.type === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {sig.type}
                      </span>
                    </td>
                    <td>
                      <div>
                        <div className="font-bold text-sm text-slate-800">{sig.pair}</div>
                        <div className="text-xs text-slate-400">{sig.market}</div>
                      </div>
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
