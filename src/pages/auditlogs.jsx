// frontend/src/pages/AuditLogs.jsx
import { useEffect, useState } from "react";
import API from "../api/api";

function AuditLogs({ documentId }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!documentId) return;

    const fetchLogs = async () => {
      try {
        const res = await API.get(`/audit/${documentId}`);
        setLogs(res.data);
      } catch (err) {
        console.error("Error fetching logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [documentId]);

  if (loading) return <p>Loading audit logs...</p>;
  if (logs.length === 0) return <p>No audit logs available.</p>;

  return (
    <div>
      <h4>Audit Logs</h4>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={header}>User</th>
            <th style={header}>Action</th>
            <th style={header}>Timestamp</th>
            <th style={header}>IP Address</th>
          </tr>
        </thead>

        <tbody>
          {logs.map(log => (
            <tr key={log._id}>
              <td style={cell}>{log.userId?.name || "Unknown"}</td>
              <td style={cell}>{log.action}</td>
              <td style={cell}>
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td style={cell}>{log.ip || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// styles
const header = {
  border: "1px solid #ccc",
  padding: "8px",
  background: "#f2f2f2",
  fontWeight: "bold"
};

const cell = {
  border: "1px solid #ccc",
  padding: "8px"
};

export default AuditLogs;
