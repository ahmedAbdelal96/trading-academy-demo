'use client'

import { useLanguage } from '@/components/providers'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

export function PricingPreview() {
  const { language } = useLanguage()

  const plans = [
    {
      name: language === 'ar' ? 'أساسي' : 'Basic',
      price: language === 'ar' ? '99' : '99',
      currency: 'SAR',
      features: [
        language === 'ar' ? '5 توصيات يومية' : '5 Daily Signals',
        language === 'ar' ? 'تحليل فني أساسي' : 'Basic Analysis',
        language === 'ar' ? 'دعم عبر البريد' : 'Email Support',
        language === 'ar' ? 'مكتبة الدورات الأساسية' : 'Basic Courses',
      ],
    },
    {
      name: language === 'ar' ? 'متقدم' : 'Premium',
      price: language === 'ar' ? '299' : '299',
      currency: 'SAR',
      popular: true,
      features: [
        language === 'ar' ? 'توصيات غير محدودة' : 'Unlimited Signals',
        language === 'ar' ? 'تحليل متقدم' : 'Advanced Analysis',
        language === 'ar' ? 'دعم حي 24/7' : '24/7 Live Support',
        language === 'ar' ? 'جميع الدورات' : 'All Courses',
        language === 'ar' ? 'روبوت تليجرام' : 'Telegram Bot',
      ],
    },
    {
      name: language === 'ar' ? 'VIP' : 'VIP',
      price: language === 'ar' ? '999' : '999',
      currency: 'SAR',
      features: [
        language === 'ar' ? 'كل ما في المتقدم' : 'Everything in Premium',
        language === 'ar' ? 'استشارة شخصية' : 'Personal Consultation',
        language === 'ar' ? 'تحليل مخصص' : 'Custom Analysis',
        language === 'ar' ? 'دعم أولويات' : 'Priority Support',
        language === 'ar' ? 'إشارات VIP حصرية' : 'Exclusive VIP Signals',
      ],
    },
  ]

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            {language === 'ar' ? 'خطط الاشتراك' : 'Subscription Plans'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'ar'
              ? 'اختر الخطة المناسبة لاحتياجاتك'
              : 'Choose the right plan for your needs'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`p-8 transition ${
                plan.popular ? 'border-primary scale-105 shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="mb-4 inline-block px-3 py-1 bg-primary text-white rounded-full text-xs font-semibold">
                  {language === 'ar' ? 'الأشهر' : 'Popular'}
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.currency}</span>
                <span className="text-sm text-muted-foreground">{language === 'ar' ? '/شهر' : '/month'}</span>
              </div>

              <Link href="/signals" className="block mb-6">
                <Button
                  className={`w-full ${
                    plan.popular ? 'bg-primary hover:bg-primary/90' : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {language === 'ar' ? 'اشترك الآن' : 'Subscribe'}
                </Button>
              </Link>

              <ul className="space-y-4">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/signals">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              {language === 'ar' ? 'عرض جميع الخطط' : 'View All Plans'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
