'use client'

import { useState } from 'react'
import { useAuth, useLanguage } from '@/components/providers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import {
  Send,
  Plus,
  Users,
  TrendingUp,
  BarChart3,
  CheckCircle,
} from 'lucide-react'

export default function AdminPage() {
  const { isLoggedIn, user } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()
  const [signals, setSignals] = useState<any[]>([])
  const [newSignal, setNewSignal] = useState({
    pair: '',
    type: 'BUY',
    entry: '',
    target: '',
  })
  const [sendMessage, setSendMessage] = useState('')

  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'admin') {
      router.push('/')
    }
  }, [isLoggedIn, user, router])

  if (!isLoggedIn || user?.role !== 'admin') return null

  const handleSendSignal = () => {
    if (newSignal.pair && newSignal.entry && newSignal.target) {
      setSignals([
        ...signals,
        {
          ...newSignal,
          date: new Date().toLocaleDateString(),
        },
      ])
      setNewSignal({ pair: '', type: 'BUY', entry: '', target: '' })
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <Card className="p-8 bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
          <h1 className="text-3xl font-bold mb-2">
            {language === 'ar' ? `مرحباً ${user?.name}` : `Welcome, ${user?.name}`}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar'
              ? 'أدارة المنصة والتوصيات'
              : 'Manage platform and signals'}
          </p>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              label: language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users',
              value: '1,200+',
              icon: Users,
            },
            {
              label: language === 'ar'
                ? 'التوصيات هذا الشهر'
                : 'Signals This Month',
              value: '87',
              icon: TrendingUp,
            },
            {
              label: language === 'ar' ? 'نسبة النجاح' : 'Success Rate',
              value: '89%',
              icon: CheckCircle,
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Send Signal Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">
                {language === 'ar'
                  ? 'إرسال توصية جديدة'
                  : 'Send New Signal'}
              </h2>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      {language === 'ar' ? 'زوج العملات' : 'Currency Pair'}
                    </label>
                    <Input
                      placeholder="EUR/USD"
                      value={newSignal.pair}
                      onChange={(e) =>
                        setNewSignal({
                          ...newSignal,
                          pair: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">
                      {language === 'ar' ? 'النوع' : 'Type'}
                    </label>
                    <select
                      value={newSignal.type}
                      onChange={(e) =>
                        setNewSignal({
                          ...newSignal,
                          type: e.target.value,
                        })
                      }
                      className="w-full bg-input border border-border rounded px-3 py-2 text-foreground"
                    >
                      <option value="BUY">BUY</option>
                      <option value="SELL">SELL</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      {language === 'ar' ? 'نقطة الدخول' : 'Entry Price'}
                    </label>
                    <Input
                      placeholder="1.0850"
                      value={newSignal.entry}
                      onChange={(e) =>
                        setNewSignal({
                          ...newSignal,
                          entry: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">
                      {language === 'ar' ? 'الهدف' : 'Target Price'}
                    </label>
                    <Input
                      placeholder="1.0920"
                      value={newSignal.target}
                      onChange={(e) =>
                        setNewSignal({
                          ...newSignal,
                          target: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSendSignal}
                  className="w-full bg-primary hover:bg-primary/90 gap-2 h-12"
                >
                  <Send className="w-4 h-4" />
                  {language === 'ar'
                    ? 'إرسال التوصية'
                    : 'Send Signal'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">
              {language === 'ar'
                ? 'النشاط الأخير'
                : 'Recent Activity'}
            </h3>
            <div className="space-y-3">
              {[
                {
                  action: language === 'ar'
                    ? 'توصية جديدة'
                    : 'New Signal',
                  time: '2 دقائق',
                },
                {
                  action: language === 'ar'
                    ? 'مستخدم جديد'
                    : 'New User',
                  time: '15 دقيقة',
                },
                {
                  action: language === 'ar'
                    ? 'اشتراك'
                    : 'Subscription',
                  time: '45 دقيقة',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.action}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sent Signals */}
        {signals.length > 0 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">
              {language === 'ar'
                ? 'التوصيات المرسلة'
                : 'Sent Signals'}
            </h2>

            <div className="space-y-3">
              {signals.map((signal, idx) => (
                <Card key={idx} className="p-4 bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">{signal.pair}</div>
                      <div className="text-sm text-muted-foreground">
                        {signal.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          signal.type === 'BUY'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {signal.type}
                      </Badge>
                      <div className="text-sm font-mono mt-2">
                        {signal.entry} → {signal.target}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
