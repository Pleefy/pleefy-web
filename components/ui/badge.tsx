import * as React from "react"
export function Badge({ children }: React.PropsWithChildren) {
  return <span className="badge">{children}</span>
}
