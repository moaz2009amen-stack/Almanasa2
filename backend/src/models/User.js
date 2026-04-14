import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    isSuspended: { type: Boolean, default: false },
    forumBannedCourseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    achievements: [
      {
        key: String,
        unlocked: { type: Boolean, default: false },
        progress: { type: Number, default: 0 },
        target: { type: Number, default: 1 }
      }
    ]
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
