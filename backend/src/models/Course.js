import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    thumbnailUrl: String,
    isPublished: { type: Boolean, default: false },
    lessonOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    settings: {
      forceLessonOrder: { type: Boolean, default: true },
      completionThreshold: { type: Number, default: 100, min: 50, max: 100 },
      watermarkEnabled: { type: Boolean, default: true },
      videoDownloadEnabled: { type: Boolean, default: false }
    },
    priceCents: { type: Number, required: true }
  },
  { timestamps: true }
);

export const Course = mongoose.model('Course', courseSchema);
