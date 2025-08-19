export type PlanId = 'free' | 'plus' | 'pro';

export const plans: Record<PlanId, {
  name: string;
  priceLabel: string;
  priceId?: string; // Stripe Price ID
  features: string[];
}> = {
  free: {
    name: 'Gratis',
    priceLabel: '€0',
    features: ['5 calls/dag', '1 gebruiker', 'Basis widget'],
  },
  plus: {
    name: 'Plus',
    priceLabel: '€39',
    priceId: process.env.NEXT_PUBLIC_PRICE_PLUS,
    features: ['Onbeperkt calls', 'Tot 5 gelijktijdige gebruikers', 'Samenvatting naar CRM'],
  },
  pro: {
    name: 'Pro',
    priceLabel: '€79',
    priceId: process.env.NEXT_PUBLIC_PRICE_PRO,
    features: ['Onbeperkt calls', 'Onbeperkt gebruikers', 'Management‑samenvattingen', 'SSO + premium support'],
  },
};
