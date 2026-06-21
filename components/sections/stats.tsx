'use client'

import { useLanguage } from '@/components/providers'
import { TrendingUp, Users, Zap, Award } from 'lucide-react'

export function StatsSection() {
  const { language } = useLanguage()

  const stats = [
    {
      icon: TrendingUp,
      value: language === 'ar' ? '+2,450' : '+2,450',
      label: language === 'ar' ? 'نقطة ربح شهري' : 'Monthly Pips Gained',
    },
    {
      icon: Users,
      value: language === 'ar' ? '1,200+' : '1,200+',
      label: language === 'ar' ? 'متداول نشط' : 'Active Traders',
    },
    {
      icon: Zap,
      value: language === 'ar' ? '24/7' : '24/7',
      label: language === 'ar' ? 'دعم حي' : 'Live Support',
    },
    {
      icon: Award,
      value: language === 'ar' ? '15+' : '15+',
      label: language === 'ar' ? 'جوائز عالمية' : 'Awards Won',
    },
  ]

  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
