'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api('/courses').then(setCourses).catch(() => setCourses([]));
  }, []);

  return (
    <main className="container">
      <h2>Student Dashboard</h2>
      <div className="grid">
        {courses.map((course) => (
          <div key={course._id} className="card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <Link href={`/course/${course._id}/lesson/placeholder`}>Open Course</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
