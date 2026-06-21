'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth, useDemo, useLanguage } from '@/components/providers'
import { Play, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'

const demoSteps = [
  {
    step: 1,
    ar: 'الصفحة الرئيسية',
    en: 'Home Page',
    desc: 'استكشف واجهة المنصة الرئيسية وخدماتها',
    route: '/',
    action: 'home',
  },
  {
    step: 2,
    ar: 'تسجيل دخول كطالب',
    en: 'Student Login',
    desc: 'ادخل كطالب لاستكشاف لوحة التحكم',
    route: '/dashboard',
    action: 'login_student',
  },
  {
    step: 3,
    ar: 'لوحة تحكم الطالب',
    en: 'Student Dashboard',
    desc: 'شاهد التوصيات والدورات والإحصائيات',
    route: '/dashboard',
    action: 'navigate',
  },
  {
    step: 4,
    ar: 'كورس تعليمي',
    en: 'Course Player',
    desc: 'افتح وحدة تعليمية وشاهد المحتوى',
    route: '/dashboard/course',
    action: 'navigate',
  },
  {
    step: 5,
    ar: 'توصيات التداول',
    en: 'Trading Signals',
    desc: 'تصفح التوصيات وخطط الاشتراك',
    route: '/signals',
    action: 'navigate',
  },
  {
    step: 6,
    ar: 'صفحة الدفع',
    en: 'Checkout',
    desc: 'احتفظ بخطة الاشتراك وأكمل الدفع',
    route: '/checkout',
    action: 'navigate',
  },
  {
    step: 7,
    ar: 'تأكيد الاشتراك',
    en: 'Subscription Confirmed',
    desc: 'شاهد تأكيد الدفع وتفعيل الاشتراك',
    route: '/checkout-success',
    action: 'navigate',
  },
  {
    step: 8,
    ar: 'لوحة الأسواق',
    en: 'Markets',
    desc: 'تصفح أسعار الأسواق المالية المباشرة',
    route: '/markets',
    action: 'navigate',
  },
  {
    step: 9,
    ar: 'بوتات تيليجرام',
    en: 'Telegram Bots',
    desc: 'اربط حسابك ببوت التوصيات',
    route: '/telegram-bots',
    action: 'navigate',
  },
  {
    step: 10,
    ar: 'لوحة الإدارة',
    en: 'Admin Panel',
    desc: 'استكشف إدارة المنصة وإرسال التوصيات',
    route: '/admin',
    action: 'navigate',
  },
]

export function DemoButton() {
  const { isDemoRunning, currentStep, startDemo, endDemo, navigateToStep } = useDemo()
  const { loginAsStudent, loginAsAdmin, logout } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()
  const [showPanel, setShowPanel] = useState(false)

  const handleStartDemo = () => {
    startDemo()
    loginAsStudent()
    setShowPanel(true)
    router.push('/')
  }

  const handleStepClick = (stepIndex: number) => {
    const step = demoSteps[stepIndex]
    navigateToStep(stepIndex)

    if (step.action === 'login_student') {
      loginAsStudent()
    } else if (step.action === 'login_admin') {
      loginAsAdmin()
    }

    router.push(step.route)
  }

  const handleNext = () => {
    const nextIdx = Math.min(currentStep + 1, demoSteps.length - 1)
    handleStepClick(nextIdx)
  }

  const handlePrev = () => {
    const prevIdx = Math.max(currentStep - 1, 0)
    handleStepClick(prevIdx)
  }

  const handleEndDemo = () => {
    endDemo()
    setShowPanel(false)
    logout()
    router.push('/')
  }

  const progress = ((currentStep + 1) / demoSteps.length) * 100

  return (
    <>
      {/* Floating Demo Button */}
      <button
        onClick={isDemoRunning ? () => setShowPanel(true) : handleStartDemo}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group"
        title={language === 'ar' ? 'تشغيل الديمو' : 'Run Demo'}
      >
        <div
          className="w-16 h-16 md:w-18 md:h-18 rounded-2xl text-white shadow-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:scale-110 animate-pulse-ring"
          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
        >
          <Play className="w-5 h-5 fill-white" />
          <span className="text-xs font-bold">{language === 'ar' ? 'ديمو' : 'Demo'}</span>
        </div>
        <div className="absolute bottom-full right-0 mb-2 bg-slate-900 text-white px-3 py-2 rounded-xl text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          {language === 'ar' ? 'تشغيل الجولة التجريبية' : 'Start Demo Tour'}
        </div>
      </button>

      {/* Demo Panel */}
      {showPanel && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setShowPanel(false)}
          />

          {/* Slide-in Panel */}
          <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-6 md:left-auto md:w-96 z-50 animate-slide-in-right">
            <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] md:max-h-[80vh] flex flex-col">

              {/* Panel Header */}
              <div
                className="px-6 pt-6 pb-4 text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold">
                      {language === 'ar' ? 'الجولة التجريبية' : 'Demo Tour'}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {language === 'ar'
                        ? `الخطوة ${currentStep + 1} من ${demoSteps.length}`
                        : `Step ${currentStep + 1} of ${demoSteps.length}`}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPanel(false)}
                    className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Current Step Info */}
              <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl text-white flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
                  >
                    {currentStep + 1}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">
                      {language === 'ar' ? demoSteps[currentStep].ar : demoSteps[currentStep].en}
                    </div>
                    <div className="text-sm text-slate-500">{demoSteps[currentStep].desc}</div>
                  </div>
                </div>
              </div>

              {/* Steps List */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
                {demoSteps.map((step, idx) => {
                  const isActive = idx === currentStep
                  const isCompleted = idx < currentStep
                  return (
                    <button
                      key={idx}
                      onClick={() => handleStepClick(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-right transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                          : isCompleted
                          ? 'bg-green-50 text-green-700 hover:bg-green-100'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : isCompleted
                          ? 'bg-green-200 text-green-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {isCompleted ? '✓' : step.step}
                      </div>
                      <div className="flex-1 text-sm font-medium">
                        {language === 'ar' ? step.ar : step.en}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Panel Footer Navigation */}
              <div className="px-6 py-4 border-t border-slate-100 flex gap-3 flex-shrink-0">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
                >
                  <ChevronRight className="w-4 h-4" />
                  {language === 'ar' ? 'السابق' : 'Prev'}
                </button>

                {currentStep < demoSteps.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                  >
                    {language === 'ar' ? 'التالي' : 'Next'}
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleEndDemo}
                    className="flex-1 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-all duration-200"
                  >
                    {language === 'ar' ? 'إنهاء الجولة ✓' : 'Finish Tour ✓'}
                  </button>
                )}

                <button
                  onClick={handleEndDemo}
                  className="flex items-center gap-1 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 text-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
