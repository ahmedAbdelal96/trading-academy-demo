'use client'

import { useLanguage } from '@/components/providers'
import { Card } from '@/components/ui/card'
import { TrendingUp, Calendar } from 'lucide-react'

export function ResultsShowcase() {
  const { language } = useLanguage()

  const results = [
    {
      pair: 'EUR/USD',
      type: language === 'ar' ? 'شراء' : 'BUY',
      entry: '1.0850',
      target: '1.0920',
      result: '+70',
      status: 'success',
      date: '2025-01-15',
    },
    {
      pair: 'GBP/USD',
      type: language === 'ar' ? 'بيع' : 'SELL',
      entry: '1.2750',
      target: '1.2680',
      result: '+70',
      status: 'success',
      date: '2025-01-14',
    },
    {
      pair: 'USD/JPY',
      type: language === 'ar' ? 'شراء' : 'BUY',
      entry: '149.80',
      target: '150.50',
      result: '+70',
      status: 'success',
      date: '2025-01-13',
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            {language === 'ar' ? 'أحدث النتائج' : 'Latest Results'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'ar'
              ? 'توصيات مثبتة مع نسب نجاح عالية'
              : 'Proven signals with high success rate'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {results.map((result, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-bold text-lg">{result.pair}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {result.date}
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === 'ar' ? 'نوع' : 'Type'}</span>
                  <span className={`font-semibold ${result.type === 'شراء' || result.type === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>
                    {result.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === 'ar' ? 'السعر' : 'Entry'}</span>
                  <span className="font-mono">{result.entry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === 'ar' ? 'الهدف' : 'Target'}</span>
                  <span className="font-mono">{result.target}</span>
                </div>

                <div className="border-t border-border pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{language === 'ar' ? 'النتيجة' : 'Profit'}</span>
                    <span className="text-lg font-bold text-green-500">{result.result} نقطة</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
