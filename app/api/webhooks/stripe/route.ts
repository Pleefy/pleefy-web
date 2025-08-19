export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") as string;
  const raw = await req.text();

  try {
    // Hier Stripe event validatie (nog in te vullen met stripe.webhooks.constructEvent)
    console.log("Ontvangen webhook:", raw, sig);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  return NextResponse.json({ received: true });
}
