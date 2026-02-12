// frontend/src/pages/AuditLogs.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function AuditLogs({ documentId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`https://your-backend-url.com/api/audit/${documentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setLogs(res.data))
    .catch(err => console.error(err));
  }, [documentId]);

  return (
    <div>
      <h2>Audit Logs</h2>
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border px-2 py-1">User</th>
            <th className="border px-2 py-1">Action</th>
            <th className="border px-2 py-1">Timestamp</th>
            <th className="border px-2 py-1">IP</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log._id}>
              <td className="border px-2 py-1">{log.userId.name}</td>
              <td className="border px-2 py-1">{log.action}</td>
              <td className="border px-2 py-1">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="border px-2 py-1">{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditLogs;
