import { useState } from "react";
import API from "../api/api";

export default function Upload({ refresh }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("document", file);

      await API.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("File uploaded successfully ✅");
      setFile(null);

      // refresh document list on dashboard
      if (refresh) refresh();

    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20
      }}
    >
      <h3>Upload Document</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
