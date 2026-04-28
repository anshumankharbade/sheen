import { useState } from "react";
import api from '../api';

const GLASS = {
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "4px",
};

const AdminLogin = ({ onLogin }) => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Call a new backend endpoint that validates the token
      const res = await api.post("/admin/verify", { token });
      if (res.data.valid) {
        localStorage.setItem("adminToken", token);
        onLogin();
      } else {
        setError("Invalid admin token.");
      }
    } catch {
      setError("Invalid admin token or server error.");
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          ...GLASS,
          maxWidth: "420px",
          width: "100%",
          padding: "3rem 2.5rem",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#e8c97a",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Admin access
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "32px",
            fontWeight: 300,
            color: "#f0ece4",
            marginBottom: "2rem",
            textAlign: "center",
            marginTop: 0,
          }}
        >
          Sign in
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter admin token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            autoComplete="current-password"
            style={{
              width: "100%",
              padding: "0.875rem 1rem",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "2px",
              background: "rgba(255,255,255,0.06)",
              color: "#f0ece4",
              fontSize: "14px",
              fontWeight: 300,
              outline: "none",
              marginBottom: "0.75rem",
              backdropFilter: "blur(8px)",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(232,201,122,0.5)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.15)";
            }}
          />
          {error && (
            <p
              style={{
                color: "#e07070",
                fontSize: "13px",
                marginBottom: "0.75rem",
                marginTop: 0,
              }}
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.875rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#0d0b10",
              background: "rgba(232,201,122,0.9)",
              border: "1px solid rgba(232,201,122,0.8)",
              borderRadius: "2px",
              cursor: "pointer",
              transition: "background 0.2s",
              marginTop: "0.5rem",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#e8c97a";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(232,201,122,0.9)";
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
