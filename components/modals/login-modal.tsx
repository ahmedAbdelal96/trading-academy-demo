'use client'

import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { LogIn, UserCheck, Shield } from 'lucide-react'

export function LoginModal() {
  const { openLoginModal, setOpenLoginModal, loginAsStudent, loginAsAdmin } = useAuth()
  const { language } = useLanguage()

  return (
    <Dialog open={openLoginModal} onOpenChange={setOpenLoginModal}>
      <DialogContent className="sm:max-w-md glass border-white/20">
        <DialogHeader>
          <DialogTitle className="text-center text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            {language === 'ar' 
              ? 'اختر نوع الحساب للوصول إلى المنصة'
              : 'Select account type to access the platform'}
          </p>

          <Button
            onClick={loginAsStudent}
            className="w-full btn-primary h-12 text-base flex items-center justify-center gap-2"
          >
            <UserCheck className="w-5 h-5" />
            {language === 'ar' ? 'دخول كطالب' : 'Login as Student'}
          </Button>

          <Button
            onClick={loginAsAdmin}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-secondary/50 hover:shadow-secondary/70"
          >
            <Shield className="w-5 h-5" />
            {language === 'ar' ? 'دخول كمدير' : 'Login as Admin'}
          </Button>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <p className="text-xs text-center text-muted-foreground">
              {language === 'ar'
                ? 'بيانات توضيحية:'
                : 'Demo Credentials:'}
            </p>
            <p className="text-xs text-center text-muted-foreground font-mono">
              Student: محمد السالم<br/>
              Admin: أحمد الإدارة
            </p>
          </div>

          <p className="text-xs text-center text-primary/60 font-semibold">
            {language === 'ar'
              ? '🔐 نموذج توضيحي - بيانات وهمية فقط'
              : '🔐 Demo Mode - Mock Data Only'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
