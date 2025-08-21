'use client';
import { useEffect, useMemo, useState } from 'react'
import { conversations as seed, aggregateFeedback, employees } from '../../lib/data'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer } from 'recharts'
import { Button } from '../../components/ui/button'

type Feedback = Record<string,'up'|'down'|undefined>

export default function ReportsPage(){
  const [feedback,setFeedback] = useState<Feedback>({})
  useEffect(()=>{ const s = localStorage.getItem('pleefy-feedback'); if (s) setFeedback(JSON.parse(s)) },[])

  const rows = useMemo(()=> seed.map(c=>({...c, feedback: feedback[c.id] ?? c.feedback})), [feedback])
  const agg = aggregateFeedback(rows)

  const pieData = [
    { name:'Succesvol', value: agg.totals.up },
    { name:'Niet succesvol', value: agg.totals.down },
  ]
  const colors = ['#22c55e','#ef4444']

  const barData = employees.map(emp => ({
    name: emp, succes: agg.byEmployee[emp]?.up ?? 0, nietSucces: agg.byEmployee[emp]?.down ?? 0
  }))

  function exportSummary(){
    const headers = ['employee','up','down','total','successRate']
    const lines = [headers.join(',')].concat(employees.map(emp=>{
      const row = agg.byEmployee[emp] ?? {up:0,down:0,total:0}
      const rate = row.total ? Math.round((row.up/row.total)*100) : 0
      return [emp,row.up,row.down,row.total, rate+'%'].join(',')
    }))
    const blob = new Blob([lines.join('\n')], {type:'text/csv'})
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='reports-summary.csv'; a.click(); URL.revokeObjectURL(url)
  }

  const transcripts = rows.slice(0,8).map(r => ({ id:r.id, title:`${r.type} – ${r.customer}`, summary:r.summary }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reports</h2>
        <Button onClick={exportSummary} variant="secondary">⬇️ Export</Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Succesratio</CardTitle></CardHeader>
          <CardContent style={{height:320}}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={110} label>
                  {pieData.map((_,i)=>(<Cell key={i} fill={colors[i%colors.length]} />))}
                </Pie>
                <Tooltip /><Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Per medewerker</CardTitle></CardHeader>
          <CardContent style={{height:320}}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" /><YAxis allowDecimals={false} />
                <Tooltip /><Legend />
                <Bar dataKey="succes" />
                <Bar dataKey="nietSucces" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Weekrapport – transcriptie-samenvattingen</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {transcripts.map(t => (
              <div key={t.id} className="border rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <strong>{t.title}</strong>
                  <span className="text-xs text-muted-foreground">Manager review: in behandeling</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.summary}</p>
                <div className="mt-3 flex gap-2">
                  <Button>✅ Goedkeuren</Button>
                  <Button variant="secondary">✏️ Bewerken</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
