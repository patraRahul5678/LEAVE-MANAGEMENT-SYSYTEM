import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function Login() {
  const { role } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const isAdmin = role === "admin";

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user.role !== role) {
        setErr(`This account is registered as ${res.data.user.role}, not ${role}.`);
        localStorage.clear();
        return;
      }
      nav(isAdmin ? "/admin" : "/employee");
    } catch (error) {
      setErr(error.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className={`login-box ${isAdmin ? "admin-theme" : "employee-theme"}`}>
        <div className="login-panel-left">
          <div className="login-brand-icon">{isAdmin ? "🧑💼" : "👨💼"}</div>
          <h2>{isAdmin ? "Admin Portal" : "Employee Portal"}</h2>
          <p>{isAdmin ? "Manage your team's leave requests and policies." : "Track your leaves, apply and stay updated."}</p>
        </div>
        <div className="login-panel-right">
          <h3 className="login-heading">Sign In</h3>
          <p className="login-sub">Enter your credentials to access your account</p>
          <form onSubmit={submit} className="login-form">
            <div className="field-group">
              <label>Email Address</label>
              <div className="input-wrap">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            <div className="field-group">
              <label>Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            {err && <div className="login-err">⚠️ {err}</div>}
            <button type="submit" className={`login-submit-btn ${isAdmin ? "admin-btn" : "employee-btn"}`} disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <div className="login-footer">
            <button className="back-link" onClick={() => nav(`/auth-choice/${role}`)}>← Back</button>
            <button className="back-link" onClick={() => nav(`/register/${role}`)}>Create account →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
