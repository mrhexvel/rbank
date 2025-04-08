"use client";

import { GlowingBorder } from "@/components/glowing-border";
import { PageLoader } from "@/components/page-loader";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TransactionList } from "@/components/transaction-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownLeft, ArrowUpRight, Calendar, Filter } from "lucide-react";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });

  useEffect(() => {
    async function fetchTransactionsData() {
      try {
        const response = await fetch("/api/transactions");

        if (!response.ok) {
          throw new Error("Не удалось загрузить данные транзакций");
        }

        const data = await response.json();

        const income = data.transactions
          .filter((t: any) => t.amount > 0)
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        const expenses = data.transactions
          .filter((t: any) => t.amount < 0)
          .reduce((sum: number, t: any) => sum + Math.abs(t.amount), 0);

        setStats({
          totalTransactions: data.transactions.length,
          totalIncome: income,
          totalExpenses: expenses,
        });
      } catch (error) {
        console.error("Ошибка при загрузке данных транзакций:", error);
        setStats({
          totalTransactions: 8,
          totalIncome: 185000,
          totalExpenses: 89000,
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactionsData();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Транзакции</h1>
            <p className="text-muted-foreground">
              Просмотр и анализ всех ваших финансовых операций
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Период
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Фильтры
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <ScrollReveal>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Всего транзакций
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {stats.totalTransactions}
                  </p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
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
                  <p className="text-sm text-muted-foreground">Общий доход</p>
                  <p className="text-2xl font-bold mt-1 text-green-500">
                    {stats.totalIncome.toLocaleString("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                    })}
                  </p>
                </div>
                <div className="bg-green-500/10 p-2 rounded-full">
                  <ArrowDownLeft className="h-5 w-5 text-green-500" />
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
                  <p className="text-sm text-muted-foreground">Общие расходы</p>
                  <p className="text-2xl font-bold mt-1 text-red-500">
                    {stats.totalExpenses.toLocaleString("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                    })}
                  </p>
                </div>
                <div className="bg-red-500/10 p-2 rounded-full">
                  <ArrowUpRight className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.3} className="mt-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4 bg-black/40 p-1">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="income">Доходы</TabsTrigger>
            <TabsTrigger value="expenses">Расходы</TabsTrigger>
            <TabsTrigger value="pending">В обработке</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <GlowingBorder>
              <Card className="backdrop-blur-sm bg-black/40 border-0">
                <CardHeader>
                  <CardTitle>Все транзакции</CardTitle>
                  <CardDescription>
                    Полный список всех ваших финансовых операций
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionList />
                </CardContent>
              </Card>
            </GlowingBorder>
          </TabsContent>

          <TabsContent value="income">
            <GlowingBorder>
              <Card className="backdrop-blur-sm bg-black/40 border-0">
                <CardHeader>
                  <CardTitle>Доходы</CardTitle>
                  <CardDescription>
                    Все ваши поступления средств
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionList />
                </CardContent>
              </Card>
            </GlowingBorder>
          </TabsContent>

          <TabsContent value="expenses">
            <GlowingBorder>
              <Card className="backdrop-blur-sm bg-black/40 border-0">
                <CardHeader>
                  <CardTitle>Расходы</CardTitle>
                  <CardDescription>Все ваши расходные операции</CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionList />
                </CardContent>
              </Card>
            </GlowingBorder>
          </TabsContent>

          <TabsContent value="pending">
            <GlowingBorder>
              <Card className="backdrop-blur-sm bg-black/40 border-0">
                <CardHeader>
                  <CardTitle>В обработке</CardTitle>
                  <CardDescription>
                    Транзакции, которые еще не завершены
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionList />
                </CardContent>
              </Card>
            </GlowingBorder>
          </TabsContent>
        </Tabs>
      </ScrollReveal>
    </>
  );
}
