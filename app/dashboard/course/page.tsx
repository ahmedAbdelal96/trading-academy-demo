'use client'

import { useState } from 'react'
import { useAuth, useLanguage } from '@/components/providers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { DemoButton } from '@/components/demo-button'
import {
  PlayCircle, CheckCircle, Clock, ChevronLeft, ChevronRight,
  Download, BookMarked, Award, Lock, ArrowLeft
} from 'lucide-react'

const courseData = {
  title: 'أساسيات التحليل الفني',
  subtitle: 'من المبتدئ إلى المحترف في التحليل الفني للأسواق المالية',
  progress: 45,
  lessons: [
    { id: 1, title: 'مقدمة في التحليل الفني', duration: '45:00', watched: true, locked: false },
    { id: 2, title: 'أنواع الشموع اليابانية', duration: '38:30', watched: true, locked: false },
    { id: 3, title: 'المستويات والدعوم', duration: '52:15', watched: false, locked: false, isActive: true },
    { id: 4, title: 'المؤشرات الرئيسية (RSI, MACD)', duration: '48:00', watched: false, locked: false },
    { id: 5, title: 'نماذج الشموع القوية', duration: '41:20', watched: false, locked: true },
    { id: 6, title: 'استراتيجية متكاملة للتداول', duration: '60:00', watched: false, locked: true },
  ],
  resources: [
    { title: 'ملخص الدرس PDF', icon: Download, color: '#2563EB', bg: '#EFF6FF' },
    { title: 'تمارين عملية', icon: BookMarked, color: '#7C3AED', bg: '#F5F3FF' },
    { title: 'اختبار الفهم', icon: Award, color: '#4F46E5', bg: '#EEF2FF' },
    { title: 'مراجع إضافية', icon: ChevronLeft, color: '#0EA5E9', bg: '#E0F2FE' },
  ],
}

const chartBars = [35, 50, 42, 65, 58, 72, 68, 80, 75, 85, 78, 90]

