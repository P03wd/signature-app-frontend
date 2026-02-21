import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import API from "../api/api";
import SignatureCanvas from "react-signature-canvas";

export default function SignPage() {
  const { token } = useParams();
  const sigRef = useRef(null);

  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await API.get(`/invite/public/${token}`);
        setDoc(res.data);
      } catch (err) {
        setError("Invalid or expired link");
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [token]);

  const clearSignature = () => sigRef.current.clear();

  const handleSign = async () => {
    if (sigRef.current.isEmpty()) return alert("Please draw signature");

    const image = sigRef.current.getTrimmedCanvas().toDataURL("image/png");

    try {
      await API.post(`/invite/sign/${token}`, { signature: image });
      setSigned(true);
      alert("Document signed successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signing failed");
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", textAlign: "center" }}>
      <h1>Sign Document</h1>
      <h3>{doc.originalName}</h3>

      <a
        href={`${API.defaults.baseURL.replace("/api", "")}/${doc.filePath}`}
        target="_blank"
        rel="noreferrer"
      >
        View Document
      </a>

      <h3 style={{ marginTop: 30 }}>Draw Signature</h3>
      <div style={{ border: "2px solid black", display: "inline-block" }}>
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
        />
      </div>

      <br /><br />
      <button onClick={clearSignature} style={{ marginBottom: 20 }}>Clear</button>
      <br />

      {signed ? (
        <h2 style={{ color: "green" }}>Signed Successfully ✅</h2>
      ) : (
        <button
          onClick={handleSign}
          style={{
            padding: "12px 20px",
            fontSize: 16,
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit Signature
        </button>
      )}
    </div>
  );
}