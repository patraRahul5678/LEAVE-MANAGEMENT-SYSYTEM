import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthChoice() {
  const { role } = useParams();
  const nav = useNavigate();

  return (
    <div className="center card big-card">
      <h2 className="title">{role === "admin" ? "Admin Access" : "Employee Access"}</h2>
      <p className="subtitle">Select an option to proceed</p>
      <div className="btn-group">
        <button className="btn primary" onClick={() => nav(`/login/${role}`)}>
          🔑 Login
        </button>
        <button className="btn secondary" onClick={() => nav(`/register/${role}`)}>
          ✍️ Register
        </button>
      </div>
    </div>
  );
}


