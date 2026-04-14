import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    watchPercent: { type: Number, default: 0 },
    watchSeconds: { type: Number, default: 0 },
    notes: { type: String, default: '' },
    assignmentPassed: { type: Boolean, default: false },
    examPassed: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    completedAt: Date
  },
  { timestamps: true }
);

progressSchema.index({ studentId: 1, lessonId: 1 }, { unique: true });

export const Progress = mongoose.model('Progress', progressSchema);
