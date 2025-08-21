export default function IntegrationsPage(){
  return (
    <div>
      <h2 style={{fontWeight:700}}>Integrations</h2>
      <div className="card">
        <p>Koppel je CRM / VoIP (mock):</p>
        <ul>
          <li>HubSpot – <span className="badge">Niet gekoppeld</span></li>
          <li>Salesforce – <span className="badge">Niet gekoppeld</span></li>
          <li>Zoho – <span className="badge">Niet gekoppeld</span></li>
          <li>Aircall – <span className="badge">Niet gekoppeld</span></li>
          <li>Twilio – <span className="badge">Niet gekoppeld</span></li>
        </ul>
        <button className="btn">Connect</button>
      </div>
    </div>
  );
}
