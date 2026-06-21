'use client'

import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { LogIn, UserCheck, Shield, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function LoginModal() {
  const { openLoginModal, setOpenLoginModal, loginAsStudent, loginAsAdmin } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()

  const handleStudentLogin = () => {
    loginAsStudent()
    setOpenLoginModal(false)
    router.push('/dashboard')
  }

  const handleAdminLogin = () => {
    loginAsAdmin()
    setOpenLoginModal(false)
    router.push('/admin')
  }

  return (
    <Dialog open={openLoginModal} onOpenChange={setOpenLoginModal}>
      <DialogContent className="sm:max-w-md border-0 p-0 overflow-hidden rounded-3xl shadow-2xl animate-scale-in">
        {/* Gradient Header */}
        <div
          className="px-8 pt-8 pb-6 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
        >
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-white mb-1">
            {language === 'ar' ? 'الدخول التجريبي' : 'Demo Login'}
          </DialogTitle>
          <p className="text-white/80 text-sm">
            {language === 'ar' ? 'اختر نوع الحساب لاستكشاف المنصة' : 'Choose an account type to explore'}
          </p>
        </div>

        <div className="px-8 py-6 space-y-4 bg-white">
          {/* Student Login */}
          <button
            onClick={handleStudentLogin}
            className="w-full group flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50 transition-all duration-200 text-right"
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)' }}
            >
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-800 text-base">
                {language === 'ar' ? 'دخول كطالب' : 'Login as Student'}
              </div>
              <div className="text-sm text-slate-500 mt-0.5">
                {language === 'ar' ? 'لوحة تحكم الطالب مع التوصيات والدورات' : 'Student dashboard with signals & courses'}
              </div>
            </div>
            <div className="text-blue-400 text-sm font-mono">محمد السالم</div>
          </button>

          {/* Admin Login */}
          <button
            onClick={handleAdminLogin}
            className="w-full group flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-200 hover:border-purple-400 bg-white hover:bg-purple-50 transition-all duration-200 text-right"
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' }}
            >
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-800 text-base">
                {language === 'ar' ? 'دخول كمدير' : 'Login as Admin'}
              </div>
              <div className="text-sm text-slate-500 mt-0.5">
                {language === 'ar' ? 'لوحة الإدارة الكاملة مع إرسال التوصيات' : 'Full admin panel with signal management'}
              </div>
            </div>
            <div className="text-purple-400 text-sm font-mono">أحمد الإدارة</div>
          </button>

          {/* Demo Notice */}
          <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-slate-600">
                {language === 'ar' ? 'وضع العرض التجريبي' : 'Demo Mode Active'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {language === 'ar'
                ? 'بيانات وهمية فقط — لا يتم خصم أي مبالغ حقيقية'
                : 'Mock data only — no real charges'}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
