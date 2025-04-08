"use client";

import { GlowingBorder } from "@/components/glowing-border";
import { PageLoader } from "@/components/page-loader";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Plus, Settings, Shield } from "lucide-react";
import { useEffect, useState } from "react";

interface BankCard {
  id: string;
  name: string;
  number: string;
  expiryDate: string;
  type: string;
  status: string;
}

export default function CardsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState<BankCard[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setCards([
        {
          id: "1",
          name: "Дебетовая карта",
          number: "4532 •••• •••• 4832",
          expiryDate: "05/27",
          type: "VISA",
          status: "active",
        },
        {
          id: "2",
          name: "Кредитная карта",
          number: "5412 •••• •••• 7291",
          expiryDate: "09/26",
          type: "MasterCard",
          status: "active",
        },
        {
          id: "3",
          name: "Виртуальная карта",
          number: "4024 •••• •••• 9548",
          expiryDate: "12/25",
          type: "VISA",
          status: "active",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Карты</h1>
            <p className="text-muted-foreground">
              Управляйте вашими банковскими картами
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-primary-light">
            <Plus className="mr-2 h-4 w-4" /> Новая карта
          </Button>
        </div>
      </div>

      <ScrollReveal delay={0.1} className="mt-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 bg-black/40 p-1">
            <TabsTrigger value="all">Все карты</TabsTrigger>
            <TabsTrigger value="debit">Дебетовые</TabsTrigger>
            <TabsTrigger value="credit">Кредитные</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <ScrollReveal key={card.id}>
                  <GlowingBorder>
                    <Card className="backdrop-blur-sm bg-black/40 border-0 h-[200px] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <CardContent className="p-6 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {card.name}
                            </p>
                            <p className="text-xl font-bold mt-1">
                              {card.type}
                            </p>
                          </div>
                          <div className="bg-primary/10 p-2 rounded-full">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                        </div>

                        <div>
                          <p className="text-lg font-mono mb-2">
                            {card.number}
                          </p>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">
                              Срок действия: {card.expiryDate}
                            </p>
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                              >
                                <Shield className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                              >
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </GlowingBorder>
                </ScrollReveal>
              ))}

              <ScrollReveal>
                <Card className="h-[200px] border-dashed border-2 border-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center text-center p-6">
                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium">Добавить новую карту</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Дебетовую, кредитную или виртуальную
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </TabsContent>

          <TabsContent value="debit">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards
                .filter((card) => card.name.includes("Дебетовая"))
                .map((card) => (
                  <ScrollReveal key={card.id}>
                    <GlowingBorder>
                      <Card className="backdrop-blur-sm bg-black/40 border-0 h-[200px] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CardContent className="p-6 h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {card.name}
                              </p>
                              <p className="text-xl font-bold mt-1">
                                {card.type}
                              </p>
                            </div>
                            <div className="bg-primary/10 p-2 rounded-full">
                              <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                          </div>

                          <div>
                            <p className="text-lg font-mono mb-2">
                              {card.number}
                            </p>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-muted-foreground">
                                Срок действия: {card.expiryDate}
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8"
                                >
                                  <Shield className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8"
                                >
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </GlowingBorder>
                  </ScrollReveal>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="credit">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards
                .filter((card) => card.name.includes("Кредитная"))
                .map((card) => (
                  <ScrollReveal key={card.id}>
                    <GlowingBorder>
                      <Card className="backdrop-blur-sm bg-black/40 border-0 h-[200px] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CardContent className="p-6 h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {card.name}
                              </p>
                              <p className="text-xl font-bold mt-1">
                                {card.type}
                              </p>
                            </div>
                            <div className="bg-primary/10 p-2 rounded-full">
                              <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                          </div>

                          <div>
                            <p className="text-lg font-mono mb-2">
                              {card.number}
                            </p>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-muted-foreground">
                                Срок действия: {card.expiryDate}
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8"
                                >
                                  <Shield className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8"
                                >
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </GlowingBorder>
                  </ScrollReveal>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </ScrollReveal>
    </>
  );
}
