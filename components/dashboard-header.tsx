"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, LogOut, Menu, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DashboardHeader() {
  const router = useRouter();
  const [notifications] = useState(3);

  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-30">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <DashboardSidebar />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2 md:hidden">
          <div className="relative w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">Р</span>
            <div className="absolute inset-0 bg-primary rounded-full blur-sm opacity-50"></div>
          </div>
          <span className="font-bold text-xl">РБанк</span>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {notifications}
              </span>
            )}
            <span className="sr-only">Уведомления</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Пользователь"
                  />
                  <AvatarFallback>П</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-black/90 backdrop-blur-md border border-white/10"
            >
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Профиль</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Настройки</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => router.push("/api/auth/logout")}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Выйти</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
