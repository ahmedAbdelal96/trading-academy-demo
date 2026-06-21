'use client'

import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export function CTASection() {
  const { isLoggedIn, setOpenLoginModal } = useAuth()
  const { language } = useLanguage()

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-12 border border-primary/20">
        <h2 className="text-3xl md:text-4xl font-bold">
          {language === 'ar'
            ? 'جاهز لبدء رحلتك في التداول؟'
            : 'Ready to Start Your Trading Journey?'}
        </h2>

        <p className="text-lg text-muted-foreground">
          {language === 'ar'
            ? 'انضم إلى مئات المتداولين الناجحين وابدأ كسب الأرباح اليوم'
            : 'Join hundreds of successful traders and start earning today'}
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          {isLoggedIn ? (
            <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
              {language === 'ar' ? 'ذهاب إلى لوحة التحكم' : 'Go to Dashboard'}
              {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => setOpenLoginModal(true)}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              {language === 'ar' ? 'ابدأ بحسابك المجاني' : 'Start Your Free Account'}
              {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
