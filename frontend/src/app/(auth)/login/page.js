'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../../lib/api';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ phone, password }) });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      router.push(data.user.role === 'admin' ? '/admin' : '/student');
    } catch (err) { setError(err.message); }
  }

  return <main className="container"><h2>Login</h2><form className="card" onSubmit={onSubmit}><input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/><input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/><button type="submit">Login</button>{error && <p>{error}</p>}</form></main>;
}
