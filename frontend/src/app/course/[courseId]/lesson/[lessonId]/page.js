'use client';

import { useEffect, useState } from 'react';
import { api } from '../../../../../../lib/api';

export default function LessonPage({ params }) {
  const { lessonId } = params;
  const [videoUrl, setVideoUrl] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (lessonId !== 'placeholder') {
      api(`/lessons/${lessonId}/video`).then((d) => setVideoUrl(d.url)).catch(() => {});
    }
  }, [lessonId]);

  async function saveNotes() {
    await api(`/lessons/${lessonId}/progress`, {
      method: 'PATCH',
      body: JSON.stringify({ notes })
    });
  }

  return (
    <main className="container">
      <h2>Lesson Viewer</h2>
      {videoUrl ? (
        <video controls width="100%" src={videoUrl} onTimeUpdate={(e) => {
          const p = e.target.duration ? Math.round((e.target.currentTime / e.target.duration) * 100) : 0;
          api(`/lessons/${lessonId}/progress`, {
            method: 'PATCH',
            body: JSON.stringify({ watchPercent: p, watchSeconds: Math.round(e.target.currentTime) })
          }).catch(() => {});
        }} />
      ) : (
        <p>Select a real lesson ID to stream signed Cloudinary video.</p>
      )}
      <div className="card">
        <h3>Notes (auto-save supported)</h3>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        <button onClick={saveNotes}>Save notes</button>
      </div>
      <p>Watermark overlay should render student identifier in player layer.</p>
    </main>
  );
}
