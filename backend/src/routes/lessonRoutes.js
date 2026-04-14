import { Router } from 'express';
import { createLesson, getSignedVideo, upsertLessonProgress } from '../controllers/lessonController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.post('/', requireAuth, requireRole('admin'), createLesson);
router.get('/:lessonId/video', requireAuth, getSignedVideo);
router.patch('/:lessonId/progress', requireAuth, requireRole('student'), upsertLessonProgress);

export default router;
