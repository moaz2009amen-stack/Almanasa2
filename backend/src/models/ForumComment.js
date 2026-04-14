import mongoose from 'mongoose';

const forumCommentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumPost', required: true, index: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumComment', default: null },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const ForumComment = mongoose.model('ForumComment', forumCommentSchema);
