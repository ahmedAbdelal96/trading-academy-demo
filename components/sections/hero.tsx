'use client'

import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  const { isLoggedIn, setOpenLoginModal } = useAuth()
  const { language } = useLanguage()

  return (
    <section className="relative min-h-[600px] md:min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {language === 'ar' ? 'منصة تداول متقدمة للعام 2025' : 'Advanced Trading Platform for 2025'}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          {language === 'ar' 
            ? 'احترف التداول في الأسواق المالية'
            : 'Master Financial Markets Trading'}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {language === 'ar'
            ? 'تعلم مع أفضل خبراء التداول في الشرق الأوسط. احصل على توصيات حية، دورات تعليمية، وأدوات تحليل متقدمة.'
            : 'Learn from Middle East\'s top trading experts. Get live signals, courses, and advanced analysis tools.'}
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                {language === 'ar' ? 'ذهاب إلى لوحة التحكم' : 'Go to Dashboard'}
                {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Button>
            </Link>
          ) : (
            <>
              <Button
                size="lg"
                onClick={() => setOpenLoginModal(true)}
                className="bg-primary hover:bg-primary/90 gap-2"
              >
                {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Button>
              <Link href="/signals">
                <Button size="lg" variant="outline" className="gap-2">
                  {language === 'ar' ? 'عرض التوصيات' : 'View Signals'}
                  {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">{language === 'ar' ? 'طالب نشط' : 'Active Students'}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">89%</div>
            <div className="text-sm text-muted-foreground">{language === 'ar' ? 'نسبة النجاح' : 'Success Rate'}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">12+</div>
            <div className="text-sm text-muted-foreground">{language === 'ar' ? 'سنوات خبرة' : 'Years Experience'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
