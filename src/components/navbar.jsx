export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 30px",
      background: "#111",
      color: "white",
      alignItems: "center"
    }}>
      <h2>SignDocs</h2>

      <div>
        <button onClick={()=>window.location.href="/dashboard"}>Dashboard</button>
        <button onClick={logout} style={{marginLeft:10}}>Logout</button>
      </div>
    </div>
  );
}
