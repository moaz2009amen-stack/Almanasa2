import mongoose from 'mongoose';

const examAttemptSchema = new mongoose.Schema(
  {
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [{ questionId: mongoose.Schema.Types.ObjectId, answer: String }],
    score: { type: Number, default: 0 },
    passed: { type: Boolean, default: false },
    submittedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const ExamAttempt = mongoose.model('ExamAttempt', examAttemptSchema);
