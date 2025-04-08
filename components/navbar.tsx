"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DialogTitle } from "./ui/dialog";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
      }
    }

    checkAuth();
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-violet-900/20 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">Р</span>
            <div className="absolute inset-0 bg-primary rounded-full blur-sm opacity-50"></div>
          </div>
          <span className="font-bold text-xl">РБанк</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Возможности
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Тарифы
          </Link>
          <Link
            href="#testimonials"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Отзывы
          </Link>
          <Link
            href="#faq"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <Button
              className="bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity"
              asChild
            >
              <Link href="/dashboard">
                <User className="mr-2 h-4 w-4" />
                Личный кабинет
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Войти</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity"
                asChild
              >
                <Link href="/register">Регистрация</Link>
              </Button>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-black/95 backdrop-blur-md border-l border-white/10"
          >
            <DialogTitle />
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2">
                  <div className="relative w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">
                      Н
                    </span>
                    <div className="absolute inset-0 bg-primary rounded-full blur-sm opacity-50"></div>
                  </div>
                  <span className="font-bold text-xl">РБанк</span>
                </Link>
              </div>
              <nav className="flex flex-col space-y-6 mb-8">
                <Link
                  href="#features"
                  className="text-lg hover:text-primary transition-colors"
                >
                  Возможности
                </Link>
                <Link
                  href="#pricing"
                  className="text-lg hover:text-primary transition-colors"
                >
                  Тарифы
                </Link>
                <Link
                  href="#testimonials"
                  className="text-lg hover:text-primary transition-colors"
                >
                  Отзывы
                </Link>
                <Link
                  href="#faq"
                  className="text-lg hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </nav>
              <div className="mt-auto space-y-4">
                {isAuthenticated ? (
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity"
                    asChild
                  >
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      Личный кабинет
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/login">Войти</Link>
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity"
                      asChild
                    >
                      <Link href="/register">Регистрация</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
