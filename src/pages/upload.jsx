import { useState } from "react";
import API from "../api/api";

export default function Upload({ refresh }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file");

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("document", file);

      await API.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("File uploaded successfully ✅");
      setFile(null);
      document.getElementById("uploadInput").value = "";

      if (refresh) refresh();
    } catch (err) {
      console.error(err);
      setMessage("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Upload Document</h3>

      <input
        type="file"
        id="uploadInput"
        onChange={(e) => setFile(e.target.files[0])}
        style={styles.input}
      />

      {file && <p>Selected file: {file.name}</p>}

      <button
        style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    border: "1px solid #ccc",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    display: "block",
    marginBottom: 15,
  },
  button: {
    padding: "10px 16px",
    borderRadius: 6,
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: 14,
    transition: "opacity 0.3s",
  },
  message: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#333",
  },
};
