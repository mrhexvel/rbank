"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
}

export function TransactionList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions");

        if (!response.ok) {
          throw new Error("Не удалось загрузить транзакции");
        }

        const data = await response.json();
        setTransactions(data.transactions);
      } catch (error) {
        console.error("Ошибка при загрузке транзакций:", error);
        setTransactions([
          {
            id: "1",
            name: "Продуктовый магазин",
            amount: -5825,
            date: "Сегодня, 10:30",
            category: "Покупки",
            icon: "🛒",
          },
          {
            id: "2",
            name: "Зарплата",
            amount: 150000,
            date: "Вчера, 9:15",
            category: "Доход",
            icon: "💰",
          },
          {
            id: "3",
            name: "Счет за электричество",
            amount: -3245,
            date: "20 мая, 2024",
            category: "Коммунальные услуги",
            icon: "⚡",
          },
          {
            id: "4",
            name: "Ресторан",
            amount: -4580,
            date: "18 мая, 2024",
            category: "Еда",
            icon: "🍔",
          },
          {
            id: "5",
            name: "Онлайн перевод",
            amount: -15000,
            date: "15 мая, 2024",
            category: "Перевод",
            icon: "🔄",
          },
          {
            id: "6",
            name: "Стриминговый сервис",
            amount: -649,
            date: "12 мая, 2024",
            category: "Развлечения",
            icon: "🎬",
          },
          {
            id: "7",
            name: "Фриланс оплата",
            amount: 35000,
            date: "10 мая, 2024",
            category: "Доход",
            icon: "💻",
          },
          {
            id: "8",
            name: "АЗС",
            amount: -2530,
            date: "8 мая, 2024",
            category: "Транспорт",
            icon: "⛽",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск транзакций..."
          className="pl-10 bg-black/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border border-white/10"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border border-white/10 hover:bg-primary/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 bg-primary/10 border border-primary/20">
                  <AvatarFallback>{transaction.icon}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.date} • {transaction.category}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "font-bold",
                  transaction.amount > 0 ? "text-green-500" : ""
                )}
              >
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount.toLocaleString("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && filteredTransactions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Транзакции не найдены</p>
        </div>
      )}

      {!isLoading && filteredTransactions.length > 0 && (
        <div className="text-center">
          <Button variant="outline" size="sm">
            Просмотреть все транзакции
          </Button>
        </div>
      )}
    </div>
  );
}
