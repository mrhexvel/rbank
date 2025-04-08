"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CreditCard, PieChart, Wallet } from "lucide-react"

interface Account {
  id: string
  name: string
  accountNumber: string
  balance: number
  type: string
}

export function AccountsList() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await fetch("/api/accounts")

        if (!response.ok) {
          throw new Error("Не удалось загрузить счета")
        }

        const data = await response.json()
        setAccounts(data.accounts)
      } catch (error) {
        console.error("Ошибка при загрузке счетов:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="text-right">
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "CHECKING":
        return <Wallet className="h-5 w-5 text-primary" />
      case "SAVINGS":
        return <CreditCard className="h-5 w-5 text-primary" />
      case "INVESTMENT":
        return <PieChart className="h-5 w-5 text-primary" />
      default:
        return <Wallet className="h-5 w-5 text-primary" />
    }
  }

  const getTypeName = (type: string) => {
    switch (type) {
      case "CHECKING":
        return "Расчетный счет"
      case "SAVINGS":
        return "Сберегательный счет"
      case "INVESTMENT":
        return "Инвестиционный портфель"
      default:
        return type
    }
  }

  return (
    <div className="space-y-4">
      {accounts.length > 0 ? (
        accounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                {getIcon(account.type)}
              </div>
              <div>
                <h3 className="font-medium">{account.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {account.accountNumber} • {getTypeName(account.type)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">₽{account.balance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Доступный баланс</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">У вас пока нет счетов</p>
          <Button>Открыть новый счет</Button>
        </div>
      )}
    </div>
  )
}
