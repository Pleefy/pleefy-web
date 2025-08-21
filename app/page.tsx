'use client';
import { conversations, aggregateFeedback } from '../lib/data';
import Link from 'next/link';

export default function DashboardPage() {
  const agg = aggregateFeedback(conversations);
  const latest = conversations.slice(0,6);

  return (
    <div>
      <h2 className="text-xl" style={{fontWeight:700, marginBottom:16}}>Dashboard</h2>
      <div className="grid grid-3">
        <div className="card">
          <div className="small">Gesprekken (30d)</div>
          <div style={{fontSize:32,fontWeight:700}}>{conversations.length}</div>
        </div>
        <div className="card">
          <div className="small">Succesratio</div>
          <div style={{fontSize:32,fontWeight:700}}>{agg.overallRate}% <span className="small">👍</span></div>
        </div>
        <div className="card">
          <div className="small">Gem. duur</div>
          <div style={{fontSize:32,fontWeight:700}}>
            {Math.round(conversations.reduce((a,c)=>a+c.durationMin,0)/conversations.length)}m
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex">
          <h3 style={{margin:0}}>Recente gesprekken</h3>
          <Link href="/conversations" className="right">Alle gesprekken →</Link>
        </div>
        <table className="table" style={{marginTop:12}}>
          <thead><tr><th>Datum</th><th>Medewerker</th><th>Klant</th><th>Type</th><th>Feedback</th></tr></thead>
          <tbody>
            {latest.map(c=>(
              <tr key={c.id}>
                <td>{new Date(c.date).toLocaleString()}</td>
                <td>{c.employee}</td>
                <td>{c.customer}</td>
                <td><span className="badge">{c.type}</span></td>
                <td>{c.feedback==='up'?'👍':'👎'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="flex">
          <h3 style={{margin:0}}>Onboarding</h3>
          <Link href="/onboarding" className="right btn">Start / bewerken</Link>
        </div>
        <p className="small">Vul doelgroep, doelen, bezwaren, USP’s en coachingfocussen in om Pleefy’s realtime advies te personaliseren.</p>
      </div>
    </div>
  );
}
