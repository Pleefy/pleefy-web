'use client';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function ReportsPage() {
  const data = [
    { name: 'Succesvol', value: 12 },
    { name: 'Niet Succesvol', value: 5 },
  ];
  const COLORS = ['#4ade80', '#f87171'];

  const transcripts = [
    { id: 1, summary: 'Klant A had bezwaar over prijs, opgelost door korting.' },
    { id: 2, summary: 'Prospect B wilde later terugbellen, nog open follow-up.' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reports</h2>

      <div className="mb-8">
        <h3 className="font-semibold mb-2">Succesratio</h3>
        <PieChart width={400} height={300}>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Weekrapport</h3>
        <ul className="space-y-4">
          {transcripts.map(t => (
            <li key={t.id} className="border p-4 rounded">
              <p>{t.summary}</p>
              <div className="space-x-2 mt-2">
                <button className="px-3 py-1 bg-green-100 rounded">✅ Goedkeuren</button>
                <button className="px-3 py-1 bg-yellow-100 rounded">✏️ Bewerken</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}