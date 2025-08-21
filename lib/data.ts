export type Conversation = {
  id: string;
  employee: string;
  customer: string;
  date: string; // ISO
  type: 'Sales' | 'Support' | 'Success';
  durationMin: number;
  tags: string[];
  summary: string;
  feedback?: 'up'|'down';
};

export const employees = ['Aisha', 'Bram', 'Carlos', 'Dani', 'Eva', 'Fatima', 'Gijs', 'Hugo'];

export const conversations: Conversation[] = Array.from({length: 40}).map((_, i) => {
  const emp = employees[i % employees.length];
  const kinds = ['Sales','Support','Success'] as const;
  const type = kinds[i % kinds.length];
  const success = (i % 3 !== 0); // ~66% success baseline
  return {
    id: String(i+1),
    employee: emp,
    customer: `Company ${String.fromCharCode(65 + (i%26))}${i}`,
    date: new Date(Date.now() - i*86400000/2).toISOString(),
    type,
    durationMin: 5 + (i*3)%35,
    tags: type === 'Sales' ? ['demo','pricing'] : type==='Support' ? ['complaint','resolution'] : ['upsell','renewal'],
    summary: type==='Support'
      ? 'Klacht besproken, toegewerkt naar oplossing en follow-up gepland.'
      : type==='Sales'
        ? 'Behoeften in kaart gebracht, bezwaren behandeld en afspraak ingepland.'
        : 'Succes call: waarde bevestigd en uitbreiding besproken.',
    feedback: success ? 'up' : 'down',
  };
});

export function aggregateFeedback(data: Conversation[]) {
  const totals = { up: 0, down: 0 };
  const byEmployee: Record<string,{up:number,down:number,total:number}> = {};
  for (const c of data) {
    if (c.feedback === 'up') totals.up++; else totals.down++;
    if (!byEmployee[c.employee]) byEmployee[c.employee] = {up:0,down:0,total:0};
    if (c.feedback === 'up') byEmployee[c.employee].up++; else byEmployee[c.employee].down++;
    byEmployee[c.employee].total++;
  }
  const overallRate = totals.up + totals.down > 0 ? Math.round((totals.up/(totals.up+totals.down))*100) : 0;
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

export const defaultOnboarding: Onboarding = {
  companyName: '',
  audience: ['MKB beslissers', 'Operations managers'],
  goals: ['Afspraak inplannen', 'Klanttevredenheid verhogen', 'Upsell'],
  objections: ['Te duur', 'Geen tijd', 'We hebben al een oplossing'],
  usps: ['Realtime script', 'CRM-koppeling', 'AI-coach'],
  callToActions: ['Plan demo', 'Bevestig afspraak', 'Escalatie naar specialist'],
  tone: 'enthousiast',
  coachingFocus: ['Objection handling', 'Closing', 'Empathie'],
};
