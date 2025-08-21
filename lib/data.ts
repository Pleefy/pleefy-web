export type Conversation = {
  id: string;
  employee: string;
  customer: string;
  date: string;
  type: 'Sales'|'Support'|'Success';
  durationMin: number;
  tags: string[];
  summary: string;
  feedback?: 'up'|'down';
};

export const employees = ['Aisha','Bram','Carlos','Dani','Eva','Fatima','Gijs','Hugo','Iris','Jamal'];

function seedConversations(): Conversation[]{
  const kinds = ['Sales','Support','Success'] as const;
  const out: Conversation[] = [];
  for (let i=1;i<=80;i++){
    const emp = employees[i % employees.length];
    const type = kinds[i % kinds.length];
    const success = (i % 3 !== 0);
    out.push({
      id: String(i),
      employee: emp,
      customer: `Company ${String.fromCharCode(65 + (i%26))}-${i}`,
      date: new Date(Date.now() - i*3600_000*6).toISOString(),
      type,
      durationMin: 5 + (i*7)%40,
      tags: type==='Sales' ? ['demo','pricing'] : type==='Support' ? ['complaint','resolution'] : ['upsell','renewal'],
      summary: type==='Support' ? 'Klacht besproken en oplossing gecommuniceerd.' : (type==='Sales' ? 'Discovery + bezwaren behandeld, vervolgstap ingepland.' : 'Succesbehoud, uitbreiding besproken.'),
      feedback: success ? 'up' : 'down'
    })
  }
  return out;
}
export const conversations = seedConversations();

export function aggregateFeedback(data: Conversation[]){
  const totals = { up:0, down:0 };
  const byEmployee: Record<string,{up:number,down:number,total:number}> = {};
  for (const c of data){
    if (!byEmployee[c.employee]) byEmployee[c.employee] = {up:0,down:0,total:0};
    if (c.feedback==='up'){ totals.up++; byEmployee[c.employee].up++; }
    else { totals.down++; byEmployee[c.employee].down++; }
    byEmployee[c.employee].total++;
  }
  const overallRate = totals.up+totals.down ? Math.round((totals.up/(totals.up+totals.down))*100) : 0;
  return { totals, byEmployee, overallRate };
}

export type Onboarding = {
  companyName: string;
  audience: string[];
  goals: string[];
  objections: string[];
  usps: string[];
  callToActions: string[];
  tone: 'formeel'|'informeel'|'enthousiast'|'neutraal';
  coachingFocus: string[];
};
