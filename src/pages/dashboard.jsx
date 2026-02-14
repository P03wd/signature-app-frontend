import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/layout";
import Upload from "../pages/upload";
import DocumentCard from "../components/documentcard";

export default function Dashboard() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocs = async () => {
    try {
      const res = await API.get("/documents");
      setDocs(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Failed to load documents");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <Layout>
      <h2>Dashboard</h2>

      {/* upload component */}
      <Upload refresh={fetchDocs} />

      <div style={{ marginTop: 20 }}>
        {loading ? (
          <p>Loading...</p>
        ) : docs.length === 0 ? (
          <p>No documents uploaded</p>
        ) : (
          docs.map((doc) => (
            <DocumentCard
              key={doc._id}
              doc={doc}
              refresh={fetchDocs}
            />
          ))
        )}
      </div>
    </Layout>
  );
}
