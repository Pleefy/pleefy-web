'use client';
import './globals.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sun, Moon, Home, MessageCircle, BarChart, ClipboardList, Settings } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <aside className="w-64 bg-gray-100 dark:bg-gray-950 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-8">Pleefy</h1>
            <nav className="space-y-4">
              <Link href="/" className="flex items-center space-x-2"><Home size={18}/> <span>Dashboard</span></Link>
              <Link href="/conversations" className="flex items-center space-x-2"><MessageCircle size={18}/> <span>Conversations</span></Link>
              <Link href="/reports" className="flex items-center space-x-2"><BarChart size={18}/> <span>Reports</span></Link>
              <Link href="/onboarding" className="flex items-center space-x-2"><ClipboardList size={18}/> <span>Onboarding</span></Link>
              <Link href="/settings" className="flex items-center space-x-2"><Settings size={18}/> <span>Settings</span></Link>
            </nav>
          </div>
          <button onClick={() => setDark(!dark)} className="flex items-center space-x-2 mt-8 p-2 rounded-lg bg-gray-200 dark:bg-gray-800">
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
            <span>{dark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </aside>
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">{children}</main>
      </body>
    </html>
  );
}
