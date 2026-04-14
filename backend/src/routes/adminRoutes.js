import { Router } from 'express';
import { analytics } from '../controllers/adminController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.get('/analytics', requireAuth, requireRole('admin'), analytics);

export default router;
