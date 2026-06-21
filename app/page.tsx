'use client'

import Link from 'next/link'
import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { TrendingUp, BarChart3, Zap, Users, Award, BookOpen, ArrowLeft, Wallet, MessageSquare, CheckCircle, Smartphone } from 'lucide-react'
import { NavigationBar } from '@/components/navigation-bar'
import { DemoButton } from '@/components/demo-button'

export default function HomePage() {
  const auth = useAuth()
  const language = useLanguage()

  if (!auth || !language) return null

  const { isLoggedIn, setOpenLoginModal, user } = auth
  const { language: lang } = language

  return (
    <div className="min-h-screen">
      <NavigationBar />
      
      {/* Market Ticker */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm py-2 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex gap-8 min-w-max md:min-w-full flex-wrap md:flex-nowrap">
          {[
            { symbol: 'TASI', value: '+1.24%', up: true },
            { symbol: 'BTC/USD', value: '+2.8%', up: true },
            { symbol: 'NASDAQ', value: '-0.6%', up: false },
            { symbol: 'XAU/USD', value: '+0.4%', up: true },
            { symbol: 'EUR/USD', value: '-0.2%', up: false },
          ].map((item) => (
            <div key={item.symbol} className={`market-ticker ${item.up ? 'up' : 'down'}`}>
              <span className="font-semibold">{item.symbol}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section - Two Column */}
      <section className="relative min-h-[800px] flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Right Column - Text & CTAs */}
          <div className="space-y-8 text-right">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
                  منصة تداول تعليمية متكاملة
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                تعلم التداول باحتراف، تابع توصيات الخبراء المباشرة، استخدم أدوات التحليل المتقدمة، وادر اشتراكاتك بسهولة من لوحة تحكم واحدة.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              {isLoggedIn && user?.role === 'student' ? (
                <Link href="/dashboard">
                  <Button size="lg" className="btn-primary w-full sm:w-auto gap-2">
                    لوحة التحكم
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  onClick={() => setOpenLoginModal(true)}
                  className="btn-primary w-full sm:w-auto gap-2"
                >
                  دخول تجريبي كطالب
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}

              {isLoggedIn && user?.role === 'admin' ? (
                <Link href="/admin">
                  <Button size="lg" className="btn-secondary w-full sm:w-auto gap-2">
                    لوحة الإدارة
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  onClick={() => setOpenLoginModal(true)}
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 hover:border-secondary w-full sm:w-auto gap-2"
                >
                  عرض لوحة الإدارة
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}

              <Link href="/signals">
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 w-full sm:w-auto gap-2">
                  خطط الاشتراك
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Left Column - Visual Cards */}
          <div className="relative h-full min-h-[400px]">
            {/* Dashboard Preview Card */}
            <div className="glass-lg p-6 space-y-4 absolute top-0 left-0 right-0 w-full glow-pulse">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary">لوحة التحكم</h3>
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>

              {/* Mini Chart */}
              <div className="bg-white/5 rounded p-4 h-20 flex items-end gap-1">
                {[40, 30, 60, 45, 70, 55, 75, 65, 80].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-sm opacity-70 hover:opacity-100 transition-opacity"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/5 rounded p-2 text-center">
                  <div className="text-sm font-bold text-primary">+4,250</div>
                  <div className="text-xs text-muted-foreground">الأرباح</div>
                </div>
                <div className="bg-white/5 rounded p-2 text-center">
                  <div className="text-sm font-bold text-primary">78%</div>
                  <div className="text-xs text-muted-foreground">النجاح</div>
                </div>
                <div className="bg-white/5 rounded p-2 text-center">
                  <div className="text-sm font-bold text-secondary">25</div>
                  <div className="text-xs text-muted-foreground">توصية</div>
                </div>
              </div>
            </div>

            {/* Trading Signal Card */}
            <div className="signal-card absolute bottom-0 right-0 w-80 max-w-full">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-lg font-bold text-primary">BUY AAPL</div>
                  <div className="text-xs text-muted-foreground">Apple Inc.</div>
                </div>
                <div className="bg-primary/20 px-2 py-1 rounded text-xs text-primary font-semibold">شراء</div>
              </div>
              <div className="space-y-1 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">دخول:</span>
                  <span className="text-foreground">185.20 $</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">هدف:</span>
                  <span className="text-primary">192.00 $</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">وقف:</span>
                  <span className="text-destructive">181.00 $</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs">
                <Smartphone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">متصل مع Telegram</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: 'طالب نشط', value: '+12,000', color: 'primary' },
            { icon: TrendingUp, label: 'توصية مرسلة', value: '+4,500', color: 'primary' },
            { icon: Award, label: 'نسبة النجاح', value: '78%', color: 'secondary' },
            { icon: Zap, label: 'سنوات الخبرة', value: '+8', color: 'primary' },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="premium-card text-center">
                <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                <div className={`text-3xl font-bold mb-1 ${stat.color === 'primary' ? 'text-primary' : 'text-secondary'}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
            خدماتنا المتكاملة
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            جميع الأدوات التي تحتاجها للتداول الاحترافي والتعليم المستمر
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: 'الدورات التعليمية', desc: 'محتوى متقدم من خبراء' },
              { icon: TrendingUp, title: 'توصيات التداول', desc: 'إشارات يومية مباشرة' },
              { icon: BarChart3, title: 'مؤشرات TradingView', desc: 'تحليل فني متقدم' },
              { icon: MessageSquare, title: 'بوتات تيليجرام', desc: 'إشعارات فورية' },
              { icon: CheckCircle, title: 'الفلترة الشرعية', desc: 'أسهم متوافقة شرعاً' },
              { icon: Wallet, title: 'سجل التداول', desc: 'تحليل الأداء الكامل' },
            ].map((service, idx) => {
              const Icon = service.icon
              return (
                <div key={idx} className="premium-card space-y-3">
                  <Icon className="w-10 h-10 text-primary" />
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
            خطط الاشتراك المميزة
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            اختر الخطة المناسبة لاحتياجاتك
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'أساسي', price: '99', features: 5, highlight: false },
              { name: 'متقدم', price: '199', features: 8, highlight: false },
              { name: 'مميز', price: '399', features: 12, highlight: true },
              { name: 'VIP', price: '999', features: 20, highlight: false },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`premium-card space-y-6 flex flex-col relative ${
                  plan.highlight ? 'ring-2 ring-secondary scale-105 md:scale-110' : ''
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 right-0 left-0 flex justify-center">
                    <div className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      الأشهر
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">/شهر</span>
                  </div>
                </div>

                <ul className="space-y-2 flex-1">
                  {Array.from({ length: plan.features }).map((_, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">ميزة {i + 1}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/checkout">
                  <Button
                    className={`w-full h-10 ${
                      plan.highlight ? 'btn-secondary' : 'btn-primary'
                    }`}
                  >
                    اشترك الآن
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Flow Section */}
      <section className="py-16 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
              كيف تعمل المنصة؟
            </h2>
            <p className="text-muted-foreground">
              جولة توضيحية شاملة من البداية إلى النهاية
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '👤 دخول تجريبي',
              '📊 عرض اللوحة',
              '📈 اطلع التوصيات',
              '🛒 عملية شراء',
              '💳 الدفع',
              '✅ تأكيد نجاح',
              '🤖 تيليجرام',
              '⚙️ إدارة متقدمة',
            ].map((step, idx) => (
              <div key={idx} className="premium-card p-4">
                <div className="text-2xl mb-2">{step.split(' ')[0]}</div>
                <div className="text-xs font-semibold text-muted-foreground">{step.substring(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            جاهز لتجربة المنصة؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ابدأ رحلتك في التداول الاحترافي اليوم وتعلم من أفضل الخبراء في المنطقة
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setOpenLoginModal(true)}
              className="btn-primary gap-2"
            >
              دخول تجريبي
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Link href="/signals">
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 w-full gap-2">
                عرض خطط الاشتراك
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-sm py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2025 أكاديمية الصياد للأسواق المالية. جميع الحقوق محفوظة.</p>
          <p className="text-xs mt-2">منصة توضيحية - بيانات وهمية</p>
        </div>
      </footer>

      <DemoButton />
    </div>
  )
}
