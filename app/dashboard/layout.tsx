import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gradient-to-b from-background to-background/95 overflow-hidden">
      <div className="hidden md:flex">
        <DashboardSidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <ScrollArea className="flex-1">
          <div className="container py-6 space-y-6">{children}</div>
        </ScrollArea>
      </div>
    </div>
  )
}
