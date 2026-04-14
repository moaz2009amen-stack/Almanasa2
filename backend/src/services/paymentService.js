import crypto from 'crypto';
import { env } from '../config/env.js';

export function verifyPaymobHmac(payload, receivedHmac) {
  if (!env.paymob.hmacSecret || !receivedHmac) return false;
  const serialized = JSON.stringify(payload);
  const computed = crypto
    .createHmac('sha512', env.paymob.hmacSecret)
    .update(serialized)
    .digest('hex');
  return computed === receivedHmac;
}
