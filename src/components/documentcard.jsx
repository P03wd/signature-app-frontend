import React from "react";
import API from "../api/api";

const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

export default function DocumentCard({ doc, refresh }) {

  // DOWNLOAD FILE
  const downloadFile = () => {
    if (!doc?.filePath) {
      alert("File path not found");
      return;
    }

    window.open(`${BASE_URL}/${doc.filePath}`, "_blank");
  };

  // DELETE FILE
  const deleteFile = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${doc.originalName}" ?`
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/documents/${doc._id}`);
      alert("Document deleted successfully");
      refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete document");
    }
  };

  // SIGN DOCUMENT
  const signDocument = async () => {
    try {
      await API.post(`/documents/sign/${doc._id}`);
      alert("Document signed successfully");
      refresh();
    } catch (err) {
      alert("Signing failed");
      console.error(err);
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

        <button style={styles.signBtn} onClick={signDocument}>
          Sign
        </button>

        {doc.signedFilePath && (
          <button
            style={styles.viewBtn}
            onClick={() =>
              window.open(`${BASE_URL}/${doc.signedFilePath}`, "_blank")
            }
          >
            View Signed
          </button>
        )}
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
  signBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    color: "white",
  },
  viewBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#9C27B0",
    color: "white",
  },
};
