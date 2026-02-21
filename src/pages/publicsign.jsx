import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function PublicSign() {
  const { token } = useParams();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await API.get(`/invite/public/${token}`);
        setDoc(res.data);
      } catch (err) {
        alert("Invalid or expired link");
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [token]);

  const signDoc = async () => {
    try {
      await API.post(`/invite/sign/${token}`);
      setMessage("Document signed successfully ✓");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Signing failed");
    }
  };

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading document...</h3>;
  if (!doc) return <h3 style={{ textAlign: "center", color: "red" }}>Document not found</h3>;

  return (
    <div style={styles.container}>
      <h2>{doc.originalName}</h2>

      <button style={styles.button} onClick={signDoc}>
        Sign Document
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "50px auto",
    padding: 20,
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: 6,
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
    fontSize: 16,
    marginTop: 20,
  },
  message: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#333",
  },
};