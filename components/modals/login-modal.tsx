'use client'

import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { LogIn } from 'lucide-react'

export function LoginModal() {
  const { openLoginModal, setOpenLoginModal, loginAsStudent, loginAsAdmin } = useAuth()
  const { language } = useLanguage()

  return (
    <Dialog open={openLoginModal} onOpenChange={setOpenLoginModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
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
            className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
          >
            <LogIn className="w-4 h-4 ml-2" />
            {language === 'ar' ? 'دخول كطالب' : 'Login as Student'}
          </Button>

          <Button
            onClick={loginAsAdmin}
            variant="outline"
            className="w-full h-12 text-base"
          >
            <LogIn className="w-4 h-4 ml-2" />
            {language === 'ar' ? 'دخول كمدير' : 'Login as Admin'}
          </Button>

          <p className="text-xs text-center text-muted-foreground pt-2">
            {language === 'ar'
              ? '(هذا نموذج توضيحي - بيانات وهمية)'
              : '(Demo Mode - Mock Data)'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
