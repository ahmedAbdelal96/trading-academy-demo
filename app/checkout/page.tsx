'use client'

import { useAuth, useLanguage } from '@/components/providers'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRight, ArrowLeft, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { NavigationBar } from '@/components/navigation-bar'

export default function CheckoutPage() {
  const { isLoggedIn, user } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) return null

  const handlePayment = async () => {
    setProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push('/checkout-success')
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'ar' ? 'إتمام الشراء' : 'Complete Purchase'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar'
              ? 'أكمل عملية الدفع للاشتراك في خطة متقدمة'
              : 'Complete your payment to subscribe'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <Card className="p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-6">
                  {language === 'ar'
                    ? 'بيانات الدفع'
                    : 'Payment Details'}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      {language === 'ar'
                        ? 'اسم حامل البطاقة'
                        : 'Cardholder Name'}
                    </label>
                    <Input
                      placeholder={user?.name}
                      disabled
                      defaultValue={user?.name}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">
                      {language === 'ar'
                        ? 'رقم البطاقة'
                        : 'Card Number'}
                    </label>
                    <Input
                      placeholder="4111 1111 1111 1111"
                      defaultValue="4111 1111 1111 1111"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">
                        {language === 'ar'
                          ? 'الصلاحية'
                          : 'Expiry'}
                      </label>
                      <Input
                        placeholder="12/25"
                        defaultValue="12/25"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">
                        {language === 'ar'
                          ? 'CVV'
                          : 'CVV'}
                      </label>
                      <Input
                        placeholder="123"
                        defaultValue="123"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <Button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-base gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  {processing
                    ? language === 'ar'
                      ? 'جاري المعالجة...'
                      : 'Processing...'
                    : language === 'ar'
                    ? 'إتمام الدفع'
                    : 'Complete Payment'}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                {language === 'ar'
                  ? 'هذا نموذج توضيحي - لن يتم خصم أي مبالغ فعلية'
                  : 'Demo mode - no actual charges'}
              </p>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-20 space-y-4">
              <h3 className="font-bold text-lg">
                {language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'ar'
                      ? 'الخطة: متقدم'
                      : 'Plan: Premium'}
                  </span>
                  <span className="font-semibold">299 SAR</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'ar'
                      ? 'الفترة'
                      : 'Period'}
                  </span>
                  <span>{language === 'ar' ? 'شهر واحد' : '1 Month'}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'ar'
                      ? 'الضريبة'
                      : 'Tax'}
                  </span>
                  <span>0 SAR</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>{language === 'ar' ? 'الإجمالي' : 'Total'}</span>
                  <span>299 SAR</span>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg text-xs text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">
                  {language === 'ar'
                    ? 'ملاحظات للإنتاج:'
                    : 'Production Notes:'}
                </p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>
                    {language === 'ar'
                      ? 'سيتم دمج بوابة دفع حقيقية (Moyasar/HyperPay)'
                      : 'Real payment gateway (Moyasar/HyperPay)'}
                  </li>
                  <li>
                    {language === 'ar'
                      ? 'معالجة فعلية للبطاقة'
                      : 'Real card processing'}
                  </li>
                  <li>
                    {language === 'ar'
                      ? 'تأكيد فوري للاشتراك'
                      : 'Instant subscription confirmation'}
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
