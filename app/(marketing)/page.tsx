import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-items-center font-semibold">Q</div>
          <span className="font-semibold">Qlify</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <a href="#integrations" className="hover:underline">Integrations</a>
          <Link href="/app" className="px-4 py-2 rounded-2xl bg-slate-900 text-white">Login</Link>
        </div>
      </nav>

      <section className="grid lg:grid-cols-2 gap-10 items-center pt-12 pb-16">
        <div>
          <h1 className="text-5xl font-bold leading-tight">Realtime belassistent die <span className="underline decoration-amber-400">je volgende zin</span> geeft</h1>
          <p className="mt-4 text-lg text-slate-600">Koppel met je CRM, start een call en ontvang direct coaching voor sales, klachten en cold calls.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/pricing" className="px-5 py-3 rounded-2xl bg-slate-900 text-white">Probeer gratis</Link>
            <a href="#demo" className="px-5 py-3 rounded-2xl border">Plan demo</a>
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
            <Shield className="h-4 w-4"/> EU‑hosting • GDPR • SSO (Pro)
          </div>
        </div>
        <div className="border rounded-2xl p-6 bg-white shadow-sm">
          <div className="text-sm text-slate-600 mb-2">Live widget demo (statisch in deze build)</div>
          <div className="h-48 rounded-xl border grid place-items-center text-slate-500">Widget preview</div>
        </div>
      </section>
    </main>
  );
}
