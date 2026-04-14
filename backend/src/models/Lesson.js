import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    title: { type: String, required: true },
    order: { type: Number, required: true },
    videoPublicId: { type: String, required: true },
    pdfResources: [{ title: String, publicId: String, url: String }],
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }
  },
  { timestamps: true }
);

lessonSchema.index({ courseId: 1, order: 1 }, { unique: true });

export const Lesson = mongoose.model('Lesson', lessonSchema);
