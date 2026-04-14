import { Course } from '../models/Course.js';
import { Lesson } from '../models/Lesson.js';
import { Progress } from '../models/Progress.js';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/http.js';

export const analytics = asyncHandler(async (_req, res) => {
  const [students, courses, lessons, completedLessons] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    Course.countDocuments(),
    Lesson.countDocuments(),
    Progress.countDocuments({ completed: true })
  ]);

  res.json({ students, courses, lessons, completedLessons });
});
