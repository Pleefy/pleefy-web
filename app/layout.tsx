import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Pleefy Dashboard',
  description: 'Realtime gesprekscoach gekoppeld aan je CRM',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <div style={{display:'flex'}}>
          <aside className="sidebar">
            <h1>🅿️ Pleefy</h1>
            <nav>
              <Link href="/">Dashboard</Link>
              <Link href="/conversations">Conversations</Link>
              <Link href="/reports">Reports</Link>
              <Link href="/onboarding">Onboarding</Link>
              <Link href="/integrations">Integrations</Link>
              <Link href="/settings">Settings</Link>
            </nav>
          </aside>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
