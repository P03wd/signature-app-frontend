import React from "react";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f9f9f9"
    }}>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content area */}
      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>
    </div>
  );
}