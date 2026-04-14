import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  type: { type: String, enum: ['mcq', 'essay'], default: 'mcq' },
  options: [{ key: String, text: String }],
  correctOptionKey: String,
  points: { type: Number, default: 1 }
});

const examSchema = new mongoose.Schema(
  {
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true, unique: true },
    durationMinutes: { type: Number, required: true },
    passScore: { type: Number, default: 70 },
    questions: [questionSchema]
  },
  { timestamps: true }
);

export const Exam = mongoose.model('Exam', examSchema);
