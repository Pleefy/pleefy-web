export default function OnboardingPage() {
  return (
    <div>
      <h1>Onboarding</h1>
      <div className="card">
        <p>Please provide info to customize Pleefy:</p>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input type="text" placeholder="Target audience" style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }} />
          <input type="text" placeholder="Goals" style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }} />
          <input type="text" placeholder="Common objections" style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }} />
          <input type="text" placeholder="Unique Selling Points" style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }} />
          <button type="submit" style={{ background: "#0070f3", color: "#fff", border: "none", padding: "0.75rem 1.5rem", borderRadius: "12px", fontWeight: "600" }}>Save</button>
        </form>
      </div>
    </div>
  );
}