"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export function AnalyticsView() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        // позже в реальном приложении здесь сделаю запрос к апи
        // const response = await fetch("/api/analytics")
        // const data = await response.json()

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setCategoryData([
          { name: "Продукты", value: 28500, color: "#8884d8" },
          { name: "Транспорт", value: 12000, color: "#83a6ed" },
          { name: "Развлечения", value: 18000, color: "#8dd1e1" },
          { name: "Коммунальные услуги", value: 15000, color: "#82ca9d" },
          { name: "Здоровье", value: 8500, color: "#a4de6c" },
          { name: "Прочее", value: 7000, color: "#d0ed57" },
        ]);

        setMonthlyData([
          { month: "Янв", income: 150000, expenses: 85000 },
          { month: "Фев", income: 155000, expenses: 90000 },
          { month: "Мар", income: 160000, expenses: 88000 },
          { month: "Апр", income: 165000, expenses: 92000 },
          { month: "Май", income: 170000, expenses: 89000 },
          { month: "Июн", income: 175000, expenses: 91000 },
        ]);
      } catch (error) {
        console.error("Ошибка при загрузке аналитических данных:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    );
  }

  const totalExpenses = categoryData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="bg-black/80 border border-white/10 p-3 shadow-lg">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-primary text-lg font-bold">
            {payload[0].value.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
            })}
          </p>
          <p className="text-xs text-muted-foreground">
            {((payload[0].value / totalExpenses) * 100).toFixed(1)}% от общих
            расходов
          </p>
        </Card>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="expenses" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 bg-black/40 p-1">
          <TabsTrigger value="expenses">Расходы</TabsTrigger>
          <TabsTrigger value="income">Доходы и расходы</TabsTrigger>
          <TabsTrigger value="trends">Тренды</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="income" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "rgba(255, 255, 255, 0.5)" }}
              />
              <YAxis tick={{ fill: "rgba(255, 255, 255, 0.5)" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" name="Доходы" fill="#8884d8" />
              <Bar dataKey="expenses" name="Расходы" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="trends" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "rgba(255, 255, 255, 0.5)" }}
              />
              <YAxis tick={{ fill: "rgba(255, 255, 255, 0.5)" }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                name="Доходы"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                name="Расходы"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <h3 className="font-medium mb-1">Общие расходы</h3>
            <p className="text-2xl font-bold">
              {totalExpenses.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
              })}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              За последние 30 дней
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <h3 className="font-medium mb-1">Самая большая категория</h3>
            <p className="text-2xl font-bold">{categoryData[0].name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {categoryData[0].value.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
              })}{" "}
              ({((categoryData[0].value / totalExpenses) * 100).toFixed(1)}%)
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <h3 className="font-medium mb-1">Экономия</h3>
            <p className="text-2xl font-bold">
              {(
                monthlyData[monthlyData.length - 1].income -
                monthlyData[monthlyData.length - 1].expenses
              ).toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
              })}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {(
                ((monthlyData[monthlyData.length - 1].income -
                  monthlyData[monthlyData.length - 1].expenses) /
                  monthlyData[monthlyData.length - 1].income) *
                100
              ).toFixed(1)}
              % от дохода
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