export default function CoursePlayerPage() {
  const { isLoggedIn } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()
  const [activeLesson, setActiveLesson] = useState(3)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) router.push('/')
  }, [isLoggedIn, router])

  if (!isLoggedIn) return null

  const currentLesson = courseData.lessons.find(l => l.id === activeLesson) || courseData.lessons[2]

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span
            className="hover:text-blue-600 cursor-pointer transition-colors"
            onClick={() => router.push('/dashboard')}
          >
            لوحة التحكم
          </span>
          <ChevronRight className="w-4 h-4" />
          <span
            className="hover:text-blue-600 cursor-pointer transition-colors"
          >
            الدورات
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-800 font-medium">{courseData.title}</span>
        </div>

        {/* Course Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{courseData.title}</h1>
            <p className="text-slate-500 text-sm mt-1">{courseData.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-500 mb-1">تقدمك في الكورس</div>
              <div className="text-sm font-bold text-blue-600">{courseData.progress}%</div>
            </div>
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${courseData.progress}%`, background: 'linear-gradient(90deg, #2563EB, #7C3AED)' }}
              />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Video Player — 2 columns */}
          <div className="lg:col-span-2 space-y-4">

            {/* Player */}
            <div
              className="relative rounded-3xl overflow-hidden cursor-pointer group"
              style={{
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                aspectRatio: '16/9',
              }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {/* Fake chart visualization */}
              <div className="absolute bottom-8 left-8 right-8 flex items-end gap-1 opacity-20">
                {chartBars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h * 1.2}px`,
                      background: 'linear-gradient(to top, #2563EB, #7C3AED)',
                    }}
                  />
                ))}
              </div>

              {/* Play/Pause overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                  style={{ border: '2px solid rgba(255,255,255,0.3)' }}
                >
                  {isPlaying ? (
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-8 bg-white rounded-sm" />
                      <div className="w-2.5 h-8 bg-white rounded-sm" />
                    </div>
                  ) : (
                    <PlayCircle className="w-10 h-10 text-white fill-white/20" />
                  )}
                </div>
              </div>

              {/* Current lesson info */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/70 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{currentLesson.duration}</span>
                    <span className="w-1 h-1 bg-white/40 rounded-full" />
                    <span>الدرس {activeLesson} من {courseData.lessons.length}</span>
                  </div>
                  <div className="text-white font-semibold text-sm text-right">{currentLesson.title}</div>
                </div>

                {/* Fake progress bar */}
                <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: isPlaying ? '35%' : '28%', background: 'linear-gradient(90deg, #2563EB, #7C3AED)' }}
                  />
                </div>
              </div>

              {/* Live badge */}
              <div className="absolute top-4 right-4">
                <div
                  className="px-3 py-1.5 rounded-xl text-white text-xs font-bold flex items-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
                >
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  TradingView Embedded
                </div>
              </div>
            </div>

            {/* Lesson Info Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
                  >
                    <PlayCircle className="w-4 h-4" />
                    {isPlaying ? 'إيقاف مؤقت' : 'استمرار المشاهدة'}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-200 text-sm font-medium">
                    <Download className="w-4 h-4" />
                    تحميل المادة
                  </button>
                </div>
                <div className="text-right">
                  <h2 className="text-lg font-bold text-slate-900">{currentLesson.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">المدة: {currentLesson.duration}</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed text-right">
                تعلم كيفية تحديد مستويات الدعم والمقاومة وكيفية استخدامها في التداول الفعلي.
                يغطي هذا الدرس أهم مبادئ التحليل الفني وكيفية تطبيقها على الرسوم البيانية المختلفة.
              </p>
            </div>

            {/* Resources */}
            <div className="grid grid-cols-2 gap-3">
              {courseData.resources.map((resource, idx) => {
                const Icon = resource.icon
                return (
                  <button
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-right group"
                  >
                    <div className="flex items-center gap-3">
                      <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors" />
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-slate-700">{resource.title}</span>
                      </div>
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: resource.bg }}
                      >
                        <Icon className="w-4 h-4" style={{ color: resource.color }} />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Lessons List — 1 column */}
          <div className="dashboard-card">
            <div className="p-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 text-right text-sm">دروس الكورس</h2>
              <p className="text-xs text-slate-400 text-right mt-0.5">
                {courseData.lessons.filter(l => l.watched).length} / {courseData.lessons.length} مكتمل
              </p>
            </div>

            <div className="p-3 space-y-1.5">
              {courseData.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => !lesson.locked && setActiveLesson(lesson.id)}
                  disabled={lesson.locked}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl text-right transition-all duration-200 ${
                    lesson.id === activeLesson
                      ? 'text-white shadow-md'
                      : lesson.locked
                      ? 'opacity-50 cursor-not-allowed bg-slate-50'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                  style={lesson.id === activeLesson ? {
                    background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                  } : {}}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    lesson.id === activeLesson
                      ? 'bg-white/20'
                      : lesson.watched
                      ? 'bg-green-100'
                      : lesson.locked
                      ? 'bg-slate-100'
                      : 'bg-blue-50'
                  }`}>
                    {lesson.watched ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : lesson.locked ? (
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    ) : lesson.id === activeLesson ? (
                      <PlayCircle className="w-4 h-4 text-white fill-white/30" />
                    ) : (
                      <PlayCircle className="w-4 h-4 text-blue-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold truncate ${
                      lesson.id === activeLesson ? 'text-white' : 'text-slate-800'
                    }`}>
                      {lesson.title}
                    </div>
                    <div className={`text-xs mt-0.5 flex items-center gap-1 ${
                      lesson.id === activeLesson ? 'text-white/70' : 'text-slate-400'
                    }`}>
                      <Clock className="w-2.5 h-2.5" />
                      {lesson.duration}
                    </div>
                  </div>

                  <span className={`text-xs font-bold flex-shrink-0 ${
                    lesson.id === activeLesson ? 'text-white/70' : 'text-slate-300'
                  }`}>
                    {String(lesson.id).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
      <DemoButton />
    </DashboardLayout>
  )
}
