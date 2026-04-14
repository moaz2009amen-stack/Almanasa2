import { Course } from '../models/Course.js';
import { Enrollment } from '../models/Enrollment.js';
import { Lesson } from '../models/Lesson.js';
import { asyncHandler } from '../utils/http.js';

export const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
});

export const listCourses = asyncHandler(async (_req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json(courses);
});

export const getCourseLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({ courseId: req.params.courseId }).sort({ order: 1 });
  res.json(lessons);
});

export const enrollStudent = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findOneAndUpdate(
    { studentId: req.user._id, courseId: req.params.courseId },
    { status: 'active' },
    { upsert: true, new: true }
  );
  res.json(enrollment);
});
