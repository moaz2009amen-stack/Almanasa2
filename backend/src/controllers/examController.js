import { Exam } from '../models/Exam.js';
import { ExamAttempt } from '../models/ExamAttempt.js';
import { Progress } from '../models/Progress.js';
import { asyncHandler, ApiError } from '../utils/http.js';
import { recalcLessonCompletion } from '../services/progressService.js';

export const createExam = asyncHandler(async (req, res) => {
  const exam = await Exam.create(req.body);
  res.status(201).json(exam);
});

export const submitExam = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.examId);
  if (!exam) throw new ApiError(404, 'Exam not found');

  let earned = 0;
  let total = 0;

  for (const q of exam.questions) {
    total += q.points;
    if (q.type === 'mcq') {
      const ans = req.body.answers.find((a) => String(a.questionId) === String(q._id));
      if (ans?.answer === q.correctOptionKey) earned += q.points;
    }
  }

  const score = total ? Math.round((earned / total) * 100) : 0;
  const passed = score >= exam.passScore;

  const attempt = await ExamAttempt.create({
    examId: exam._id,
    lessonId: exam.lessonId,
    studentId: req.user._id,
    answers: req.body.answers,
    score,
    passed
  });

  await Progress.findOneAndUpdate(
    { studentId: req.user._id, lessonId: exam.lessonId },
    { examPassed: passed },
    { upsert: true }
  );
  await recalcLessonCompletion(req.user._id, exam.lessonId);

  res.json({ attempt, score, passed, warning: 'Final submission cannot be edited.' });
});
