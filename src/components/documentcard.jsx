import API from "../api/api";
import { useState } from "react";

export default function DocumentCard({ doc, refresh }) {
  const [email, setEmail] = useState("");

  // Backend base URL (without /api)
  const BASE_URL = import.meta.env.VITE_API_URL?.replace("/api", "");

  // Auth token
  const token = localStorage.getItem("token");

  /* ================= DOWNLOAD ORIGINAL ================= */
  const downloadFile = () => {
    if (!doc.filePath) return alert("File not found");
    window.open(`${BASE_URL}/${doc.filePath}`, "_blank");
  };

  /* ================= DOWNLOAD SIGNED ================= */
  const downloadSigned = () => {
    if (!doc.signedFilePath) return alert("Document not signed yet");
    window.open(`${BASE_URL}/${doc.signedFilePath}`, "_blank");
  };

  /* ================= DELETE DOCUMENT ================= */
  const deleteFile = async () => {
    if (!window.confirm("Delete this document?")) return;

    try {
      await API.delete(`/documents/${doc._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Document deleted");
      refresh();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  /* ================= INVITE USER ================= */
  const inviteUser = async () => {
    if (!email) return alert("Enter email");

    try {
      const res = await API.post(
        `/invite/${doc._id}`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.link || "Invite sent");
      setEmail("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Invite failed");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h3>{doc.originalName}</h3>

      <p>
        <b>Status:</b>{" "}
        <span style={{ color: doc.status === "Signed" ? "green" : "orange" }}>
          {doc.status}
        </span>
      </p>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={downloadFile}>Download</button>{" "}
        <button onClick={downloadSigned}>Signed PDF</button>{" "}
        <button onClick={deleteFile}>Delete</button>
      </div>

      <hr />

      <h4>Invite Signer</h4>

      <input
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "6px",
          marginRight: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      <button onClick={inviteUser}>Send Invite</button>
    </div>
  );
}