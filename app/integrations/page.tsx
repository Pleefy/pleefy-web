import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'

export default function IntegrationsPage(){
  const items = [
    {name:'HubSpot', status:'Niet gekoppeld'},
    {name:'Salesforce', status:'Niet gekoppeld'},
    {name:'Zoho', status:'Niet gekoppeld'},
    {name:'Aircall', status:'Niet gekoppeld'},
    {name:'Twilio', status:'Niet gekoppeld'},
  ]
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Integrations</h2>
      <Card>
        <CardHeader><CardTitle>Koppelingen</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {items.map(it => (
            <div key={it.name} className="flex items-center justify-between border rounded-xl p-3">
              <div className="font-medium">{it.name}</div>
              <div className="flex items-center gap-3">
                <Badge>{it.status}</Badge>
                <Button variant="secondary">Connect</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
