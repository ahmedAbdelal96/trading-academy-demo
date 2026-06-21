'use client'

import { useLanguage } from '@/components/providers'
import { Card } from '@/components/ui/card'
import { BarChart3, BookOpen, Zap, MessageCircle, TrendingUp, Users } from 'lucide-react'

export function ServicesSection() {
  const { language } = useLanguage()

  const services = [
    {
      icon: Zap,
      title: language === 'ar' ? 'توصيات حية' : 'Live Signals',
      desc: language === 'ar' ? 'احصل على توصيات تداول يومية مع أسعار دخول وخروج دقيقة' : 'Daily trading signals with precise entry/exit points',
    },
    {
      icon: BookOpen,
      title: language === 'ar' ? 'دورات تعليمية' : 'Courses',
      desc: language === 'ar' ? 'تعلم التحليل الفني والأساسي من الخبراء' : 'Learn technical & fundamental analysis from experts',
    },
    {
      icon: BarChart3,
      title: language === 'ar' ? 'أدوات متقدمة' : 'Advanced Tools',
      desc: language === 'ar' ? 'استخدم أدوات تحليل احترافية ومؤشرات متقدمة' : 'Professional analysis tools and indicators',
    },
    {
      icon: MessageCircle,
      title: language === 'ar' ? 'روبوتات ذكية' : 'Smart Bots',
      desc: language === 'ar' ? 'احصل على التنبيهات والتوصيات عبر تليجرام' : 'Get alerts and signals via Telegram',
    },
    {
      icon: TrendingUp,
      title: language === 'ar' ? 'تتبع الأداء' : 'Performance',
      desc: language === 'ar' ? 'تابع أداء التوصيات والتحليلات في الوقت الفعلي' : 'Real-time performance tracking',
    },
    {
      icon: Users,
      title: language === 'ar' ? 'مجتمع نشط' : 'Community',
      desc: language === 'ar' ? 'التواصل مع متداولين آخرين وتبادل الخبرات' : 'Connect with other traders',
    },
  ]

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            {language === 'ar' ? 'خدماتنا' : 'Our Services'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar'
              ? 'مجموعة شاملة من الخدمات المصممة لجعلك متداول ناجح'
              : 'Comprehensive services designed to make you a successful trader'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <Card key={idx} className="p-6 hover:border-primary/50 transition">
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
