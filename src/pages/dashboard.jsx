import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    API.get("/documents/my")
      .then(res => setDocs(res.data))
      .catch(() => alert("Auth error"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Documents</h2>

      {docs.length === 0 && <p>No documents found</p>}

      {docs.map(d => (
        <div key={d._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <p><b>Name:</b> {d.originalName}</p>
          <p><b>Status:</b> {d.status}</p>
        </div>
      ))}
    </div>
  );
}
