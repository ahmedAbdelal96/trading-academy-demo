'use client'

import { useAuth, useLanguage } from '@/components/providers'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NavigationBar } from '@/components/navigation-bar'
import { DemoButton } from '@/components/demo-button'
import { CreditCard, Lock, CheckCircle, Building2, Smartphone } from 'lucide-react'

type PaymentMethod = 'card' | 'apple' | 'bank'

export default function CheckoutPage() {
  const { isLoggedIn, user } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')

  useEffect(() => {
    if (!isLoggedIn) router.push('/')
  }, [isLoggedIn, router])

  if (!isLoggedIn) return null

  const handlePayment = async () => {
    setProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push('/checkout-success')
  }

  const paymentMethods: { id: PaymentMethod; label: string; icon: React.ElementType; desc: string }[] = [
    { id: 'card', label: 'بطاقة ائتمانية', icon: CreditCard, desc: 'Visa / Mastercard / Mada' },
    { id: 'apple', label: 'Apple Pay', icon: Smartphone, desc: 'دفع سريع عبر Apple Pay' },
    { id: 'bank', label: 'تحويل بنكي', icon: Building2, desc: 'IBAN المملكة العربية السعودية' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      {/* Header */}
      <div
        className="py-10 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 70%, #4F46E5 100%)' }}
      >
        <div className="container-page">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/30">
            <Lock className="w-3.5 h-3.5" />
            دفع آمن ومشفر
          </div>
          <h1 className="text-3xl font-bold">إتمام الشراء</h1>
          <p className="text-white/70 mt-2 text-sm">خطة متقدم — شهر واحد</p>
        </div>
      </div>

      <main className="container-page py-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">

          {/* Payment Form — 3 columns */}
          <div className="md:col-span-3 space-y-5">

            {/* Payment Method Selector */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-800 mb-4 text-right">طريقة الدفع</h2>
              <div className="grid grid-cols-3 gap-3">
                {paymentMethods.map(method => {
                  const Icon = method.icon
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-2xl border-2 text-center transition-all duration-200 ${
                        paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300 bg-white'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === method.id ? 'text-blue-600' : 'text-slate-400'}`} />
                      <div className={`text-xs font-bold ${paymentMethod === method.id ? 'text-blue-700' : 'text-slate-600'}`}>
                        {method.label}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{method.desc}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-slate-800 text-right">بيانات البطاقة</h2>

                <div>
                  <label className="form-label">اسم حامل البطاقة</label>
                  <input
                    type="text"
                    className="form-input text-right"
                    defaultValue={user?.name}
                    readOnly
                  />
                </div>

                <div>
                  <label className="form-label">رقم البطاقة</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="form-input text-left pr-12"
                      defaultValue="4111 1111 1111 1111"
                      dir="ltr"
                    />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      className="form-input text-left"
                      defaultValue="123"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="form-label">تاريخ الانتهاء</label>
                    <input
                      type="text"
                      className="form-input text-left"
                      defaultValue="12/25"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'apple' && (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center">
                <Smartphone className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 text-sm">سيتم تفعيل Apple Pay على الجهاز المناسب</p>
                <div className="mt-4 bg-slate-50 rounded-2xl p-4 text-xs text-slate-400">
                  هذا وضع تجريبي — Apple Pay لا يعمل في الديمو
                </div>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-slate-800 text-right">بيانات التحويل البنكي</h2>
                {[
                  { label: 'اسم المستفيد', value: 'أكاديمية الصياد للأسواق المالية' },
                  { label: 'رقم IBAN', value: 'SA44 2000 0001 2345 6789 1234' },
                  { label: 'اسم البنك', value: 'البنك الأهلي السعودي' },
                  { label: 'المبلغ', value: '199 ريال سعودي' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                    <span className="font-mono text-sm text-slate-700 font-semibold" dir="ltr">{item.value}</span>
                    <span className="text-sm text-slate-500">{item.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-3 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', boxShadow: '0 8px 24px -4px rgba(37,99,235,0.4)' }}
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  جاري معالجة الدفع...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  إتمام الدفع — 199 ريال
                </>
              )}
            </button>

            <p className="text-xs text-center text-slate-400">
              🔒 هذا نموذج توضيحي — لن يتم خصم أي مبالغ فعلية
            </p>
          </div>

          {/* Order Summary — 2 columns */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm sticky top-24 overflow-hidden">
              <div
                className="px-5 py-4 text-white"
                style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
              >
                <h3 className="font-bold text-right">ملخص الطلب</h3>
              </div>

              <div className="p-5 space-y-4">
                {/* Plan Badge */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100 text-right">
                  <div className="text-2xl mb-1">⭐</div>
                  <div className="font-bold text-slate-800">خطة متقدم</div>
                  <div className="text-xs text-slate-500 mt-0.5">اشتراك شهري — يجدد تلقائياً</div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {[
                    'توصيات يومية غير محدودة',
                    'تنبيهات تيليجرام فورية',
                    'مؤشرات TradingView',
                    'جميع الكورسات',
                    'دعم فني مباشر',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-right">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-slate-100 pt-4 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-700">199 ر.س</span>
                    <span className="text-slate-500">خطة متقدم — شهر</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 font-semibold">مجاناً</span>
                    <span className="text-slate-500">الضريبة (0%)</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-slate-200 pt-3 mt-1">
                    <span style={{ color: '#2563EB' }}>199 ر.س</span>
                    <span className="text-slate-800">الإجمالي</span>
                  </div>
                </div>

                {/* Security badges */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  {['SSL', 'PCI', '3DS'].map(badge => (
                    <div key={badge} className="flex items-center gap-1 text-xs text-slate-400">
                      <Lock className="w-3 h-3" />
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DemoButton />
    </div>
  )
}
