import { forwardRef } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const GlowingButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, ...props }, ref) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-light rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
      <Button
        ref={ref}
        className={cn(
          "relative bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity",
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    </div>
  )
})
GlowingButton.displayName = "GlowingButton"
