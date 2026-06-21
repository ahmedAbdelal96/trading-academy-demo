'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/providers'
import { NavigationBar } from '@/components/navigation-bar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, MessageCircle, Zap, Bell, Settings } from 'lucide-react'

export default function TelegramBotsPage() {
  const { language } = useLanguage()
  const [botStatus, setBotStatus] = useState<'disconnected' | 'connected'>('disconnected')
  const [copied, setCopied] = useState(false)

  const botToken = '@AlsayadTradingBot'

  const handleConnect = () => {
    setBotStatus('connected')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(botToken)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const bots = [
    {
      name: language === 'ar' ? 'روبوت التنبيهات' : 'Alerts Bot',
      icon: Bell,
      description: language === 'ar'
        ? 'احصل على تنبيهات فورية عند إصدار توصية جديدة'
        : 'Get instant alerts for new trading signals',
      features: [
        language === 'ar' ? 'إشعارات فورية' : 'Instant notifications',
        language === 'ar' ? 'توصيات يومية' : 'Daily signals',
        language === 'ar' ? 'تنبيهات الأسواق' : 'Market alerts',
      ],
    },
    {
      name: language === 'ar' ? 'روبوت الإحصائيات' : 'Stats Bot',
      icon: Zap,
      description: language === 'ar'
        ? 'تابع أداء حسابك وإحصائياتك اليومية'
        : 'Track your account performance and daily stats',
      features: [
        language === 'ar' ? 'أداء يومي' : 'Daily performance',
        language === 'ar' ? 'إحصائيات الفوز' : 'Win statistics',
        language === 'ar' ? 'تقارير أسبوعية' : 'Weekly reports',
      ],
    },
    {
      name: language === 'ar' ? 'روبوت الدعم' : 'Support Bot',
      icon: MessageCircle,
      description: language === 'ar'
        ? 'احصل على الدعم الفني والإجابة على الأسئلة'
        : 'Get technical support and answer questions',
      features: [
        language === 'ar' ? 'دعم فوري' : 'Instant support',
        language === 'ar' ? 'إجابات ذكية' : 'Smart answers',
        language === 'ar' ? 'توجيهات' : 'Guidance',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {language === 'ar'
                ? 'روبوتات تليجرام'
                : 'Telegram Bots'}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            {language === 'ar'
              ? 'ابقَ متصلاً مع أحدث التوصيات والتنبيهات'
              : 'Stay connected with latest signals and alerts'}
          </p>
        </div>

        {/* Main Bot Card */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {language === 'ar'
                  ? 'ربط روبوت تليجرام'
                  : 'Connect Telegram Bot'}
              </h2>
              <Badge className={botStatus === 'connected' ? 'bg-green-500' : ''}>
                {botStatus === 'connected'
                  ? language === 'ar'
                    ? 'متصل'
                    : 'Connected'
                  : language === 'ar'
                  ? 'غير متصل'
                  : 'Disconnected'}
              </Badge>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                {language === 'ar'
                  ? 'اتبع الخطوات التالية لربط حسابك بروبوت تليجرام'
                  : 'Follow the steps to connect your account with Telegram bot'}
              </p>

              <ol className="space-y-3 list-decimal list-inside">
                <li>
                  <span className="text-muted-foreground">
                    {language === 'ar'
                      ? 'افتح تليجرام واكتب اسم الروبوت'
                      : 'Open Telegram and search for bot name'}
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground">
                    {language === 'ar'
                      ? 'اضغط على /start'
                      : 'Click /start'}
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground">
                    {language === 'ar'
                      ? 'اضغط على زر الربط أدناه'
                      : 'Click Connect button below'}
                  </span>
                </li>
              </ol>

              <div className="bg-card p-4 rounded-lg flex items-center justify-between">
                <div className="font-mono text-sm break-all">
                  {botToken}
                </div>
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      {language === 'ar' ? 'تم' : 'Copied'}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {language === 'ar' ? 'نسخ' : 'Copy'}
                    </>
                  )}
                </Button>
              </div>

              <Button
                onClick={handleConnect}
                disabled={botStatus === 'connected'}
                className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
              >
                {botStatus === 'connected'
                  ? language === 'ar'
                    ? '✓ متصل بنجاح'
                    : '✓ Connected'
                  : language === 'ar'
                  ? 'ربط الروبوت'
                  : 'Connect Bot'}
              </Button>

              {botStatus === 'connected' && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-500 font-semibold text-sm">
                    {language === 'ar'
                      ? '✓ تم ربط الروبوت بنجاح! ستستقبل الآن جميع التنبيهات والتوصيات على تليجرام.'
                      : '✓ Bot connected successfully! You will now receive all alerts and signals.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Available Bots */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {language === 'ar'
              ? 'الروبوتات المتاحة'
              : 'Available Bots'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {bots.map((bot, idx) => {
              const Icon = bot.icon
              return (
                <Card key={idx} className="p-6 hover:border-primary/50 transition">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">
                    {bot.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {bot.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {bot.features.map((feature, fidx) => (
                      <div
                        key={fidx}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    disabled={botStatus !== 'connected'}
                  >
                    <Settings className="w-4 h-4" />
                    {botStatus === 'connected'
                      ? language === 'ar'
                        ? 'تنشيط'
                        : 'Activate'
                      : language === 'ar'
                      ? 'قريباً'
                      : 'Coming Soon'}
                  </Button>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Production Note */}
        <Card className="mt-12 p-6 bg-muted/50 border-muted">
          <h3 className="font-bold mb-3">
            {language === 'ar'
              ? 'ملاحظات للإنتاج'
              : 'Production Notes'}
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>
              {language === 'ar'
                ? 'سيتم دمج Telegram Bot API الحقيقي'
                : 'Real Telegram Bot API integration'}
            </li>
            <li>
              {language === 'ar'
                ? 'ربط حقيقي مع حسابات المستخدمين'
                : 'Real user account integration'}
            </li>
            <li>
              {language === 'ar'
                ? 'إشعارات فورية بالتوصيات الجديدة'
                : 'Real-time signal notifications'}
            </li>
          </ul>
        </Card>
      </main>
    </div>
  )
}
