import Pricing from '@/components/Pricing';

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Pakketten</h1>
      <Pricing/>
      <p className="text-xs text-slate-500 mt-3">Prijzen per seat/maand, ex. btw.</p>
    </main>
  );
}
