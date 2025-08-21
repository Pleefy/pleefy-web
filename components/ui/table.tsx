import * as React from "react"
export function Table({ children }: React.PropsWithChildren) { return <table className="w-full text-sm">{children}</table> }
export function THead({ children }: React.PropsWithChildren) { return <thead className="text-left text-muted-foreground"><tr className="border-b">{children}</tr></thead> }
export function TH({ children }: React.PropsWithChildren) { return <th className="py-3">{children}</th> }
export function TBody({ children }: React.PropsWithChildren) { return <tbody>{children}</tbody> }
export function TR({ children }: React.PropsWithChildren) { return <tr className="border-b last:border-0">{children}</tr> }
export function TD({ children }: React.PropsWithChildren) { return <td className="py-3">{children}</td> }
