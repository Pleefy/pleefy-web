'use client';
import { useEffect, useMemo, useState } from 'react'
import { conversations as seed, employees } from '../../lib/data'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Select } from '../../components/ui/select'
import { Button } from '../../components/ui/button'

type Feedback = Record<string,'up'|'down'|undefined>

export default function ConversationsPage(){
  const [q,setQ] = useState('')
  const [employee,setEmployee] = useState('')
  const [feedback,setFeedback] = useState<Feedback>({})

  useEffect(()=>{ const s = localStorage.getItem('pleefy-feedback'); if (s) setFeedback(JSON.parse(s)) },[])
  useEffect(()=>{ localStorage.setItem('pleefy-feedback', JSON.stringify(feedback)) },[feedback])

  const rows = useMemo(()=> seed.filter(c =>
    (!employee || c.employee===employee) &&
    (c.customer.toLowerCase().includes(q.toLowerCase()) || c.summary.toLowerCase().includes(q.toLowerCase()))
  ).map(c => ({...c, feedback: feedback[c.id] ?? c.feedback})), [q, employee, feedback])

  function exportCSV(){
    const headers = ['id','date','employee','customer','type','durationMin','feedback','summary']
    const lines = [headers.join(',')].concat(rows.map(r=>[r.id,r.date,r.employee,r.customer,r.type,r.durationMin,r.feedback??'', JSON.stringify(r.summary)].join(',')))
    const blob = new Blob([lines.join('\n')], {type:'text/csv'})
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='conversations.csv'; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Conversations</h2>
        <Button onClick={exportCSV} variant="secondary">⬇️ Export</Button>
      </div>

      <Card>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <Input placeholder="Zoek op klant of samenvatting…" value={q} onChange={e=>setQ(e.target.value)} />
          <Select value={employee} onChange={e=>setEmployee(e.target.value)}>
            <option value="">Alle medewerkers</option>
            {employees.map(emp=>(<option key={emp} value={emp}>{emp}</option>))}
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Gesprekken</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rows.map(r => (
              <div key={r.id} className="flex items-center gap-3 border rounded-xl p-3">
                <div className="w-40 text-sm text-muted-foreground">{new Date(r.date).toLocaleString()}</div>
                <div className="w-28">{r.employee}</div>
                <div className="flex-1 font-medium">{r.customer} <span className="ml-2 text-xs text-muted-foreground">({r.type})</span></div>
                <div className="w-16 text-sm text-muted-foreground">{r.durationMin}m</div>
                <div className="w-12 text-lg">{r.feedback==='up'?'👍':'👎'}</div>
                <div className="flex gap-2">
                  <Button onClick={()=>setFeedback(f=>({...f,[r.id]:'up'}))}>👍</Button>
                  <Button onClick={()=>setFeedback(f=>({...f,[r.id]:'down'}))} variant="destructive">👎</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
