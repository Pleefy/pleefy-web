import * as React from "react"
import { cn } from "./utils"
export function Label({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm text-muted-foreground", className)} {...props}>{children}</label>
}
