'use client'

import { useAuth, useLanguage } from '@/components/providers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle, ArrowRight, ArrowLeft, Download } from 'lucide-react'
import Link from 'next/link'
import { NavigationBar } from '@/components/navigation-bar'

export default function CheckoutSuccessPage() {
  const { isLoggedIn, activateSubscription } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
      return
    }
    // Activate subscription on this page
    activateSubscription('premium')
  }, [isLoggedIn, router, activateSubscription])

  if (!isLoggedIn) return null

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center space-y-12">
          {/* Success Icon */}
          <div className="flex justify-center pt-12">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full w-40 h-40" />
              <CheckCircle className="w-40 h-40 text-green-500 relative" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">
              {language === 'ar'
                ? 'تم بنجاح! 🎉'
                : 'Success! 🎉'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {language === 'ar'
                ? 'تم تفعيل اشتراكك بنجاح في خطة متقدم'
                : 'Your Premium subscription is now active'}
            </p>
          </div>

          {/* Order Details */}
          <Card className="p-8 space-y-6 bg-card/50">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">
                  {language === 'ar' ? 'رقم الطلب' : 'Order ID'}
                </span>
                <span className="font-mono font-bold">
                  #ORD-2025-0001
                </span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">
                  {language === 'ar' ? 'الخطة' : 'Plan'}
                </span>
                <span className="font-semibold">
                  {language === 'ar' ? 'متقدم' : 'Premium'}
                </span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">
                  {language === 'ar' ? 'المبلغ' : 'Amount'}
                </span>
                <span className="font-bold text-lg">
                  299 SAR
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  {language === 'ar'
                    ? 'صلاحية حتى'
                    : 'Valid Until'}
                </span>
                <span className="font-semibold">
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    .toLocaleDateString(
                      language === 'ar' ? 'ar-SA' : 'en-US'
                    )}
                </span>
              </div>
            </div>
          </Card>

          {/* What's Next */}
          <Card className="p-8 space-y-4 bg-primary/10 border-primary/30">
            <h2 className="text-2xl font-bold text-left">
              {language === 'ar'
                ? 'ما الخطوة التالية؟'
                : "What's Next?"}
            </h2>

            <ul className="text-left space-y-3">
              {[
                {
                  ar: 'وصول فوري إلى جميع الدورات',
                  en: 'Instant access to all courses',
                },
                {
                  ar: 'توصيات حية غير محدودة',
                  en: 'Unlimited live signals',
                },
                {
                  ar: 'روبوت تليجرام للتنبيهات',
                  en: 'Telegram bot for alerts',
                },
                {
                  ar: 'دعم حي 24/7',
                  en: 'Live support 24/7',
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{language === 'ar' ? item.ar : item.en}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Receipt */}
          <Card className="p-4 bg-card/50">
            <Button variant="outline" className="w-full gap-2">
              <Download className="w-4 h-4" />
              {language === 'ar'
                ? 'تحميل الإيصال'
                : 'Download Receipt'}
            </Button>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center flex-wrap pt-8">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 gap-2"
              >
                {language === 'ar'
                  ? 'ذهاب إلى لوحة التحكم'
                  : 'Go to Dashboard'}
                {language === 'ar' ? (
                  <ArrowLeft className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Button>
            </Link>
            <Link href="/signals">
              <Button size="lg" variant="outline" className="gap-2">
                {language === 'ar'
                  ? 'عرض التوصيات'
                  : 'View Signals'}
                {language === 'ar' ? (
                  <ArrowLeft className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
