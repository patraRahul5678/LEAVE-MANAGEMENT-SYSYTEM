import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function Register() {
  const { role } = useParams();
  const [form, setForm] = useState({ name: "", email: "", password: "", department: "", joiningDate: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { ...form, role });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      nav(role === "admin" ? "/admin" : "/employee");
    } catch (error) {
      setErr(error.response?.data?.msg || "Register failed");
    }
  };

  return (
    <div className="center card auth-card">
      <h2 className="title">{role} Registration</h2>
      <form onSubmit={submit}>
        <input placeholder="👤 Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input type="email" placeholder="📧 Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input type="password" placeholder="🔑 Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        
        {role === "employee" && (
          <>
            <input placeholder="🏢 Department" value={form.department} onChange={e=>setForm({...form,department:e.target.value})}/>
            <input type="date" placeholder="📅 Joining Date" value={form.joiningDate} onChange={e=>setForm({...form,joiningDate:e.target.value})}/>
          </>
        )}
        
        <button type="submit" className="btn primary">Register</button>
        {err && <div className="err">{err}</div>}
      </form>
    </div>
  );
}

