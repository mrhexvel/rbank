import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
  className?: string
}

export function StatCard({ title, value, change, trend, icon, className }: StatCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden group hover:shadow-md hover:shadow-primary/10 transition-all duration-300",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="p-6 relative">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
        </div>
        <div className="mt-4 flex items-center">
          {trend === "up" ? (
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
          ) : trend === "down" ? (
            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
          ) : null}
          <span className={cn("text-sm", trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "")}>
            {change} from last month
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
