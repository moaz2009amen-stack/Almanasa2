import { Router } from 'express';
import { createCourse, enrollStudent, getCourseLessons, listCourses } from '../controllers/courseController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.get('/', listCourses);
router.get('/:courseId/lessons', requireAuth, getCourseLessons);
router.post('/', requireAuth, requireRole('admin'), createCourse);
router.post('/:courseId/enroll', requireAuth, requireRole('student'), enrollStudent);

export default router;
