'use client'

import { useAuth, useLanguage } from '@/components/providers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { TrendingUp, BookOpen, AlertCircle, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { isLoggedIn, user } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) return null

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Card */}
        <Card className="p-8 bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
          <h1 className="text-3xl font-bold mb-2">
            {language === 'ar'
              ? `أهلاً ${user?.name}`
              : `Welcome, ${user?.name}`}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar'
              ? 'لديك خطة متقدمة نشطة حتى نهاية الشهر'
              : 'You have an active Premium plan until end of month'}
          </p>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            {
              label: language === 'ar' ? 'الرصيد الحالي' : 'Balance',
              value: '$2,450',
              icon: TrendingUp,
            },
            {
              label: language === 'ar' ? 'نسبة الفوز' : 'Win Rate',
              value: '89%',
              icon: CheckCircle,
            },
            {
              label: language === 'ar' ? 'التوصيات النشطة' : 'Active Signals',
              value: '12',
              icon: AlertCircle,
            },
            {
              label: language === 'ar' ? 'الدورات المكتملة' : 'Courses Done',
              value: '5',
              icon: BookOpen,
            },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Card key={idx} className="p-6">
                <Icon className="w-6 h-6 text-primary mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Active Courses */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {language === 'ar' ? 'دوراتي' : 'My Courses'}
              </h2>
              <Link href="/dashboard/course">
                <Button variant="ghost" size="sm" className="gap-2">
                  {language === 'ar' ? 'عرض الكل' : 'View All'}
                  {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: language === 'ar' ? 'أساسيات التحليل الفني' : 'Technical Analysis Basics',
                  progress: 75,
                },
                {
                  title: language === 'ar' ? 'إدارة المحفظة' : 'Portfolio Management',
                  progress: 40,
                },
              ].map((course, idx) => (
                <Card key={idx} className="p-4">
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {course.progress}%{' '}
                    {language === 'ar' ? 'مكتمل' : 'Complete'}
                  </p>
                </Card>
              ))}
            </div>

            <Link href="/dashboard/course" className="block mt-4">
              <Button
                variant="outline"
                className="w-full gap-2"
              >
                {language === 'ar' ? 'بدء درس جديد' : 'Start New Lesson'}
                {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Button>
            </Link>
          </section>

          {/* Recent Signals */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {language === 'ar' ? 'آخر التوصيات' : 'Recent Signals'}
              </h2>
              <Link href="/signals">
                <Button variant="ghost" size="sm" className="gap-2">
                  {language === 'ar' ? 'عرض الكل' : 'View All'}
                  {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { pair: 'EUR/USD', type: 'BUY', status: 'profitable' },
                { pair: 'GBP/USD', type: 'SELL', status: 'profitable' },
              ].map((signal, idx) => (
                <Card key={idx} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{signal.pair}</div>
                    <Badge variant="outline" className="mt-1">
                      {signal.type}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-green-500 font-bold">
                      +70 pips
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {signal.status}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Link href="/signals" className="block mt-4">
              <Button
                className="w-full bg-primary hover:bg-primary/90 gap-2"
              >
                {language === 'ar' ? 'عرض التوصيات' : 'View Signals'}
                {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Button>
            </Link>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}
