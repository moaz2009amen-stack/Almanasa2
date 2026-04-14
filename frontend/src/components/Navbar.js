'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="container" style={{ display: 'flex', gap: 12 }}>
      <Link href="/">Home</Link>
      <Link href="/student">Student</Link>
      <Link href="/admin">Admin</Link>
      <Link href="/auth/login">Login</Link>
    </div>
  );
}
