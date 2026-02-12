import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function DocumentView() {
  const { id } = useParams();
  const [inviteEmail, setInviteEmail] = useState("");

  const invite = async () => {
    try {
      await API.post(`/documents/invite/${id}`, {
        email: inviteEmail
      });
      alert("User invited successfully");
      setInviteEmail("");
    } catch (err) {
      alert(err.response?.data?.message || "Error inviting user");
    }
  };

  const sign = async () => {
    try {
      await API.post(`/documents/sign/${id}`);
      alert("Signed successfully");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Document Actions</h2>

      {/* Invite signer */}
      <input
        placeholder="Enter email"
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value)}
      />
      <button onClick={invite}>Invite</button>

      <hr />

      {/* Sign button */}
      <button onClick={sign}>Sign Document</button>
    </div>
  );
}
