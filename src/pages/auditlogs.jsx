// frontend/src/pages/AuditLogs.jsx
import { useEffect, useState } from "react";
import API from "../api/api";

export default function AuditLogs({ documentId, refreshTrigger }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLogs = async () => {
    if (!documentId) return;

    setLoading(true);
    setError("");
    try {
      const res = await API.get(`/audit/${documentId}`);
      setLogs(res.data || []);
    } catch (err) {
      console.error("Error fetching logs:", err);
      setError("Failed to fetch audit logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    // refreshTrigger allows parent to force re-fetch after actions
  }, [documentId, refreshTrigger]);

  if (loading) return <p>Loading audit logs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (logs.length === 0) return <p>No audit logs available.</p>;

  return (
    <div style={styles.container}>
      <h4>Audit Logs</h4>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>User</th>
            <th style={styles.header}>Action</th>
            <th style={styles.header}>Timestamp</th>
            <th style={styles.header}>IP Address</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td style={styles.cell}>{log.user?.name || "Unknown"}</td>
              <td style={styles.cell}>{log.action}</td>
              <td style={styles.cell}>
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td style={styles.cell}>{log.ip || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
  },
  header: {
    border: "1px solid #ccc",
    padding: 8,
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
    textAlign: "left",
  },
  cell: {
    border: "1px solid #ccc",
    padding: 8,
  },
};