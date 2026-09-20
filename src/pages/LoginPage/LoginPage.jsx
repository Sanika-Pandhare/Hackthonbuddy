import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, Sparkles, CheckCircle2, ShieldAlert, UserCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [email, setEmail] = useState("admin@hackathonbuddy.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loginRole, setLoginRole] = useState("Admin");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    const res = login(email, password);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        if (res.isAdmin || email.toLowerCase().includes("admin")) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 400);
    } else {
      setError(res.message || "Invalid credentials. Please check username or password.");
    }
  };

  // Quick 1-Click Admin Login
  const handleAdminQuickLogin = () => {
    setEmail("admin@hackathonbuddy.com");
    setPassword("admin123");
    setLoginRole("Admin");
    const res = login("admin@hackathonbuddy.com", "admin123");
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin");
      }, 400);
    }
  };

  // Quick 1-Click Hacker Login
  const handleHackerQuickLogin = () => {
    setEmail("sanika@example.com");
    setPassword("password123");
    setLoginRole("Hacker");
    const res = login("sanika@example.com", "password123");
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 400);
    }
  };

  return (
    <div className="login-page">
      {/* BACK BUTTON */}
      <button
        type="button"
        className="login-back-button"
        onClick={() => navigate("/")}
        aria-label="Go to home"
      >
        <ArrowLeft size={20} />
      </button>

      {/* LOGO */}
      <div className="login-logo-section">
        <div className="login-logo-icon">🚀</div>
        <div className="login-logo-text">
          HACKATHON<span>BUDDY</span>
        </div>
      </div>

      {/* HEADING */}
      <div className="login-heading">
        <h1>WELCOME BACK</h1>
        <p>Sign in to your account or access the Admin Console</p>
      </div>

      {/* LOGIN CARD */}
      <div className="login-card">
        {/* CREDENTIALS INFO BADGE */}
        <div style={{
          background: "rgba(11, 15, 25, 0.9)",
          border: "1px solid #1e293b",
          borderRadius: "10px",
          padding: "12px 14px",
          marginBottom: "20px",
          fontSize: "12.5px"
        }}>
          <strong style={{ color: "#38bdf8", display: "block", marginBottom: "4px" }}>
            🔑 Demo & Admin Credentials:
          </strong>
          <div style={{ color: "#cbd5e1", lineHeight: "1.5" }}>
            <div>🛡️ <strong>Admin</strong>: <code>admin@hackathonbuddy.com</code> / <code>admin123</code></div>
            <div>👨‍💻 <strong>Hacker</strong>: <code>sanika@example.com</code> / <code>password123</code></div>
          </div>
        </div>

        <form onSubmit={handleLogin}>
          {/* EMAIL / USERNAME */}
          <div className="login-field">
            <label htmlFor="email">EMAIL / USERNAME</label>
            <input
              id="email"
              type="text"
              placeholder="admin@hackathonbuddy.com or sanika@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          {/* PASSWORD */}
          <div className="login-field">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {/* ERROR */}
          {error && <div className="login-error">{error}</div>}

          {/* SUCCESS */}
          {success && (
            <div className="login-success" style={{
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid #10b981",
              color: "#34d399",
              padding: "10px 14px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <CheckCircle2 size={16} />
              Login successful! Launching {loginRole} Console...
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button type="submit" className="login-submit-button">
            <LogIn size={18} />
            SIGN IN TO WORKSPACE
          </button>

          {/* QUICK 1-CLICK ACTION BUTTONS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
            <button
              type="button"
              onClick={handleAdminQuickLogin}
              style={{
                padding: "10px 8px",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                color: "#fca5a5",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}
            >
              <ShieldAlert size={15} />
              1-Click Admin
            </button>

            <button
              type="button"
              onClick={handleHackerQuickLogin}
              style={{
                padding: "10px 8px",
                background: "rgba(139, 92, 246, 0.15)",
                border: "1px solid rgba(139, 92, 246, 0.4)",
                color: "#c4b5fd",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}
            >
              <UserCheck size={15} />
              1-Click Hacker
            </button>
          </div>
        </form>

        <div className="login-divider"></div>

        {/* REGISTER LINK */}
        <div className="login-register">
          <span>Don't have an account?</span>
          <button
            type="button"
            onClick={() => navigate("/create-profile")}
          >
            Create One
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;