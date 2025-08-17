import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="center card big-card">
      <h1 className="title">Leave Management System</h1>
      <p className="subtitle">Choose your role to continue</p>
      <div className="btn-group">
        <button className="btn primary" onClick={() => nav("/auth-choice/employee")}>
          👨‍💼 I am an Employee
        </button>
        <button className="btn secondary" onClick={() => nav("/auth-choice/admin")}>
          🧑‍💼 I am an Admin
        </button>
      </div>
    </div>
  );
}



