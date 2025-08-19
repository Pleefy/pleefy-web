import '../styles/globals.css';

export const metadata = {
  title: "Pleefy",
  description: "Realtime gespreksassistent gekoppeld aan je CRM"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
