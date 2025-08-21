'use client';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Switch } from '../../components/ui/switch'
import { useEffect, useState } from 'react'

export default function SettingsPage(){
  const [dark,setDark] = useState(false)
  useEffect(()=>{ setDark(document.documentElement.classList.contains('dark')) },[])
  useEffect(()=>{ document.documentElement.classList.toggle('dark', dark); localStorage.setItem('theme', dark?'dark':'light') },[dark])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <Card>
        <CardHeader><CardTitle>Uiterlijk</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <div className="font-medium">Dark mode</div>
            <div className="text-sm text-muted-foreground">Schakel tussen licht en donker thema</div>
          </div>
          <Switch checked={dark} onChange={setDark} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Account</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <div className="font-medium">manager@pleefy.com</div>
            <div className="text-sm text-muted-foreground">Rol: Admin</div>
          </div>
          <Button>Wijzig wachtwoord</Button>
        </CardContent>
      </Card>
    </div>
  )
}
