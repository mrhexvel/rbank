import type React from "react"
import { cn } from "@/lib/utils"

interface AccountCardProps {
  name: string
  number: string
  balance: string
  icon: React.ReactNode
  className?: string
}

export function AccountCard({ name, number, balance, icon, className }: AccountCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer group",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">{icon}</div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{number}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">{balance}</div>
        <p className="text-xs text-muted-foreground">Available balance</p>
      </div>
    </div>
  )
}
