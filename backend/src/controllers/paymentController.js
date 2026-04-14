import { Enrollment } from '../models/Enrollment.js';
import { PaymentTransaction } from '../models/PaymentTransaction.js';
import { asyncHandler, ApiError } from '../utils/http.js';
import { verifyPaymobHmac } from '../services/paymentService.js';

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const txn = await PaymentTransaction.create({
    studentId: req.user._id,
    courseId: req.body.courseId,
    amountCents: req.body.amountCents,
    status: 'pending'
  });

  res.json({
    transactionId: txn._id,
    message: 'Create Paymob order/token on server side with your merchant keys.'
  });
});

export const paymobWebhook = asyncHandler(async (req, res) => {
  const receivedHmac = req.query.hmac;
  const valid = verifyPaymobHmac(req.body, receivedHmac);
  if (!valid) throw new ApiError(401, 'Invalid Paymob webhook signature');

  const { txnId, orderId, success, merchant_order_id } = req.body;
  const txn = await PaymentTransaction.findByIdAndUpdate(
    merchant_order_id,
    { paymobTxnId: txnId, paymobOrderId: orderId, status: success ? 'paid' : 'failed', rawPayload: req.body },
    { new: true }
  );

  if (success && txn) {
    await Enrollment.findOneAndUpdate(
      { studentId: txn.studentId, courseId: txn.courseId },
      { status: 'active', paymentRef: txnId },
      { upsert: true }
    );
  }

  res.json({ ok: true });
});
