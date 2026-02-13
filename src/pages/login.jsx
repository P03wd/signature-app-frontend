// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setMessage("All fields required");
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await API.post("/auth/login", { email, password });

      // Save token
      localStorage.setItem("token", res.data.token);

      setMessage("Login successful ✓");

      // redirect after short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h2>Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9"
  },
  card: {
    padding: 30,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    width: 320,
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: 12,
    border: "none",
    borderRadius: 6,
    background: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },
  message: {
    marginTop: 15,
    fontWeight: "bold"
  }
};
