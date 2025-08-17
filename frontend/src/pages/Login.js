import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function Login() {
  const { role } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role !== role) {
        setErr(`This account is registered as ${res.data.user.role}, not ${role}.`);
        localStorage.clear();
        return;
      }

      nav(role === "admin" ? "/admin" : "/employee");
    } catch (error) {
      setErr(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="center card auth-card">
      <h2 className="title">{role} Login</h2>
      <form onSubmit={submit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="📧 Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="🔑 Password"
          required
        />
        <button type="submit" className="btn primary">Login</button>
        {err && <div className="err">{err}</div>}
      </form>
    </div>
  );
}
