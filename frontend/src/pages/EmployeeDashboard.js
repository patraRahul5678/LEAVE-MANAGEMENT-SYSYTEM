import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function EmployeeDashboard() {
  const [leaveBalance, setBalance] = useState(0);
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ startDate: "", endDate: "", reason: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bal = await API.get("/leave/balance");
        setBalance(bal.data.leaveBalance);

        const hist = await API.get("/leave/my");
        setLeaves(hist.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const applyLeave = async (e) => {
    e.preventDefault();
    try {
      await API.post("/leave/apply", form);
      alert("✅ Leave request submitted!");
      window.location.reload();
    } catch (err) {
      alert("❌ Failed to apply leave");
    }
  };

  const logout = () => { localStorage.clear(); window.location.href = '/login'; };

  return (
    <div className="dashboard-container">
      <h1 className="page-title">👨‍💼 Employee Dashboard <button className="btn logout-btn" style={{backgroundColor:"red",color:"white"}} onClick={logout}>Logout</button></h1>

      {/* Leave Balance */}
      <div className="card balance-card">
        <h2>Leave Balance</h2>
        <p className="balance-text">{leaveBalance} Days</p>
      </div>

      {/* Apply Leave */}
      <div className="card form-card">
        <h2>Apply for Leave</h2>
        <form onSubmit={applyLeave} className="form-grid">
          <label>
            Start Date
            <input type="date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} required />
          </label>
          <label>
            End Date
            <input type="date" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} required />
          </label>
          <label>
            Reason
            <input type="text" value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} required />
          </label>
          <button className="btn primary" type="submit">🚀 Submit Request</button>
        </form>
      </div>

      {/* Leave History */}
      <div className="card history-card">
        <h2>My Leave History</h2>
        <table className="styled-table modern-table">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((l, i) => (
                <tr key={i}>
                  <td>{new Date(l.startDate).toLocaleDateString()}</td>
                  <td>{new Date(l.endDate).toLocaleDateString()}</td>
                  <td>{l.reason}</td>
                  <td><span className={`status-badge ${l.status}`}>{l.status}</span></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{textAlign:"center"}}>No leave requests yet 🚫</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

