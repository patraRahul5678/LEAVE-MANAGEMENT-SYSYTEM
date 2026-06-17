import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-hero">
        <div className="home-icon">📋</div>
        <h1 className="home-title">Leave Management System</h1>
        <p className="home-desc">
          Manage employee leaves effortlessly. Apply, track, and approve — all in one place.
        </p>
        <div className="home-cards">
          <div className="role-card employee-card" onClick={() => nav("/auth-choice/employee")}>
            <div className="role-icon">👨‍💼</div>
            <h3>Employee</h3>
            <p>Apply for leaves, track your balance & history</p>
            <span className="role-btn">Get Started →</span>
          </div>
          <div className="role-card admin-card" onClick={() => nav("/auth-choice/admin")}>
            <div className="role-icon">🧑‍💼</div>
            <h3>Admin</h3>
            <p>Review requests, manage team leave policies</p>
            <span className="role-btn">Get Started →</span>
          </div>
        </div>
      </div>
    </div>
  );
}
