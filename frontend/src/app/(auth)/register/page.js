'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../../lib/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const data = await api('/auth/register', { method: 'POST', body: JSON.stringify(form) });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      router.push('/student');
    } catch (err) { setError(err.message); }
  }

  return <main className="container"><h2>Register as Student</h2><form className="card" onSubmit={onSubmit}><input placeholder="Full Name" value={form.fullName} onChange={(e)=>setForm({ ...form, fullName: e.target.value })}/><input placeholder="Phone" value={form.phone} onChange={(e)=>setForm({ ...form, phone: e.target.value })}/><input type="password" placeholder="Password" value={form.password} onChange={(e)=>setForm({ ...form, password: e.target.value })}/><button type="submit">Create account</button>{error && <p>{error}</p>}</form></main>;
}
