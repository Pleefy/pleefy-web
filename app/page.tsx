'use client';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { conversations, aggregateFeedback } from '../lib/data'
import Link from 'next/link'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function DashboardPage(){
  const agg = aggregateFeedback(conversations)
  const latest = conversations.slice(0,6)
  const trend = Array.from({length: 12}).map((_,i)=>({ name: `W${i+1}`, succes: Math.round(40+Math.random()*30) }))

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Link href="/reports" className="link">Bekijk rapportage →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card><CardHeader><CardTitle>Gesprekken (30d)</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{conversations.length}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Succesratio</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{agg.overallRate}% <span className="text-sm text-muted-foreground">👍</span></p></CardContent></Card>
        <Card><CardHeader><CardTitle>Gem. duur</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{Math.round(conversations.reduce((a,c)=>a+c.durationMin,0)/conversations.length)}m</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Conversietrend</CardTitle></CardHeader>
        <CardContent>
          <div style={{width:'100%', height:300}}>
            <ResponsiveContainer>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" /><YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="succes" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recente gesprekken</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {latest.map(c => (
              <div key={c.id} className="flex items-center gap-3 border rounded-xl p-3">
                <Badge>{c.type}</Badge>
                <div className="flex-1">
                  <div className="font-medium">{c.customer}</div>
                  <div className="text-sm text-muted-foreground">{new Date(c.date).toLocaleString()} · {c.employee}</div>
                </div>
                <div>{c.feedback==='up'?'👍':'👎'}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
