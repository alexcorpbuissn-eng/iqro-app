import * as React from "react"
import { cn } from "@/lib/utils"

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "warning"

const variantClasses: Record<BadgeVariant, string> = {
  default:     "bg-primary text-white border-transparent",
  secondary:   "bg-gray-100 text-gray-800 border-transparent",
  destructive: "bg-red-100 text-red-700 border-transparent",
  outline:     "bg-transparent text-gray-700 border-gray-300",
  success:     "bg-green-100 text-green-700 border-transparent",
  warning:     "bg-orange-100 text-orange-700 border-transparent",
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}
