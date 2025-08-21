export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <div className="card"><h2>23</h2><p>Calls this week</p></div>
        <div className="card"><h2>65%</h2><p>Success rate</p></div>
        <div className="card"><h2>18</h2><p>Active users</p></div>
      </div>
      <div className="card">
        <h2>Recent activity</h2>
        <ul>
          <li>John Doe – Conversation</li>
          <li>Jane Smith – Conversation</li>
          <li>Acme Inc. – Integrated with Pleefy</li>
        </ul>
      </div>
      <div className="card">
        <h2>Complete onboarding to unlock Pleefy's full power</h2>
        <button style={{ background: "#0070f3", color: "#fff", border: "none", padding: "0.75rem 1.5rem", borderRadius: "12px", fontWeight: "600" }}>Start onboarding</button>
      </div>
    </div>
  );
}
