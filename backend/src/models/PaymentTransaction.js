import mongoose from 'mongoose';

const paymentTransactionSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    paymobOrderId: String,
    paymobTxnId: String,
    amountCents: Number,
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    rawPayload: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export const PaymentTransaction = mongoose.model('PaymentTransaction', paymentTransactionSchema);
