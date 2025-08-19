import '../styles/globals.css';
import type { ReactNode } from 'react';

export const metadata = { title: 'Qlify', description: 'Realtime belassistent voor je CRM' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
