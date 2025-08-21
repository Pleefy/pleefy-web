'use client';
import { useEffect, useMemo, useState } from 'react';
import { conversations as seed, employees } from '../../lib/data';

type Feedback = Record<string,'up'|'down'|undefined>;

export default function ConversationsPage() {
  const [query,setQuery] = useState('');
  const [employee,setEmployee] = useState<string>('');
  const [feedback,setFeedback] = useState<Feedback>({});

  // load/save feedback from localStorage
  useEffect(()=>{
    const saved = localStorage.getItem('pleefy-feedback');
    if (saved) setFeedback(JSON.parse(saved));
  },[]);
  useEffect(()=>{
    localStorage.setItem('pleefy-feedback', JSON.stringify(feedback));
  },[feedback]);

  const rows = useMemo(()=>{
    return seed.filter(c => 
      (!employee || c.employee===employee) &&
      (c.customer.toLowerCase().includes(query.toLowerCase()) || c.summary.toLowerCase().includes(query.toLowerCase()))
    ).map(c=> ({...c, feedback: feedback[c.id] ?? c.feedback}));
  },[employee,query,feedback]);

  const upCount = rows.filter(r=>r.feedback==='up').length;
  const downCount = rows.filter(r=>r.feedback==='down').length;

  function exportCSV() {
    const headers = ['id','date','employee','customer','type','durationMin','feedback','summary'];
    const lines = [headers.join(',')].concat(rows.map(r=>[r.id,r.date,r.employee,r.customer,r.type,r.durationMin,r.feedback??'', JSON.stringify(r.summary)].join(',')));
    const blob = new Blob([lines.join('\n')], {type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'conversations.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex">
        <h2 style={{fontWeight:700}}>Conversations</h2>
        <div className="right small">👍 {upCount} · 👎 {downCount}</div>
      </div>

      <div className="card grid" style={{gridTemplateColumns:'1fr 200px 160px'}}>
        <input className="input" placeholder="Zoek op klant of samenvatting…" value={query} onChange={e=>setQuery(e.target.value)} />
        <select className="select" value={employee} onChange={e=>setEmployee(e.target.value)}>
          <option value="">Alle medewerkers</option>
          {employees.map(emp=>(<option key={emp} value={emp}>{emp}</option>))}
        </select>
        <button className="btn" onClick={exportCSV}>⬇️ Exporteer (CSV/Excel)</button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr><th>Datum</th><th>Medewerker</th><th>Klant</th><th>Type</th><th>Duur</th><th>Feedback</th><th>Actie</th></tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td>{new Date(r.date).toLocaleString()}</td>
                <td>{r.employee}</td>
                <td>{r.customer}</td>
                <td><span className="badge">{r.type}</span></td>
                <td>{r.durationMin}m</td>
                <td>{r.feedback==='up'?'👍':'👎'}</td>
                <td className="flex">
                  <button className="btn" onClick={()=>setFeedback(f=>({...f,[r.id]:'up'}))}>👍</button>
                  <button className="btn" style={{background:'#ef4444'}} onClick={()=>setFeedback(f=>({...f,[r.id]:'down'}))}>👎</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
