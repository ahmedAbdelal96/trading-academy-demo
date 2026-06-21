'use client'

import Link from 'next/link'
import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TrendingUp, BarChart3, Zap, Users, Award, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react'
import { NavigationBar } from '@/components/navigation-bar'
import { DemoButton } from '@/components/demo-button'

export default function HomePage() {
  const auth = useAuth()
  const language = useLanguage()

  const { isLoggedIn, setOpenLoginModal } = auth
  const { language: lang } = language

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationBar />
      
      {/* Hero */}
      <section className="relative min-h-[600px] md:min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {lang === 'ar' ? 'احترف التداول في الأسواق المالية' : 'Master Financial Markets Trading'}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {lang === 'ar'
              ? 'تعلم مع أفضل خبراء التداول في الشرق الأوسط'
              : 'Learn from Middle East trading experts'}
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                  {lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                  {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={() => setOpenLoginModal(true)}
                  className="bg-primary hover:bg-primary/90 gap-2"
                >
                  {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                </Button>
                <Link href="/signals">
                  <Button size="lg" variant="outline">
                    {lang === 'ar' ? 'التوصيات' : 'Signals'}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">{lang === 'ar' ? 'طالب نشط' : 'Active Students'}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">89%</div>
            <div className="text-sm text-muted-foreground">{lang === 'ar' ? 'نسبة النجاح' : 'Success Rate'}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">12+</div>
            <div className="text-sm text-muted-foreground">{lang === 'ar' ? 'سنوات خبرة' : 'Years Experience'}</div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: lang === 'ar' ? 'توصيات حية' : 'Live Signals' },
              { icon: BookOpen, title: lang === 'ar' ? 'دورات تعليمية' : 'Courses' },
              { icon: BarChart3, title: lang === 'ar' ? 'أدوات متقدمة' : 'Advanced Tools' },
            ].map((service, idx) => {
              const Icon = service.icon
              return (
                <Card key={idx} className="p-6">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/50 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 أكاديمية الصياد. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      <DemoButton />
    </div>
  )
}
