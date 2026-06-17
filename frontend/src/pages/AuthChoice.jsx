import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthChoice() {
  const { role } = useParams();
  const nav = useNavigate();
  const isAdmin = role === "admin";

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="auth-role-badge" data-role={role}>
          {isAdmin ? "🧑💼" : "👨💼"} {isAdmin ? "Admin" : "Employee"} Portal
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">How would you like to continue?</p>
        <div className="auth-choice-grid">
          <button className="choice-card login-choice" onClick={() => nav(`/login/${role}`)}>
            <span className="choice-icon">🔑</span>
            <span className="choice-label">Login</span>
            <span className="choice-hint">Already have an account</span>
          </button>
          <button className="choice-card register-choice" onClick={() => nav(`/register/${role}`)}>
            <span className="choice-icon">✍️</span>
            <span className="choice-label">Register</span>
            <span className="choice-hint">Create a new account</span>
          </button>
        </div>
        <button className="back-link" onClick={() => nav("/")}>← Back to Home</button>
      </div>
    </div>
  );
}
