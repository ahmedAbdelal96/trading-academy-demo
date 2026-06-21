'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/providers'
import { NavigationBar } from '@/components/navigation-bar'
import { DemoButton } from '@/components/demo-button'
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react'

const marketData = {
  'الكل': null,
  'فوركس': [
    { symbol: 'EUR/USD', price: '1.0850', change: '+0.45%', high: '1.0890', low: '1.0820', trend: 'up', bars: [40,55,48,62,58,70,65,72,68,75] },
    { symbol: 'GBP/USD', price: '1.2750', change: '-0.23%', high: '1.2800', low: '1.2720', trend: 'down', bars: [70,65,72,68,60,55,50,48,52,46] },
    { symbol: 'USD/JPY', price: '149.80', change: '+0.67%', high: '150.20', low: '149.40', trend: 'up', bars: [50,55,60,58,65,70,68,75,72,78] },
    { symbol: 'USD/CHF', price: '0.8920', change: '+0.12%', high: '0.8950', low: '0.8900', trend: 'up', bars: [60,62,65,63,68,70,72,69,74,75] },
  ],
  'سلع': [
    { symbol: 'XAU/USD', price: '$2,385.50', change: '+1.23%', high: '$2,400', low: '$2,360', trend: 'up', bars: [60,65,68,72,70,75,78,80,82,85] },
    { symbol: 'OIL/USD', price: '$78.45', change: '-0.87%', high: '$80.20', low: '$77.80', trend: 'down', bars: [80,75,72,70,65,60,58,55,52,48] },
    { symbol: 'SILVER', price: '$30.20', change: '+0.56%', high: '$30.80', low: '$29.90', trend: 'up', bars: [55,58,60,62,65,63,68,70,72,74] },
    { symbol: 'NATGAS', price: '$2.95', change: '+0.34%', high: '$3.10', low: '$2.85', trend: 'up', bars: [45,50,52,55,58,56,62,65,68,70] },
  ],
  'عملات رقمية': [
    { symbol: 'BTC/USD', price: '$43,250', change: '+2.15%', high: '$44,000', low: '$42,500', trend: 'up', bars: [50,58,55,65,62,72,70,80,78,88] },
    { symbol: 'ETH/USD', price: '$2,280', change: '+1.89%', high: '$2,350', low: '$2,200', trend: 'up', bars: [48,55,52,62,60,70,68,75,80,85] },
    { symbol: 'BNB/USD', price: '$612', change: '+0.92%', high: '$625', low: '$605', trend: 'up', bars: [60,62,65,68,70,68,72,75,78,80] },
    { symbol: 'XRP/USD', price: '$2.45', change: '-0.45%', high: '$2.55', low: '$2.40', trend: 'down', bars: [72,70,68,65,60,58,55,52,50,48] },
  ],
  'مؤشرات': [
    { symbol: 'S&P 500', price: '5,280', change: '+0.78%', high: '5,320', low: '5,240', trend: 'up', bars: [55,58,62,60,65,68,72,70,75,78] },
    { symbol: 'NASDAQ', price: '18,920', change: '+1.12%', high: '19,100', low: '18,700', trend: 'up', bars: [50,55,60,58,65,70,68,78,75,85] },
    { symbol: 'DAX', price: '18,450', change: '+0.56%', high: '18,600', low: '18,300', trend: 'up', bars: [60,62,65,70,68,72,70,75,78,80] },
    { symbol: 'FTSE 100', price: '7,890', change: '-0.23%', high: '7,950', low: '7,840', trend: 'down', bars: [75,72,70,68,65,62,60,58,55,52] },
  ],
}

type MarketCategory = keyof typeof marketData

export default function MarketsPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<MarketCategory>('الكل')

  const allItems = Object.entries(marketData)
    .filter(([key]) => key !== 'الكل')
    .flatMap(([, items]) => items ?? [])

  const displayItems = activeTab === 'الكل' ? allItems : (marketData[activeTab] ?? [])
  const tabs = Object.keys(marketData) as MarketCategory[]

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      {/* Hero */}
      <section
        className="py-12 text-white"
        style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 70%, #0EA5E9 100%)' }}
      >
        <div className="container-page text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            أسعار مباشرة — تُحدَّث كل دقيقة
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">لوحة الأسواق المالية</h1>
          <p className="text-white/80 text-lg">متابعة أسعار مباشرة لأهم الأدوات المالية العالمية</p>
        </div>
      </section>

      <main className="container-page py-10">

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap justify-end mb-8">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? 'text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
              }`}
              style={activeTab === tab ? { background: 'linear-gradient(135deg, #2563EB, #0EA5E9)' } : {}}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Market Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-xl ${
                  item.trend === 'up' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {item.trend === 'up'
                    ? <TrendingUp className="w-3.5 h-3.5" />
                    : <TrendingDown className="w-3.5 h-3.5" />}
                  {item.change}
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900 text-base">{item.symbol}</div>
                  <div className="text-xs text-slate-400">السوق المالي</div>
                </div>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-slate-900 mb-4 text-right">{item.price}</div>

              {/* Mini Chart */}
              <div className="flex items-end gap-0.5 h-12 mb-4 bg-slate-50 rounded-xl px-2 py-2">
                {item.bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all duration-200"
                    style={{
                      height: `${h}%`,
                      background: item.trend === 'up'
                        ? `rgba(37,99,235,${0.3 + (i / item.bars.length) * 0.7})`
                        : `rgba(220,38,38,${0.3 + (i / item.bars.length) * 0.7})`,
                    }}
                  />
                ))}
              </div>

              {/* High / Low */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-red-50 rounded-xl p-2.5 text-center border border-red-100">
                  <div className="text-red-400 font-medium mb-0.5">أدنى</div>
                  <div className="font-bold text-red-600 font-mono">{item.low}</div>
                </div>
                <div className="bg-green-50 rounded-xl p-2.5 text-center border border-green-100">
                  <div className="text-green-400 font-medium mb-0.5">أعلى</div>
                  <div className="font-bold text-green-600 font-mono">{item.high}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-10 bg-white rounded-3xl border border-blue-100 p-6 flex items-center gap-5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)' }}
          >
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 text-right">
            <h3 className="font-bold text-slate-800 mb-1">ملاحظة: بيانات تجريبية</h3>
            <p className="text-sm text-slate-500">
              في النسخة الإنتاجية: أسعار مباشرة من TradingView API — تحديث كل 5 ثوانٍ — رسوم بيانية تفاعلية
            </p>
          </div>
        </div>

      </main>

      <DemoButton />
    </div>
  )
}
