import { Router } from 'express';
import { createAssignment, submitAssignment } from '../controllers/assignmentController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.post('/', requireAuth, requireRole('admin'), createAssignment);
router.post('/:assignmentId/submit', requireAuth, requireRole('student'), submitAssignment);

export default router;
