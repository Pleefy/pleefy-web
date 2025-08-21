export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <div className="card">
        <p>Profile: John Doe</p>
        <p>Email: john@pleefy.com</p>
        <button style={{ background: "#0070f3", color: "#fff", border: "none", padding: "0.75rem 1.5rem", borderRadius: "12px", fontWeight: "600" }}>Update Profile</button>
      </div>
    </div>
  );
}