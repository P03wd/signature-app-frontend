import React from "react";
import API from "../api/api"; // axios instance

const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

export default function DocumentCard({ doc, refresh }) {
  // download file
  const downloadFile = () => {
    if (!doc?.filePath) {
      alert("File path not found");
      return;
    }

    // window.open(`http://localhost:5000/${doc.filePath}`, "_blank");
    window.open(`${BASE_URL}/${doc.filePath}`, "_blank");

  };

  // delete file
  const deleteFile = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${doc.originalName}" ?`
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/documents/${doc._id}`);

      alert("Document deleted successfully");
      refresh(); // reload list after delete
    } catch (error) {
      console.error(error);
      alert("Failed to delete document");
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{doc.originalName}</h3>

      <p style={styles.info}>
        Uploaded: {new Date(doc.createdAt).toLocaleString()}
      </p>

      <div style={styles.buttons}>
        <button style={styles.downloadBtn} onClick={downloadFile}>
          Download
        </button>

        <button style={styles.deleteBtn} onClick={deleteFile}>
          Delete
        </button>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */
const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  title: {
    margin: 0,
    fontSize: "18px",
  },
  info: {
    fontSize: "13px",
    color: "#666",
  },
  buttons: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  downloadBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
  },
  deleteBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#f44336",
    color: "white",
  },
};
