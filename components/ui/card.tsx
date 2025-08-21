import * as React from "react"
import { cn } from "./utils"

export function Card({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("card", className)}>{children}</div>
}
export function CardHeader({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("mb-4 flex items-center justify-between", className)}>{children}</div>
}
export function CardTitle({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>
}
export function CardContent({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("", className)}>{children}</div>
}
