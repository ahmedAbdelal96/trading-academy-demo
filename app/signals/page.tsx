'use client'

import { useAuth, useLanguage } from '@/components/providers'
import { NavigationBar } from '@/components/navigation-bar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, ArrowRight, ArrowLeft, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignalsPage() {
  const { isLoggedIn, setOpenLoginModal, user } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()

  const signals = [
    {
      pair: 'EUR/USD',
      type: 'BUY',
      entry: '1.0850',
      target: '1.0920',
      result: '+70 pips',
      date: '2025-01-15',
      status: 'closed',
    },
    {
      pair: 'GBP/USD',
      type: 'SELL',
      entry: '1.2750',
      target: '1.2680',
      result: '+70 pips',
      date: '2025-01-14',
      status: 'closed',
    },
    {
      pair: 'USD/JPY',
      type: 'BUY',
      entry: '149.80',
      target: '150.50',
      result: '+70 pips',
      date: '2025-01-13',
      status: 'closed',
    },
  ]

  const handleSubscribe = (plan: 'basic' | 'premium' | 'vip') => {
    if (!isLoggedIn) {
      setOpenLoginModal(true)
      return
    }
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            {language === 'ar' ? 'التوصيات والأسعار' : 'Signals & Pricing'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === 'ar'
              ? 'توصيات فورية مع نسب نجاح عالية وأسعار منافسة'
              : 'Real-time signals with high accuracy and competitive pricing'}
          </p>
        </div>

        {/* Latest Signals */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            {language === 'ar' ? 'أحدث التوصيات' : 'Latest Signals'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {signals.map((signal, idx) => (
              <Card key={idx} className="p-6 hover:border-primary/50 transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-bold text-lg">{signal.pair}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {signal.date}
                    </div>
                  </div>
                  <Badge
                    variant={
                      signal.type === 'BUY'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {signal.type}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {language === 'ar' ? 'نقطة الدخول' : 'Entry'}
                    </span>
                    <span className="font-mono font-semibold">
                      {signal.entry}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {language === 'ar' ? 'الهدف' : 'Target'}
                    </span>
                    <span className="font-mono font-semibold">
                      {signal.target}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <div className="text-center">
                      <span className="text-green-500 font-bold">
                        {signal.result}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing Plans */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {language === 'ar' ? 'خطط الاشتراك' : 'Subscription Plans'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: language === 'ar' ? 'أساسي' : 'Basic',
                price: '99',
                features: [
                  language === 'ar' ? '5 توصيات يومية' : '5 Daily Signals',
                  language === 'ar' ? 'تحليل فني' : 'Technical Analysis',
                  language === 'ar' ? 'دعم عبر البريد' : 'Email Support',
                ],
                plan: 'basic',
              },
              {
                name: language === 'ar' ? 'متقدم' : 'Premium',
                price: '299',
                popular: true,
                features: [
                  language === 'ar' ? 'توصيات غير محدودة' : 'Unlimited Signals',
                  language === 'ar' ? 'دعم حي' : 'Live Support',
                  language === 'ar' ? 'روبوت تليجرام' : 'Telegram Bot',
                ],
                plan: 'premium',
              },
              {
                name: language === 'ar' ? 'VIP' : 'VIP',
                price: '999',
                features: [
                  language === 'ar' ? 'كل الميزات' : 'All Features',
                  language === 'ar' ? 'استشارة شخصية' : 'Personal Advice',
                  language === 'ar' ? 'دعم أولويات' : 'Priority Support',
                ],
                plan: 'vip',
              },
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 transition ${
                  plan.popular
                    ? 'border-primary scale-105 shadow-lg'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="mb-4 inline-block px-3 py-1 bg-primary text-white rounded-full text-xs font-semibold">
                    {language === 'ar' ? 'الأشهر' : 'Popular'}
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-4">
                  {plan.name}
                </h3>

                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    SAR {language === 'ar' ? '/شهر' : '/month'}
                  </span>
                </div>

                <Button
                  onClick={() =>
                    handleSubscribe(
                      plan.plan as 'basic' | 'premium' | 'vip'
                    )
                  }
                  className={`w-full mb-6 ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90'
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {language === 'ar'
                    ? 'اشترك الآن'
                    : 'Subscribe Now'}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li
                      key={fidx}
                      className="text-sm flex items-center gap-2"
                    >
                      <TrendingUp className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
