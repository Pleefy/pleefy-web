'use client';

import React from 'react';

const plans = [
  {
    name: "Basic",
    price: "Free",
    users: "1 user",
    features: ["Limited use cases"],
    button: { text: "Start free", href: "/signup" }
  },
  {
    name: "Plus",
    price: "€49 / month",
    users: "5 users",
    features: ["All use cases", "HubSpot, Pipedrive integration"],
    button: { text: "Get started", href: "/api/checkout?plan=plus" }
  },
  {
    name: "Pro",
    price: "€149 / month",
    users: "Unlimited users",
    features: ["All use cases", "Salesforce, HubSpot, Pipedrive integration", "Priority support"],
    button: { text: "Get started", href: "/api/checkout?plan=pro" }
  }
];

export default function PricingPage() {
  return (
    <main style={{ padding: "4rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Simple and transparent pricing</h1>
      <p style={{ color: "#555", marginBottom: "2rem" }}>Choose a plan that works for you and your business</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
        {plans.map((plan) => (
          <div key={plan.name} style={{ border: "1px solid #eee", borderRadius: "20px", padding: "2rem", width: "280px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{plan.name}</h2>
            <p style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>{plan.price}</p>
            <p style={{ marginBottom: "1rem", color: "#555" }}>{plan.users}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0" }}>
              {plan.features.map((f) => (
                <li key={f} style={{ marginBottom: "0.5rem" }}>{f}</li>
              ))}
            </ul>
            <a href={plan.button.href}>
              <button style={{ background: "#0070f3", color: "white", borderRadius: "20px", padding: "12px 24px", fontWeight: 600 }}>{plan.button.text}</button>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
