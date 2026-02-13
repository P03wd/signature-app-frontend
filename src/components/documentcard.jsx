import API from "../api/api";

export default function DocumentCard({ doc, refresh }) {

  const downloadFile = () => {
    window.open(`http://localhost:5000/${doc.filePath}`, "_blank");
  };

  const deleteFile = async () => {
    if (!window.confirm("Delete this document?")) return;

    try {
      await API.delete(`/documents/${doc._id}`);
      alert("Deleted successfully");
      refresh();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const signFile = async () => {
    try {
      await API.post(`/signatures/sign/${doc._id}`);
      alert("Signed successfully");
      refresh();
    } catch (err) {
      alert("Sign failed");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        background: "#fafafa"
      }}
    >
      <h3>{doc.originalName}</h3>

      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color:
              doc.status === "signed"
                ? "green"
                : doc.status === "rejected"
                ? "red"
                : "orange"
          }}
        >
          {doc.status}
        </span>
      </p>

      <p>
        <strong>Uploaded:</strong>{" "}
        {new Date(doc.createdAt).toLocaleString()}
      </p>

      <p>
        <strong>ID:</strong> {doc._id}
      </p>

      <div style={{ marginTop: 10 }}>
        <button onClick={downloadFile}>Download</button>{" "}
        <button onClick={signFile}>Sign</button>{" "}
        <button onClick={deleteFile}>Delete</button>
      </div>
    </div>
  );
}
