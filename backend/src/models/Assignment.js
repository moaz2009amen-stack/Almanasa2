import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true, unique: true },
    imagePublicId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    options: [{ key: String, text: String }],
    correctOptionKey: { type: String, required: true },
    passScore: { type: Number, default: 100 }
  },
  { timestamps: true }
);

export const Assignment = mongoose.model('Assignment', assignmentSchema);
