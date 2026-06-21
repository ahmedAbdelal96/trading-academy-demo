'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useDemo, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Play, X } from 'lucide-react'

const demoSteps = [
  { ar: 'الصفحة الرئيسية', en: 'Home Page', route: '/', description: 'Start at the homepage' },
  { ar: 'تسجيل دخول تجريبي', en: 'Demo Login', route: '/dashboard', description: 'Login as student' },
  { ar: 'لوحة التحكم', en: 'Dashboard', route: '/dashboard', description: 'View student dashboard' },
  { ar: 'فتح درس من الكورس', en: 'Course Player', route: '/dashboard/course', description: 'Watch course lesson' },
  { ar: 'فتح توصية تداول', en: 'Trading Signal', route: '/signals', description: 'View trading signals' },
  { ar: 'الاشتراك في خطة', en: 'Subscribe', route: '/signals', description: 'Subscribe to plan' },
  { ar: 'صفحة الدفع', en: 'Checkout', route: '/checkout', description: 'Process payment' },
  { ar: 'نجاح الدفع', en: 'Success', route: '/checkout-success', description: 'Payment confirmed' },
  { ar: 'لوحة الأسواق', en: 'Markets', route: '/markets', description: 'View markets dashboard' },
  { ar: 'روبوتات تليجرام', en: 'Telegram Bots', route: '/telegram-bots', description: 'Connect Telegram' },
  { ar: 'لوحة الإدارة', en: 'Admin Panel', route: '/admin', description: 'Access admin panel' },
]

export function DemoButton() {
  const { isDemoRunning, currentStep, startDemo, endDemo, navigateToStep } = useDemo()
  const { loginAsStudent, logout } = useAuth()
  const { language, t } = useLanguage()
  const router = useRouter()
  const [showDialog, setShowDialog] = useState(false)

  const handleStartDemo = () => {
    startDemo()
    loginAsStudent()
    setShowDialog(true)
    router.push(demoSteps[0].route)
  }

  const handleStepClick = (stepIndex: number) => {
    navigateToStep(stepIndex)
    router.push(demoSteps[stepIndex].route)
  }

  const handleEndDemo = () => {
    endDemo()
    setShowDialog(false)
    logout()
    router.push('/')
  }

  return (
    <>
      <button
        onClick={handleStartDemo}
        className="fixed bottom-6 left-6 md:bottom-8 md:left-8 w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50 font-bold text-xs md:text-sm text-center p-2 group"
        title={language === 'ar' ? 'تشغيل الديمو' : 'Run Demo'}
      >
        <div className="flex flex-col items-center gap-1">
          <Play className="w-5 h-5 md:w-6 md:h-6" />
          <span>{language === 'ar' ? 'ديمو' : 'Demo'}</span>
        </div>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {language === 'ar' ? 'تشغيل الديمو' : 'Run Demo'}
        </div>
      </button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {language === 'ar' ? 'جولة تجريبية' : 'Demo Tour'}
            </DialogTitle>
            <DialogDescription>
              {language === 'ar'
                ? `الخطوة ${currentStep + 1} من ${demoSteps.length}`
                : `Step ${currentStep + 1} of ${demoSteps.length}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="text-lg font-semibold">
              {language === 'ar' ? demoSteps[currentStep].ar : demoSteps[currentStep].en}
            </div>
            
            <div className="space-y-2">
              {demoSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStepClick(idx)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    idx === currentStep
                      ? 'bg-primary text-white'
                      : idx < currentStep
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-card border border-border hover:border-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{idx + 1}</span>
                    <div className="flex-1">
                      <div className="font-medium">
                        {language === 'ar' ? step.ar : step.en}
                      </div>
                      <div className="text-xs opacity-70">{step.description}</div>
                    </div>
                    {idx <= currentStep && <span className="text-lg">✓</span>}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-2 pt-4">
              {currentStep < demoSteps.length - 1 && (
                <Button
                  onClick={() => handleStepClick(currentStep + 1)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {language === 'ar' ? 'الخطوة التالية' : 'Next Step'}
                </Button>
              )}
              <Button
                onClick={handleEndDemo}
                variant="outline"
                className="flex-1"
              >
                <X className="w-4 h-4 ml-2" />
                {language === 'ar' ? 'إنهاء' : 'End'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
