// frontend/src/pages/DocumentView.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function DocumentView() {
  const { id } = useParams();

  const [doc, setDoc] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch document details
  const fetchDoc = async () => {
    try {
      const res = await API.get("/documents");
      const found = res.data.find(d => d._id === id);
      setDoc(found);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load document");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoc();
  }, [id]);

  // Invite signer
  const invite = async () => {
    if (!inviteEmail) return setMessage("Enter email");

    try {
      await API.post(`/documents/invite/${id}`, {
        email: inviteEmail
      });

      setMessage("User invited successfully");
      setInviteEmail("");
      fetchDoc();
    } catch (err) {
      setMessage(err.response?.data?.message || "Invite failed");
    }
  };

  // Sign document
  const sign = async () => {
    try {
      await API.post(`/documents/sign/${id}`);
      setMessage("Document signed successfully");
      fetchDoc();
    } catch (err) {
      setMessage(err.response?.data?.message || "Signing failed");
    }
  };

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading document...</h3>;
  if (!doc) return <h3 style={{ textAlign: "center" }}>Document not found</h3>;

  return (
    <div style={styles.container}>
      <h2>Document Details</h2>

      <p><b>Name:</b> {doc.originalName}</p>
      <p><b>Status:</b> {doc.status}</p>
      <p><b>Owner:</b> {doc.owner?.name}</p>

      {/* Allowed Signers */}
      <div style={styles.section}>
        <h4>Allowed Signers</h4>
        {doc.allowedSigners.length === 0 && <p>No signers invited</p>}
        {doc.allowedSigners.map(u => (
          <p key={u._id}>• {u.name} ({u.email})</p>
        ))}
      </div>

      {/* Invite Section */}
      <div style={styles.section}>
        <h4>Invite Signer</h4>
        <input
          style={styles.input}
          placeholder="Enter email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
        />
        <button style={styles.button} onClick={invite}>
          Invite
        </button>
      </div>

      {/* Sign Section */}
      <div style={styles.section}>
        <h4>Sign Document</h4>
        <button style={styles.signBtn} onClick={sign}>
          Sign Document
        </button>
      </div>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

// styles
const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 12,
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial"
  },
  section: {
    marginTop: 20
  },
  input: {
    padding: 10,
    marginRight: 10,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px 16px",
    borderRadius: 6,
    border: "none",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer"
  },
  signBtn: {
    padding: "10px 16px",
    borderRadius: 6,
    border: "none",
    background: "#28a745",
    color: "#fff",
    cursor: "pointer"
  },
  message: {
    marginTop: 20,
    fontWeight: "bold"
  }
};
