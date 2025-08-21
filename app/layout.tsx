'use client';
import './globals.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { BarChart3, MessagesSquare, Settings, LayoutDashboard, ClipboardList, PlugZap, Sun, Moon } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }){
  const [dark,setDark] = useState(false)
  useEffect(()=>{
    const pref = localStorage.getItem('theme') === 'dark'
    setDark(pref)
  },[])
  useEffect(()=>{
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  },[dark])

  const nav = [
    {href:'/', label:'Dashboard', icon:<LayoutDashboard size={18}/>},
    {href:'/conversations', label:'Conversations', icon:<MessagesSquare size={18}/>},
    {href:'/reports', label:'Reports', icon:<BarChart3 size={18}/>},
    {href:'/onboarding', label:'Onboarding', icon:<ClipboardList size={18}/>},
    {href:'/integrations', label:'Integrations', icon:<PlugZap size={18}/>},
    {href:'/settings', label:'Settings', icon:<Settings size={18}/>},
  ]

  return (
    <html lang="nl">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <aside className="hidden md:flex w-64 flex-col justify-between border-r bg-card p-6">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="h-8 w-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">P</div>
                <div className="font-semibold">Pleefy</div>
              </div>
              <nav className="space-y-2">
                {nav.map(n=> (
                  <Link key={n.href} href={n.href} className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-muted">
                    {n.icon}<span>{n.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <button onClick={()=>setDark(v=>!v)} className="flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-muted">
              {dark ? <Sun size={16}/> : <Moon size={16}/>}
              <span>{dark ? 'Light mode' : 'Dark mode'}</span>
            </button>
          </aside>
          <main className="flex-1 p-6 md:p-10">
            <div className="container-safe">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
