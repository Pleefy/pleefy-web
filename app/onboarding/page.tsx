'use client';
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'

type Data = {
  companyName: string;
  audience: string;
  goals: string;
  objections: string;
  usps: string;
  ctas: string;
  tone: string;
  coaching: string;
}

const steps = [
  { key:'companyName', label:'Bedrijfsnaam' },
  { key:'audience', label:'Doelgroep(en)' },
  { key:'goals', label:'Doelen per gesprek' },
  { key:'objections', label:'Veelvoorkomende bezwaren' },
  { key:'usps', label:'USP’s' },
  { key:'ctas', label:'Call-to-Actions' },
  { key:'tone', label:'Tone of voice' },
  { key:'coaching', label:'Coaching focus' },
] as const

export default function OnboardingPage(){
  const [data,setData] = useState<Data>({ companyName:'', audience:'MKB beslissers; Operations managers', goals:'Afspraak inplannen; Upsell; CSAT verhogen', objections:'Te duur; Geen tijd; We hebben al iets', usps:'Realtime script; AI-coach; CRM-koppeling', ctas:'Plan demo; Bevestig afspraak; Escaleren', tone:'enthousiast', coaching:'Objection handling; Closing; Empathie' })
  const [i,setI] = useState(0)

  useEffect(()=>{ const s = localStorage.getItem('pleefy-onboarding'); if (s) setData(JSON.parse(s)) },[])
  useEffect(()=>{ localStorage.setItem('pleefy-onboarding', JSON.stringify(data)) },[data])

  function exportCSV(){
    const headers = Object.keys(data)
    const values = headers.map(h=>JSON.stringify((data as any)[h]))
    const csv = headers.join(',')+'\n'+values.join(',')
    const blob = new Blob([csv], {type:'text/csv'})
    const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='onboarding.csv'; a.click(); URL.revokeObjectURL(url)
  }

  const step = steps[i]
  const isTextArea = step.key!=='companyName' && step.key!=='tone'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Onboarding</h2>
        <Button variant="secondary" onClick={exportCSV}>⬇️ Export</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stap {i+1} / {steps.length} – {step.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {step.key==='companyName' && (<div><Label>Bedrijfsnaam</Label><Input value={data.companyName} onChange={e=>setData({...data, companyName:e.target.value})} placeholder="Pleefy BV" /></div>)}
            {step.key==='tone' && (
              <div>
                <Label>Tone of voice</Label>
                <select className="h-10 rounded-xl border px-3" value={data.tone} onChange={e=>setData({...data, tone:e.target.value})}>
                  <option value="enthousiast">Enthousiast</option>
                  <option value="informeel">Informeel</option>
                  <option value="formeel">Formeel</option>
                  <option value="neutraal">Neutraal</option>
                </select>
              </div>
            )}
            {isTextArea && (<div><Label>{step.label}</Label><Textarea value={(data as any)[step.key]} onChange={e=>setData({...data, [step.key]: e.target.value})} placeholder="Scheid items met ; (puntkomma)" /></div>)}
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="secondary" onClick={()=>setI(Math.max(0,i-1))}>Vorige</Button>
            <div className="flex gap-2">
              <Button onClick={()=>setI(Math.min(steps.length-1,i+1))}>{i===steps.length-1?'Afronden':'Volgende'}</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Samenvatting</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          {Object.entries(data).map(([k,v]) => (
            <div key={k} className="border rounded-xl p-4">
              <div className="text-xs text-muted-foreground uppercase">{k}</div>
              <div className="font-medium mt-1 whitespace-pre-wrap">{String(v)}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
