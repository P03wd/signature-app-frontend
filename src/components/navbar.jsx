// frontend/src/navbar.jsx
import React from "react";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // redirect to login or homepage
  };

  const goToDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#111",
        color: "white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      }}
    >
      {/* App Title */}
      <h2 style={{ margin: 0, cursor: "pointer" }} onClick={() => window.location.href = "/dashboard"}>
        SignDocs
      </h2>

      {/* Navigation Buttons */}
      <div>
        <button
          onClick={goToDashboard}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
          }}
        >
          Dashboard
        </button>

        <button
          onClick={logout}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#f44336",
            color: "white",
            cursor: "pointer",
            marginLeft: 10,
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
