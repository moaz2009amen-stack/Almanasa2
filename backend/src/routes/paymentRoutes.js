import { Router } from 'express';
import { createPaymentIntent, paymobWebhook } from '../controllers/paymentController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.post('/intent', requireAuth, requireRole('student'), createPaymentIntent);
router.post('/webhook/paymob', paymobWebhook);

export default router;
