import { FeatureCard } from "@/components/feature-card";
import { FloatingCards } from "@/components/floating-cards";
import { Footer } from "@/components/footer";
import { GlowingButton } from "@/components/glowing-button";
import { HeroParticles } from "@/components/hero-particles";
import { Navbar } from "@/components/navbar";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TestimonialCard } from "@/components/testimonial-card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  DollarSign,
  Lock,
  Shield,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />

      <Navbar />

      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroParticles />
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="flex flex-col items-center max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
              <span className="relative flex w-2 h-2 mr-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary"></span>
                <span className="relative inline-flex w-2 h-2 rounded-full bg-primary"></span>
              </span>
              Банкинг нового поколения
            </div>

            <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Банкинг переосмыслен для{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                цифровой эпохи
              </span>
            </h1>

            <p className="max-w-2xl mb-10 text-xl text-muted-foreground">
              Испытайте безупречное управление финансами с передовой
              безопасностью и персонализированными аналитическими данными. Ваши
              деньги, ваш путь, в любое время.
            </p>

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <GlowingButton asChild>
                <Link href="/register">Начать</Link>
              </GlowingButton>
              <Button variant="outline" asChild>
                <Link href="/login">
                  Войти
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative mt-20">
            <FloatingCards />
          </div>
        </div>
      </section>

      <section className="py-24 bg-black/20">
        <div className="container px-4 mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Мощные функции для современного банкинга
              </h2>
              <p className="text-muted-foreground text-lg">
                Всё необходимое для управления финансами на одной безопасной
                платформе
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal delay={0.1}>
              <FeatureCard
                icon={<Shield className="w-10 h-10 text-primary" />}
                title="Продвинутая безопасность"
                description="Банковское шифрование и биометрическая аутентификация защищают ваши данные и деньги."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <FeatureCard
                icon={<DollarSign className="w-10 h-10 text-primary" />}
                title="Умное бюджетирование"
                description="ИИ-аналитика помогает отслеживать расходы и эффективнее экономить."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <FeatureCard
                icon={<CreditCard className="w-10 h-10 text-primary" />}
                title="Виртуальные карты"
                description="Создавайте неограниченное количество виртуальных карт для онлайн-покупок с настраиваемыми лимитами."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <FeatureCard
                icon={<Smartphone className="w-10 h-10 text-primary" />}
                title="Мобильный доступ"
                description="Управляйте финансами на ходу с нашим интуитивно понятным мобильным интерфейсом."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <FeatureCard
                icon={<Lock className="w-10 h-10 text-primary" />}
                title="Мгновенная блокировка"
                description="Заблокируйте карту мгновенно в случае утери или кражи одним касанием."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <FeatureCard
                icon={<CheckCircle className="w-10 h-10 text-primary" />}
                title="Поддержка 24/7"
                description="Наша команда поддержки доступна круглосуточно, чтобы помочь вам."
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-[size:30px_30px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="container px-4 mx-auto relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Нам доверяют тысячи
              </h2>
              <p className="text-muted-foreground text-lg">
                Узнайте, что наши клиенты говорят о своем опыте
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal delay={0.1}>
              <TestimonialCard
                content="Переход на РБанк был лучшим финансовым решением, которое я принял. Интерфейс интуитивно понятен, а аналитика помогла мне значительно сэкономить."
                author="Алексей Иванов"
                role="Владелец малого бизнеса"
                avatar="/placeholder.svg?height=60&width=60"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <TestimonialCard
                content="Функция виртуальных карт — настоящий прорыв для онлайн-покупок. Я чувствую себя намного безопаснее, зная, что могу создавать карты с лимитами."
                author="Мария Смирнова"
                role="Цифровой кочевник"
                avatar="/placeholder.svg?height=60&width=60"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <TestimonialCard
                content="Как человек, который часто путешествует, иметь банк, который работает без проблем через границы и без скрытых комиссий — это невероятно."
                author="Михаил Чен"
                role="Международный консультант"
                avatar="/placeholder.svg?height=60&width=60"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Готовы испытать будущее банкинга?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Присоединяйтесь к тысячам довольных клиентов, которые
                трансформировали свою финансовую жизнь с РБанком.
              </p>
              <GlowingButton size="lg" asChild>
                <Link href="/register">Создать аккаунт</Link>
              </GlowingButton>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
