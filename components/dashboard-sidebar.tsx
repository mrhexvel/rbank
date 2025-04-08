"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bell,
  CreditCard,
  DollarSign,
  HelpCircle,
  Home,
  PieChart,
  Settings,
  Shield,
  User,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Главная", href: "/dashboard", icon: Home },
    { name: "Счета", href: "/dashboard/accounts", icon: Wallet },
    { name: "Транзакции", href: "/dashboard/transactions", icon: DollarSign },
    { name: "Карты", href: "/dashboard/cards", icon: CreditCard },
    { name: "Инвестиции", href: "/dashboard/investments", icon: PieChart },
    { name: "Профиль", href: "/dashboard/profile", icon: User },
    { name: "Безопасность", href: "/dashboard/security", icon: Shield },
    { name: "Уведомления", href: "/dashboard/notifications", icon: Bell },
    { name: "Настройки", href: "/dashboard/settings", icon: Settings },
    { name: "Помощь", href: "/dashboard/support", icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col h-full w-64 bg-black/40 backdrop-blur-md border-r border-white/10">
      <div className="p-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">Р</span>
            <div className="absolute inset-0 bg-primary rounded-full blur-sm opacity-50"></div>
          </div>
          <span className="font-bold text-xl">РБанк</span>
        </Link>
      </div>
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 font-normal",
                pathname === item.href &&
                  "bg-primary/10 text-primary border-l-2 border-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
      <div className="p-4 border-t border-white/10">
        <div className="bg-primary/10 rounded-lg p-4">
          <h4 className="font-medium mb-1">Нужна помощь?</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Свяжитесь с нашей службой поддержки
          </p>
          <Button size="sm" variant="outline" className="w-full">
            Связаться с поддержкой
          </Button>
        </div>
      </div>
    </div>
  );
}
