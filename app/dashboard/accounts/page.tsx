"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountsList } from "@/components/accounts-list"
import { PageLoader } from "@/components/page-loader"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlowingBorder } from "@/components/glowing-border"
import { Plus, CreditCard, Wallet, PieChart } from "lucide-react"

export default function AccountsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalAccounts: 0,
    totalBalance: 0,
  })

  useEffect(() => {
    async function fetchAccountsData() {
      try {
        const response = await fetch("/api/accounts")

        if (!response.ok) {
          throw new Error("Не удалось загрузить данные счетов")
        }

        const data = await response.json()

        setStats({
          totalAccounts: data.accounts.length,
          totalBalance: data.accounts.reduce((sum: number, account: any) => sum + account.balance, 0),
        })
      } catch (error) {
        console.error("Ошибка при загрузке данных счетов:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccountsData()
  }, [])

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Счета</h1>
            <p className="text-muted-foreground">Управляйте всеми вашими счетами и картами в одном месте</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-primary-light">
            <Plus className="mr-2 h-4 w-4" /> Новый счет
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <ScrollReveal>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Всего счетов</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalAccounts}</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Общий баланс</p>
                  <p className="text-2xl font-bold mt-1">
                    {stats.totalBalance.toLocaleString("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                    })}
                  </p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Средний баланс</p>
                  <p className="text-2xl font-bold mt-1">
                    {(stats.totalBalance / (stats.totalAccounts || 1)).toLocaleString("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                    })}
                  </p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <PieChart className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.3} className="mt-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4 bg-black/40 p-1">
            <TabsTrigger value="all">Все счета</TabsTrigger>
            <TabsTrigger value="checking">Расчетные</TabsTrigger>
            <TabsTrigger value="savings">Сберегательные</TabsTrigger>
            <TabsTrigger value="investment">Инвестиционные</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <GlowingBorder>
              <Card className="backdrop-blur-sm bg-black/40 border-0">
                <CardHeader>
                  <CardTitle>Все ваши счета</CardTitle>
                  <CardDescription>Полный список всех ваших счетов и карт</CardDescription>
                </CardHeader>
                <CardContent>
                  <AccountsList />
                </CardContent>
              </Card>
            </GlowingBorder>
          </TabsContent>

          <TabsContent value="checking">
            <GlowingBorder>
              <Card className="backdrop-blur-sm bg-black/40 border-0">
                <CardHeader>
                  <CardTitle>Расчетные счета</CardTitle>
                  <CardDescription>Ваши текущие расчетные счета</CardDescription>
                </CardHeader>
                <CardContent>
                  <AccountsList />
                </CardContent>
              </Card>
            </GlowingBorder>
          </TabsContent>

          <TabsContent value="savings">
            <GlowingBorder>
              <Card className="backdrop-blur-sm bg-black/40 border-0">
                <CardHeader>
                  <CardTitle>Сберегательные счета</CardTitle>
                  <CardDescription>Ваши сберегательные счета и депозиты</CardDescription>
                </CardHeader>
                <CardContent>
                  <AccountsList />
                </CardContent>
              </Card>
            </GlowingBorder>
          </TabsContent>

          <TabsContent value="investment">
            <GlowingBorder>
              <Card className="backdrop-blur-sm bg-black/40 border-0">
                <CardHeader>
                  <CardTitle>Инвестиционные счета</CardTitle>
                  <CardDescription>Ваши инвестиционные портфели и счета</CardDescription>
                </CardHeader>
                <CardContent>
                  <AccountsList />
                </CardContent>
              </Card>
            </GlowingBorder>
          </TabsContent>
        </Tabs>
      </ScrollReveal>
    </>
  )
}
