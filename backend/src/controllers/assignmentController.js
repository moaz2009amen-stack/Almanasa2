import { Assignment } from '../models/Assignment.js';
import { AssignmentAttempt } from '../models/AssignmentAttempt.js';
import { Progress } from '../models/Progress.js';
import { asyncHandler, ApiError } from '../utils/http.js';
import { recalcLessonCompletion } from '../services/progressService.js';

export const createAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.create(req.body);
  res.status(201).json(assignment);
});

export const submitAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.assignmentId);
  if (!assignment) throw new ApiError(404, 'Assignment not found');

  const selected = req.body.selectedOptionKey;
  const score = selected === assignment.correctOptionKey ? 100 : 0;
  const passed = score >= assignment.passScore;

  const attempt = await AssignmentAttempt.create({
    assignmentId: assignment._id,
    lessonId: assignment.lessonId,
    studentId: req.user._id,
    selectedOptionKey: selected,
    score,
    passed
  });

  await Progress.findOneAndUpdate(
    { studentId: req.user._id, lessonId: assignment.lessonId },
    { assignmentPassed: passed },
    { upsert: true }
  );
  await recalcLessonCompletion(req.user._id, assignment.lessonId);

  res.json({ attempt, instantResult: { score, passed } });
});
