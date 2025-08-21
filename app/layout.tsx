import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <aside className="w-64 bg-gray-100 p-4">
          <h1 className="text-2xl font-bold mb-6">Pleefy</h1>
          <nav className="space-y-2">
            <Link href="/">Dashboard</Link><br/>
            <Link href="/conversations">Conversations</Link><br/>
            <Link href="/integrations">Integrations</Link><br/>
            <Link href="/onboarding">Onboarding</Link><br/>
            <Link href="/reports">Reports</Link><br/>
            <Link href="/settings">Settings</Link>
          </nav>
        </aside>
        <main className="flex-1 p-8 bg-white">{children}</main>
      </body>
    </html>
  );
}
