"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, PieChart, Wallet } from "lucide-react"
import { BalanceChart } from "@/components/balance-chart"
import { TransactionList } from "@/components/transaction-list"
import { AccountsList } from "@/components/accounts-list"
import { AnalyticsView } from "@/components/analytics-view"
import { StatCard } from "@/components/stat-card"
import { PageLoader } from "@/components/page-loader"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlowingBorder } from "@/components/glowing-border"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalBalance: 0,
    income: 0,
    expenses: 0,
    investments: 0,
  })

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/user")

        if (!response.ok) {
          throw new Error("Не авторизован")
        }

        const data = await response.json()
        setUser(data.user)

        // Рассчитываем общий баланс из счетов пользователя
        if (data.user.accounts && data.user.accounts.length > 0) {
          const totalBalance = data.user.accounts.reduce((sum: number, account: any) => sum + account.balance, 0)

          // Устанавливаем статистику на основе данных пользователя
          setStats({
            totalBalance: totalBalance,
            income: 4200, // Пример данных
            expenses: 1895, // Пример данных
            investments: data.user.accounts.find((a: any) => a.type === "INVESTMENT")?.balance || 0,
          })
        }
      } catch (error) {
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Панель управления</h1>
        <p className="text-muted-foreground">
          Добро пожаловать, <span className="text-primary">{user?.name}</span>. Вот обзор ваших счетов.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScrollReveal>
          <StatCard
            title="Общий баланс"
            value={`₽${stats.totalBalance.toLocaleString()}`}
            change="+2.5%"
            trend="up"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <StatCard
            title="Доход"
            value={`₽${stats.income.toLocaleString()}`}
            change="+5.2%"
            trend="up"
            icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <StatCard
            title="Расходы"
            value={`₽${stats.expenses.toLocaleString()}`}
            change="-1.8%"
            trend="down"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <StatCard
            title="Инвестиции"
            value={`₽${stats.investments.toLocaleString()}`}
            change="+12.3%"
            trend="up"
            icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
          />
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ScrollReveal className="lg:col-span-2">
          <GlowingBorder>
            <Card className="backdrop-blur-sm bg-black/40 border-0 h-full">
              <CardHeader>
                <CardTitle>Обзор баланса</CardTitle>
                <CardDescription>Тренд вашего баланса за последние 30 дней</CardDescription>
              </CardHeader>
              <CardContent>
                <BalanceChart />
              </CardContent>
            </Card>
          </GlowingBorder>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <GlowingBorder>
            <Card className="backdrop-blur-sm bg-black/40 border-0 h-full">
              <CardHeader>
                <CardTitle>Быстрые действия</CardTitle>
                <CardDescription>Часто используемые сервисы</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Card className="bg-primary/10 border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Wallet className="h-8 w-8 mb-2 text-primary" />
                    <p className="text-sm font-medium">Перевод денег</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/10 border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <CreditCard className="h-8 w-8 mb-2 text-primary" />
                    <p className="text-sm font-medium">Оплата счетов</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/10 border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <DollarSign className="h-8 w-8 mb-2 text-primary" />
                    <p className="text-sm font-medium">Обмен валюты</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/10 border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <PieChart className="h-8 w-8 mb-2 text-primary" />
                    <p className="text-sm font-medium">Инвестиции</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </GlowingBorder>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.3}>
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 bg-black/40 p-1">
            <TabsTrigger value="accounts">Счета</TabsTrigger>
            <TabsTrigger value="transactions">Транзакции</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          </TabsList>
          <TabsContent value="accounts">
            <GlowingBorder>
              <Card className="backdrop-blur-sm bg-black/40 border-0">
                <CardHeader>
                  <CardTitle>Ваши счета</CardTitle>
                  <CardDescription>Управляйте своими банковскими счетами и картами</CardDescription>
                </CardHeader>
                <CardContent>
                  <AccountsList />
                </CardContent>
              </Card>
            </GlowingBorder>
          </TabsContent>
          <TabsContent value="transactions">
            <GlowingBorder>
              <Card className="backdrop-blur-sm bg-black/40 border-0">
                <CardHeader>
                  <CardTitle>Недавние транзакции</CardTitle>
                  <CardDescription>Ваша недавняя финансовая активность</CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionList />
                </CardContent>
              </Card>
            </GlowingBorder>
          </TabsContent>
          <TabsContent value="analytics">
            <GlowingBorder>
              <Card className="backdrop-blur-sm bg-black/40 border-0">
                <CardHeader>
                  <CardTitle>Финансовая аналитика</CardTitle>
                  <CardDescription>Отслеживайте свои расходы</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnalyticsView />
                </CardContent>
              </Card>
            </GlowingBorder>
          </TabsContent>
        </Tabs>
      </ScrollReveal>
    </>
  )
}
