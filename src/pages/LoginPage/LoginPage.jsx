import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    const storedUser = localStorage.getItem("hackathonBuddyUser");

    if (!storedUser) {
      console.log("========== LOGIN ==========");
      console.log("No registered user found.");
      console.log("===========================");

      setError("No account found. Please create an account first.");
      return;
    }

    let user;

    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error("Invalid user data:", error);
      setError("Invalid account data. Please register again.");
      return;
    }

    // Console output
    console.log("========== LOGIN ==========");
    console.log("Login Email:", email);
    console.log("Login Password:", password);
    console.log("Registered User:", user);
    console.log("===========================");

    // Check credentials
    if (
      user.email === email.trim() &&
      user.password === password
    ) {
      console.log("Login successful.");
      console.log("Logged in user:", user);

      // Login status
      localStorage.setItem(
        "hackathonBuddyLoggedIn",
        "true"
      );

      // Current user
      localStorage.setItem(
        "hackathonBuddyCurrentUser",
        JSON.stringify(user)
      );

      // Dashboard
      navigate("/dashboard");
    } else {
      console.log("Login failed.");

      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">

      {/* BACK BUTTON */}

      <button
        type="button"
        className="login-back-button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>


      {/* LOGO */}

      <div className="login-logo-section">

        <div className="login-logo-icon">
          🚀
        </div>

        <div className="login-logo-text">
          HACKATHON<span>BUDDY</span>
        </div>

      </div>


      {/* HEADING */}

      <div className="login-heading">

        <h1>
          WELCOME BACK
        </h1>

        <p>
          Continue your hackathon journey
        </p>

      </div>


      {/* LOGIN CARD */}

      <div className="login-card">

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="login-field">

            <label htmlFor="email">
              EMAIL ADDRESS
            </label>

            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

          </div>


          {/* PASSWORD */}

          <div className="login-field">

            <label htmlFor="password">
              PASSWORD
            </label>

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

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          {/* BUTTON */}

          <button
            type="submit"
            className="login-submit-button"
          >
            SIGN IN TO WORKSPACE
          </button>

        </form>


        {/* DIVIDER */}

        <div className="login-divider"></div>


        {/* REGISTER */}

        <div className="login-register">

          <span>
            Don't have an account?
          </span>

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