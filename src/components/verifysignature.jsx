// src/components/VerifySignature.js
import { useState } from "react";
import API from "../api/api"; // adjust path if needed

export default function VerifySignature() {
  const [docId, setDocId] = useState("");
  const [signerId, setSignerId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!docId || !signerId) {
      setMessage("Please enter both Document ID and Signer ID.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Call the verification API
      const res = await API.post("/verification/verify", { docId, signerId });
      setMessage(res.data.message || "Signature verified successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error verifying signature");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Verify Signature</h2>

      <input
        type="text"
        placeholder="Document ID"
        value={docId}
        onChange={(e) => setDocId(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Signer ID"
        value={signerId}
        onChange={(e) => setSignerId(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleVerify} style={styles.button} disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

// Inline styling (optional: you can move to CSS file)
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    marginBottom: "20px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
  },
  message: {
    marginTop: "15px",
    fontWeight: "bold",
  },
};
