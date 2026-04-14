import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { ApiError } from '../utils/http.js';
import { signJwt } from '../utils/jwt.js';

export async function registerStudent({ phone, password, fullName }) {
  const exists = await User.findOne({ phone });
  if (exists) throw new ApiError(409, 'Phone already registered');
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ phone, passwordHash, fullName, role: 'student' });
  return { user, token: signJwt({ sub: user._id, role: user.role }) };
}

export async function login({ phone, password }) {
  const user = await User.findOne({ phone });
  if (!user) throw new ApiError(401, 'Invalid credentials');
  if (user.isSuspended) throw new ApiError(403, 'Account suspended');
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new ApiError(401, 'Invalid credentials');
  return { user, token: signJwt({ sub: user._id, role: user.role }) };
}
