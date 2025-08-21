export default function SettingsPage(){
  return (
    <div>
      <h2 style={{fontWeight:700}}>Settings</h2>
      <div className="card">
        <p><strong>Account:</strong> manager@pleefy.com</p>
        <p><strong>Rol:</strong> Admin</p>
        <button className="btn">Wijzig wachtwoord</button>
      </div>
    </div>
  );
}
