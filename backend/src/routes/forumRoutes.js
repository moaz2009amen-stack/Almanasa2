import { Router } from 'express';
import { commentPost, createPost, listPosts, moderatePost } from '../controllers/forumController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.get('/course/:courseId/posts', requireAuth, listPosts);
router.post('/course/:courseId/posts', requireAuth, requireRole('student', 'admin'), createPost);
router.post('/posts/:postId/comments', requireAuth, requireRole('student', 'admin'), commentPost);
router.patch('/posts/:postId/moderate', requireAuth, requireRole('admin'), moderatePost);

export default router;
