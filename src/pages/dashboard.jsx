import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/layout";
import Upload from "../pages/upload";
import DocumentCard from "../components/DocumentCard";

export default function Dashboard() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDocs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/documents");
      setDocs(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <Layout>
      <h2>Dashboard</h2>

      {/* Upload component */}
      <Upload refresh={fetchDocs} />

      <div style={styles.docContainer}>
        {loading ? (
          <p>Loading documents...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : docs.length === 0 ? (
          <p>No documents uploaded</p>
        ) : (
          docs.map((doc) => (
            <DocumentCard key={doc._id} doc={doc} refresh={fetchDocs} />
          ))
        )}
      </div>
    </Layout>
  );
}

const styles = {
  docContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxHeight: "70vh",
    overflowY: "auto",
  },
};