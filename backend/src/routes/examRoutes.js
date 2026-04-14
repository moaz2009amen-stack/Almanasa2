import { Router } from 'express';
import { createExam, submitExam } from '../controllers/examController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.post('/', requireAuth, requireRole('admin'), createExam);
router.post('/:examId/submit', requireAuth, requireRole('student'), submitExam);

export default router;
