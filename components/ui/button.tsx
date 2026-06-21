import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Variant maps ─────────────────────────────────────────────────────────────

const variantClasses: Record<string, string> = {
  default:     "bg-primary text-primary-foreground hover:bg-primary/80",
  outline:     "border border-border bg-background hover:bg-muted hover:text-foreground",
  secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost:       "hover:bg-muted hover:text-foreground",
  destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  link:        "text-primary underline-offset-4 hover:underline",
}

const sizeClasses: Record<string, string> = {
  default: "h-9 px-4 py-2 text-sm gap-2",
  xs:      "h-6 px-2 text-xs gap-1 rounded-md",
  sm:      "h-8 px-3 text-sm gap-1.5 rounded-md",
  lg:      "h-10 px-6 text-base gap-2",
  icon:    "size-9",
  "icon-xs": "size-6 rounded-md",
  "icon-sm": "size-8 rounded-md",
  "icon-lg": "size-10",
}

// ─── Button ───────────────────────────────────────────────────────────────────

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClasses
  size?: keyof typeof sizeClasses
  asChild?: boolean
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent",
        "font-medium whitespace-nowrap transition-all select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        variantClasses[variant] ?? variantClasses.default,
        sizeClasses[size] ?? sizeClasses.default,
        className
      )}
      {...props}
    />
  )
}

export { Button, variantClasses as buttonVariants }
