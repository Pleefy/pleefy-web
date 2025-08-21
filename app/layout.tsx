import '../styles/globals.css';

export const metadata = {
  title: "Pleefy Dashboard",
  description: "Realtime gespreksassistent gekoppeld aan je CRM"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <div style={{ display: "flex" }}>
          <aside className="sidebar">
            <h2>Pleefy</h2>
            <nav>
              <a href="/">Dashboard</a>
              <a href="/conversations">Conversations</a>
              <a href="/integrations">Integrations</a>
              <a href="/onboarding">Onboarding</a>
              <a href="/settings">Settings</a>
            </nav>
          </aside>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
