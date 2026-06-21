'use client'

import { useAuth, useLanguage } from '@/components/providers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { PlayCircle, ChevronRight, Clock, BookMarked } from 'lucide-react'

export default function CoursePlayerPage() {
  const { isLoggedIn } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) return null

  const lessons = [
    {
      id: 1,
      title: language === 'ar' ? 'مقدمة في التحليل الفني' : 'Introduction to Technical Analysis',
      duration: '45 min',
      watched: true,
    },
    {
      id: 2,
      title: language === 'ar' ? 'أنواع الشموع' : 'Candlestick Patterns',
      duration: '38 min',
      watched: true,
    },
    {
      id: 3,
      title: language === 'ar' ? 'المستويات والدعوم' : 'Support & Resistance',
      duration: '52 min',
      watched: false,
      isActive: true,
    },
    {
      id: 4,
      title: language === 'ar' ? 'المؤشرات الرئيسية' : 'Key Indicators',
      duration: '48 min',
      watched: false,
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Video Player Section */}
        <section>
          <h1 className="text-3xl font-bold mb-6">
            {language === 'ar'
              ? 'أساسيات التحليل الفني'
              : 'Technical Analysis Basics'}
          </h1>

          <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-6 overflow-hidden">
            <div className="text-center space-y-4 w-full h-full flex flex-col items-center justify-center">
              <PlayCircle className="w-16 h-16 text-primary" />
              <p className="text-muted-foreground">
                {language === 'ar'
                  ? '[TradingView Widget سيكون هنا في الإنتاج]'
                  : '[TradingView Widget will be here in production]'}
              </p>
              <p className="text-xs text-muted-foreground">
                {language === 'ar'
                  ? 'الدرس الحالي: المستويات والدعوم'
                  : 'Current Lesson: Support & Resistance'}
              </p>
            </div>
          </div>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'ar'
                ? 'المستويات والدعوم'
                : 'Support & Resistance Levels'}
            </h2>
            <p className="text-muted-foreground mb-4">
              {language === 'ar'
                ? 'تعلم كيفية تحديد مستويات الدعم والمقاومة وكيفية استخدامها في التداول الفعلي. هذا الدرس يغطي أهم مبادئ التحليل الفني.'
                : 'Learn how to identify support and resistance levels and how to use them in real trading. This lesson covers the most important principles of technical analysis.'}
            </p>
            <div className="flex gap-4">
              <Button className="bg-primary hover:bg-primary/90">
                {language === 'ar'
                  ? 'استمرار المشاهدة'
                  : 'Continue Watching'}
              </Button>
              <Button variant="outline">
                {language === 'ar'
                  ? 'تحميل المادة'
                  : 'Download Materials'}
              </Button>
            </div>
          </Card>
        </section>

        {/* Lessons List */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            {language === 'ar'
              ? 'دروس الكورس'
              : 'Course Lessons'}
          </h2>

          <div className="space-y-2">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className={`p-4 cursor-pointer hover:border-primary/50 transition ${
                  lesson.isActive ? 'border-primary bg-primary/5' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {lesson.watched ? (
                      <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-500 text-sm font-bold">
                        ✓
                      </div>
                    ) : lesson.isActive ? (
                      <PlayCircle className="w-8 h-8 text-primary flex-shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {lesson.duration}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            {language === 'ar'
              ? 'الموارد التعليمية'
              : 'Learning Resources'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: language === 'ar'
                  ? 'ملخص الدرس'
                  : 'Lesson Summary',
              },
              {
                title: language === 'ar'
                  ? 'تمارين عملية'
                  : 'Practice Exercises',
              },
              {
                title: language === 'ar'
                  ? 'اختبار الفهم'
                  : 'Quiz',
              },
              {
                title: language === 'ar'
                  ? 'مراجع إضافية'
                  : 'Additional References',
              },
            ].map((resource, idx) => (
              <Card key={idx} className="p-4 hover:border-primary/50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookMarked className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold">{resource.title}</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
