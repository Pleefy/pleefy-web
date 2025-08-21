export default function IntegrationsPage() {
  return (
    <div>
      <h1>Integrations</h1>
      <div className="card">
        <p>Connect Pleefy with your CRM:</p>
        <ul>
          <li>HubSpot - Not connected</li>
          <li>Salesforce - Not connected</li>
          <li>Zoho CRM - Not connected</li>
        </ul>
        <button style={{ background: "#0070f3", color: "#fff", border: "none", padding: "0.75rem 1.5rem", borderRadius: "12px", fontWeight: "600" }}>Connect</button>
      </div>
    </div>
  );
}