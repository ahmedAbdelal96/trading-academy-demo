'use client'

import Link from 'next/link'
import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { TrendingUp, BarChart3, Zap, Users, Award, BookOpen, ArrowLeft, Wallet, MessageSquare, CheckCircle, Smartphone, Play } from 'lucide-react'
import { NavigationBar } from '@/components/navigation-bar'
import { DemoButton } from '@/components/demo-button'

export default function HomePage() {
  const auth = useAuth()
  const language = useLanguage()

  if (!auth || !language) return null

  const { isLoggedIn, setOpenLoginModal, user } = auth

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      {/* Market Ticker */}
      <div className="border-b border-border bg-white py-3 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-6 min-w-max md:min-w-full">
            {[
              { symbol: 'TASI', value: '+1.24%', up: true },
              { symbol: 'BTC/USD', value: '+2.8%', up: true },
              { symbol: 'NASDAQ', value: '-0.6%', up: false },
              { symbol: 'XAU/USD', value: '+0.4%', up: true },
              { symbol: 'EUR/USD', value: '-0.2%', up: false },
            ].map((item) => (
              <div key={item.symbol} className={`market-ticker ${item.up ? 'up' : 'down'}`}>
                <span className="font-semibold">{item.symbol}</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section - Two Column */}
      <section className="relative py-24 px-4 md:py-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Right Column - Text & CTAs */}
          <div className="space-y-8 text-right order-2 md:order-2">
            {/* Badge */}
            <div className="inline-block badge-success">
              منصة تعليم وتوصيات تداول متكاملة
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                تعلم التداول باحتراف مع توصيات ذكية وبيانات سوق مباشرة
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                منصة عربية متكاملة تجمع بين الكورسات، الاشتراكات، توصيات التداول، TradingView، Telegram Bots، ولوحة تحكم للطلاب والإدارة.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              {isLoggedIn && user?.role === 'student' ? (
                <Link href="/dashboard" className="w-full">
                  <Button size="lg" className="btn-primary w-full">
                    لوحة التحكم
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  onClick={() => setOpenLoginModal(true)}
                  className="btn-primary w-full justify-center"
                >
                  دخول تجريبي كطالب
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              )}

              {isLoggedIn && user?.role === 'admin' ? (
                <Link href="/admin" className="w-full">
                  <Button size="lg" className="btn-secondary w-full">
                    لوحة الإدارة
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  onClick={() => setOpenLoginModal(true)}
                  variant="outline"
                  className="w-full justify-center border-2 border-secondary text-secondary hover:bg-amber-50"
                >
                  عرض لوحة الإدارة
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              )}

              <Link href="/signals" className="w-full">
                <Button size="lg" variant="outline" className="w-full justify-center border-primary text-primary hover:bg-emerald-50">
                  مشاهدة خطط الاشتراك
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Left Column - Dashboard Preview */}
          <div className="relative h-full min-h-[500px] order-1 md:order-1">
            {/* Main Dashboard Card */}
            <div className="premium-card-lg p-6 space-y-6 floating-animation">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground">لوحة التحكم</h3>
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>

              {/* Mini Chart */}
              <div className="bg-foreground/2 rounded-lg p-4 h-24 flex items-end gap-1">
                {[40, 30, 60, 45, 70, 55, 75, 65, 80, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-primary to-emerald-400 rounded-sm opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-emerald-50 rounded-lg p-3 text-center border border-emerald-200">
                  <div className="text-lg font-bold text-primary">+4.2K</div>
                  <div className="text-xs text-muted-foreground">الأرباح</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-200">
                  <div className="text-lg font-bold text-secondary">78%</div>
                  <div className="text-xs text-muted-foreground">النجاح</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
                  <div className="text-lg font-bold text-blue-600">25</div>
                  <div className="text-xs text-muted-foreground">توصية</div>
                </div>
              </div>
            </div>

            {/* Trading Signal Card - Overlapping */}
            <div className="absolute bottom-0 left-0 right-0 md:right-auto md:left-1/4 premium-card-lg p-4 border-l-4 border-primary space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-lg text-foreground">BUY AAPL</div>
                  <div className="text-sm text-muted-foreground">Apple Inc.</div>
                </div>
                <div className="badge-success">شراء</div>
              </div>
              <div className="space-y-2 text-sm border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">دخول:</span>
                  <span className="font-semibold">185.20 $</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">هدف:</span>
                  <span className="font-semibold text-primary">192.00 $</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">وقف:</span>
                  <span className="font-semibold text-destructive">181.00 $</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                <Smartphone className="w-4 h-4 text-primary" />
                متصل مع Telegram
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-foreground/2">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: 'طالب نشط', value: '+12,000', color: 'emerald' },
            { icon: TrendingUp, label: 'توصية مرسلة', value: '+4,500', color: 'emerald' },
            { icon: Award, label: 'نسبة النجاح', value: '78%', color: 'amber' },
            { icon: Zap, label: 'سنوات الخبرة', value: '+8', color: 'emerald' },
          ].map((stat, idx) => {
            const Icon = stat.icon
            const colorClass = stat.color === 'amber' ? 'text-secondary' : 'text-primary'
            return (
              <div key={idx} className="premium-card-lg text-center">
                <Icon className={`w-8 h-8 mx-auto mb-3 ${colorClass}`} />
                <div className={`text-3xl font-bold mb-1 ${colorClass}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              خدماتنا المتكاملة
            </h2>
            <p className="text-lg text-muted-foreground">
              جميع الأدوات التي تحتاجها للتداول الاحترافي والتعليم المستمر
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: 'الدورات التعليمية', desc: 'محتوى متقدم من خبراء التداول' },
              { icon: TrendingUp, title: 'توصيات التداول', desc: 'إشارات يومية مباشرة مع تحليل' },
              { icon: BarChart3, title: 'مؤشرات TradingView', desc: 'تحليل فني متقدم وفوري' },
              { icon: MessageSquare, title: 'بوتات تيليجرام', desc: 'إشعارات فورية على هاتفك' },
              { icon: CheckCircle, title: 'الفلترة الشرعية', desc: 'أسهم متوافقة شرعاً' },
              { icon: Wallet, title: 'سجل التداول', desc: 'تحليل الأداء الكامل' },
            ].map((service, idx) => {
              const Icon = service.icon
              return (
                <div key={idx} className="premium-card-lg text-right space-y-3">
                  <Icon className="w-10 h-10 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-foreground/2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              خطط الاشتراك المميزة
            </h2>
            <p className="text-lg text-muted-foreground">
              اختر الخطة المناسبة لاحتياجاتك
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'مجاني', price: '0', features: 5, highlight: false, icon: '🎓' },
              { name: 'أساسي', price: '99', features: 8, highlight: false, icon: '📚' },
              { name: 'متقدم', price: '199', features: 12, highlight: false, icon: '⭐' },
              { name: 'VIP', price: '399', features: 20, highlight: true, icon: '👑' },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`premium-card-lg relative flex flex-col gap-4 ${
                  plan.highlight ? 'ring-2 ring-secondary scale-105 md:scale-110 shadow-lg' : ''
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 right-0 left-0 flex justify-center">
                    <div className="badge-gold">
                      الأكثر تميزًا
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <div className="text-4xl mb-2">{plan.icon}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">/شهر</span>
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  {Array.from({ length: plan.features }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">ميزة {i + 1}</span>
                    </div>
                  ))}
                </div>

                <Link href="/checkout" className="w-full">
                  <Button
                    className={`w-full justify-center ${
                      plan.highlight ? 'btn-secondary' : 'btn-primary'
                    }`}
                    size="lg"
                  >
                    اشترك الآن
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-12 border border-border">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            جاهز لتجربة المنصة؟
          </h2>
          <p className="text-lg text-muted-foreground">
            ابدأ رحلتك في التداول الاحترافي اليوم وتعلم من أفضل الخبراء في المنطقة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setOpenLoginModal(true)}
              className="btn-primary"
            >
              دخول تجريبي
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
            <Link href="/signals">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-emerald-50">
                عرض خطط الاشتراك
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="font-semibold text-foreground">© 2025 أكاديمية الصياد للأسواق المالية</p>
          <p className="text-sm mt-2">جميع الحقوق محفوظة | منصة توضيحية</p>
        </div>
      </footer>

      <DemoButton />
    </div>
  )
}
