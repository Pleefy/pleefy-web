import { Card } from '../components/ui/Card';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Succesratio" value="75%" />
        <Card title="Gesprekken deze week" value="42" />
        <Card title="Nieuwe leads" value="16" />
      </div>
      <div className="card">
        <h3 className="text-lg font-semibold mb-2">Activity Feed</h3>
        <ul className="space-y-2">
          <li>Klant A gesprek beoordeeld 👍</li>
          <li>Manager review weekrapport ✅</li>
          <li>Onboarding update: nieuwe USP toegevoegd</li>
        </ul>
      </div>
    </div>
  );
}