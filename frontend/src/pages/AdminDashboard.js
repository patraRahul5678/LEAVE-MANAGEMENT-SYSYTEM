import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [pending, setPending] = useState([]);
  const [form, setForm] = useState({ name:'', email:'', department:'', joiningDate:'' });
  const [msg, setMsg] = useState('');

  const fetch = async () => {
    try {
      const e = await API.get('/admin/employees');
      setEmployees(e.data);
      const p = await API.get('/admin/leaves/pending');
      setPending(p.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(()=>{ fetch(); }, []);

  const add = async (ev) => {
    ev.preventDefault(); setMsg('');
    try { 
      await API.post('/admin/employee/add', form); 
      setMsg('Added'); 
      setForm({ name:'', email:'', department:'', joiningDate:''}); 
      fetch(); 
    }
    catch(e){ setMsg(e.response?.data?.msg || 'Error'); }
  };

  const act = async (id, type) => {
    try{
      if(type==='approve') await API.put(`/admin/leave/${id}/approve`);
      else await API.put(`/admin/leave/${id}/reject`);
      fetch();
    }catch(e){ console.error(e); }
  };

  const logout = () => { localStorage.clear(); window.location.href = '/login'; };

  return (
    <div className="dashboard-container">
      <header className="page-title">
        <h2>👨‍💼 Admin Dashboard</h2>
        <button style={{backgroundColor:"red",color:"white"}} className="btn logout-btn" onClick={logout}>Logout</button>
      </header>

      {/* Add Employee */}
      <section className="card">
        <h3 className="title">Add Employee</h3>
        <form onSubmit={add} className="form-grid">
          <label>
            Name
            <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          </label>
          <label>
            Email
            <input required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          </label>
          <label>
            Department
            <input value={form.department} onChange={e=>setForm({...form,department:e.target.value})} />
          </label>
          <label>
            Joining Date
            <input type="date" required value={form.joiningDate} onChange={e=>setForm({...form,joiningDate:e.target.value})} />
          </label>
          <button type="submit" className="btn primary">Add</button>
        </form>
        {msg && <div className="err">{msg}</div>}
      </section>

      {/* Pending Leaves */}
      <section className="card">
        <h3 className="title">Pending Leaves</h3>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Employee</th><th>From</th><th>To</th><th>Days</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pending.map(p=> (
              <tr key={p._id}>
                <td>{p.employeeId?.name}</td>
                <td>{new Date(p.startDate).toLocaleDateString()}</td>
                <td>{new Date(p.endDate).toLocaleDateString()}</td>
                <td>{p.days}</td>
                <td>
                  <button className="btn secondary" onClick={()=>act(p._id,'approve')}>Approve</button>
                  <button className="btn primary" onClick={()=>act(p._id,'reject')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Employees */}
      <section className="card">
        <h3 className="title">Employees</h3>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Dept</th><th>Joining</th><th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp=> (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{new Date(emp.joiningDate).toLocaleDateString()}</td>
                <td>{emp.leaveBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

