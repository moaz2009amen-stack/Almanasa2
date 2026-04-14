'use client';

import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [course, setCourse] = useState({ title: '', description: '', priceCents: 0 });

  useEffect(() => {
    api('/admin/analytics').then(setAnalytics).catch(() => setAnalytics(null));
  }, []);

  async function createCourse(e) {
    e.preventDefault();
    await api('/courses', { method: 'POST', body: JSON.stringify(course) });
    alert('Course created');
  }

  return (
    <main className="container">
      <h2>Admin Dashboard</h2>
      {analytics && (
        <div className="grid">
          <div className="card">Students: {analytics.students}</div>
          <div className="card">Courses: {analytics.courses}</div>
          <div className="card">Lessons: {analytics.lessons}</div>
          <div className="card">Completed Lessons: {analytics.completedLessons}</div>
        </div>
      )}

      <form className="card" onSubmit={createCourse}>
        <h3>Create Course</h3>
        <input placeholder="Title" value={course.title} onChange={(e) => setCourse({ ...course, title: e.target.value })} />
        <textarea placeholder="Description" value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} />
        <input type="number" placeholder="Price (cents)" value={course.priceCents} onChange={(e) => setCourse({ ...course, priceCents: Number(e.target.value) })} />
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
