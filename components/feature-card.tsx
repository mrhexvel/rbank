import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="p-6 relative">
        <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4 transition-colors duration-300 group-hover:bg-primary/20">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
