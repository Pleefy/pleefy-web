Qlify – Next.js + Stripe starter (korte uitleg)
----------------------------------------------
1) Installeer: npm i  (of pnpm i)
2) Kopieer .env.example naar .env.local en vul Stripe keys + Price IDs
3) Start lokaal: npm run dev (http://localhost:3000)
4) Deploy op Vercel en zet dezelfde ENV vars in Project Settings
5) Maak in Stripe Dashboard een webhook endpoint naar /api/webhooks/stripe en plak de 'Signing secret' in STRIPE_WEBHOOK_SECRET
