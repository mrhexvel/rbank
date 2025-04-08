"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Loader } from "@/components/loader"
import { GlowingBorder } from "@/components/glowing-border"
import { ArrowLeft } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите действительный адрес электронной почты.",
  }),
  password: z.string().min(1, {
    message: "Пароль обязателен.",
  }),
})

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Ошибка входа")
      }

      toast({
        title: "Вход выполнен успешно",
        description: "Добро пожаловать!",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Ошибка входа",
        description: error instanceof Error ? error.message : "Неверный email или пароль",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-8 left-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <GlowingBorder className="w-full max-w-md">
        <Card className="w-full backdrop-blur-sm bg-black/40 border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Добро пожаловать</CardTitle>
            <CardDescription className="text-center">Введите свои данные для входа в аккаунт</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="ivan.ivanov@example.com" {...field} className="bg-black/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} className="bg-black/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-primary-light transition-colors"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader className="mr-2" /> : null}
                  {isLoading ? "Вход..." : "Войти"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Нет аккаунта?{" "}
              <Link href="/register" className="text-primary hover:text-primary-light transition-colors">
                Зарегистрироваться
              </Link>
            </p>
          </CardFooter>
        </Card>
      </GlowingBorder>
    </div>
  )
}
