import { ForumComment } from '../models/ForumComment.js';
import { ForumPost } from '../models/ForumPost.js';
import { asyncHandler } from '../utils/http.js';

export const createPost = asyncHandler(async (req, res) => {
  const post = await ForumPost.create({
    courseId: req.params.courseId,
    authorId: req.user._id,
    content: req.body.content
  });
  res.status(201).json(post);
});

export const listPosts = asyncHandler(async (req, res) => {
  const posts = await ForumPost.find({ courseId: req.params.courseId, deleted: false }).sort({ pinned: -1, createdAt: -1 });
  res.json(posts);
});

export const commentPost = asyncHandler(async (req, res) => {
  const comment = await ForumComment.create({
    postId: req.params.postId,
    authorId: req.user._id,
    content: req.body.content,
    parentCommentId: req.body.parentCommentId || null
  });
  res.status(201).json(comment);
});

export const moderatePost = asyncHandler(async (req, res) => {
  const post = await ForumPost.findByIdAndUpdate(req.params.postId, req.body, { new: true });
  res.json(post);
});
