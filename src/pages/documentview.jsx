import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function DocumentView() {
  const { id } = useParams();

  const [doc, setDoc] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchDoc = async () => {
    try {
      const res = await API.get(`/documents/${id}`); // fetch single document
      setDoc(res.data);
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

  // Invite signer by email
  const invite = async () => {
    if (!inviteEmail.trim()) return setMessage("Enter email");

    try {
      const res = await API.post(`/documents/${id}/invite`, {
        email: inviteEmail.trim(),
      });

      setMessage("Invite sent successfully! Share this link:\n" + res.data.link);
      setInviteEmail("");
      fetchDoc();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Invite failed");
    }
  };

  // Sign document (for testing, all users can sign)
  const sign = async () => {
    try {
      const signatureData = prompt("Enter a dummy signature (base64 or any text):");
      if (!signatureData) return;

      await API.post(`/documents/sign/${id}`, {
        signatureData,
        pageNumber: 1,
        x: 50,
        y: 50,
      });

      setMessage("Document signed successfully!");
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
      <p><b>Owner:</b> {doc.owner?.name || "Unknown"}</p>

      {/* Allowed Signers */}
      <div style={styles.section}>
        <h4>Allowed Signers</h4>
        {doc.allowedSigners?.length === 0 && <p>No signers invited</p>}
        {doc.allowedSigners?.map(u => (
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

// ---------------- STYLES ----------------
const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 12,
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
  },
  section: { marginTop: 20 },
  input: {
    padding: 10,
    marginRight: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    width: "60%",
  },
  button: {
    padding: "10px 16px",
    borderRadius: 6,
    border: "none",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  signBtn: {
    padding: "10px 16px",
    borderRadius: 6,
    border: "none",
    background: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  message: {
    marginTop: 20,
    fontWeight: "bold",
    whiteSpace: "pre-wrap",
  },
};