import { Course } from '../models/Course.js';
import { Lesson } from '../models/Lesson.js';
import { Progress } from '../models/Progress.js';

export async function recalcLessonCompletion(studentId, lessonId) {
  const lesson = await Lesson.findById(lessonId);
  const course = await Course.findById(lesson.courseId);
  const threshold = course?.settings?.completionThreshold ?? 100;

  const progress = await Progress.findOne({ studentId, lessonId });
  if (!progress) return null;

  const completed =
    progress.watchPercent >= threshold && progress.assignmentPassed && progress.examPassed;

  progress.completed = completed;
  progress.completedAt = completed ? new Date() : null;
  await progress.save();
  return progress;
}

export async function isLessonUnlocked(studentId, courseId, lessonId) {
  const course = await Course.findById(courseId).populate('lessonOrder');
  if (!course?.settings?.forceLessonOrder) return true;
  const idx = course.lessonOrder.findIndex((l) => String(l._id) === String(lessonId));
  if (idx <= 0) return true;
  const prevLessonId = course.lessonOrder[idx - 1]._id;
  const prev = await Progress.findOne({ studentId, lessonId: prevLessonId });
  return !!prev?.completed;
}
