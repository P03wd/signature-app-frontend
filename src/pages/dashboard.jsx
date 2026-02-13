import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/layout";
import Upload from "../pages/upload";
import DocumentCard from "../components/documentcard";

export default function Dashboard() {
  const [docs, setDocs] = useState([]);

  const fetchDocs = async () => {
    try {
      const res = await API.get("/documents");
      setDocs(res.data);
    } catch (err) {
      console.log(err);
      alert("Error loading documents");
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <Layout>
      <h2>Dashboard</h2>

      <Upload />

      <div style={{ marginTop: 20 }}>
        {docs.map(doc => (
          <DocumentCard key={doc._id} doc={doc} />
        ))}
      </div>
    </Layout>
  );
}
<Upload refresh={fetchDocs} />
{docs.map(doc => (
  <DocumentCard key={doc._id} doc={doc} refresh={fetchDocs}/>
))}
