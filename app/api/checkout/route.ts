import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan");

  // Hier normaal Stripe Checkout sessie maken, nu dummy
  return NextResponse.redirect("https://example.com/success");
}
