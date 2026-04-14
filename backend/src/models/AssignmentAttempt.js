import mongoose from 'mongoose';

const assignmentAttemptSchema = new mongoose.Schema(
  {
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    selectedOptionKey: { type: String, required: true },
    score: { type: Number, required: true },
    passed: { type: Boolean, required: true }
  },
  { timestamps: true }
);

export const AssignmentAttempt = mongoose.model('AssignmentAttempt', assignmentAttemptSchema);
