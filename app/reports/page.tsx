'use client';
import { useEffect, useMemo, useState } from 'react';
import { conversations as seed, aggregateFeedback, employees } from '../../lib/data';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';

type Feedback = Record<string,'up'|'down'|undefined>;

export default function ReportsPage() {
  const [feedback,setFeedback] = useState<Feedback>({});
  useEffect(()=>{
    const saved = localStorage.getItem('pleefy-feedback');
    if (saved) setFeedback(JSON.parse(saved));
  },[]);

  const rows = useMemo(()=> seed.map(c=>({...c, feedback: feedback[c.id] ?? c.feedback})),[feedback]);
  const agg = aggregateFeedback(rows);

  const pieData = [
    { name:'Succesvol', value: agg.totals.up },
    { name:'Niet succesvol', value: agg.totals.down },
  ];
  const colors = ['#22c55e','#ef4444'];

  const barData = employees.map(emp => ({
    name: emp,
    succes: agg.byEmployee[emp]?.up ?? 0,
    nietSucces: agg.byEmployee[emp]?.down ?? 0,
  }));

  function exportSummary() {
    const headers = ['employee','up','down','total','successRate'];
    const lines = [headers.join(',')].concat(employees.map(emp => {
      const row = agg.byEmployee[emp] ?? {up:0,down:0,total:0};
      const rate = row.total ? Math.round((row.up/row.total)*100) : 0;
      return [emp,row.up,row.down,row.total,rate+'%'].join(',');
    }));
    const blob = new Blob([lines.join('\n')], {type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'reports-summary.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  const transcripts = rows.slice(0,6).map(r => ({
    id: r.id,
    title: `${r.type} – ${r.customer}`,
    summary: r.summary
  }));

  return (
    <div>
      <div className="flex">
        <h2 style={{fontWeight:700}}>Reports</h2>
        <button className="btn right" onClick={exportSummary}>⬇️ Exporteer (CSV/Excel)</button>
      </div>

      <div className="grid" style={{gridTemplateColumns:'420px 1fr'}}>
        <div className="card">
          <h3 style={{marginTop:0}}>Succesratio</h3>
          <PieChart width={380} height={300}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label>
              {pieData.map((_,i)=>(<Cell key={i} fill={colors[i%colors.length]} />))}
            </Pie>
            <Tooltip /><Legend />
          </PieChart>
        </div>

        <div className="card">
          <h3 style={{marginTop:0}}>Per medewerker</h3>
          <BarChart width={600} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" /><YAxis allowDecimals={false} />
            <Tooltip /><Legend />
            <Bar dataKey="succes" />
            <Bar dataKey="nietSucces" />
          </BarChart>
        </div>
      </div>

      <div className="card">
        <h3 style={{marginTop:0}}>Weekrapport – transcriptie-samenvattingen</h3>
        <ul className="space-y-4" style={{listStyle:'none', paddingLeft:0}}>
          {transcripts.map(t => (
            <li key={t.id} className="card" style={{margin:'12px 0'}}>
              <div className="flex">
                <strong>{t.title}</strong>
                <span className="right small">Manager Review: in behandeling</span>
              </div>
              <p>{t.summary}</p>
              <div className="flex">
                <button className="btn">✅ Goedkeuren</button>
                <button className="btn" style={{background:'#f59e0b'}}>✏️ Bewerken</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
