import type React from "react"
import { cn } from "@/lib/utils"

interface GlowingBorderProps {
  children: React.ReactNode
  className?: string
}

export function GlowingBorder({ children, className }: GlowingBorderProps) {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-light rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
      {children}
    </div>
  )
}
