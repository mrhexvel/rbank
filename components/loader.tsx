import { cn } from "@/lib/utils"

interface LoaderProps {
  className?: string
}

export function Loader({ className }: LoaderProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="h-4 w-4 rounded-full bg-primary animate-pulse"></div>
      <div className="h-4 w-4 rounded-full bg-primary animate-pulse delay-150 mx-1"></div>
      <div className="h-4 w-4 rounded-full bg-primary animate-pulse delay-300"></div>
    </div>
  )
}
