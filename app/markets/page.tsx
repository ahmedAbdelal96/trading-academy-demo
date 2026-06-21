'use client'

import { useLanguage } from '@/components/providers'
import { NavigationBar } from '@/components/navigation-bar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'

export default function MarketsPage() {
  const { language } = useLanguage()

  const instruments = [
    // Forex Pairs
    {
      category: language === 'ar' ? 'الفوركس' : 'Forex',
      items: [
        {
          symbol: 'EUR/USD',
          price: '1.0850',
          change: '+0.45%',
          trend: 'up',
        },
        {
          symbol: 'GBP/USD',
          price: '1.2750',
          change: '-0.23%',
          trend: 'down',
        },
        {
          symbol: 'USD/JPY',
          price: '149.80',
          change: '+0.67%',
          trend: 'up',
        },
        {
          symbol: 'USD/CHF',
          price: '0.8920',
          change: '+0.12%',
          trend: 'up',
        },
      ],
    },
    // Commodities
    {
      category: language === 'ar' ? 'السلع' : 'Commodities',
      items: [
        {
          symbol: 'GOLD',
          price: '$2,385.50',
          change: '+1.23%',
          trend: 'up',
        },
        {
          symbol: 'OIL',
          price: '$78.45',
          change: '-0.87%',
          trend: 'down',
        },
        {
          symbol: 'SILVER',
          price: '$30.20',
          change: '+0.56%',
          trend: 'up',
        },
        {
          symbol: 'NATURAL GAS',
          price: '$2.95',
          change: '+0.34%',
          trend: 'up',
        },
      ],
    },
    // Crypto
    {
      category: language === 'ar' ? 'العملات الرقمية' : 'Crypto',
      items: [
        {
          symbol: 'BTC/USD',
          price: '$43,250',
          change: '+2.15%',
          trend: 'up',
        },
        {
          symbol: 'ETH/USD',
          price: '$2,280',
          change: '+1.89%',
          trend: 'up',
        },
        {
          symbol: 'BNB/USD',
          price: '$612',
          change: '+0.92%',
          trend: 'up',
        },
        {
          symbol: 'XRP/USD',
          price: '$2.45',
          change: '-0.45%',
          trend: 'down',
        },
      ],
    },
    // Indices
    {
      category: language === 'ar' ? 'المؤشرات' : 'Indices',
      items: [
        {
          symbol: 'S&P 500',
          price: '5,280',
          change: '+0.78%',
          trend: 'up',
        },
        {
          symbol: 'NASDAQ 100',
          price: '18,920',
          change: '+1.12%',
          trend: 'up',
        },
        {
          symbol: 'DAX',
          price: '18,450',
          change: '+0.56%',
          trend: 'up',
        },
        {
          symbol: 'FTSE 100',
          price: '7,890',
          change: '-0.23%',
          trend: 'down',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {language === 'ar' ? 'لوحة الأسواق' : 'Markets Dashboard'}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            {language === 'ar'
              ? 'أسعار مباشرة لأهم الأدوات المالية'
              : 'Live prices for major financial instruments'}
          </p>
        </div>

        {/* Market Categories */}
        <div className="space-y-8">
          {instruments.map((category, catIdx) => (
            <section key={catIdx}>
              <h2 className="text-2xl font-bold mb-4">
                {category.category}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item, idx) => (
                  <Card
                    key={idx}
                    className="p-6 hover:border-primary/50 transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-bold text-lg">
                          {item.symbol}
                        </div>
                      </div>
                      {item.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="text-2xl font-bold">
                        {item.price}
                      </div>

                      <Badge
                        className={
                          item.trend === 'up'
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-red-500/20 text-red-500'
                        }
                      >
                        {item.trend === 'up' ? '▲' : '▼'}{' '}
                        {item.change}
                      </Badge>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="h-16 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                        {language === 'ar'
                          ? '[رسم بياني]'
                          : '[Chart Placeholder]'}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Production Note */}
        <Card className="mt-12 p-6 bg-muted/50 border-muted">
          <h3 className="font-bold mb-3">
            {language === 'ar'
              ? 'ملاحظات للإنتاج'
              : 'Production Notes'}
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>
              {language === 'ar'
                ? 'سيتم دمج أسعار مباشرة من TradingView API'
                : 'Live prices from TradingView API'}
            </li>
            <li>
              {language === 'ar'
                ? 'تحديث الأسعار كل 5 ثوانٍ'
                : 'Price updates every 5 seconds'}
            </li>
            <li>
              {language === 'ar'
                ? 'رسوم بيانية تفاعلية'
                : 'Interactive charts'}
            </li>
          </ul>
        </Card>
      </main>
    </div>
  )
}
