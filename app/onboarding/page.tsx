'use client';
import { useEffect, useState } from 'react';
import { defaultOnboarding, Onboarding } from '../../lib/data';

export default function OnboardingPage() {
  const [data,setData] = useState<Onboarding>(defaultOnboarding);

  useEffect(()=>{
    const saved = localStorage.getItem('pleefy-onboarding');
    if (saved) setData({...defaultOnboarding, ...JSON.parse(saved)});
  },[]);

  function update<K extends keyof Onboarding>(key: K, value: Onboarding[K]) {
    const next = {...data, [key]: value};
    setData(next);
    localStorage.setItem('pleefy-onboarding', JSON.stringify(next));
  }

  function listInput(label: string, key: keyof Onboarding, placeholder: string) {
    const arr = (data[key] as string[]);
    return (
      <div className="card">
        <label className="small">{label}</label>
        <div className="grid" style={{gridTemplateColumns:'1fr'}}>
          {arr.map((v,i)=>(
            <input key={i} className="input" value={v} onChange={e=>{
              const copy = [...arr]; copy[i]=e.target.value; update(key, copy as any);
            }} />
          ))}
          <input className="input" placeholder={placeholder} onKeyDown={e=>{
            if (e.key==='Enter') { update(key, [...arr, (e.target as HTMLInputElement).value] as any); (e.target as HTMLInputElement).value=''; }
          }} />
        </div>
        <div className="small">Druk op Enter om toe te voegen</div>
      </div>
    );
  }

  function exportOnboarding(){
    const headers = ['companyName','audience','goals','objections','usps','callToActions','tone','coachingFocus'];
    const row = [
      data.companyName,
      data.audience.join(' | '),
      data.goals.join(' | '),
      data.objections.join(' | '),
      data.usps.join(' | '),
      data.callToActions.join(' | '),
      data.tone,
      data.coachingFocus.join(' | ')
    ];
    const csv = headers.join(',') + '\n' + row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',');
    const blob = new Blob([csv], {type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'onboarding.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex">
        <h2 style={{fontWeight:700}}>Onboarding</h2>
        <button className="btn right" onClick={exportOnboarding}>⬇️ Exporteer (CSV/Excel)</button>
      </div>

      <div className="grid grid-3">
        <div className="card">
          <label className="small">Bedrijfsnaam</label>
          <input className="input" value={data.companyName} onChange={e=>update('companyName', e.target.value)} placeholder="Pleefy BV" />
          <label className="small" style={{marginTop:8}}>Tone of voice</label>
          <select className="select" value={data.tone} onChange={e=>update('tone', e.target.value as any)}>
            <option value="enthousiast">Enthousiast</option>
            <option value="informeel">Informeel</option>
            <option value="formeel">Formeel</option>
            <option value="neutraal">Neutraal</option>
          </select>
        </div>

        {listInput('Doelgroep(en)', 'audience', 'Voeg doelgroep toe…')}
        {listInput('Doelen (per gesprek)', 'goals', 'Voeg doel toe…')}

        {listInput('Veelvoorkomende bezwaren', 'objections', 'Voeg bezwaar toe…')}
        {listInput('Unique Selling Points (USP’s)', 'usps', 'Voeg USP toe…')}
        {listInput('Call-to-Actions (CTA’s)', 'callToActions', 'Voeg CTA toe…')}

        {listInput('Coaching focus', 'coachingFocus', 'Voeg coaching focus toe…')}
      </div>

      <div className="card">
        <h3 style={{marginTop:0}}>Zo gebruikt Pleefy dit</h3>
        <ul>
          <li>Realtime scripts afgestemd op doelgroep + fase in gesprek</li>
          <li>Bezwaren herkennen en suggesties geven om ze te tackelen</li>
          <li>Coachingspunten per medewerker en per weekrapport</li>
        </ul>
        <div className="small">Alles wordt lokaal opgeslagen (demo). Bij livegang koppelen we dit aan jullie database.</div>
      </div>
    </div>
  );
}
