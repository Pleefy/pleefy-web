'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { plans } from '@/lib/plans';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  async function go(priceId?: string) {
    if (!priceId) {
      window.location.href = '/app'; // Free → naar app
      return;
    }
    setLoading(priceId);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ priceId })
    });
    const { id } = await res.json();
    const stripe = await stripePromise;
    await stripe!.redirectToCheckout({ sessionId: id });
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {Object.entries(plans).map(([id, p]) => (
        <div key={id} className={`rounded-2xl border p-6 bg-white ${id==='plus'?'ring-2 ring-amber-400':''}`}>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{p.name}</div>
            {id==='plus' && <span className="text-xs px-2 py-1 rounded bg-amber-400">Meest gekozen</span>}
          </div>
          <div className="text-4xl font-bold mt-2">{p.priceLabel}<span className="text-base font-medium text-slate-500">/maand</span></div>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">
            {p.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          <button onClick={()=>go(p.priceId)} disabled={loading===p.priceId} className="w-full mt-5 rounded-2xl px-4 py-2 border bg-slate-900 text-white disabled:opacity-60">
            {p.priceId ? (loading===p.priceId?'Bezig…':'Kies '+p.name) : 'Start gratis'}
          </button>
        </div>
      ))}
    </div>
  );
}
