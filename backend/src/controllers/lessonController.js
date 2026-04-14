import cloudinary from '../config/cloudinary.js';
import { Lesson } from '../models/Lesson.js';
import { Progress } from '../models/Progress.js';
import { asyncHandler, ApiError } from '../utils/http.js';
import { isLessonUnlocked, recalcLessonCompletion } from '../services/progressService.js';

export const createLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.create(req.body);
  res.status(201).json(lesson);
});

export const getSignedVideo = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.lessonId);
  if (!lesson) throw new ApiError(404, 'Lesson not found');

  const unlocked = await isLessonUnlocked(req.user._id, lesson.courseId, lesson._id);
  if (!unlocked) throw new ApiError(403, 'Previous lesson is not completed');

  const url = cloudinary.url(lesson.videoPublicId, {
    resource_type: 'video',
    sign_url: true,
    type: 'authenticated'
  });
  res.json({ url });
});

export const upsertLessonProgress = asyncHandler(async (req, res) => {
  const { watchPercent, watchSeconds, notes } = req.body;
  const lesson = await Lesson.findById(req.params.lessonId);
  const progress = await Progress.findOneAndUpdate(
    { studentId: req.user._id, lessonId: lesson._id },
    {
      studentId: req.user._id,
      courseId: lesson.courseId,
      lessonId: lesson._id,
      ...(watchPercent !== undefined ? { watchPercent } : {}),
      ...(watchSeconds !== undefined ? { watchSeconds } : {}),
      ...(notes !== undefined ? { notes } : {})
    },
    { upsert: true, new: true }
  );
  await recalcLessonCompletion(req.user._id, lesson._id);
  res.json(progress);
});
