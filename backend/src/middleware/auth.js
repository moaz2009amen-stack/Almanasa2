import { User } from '../models/User.js';
import { ApiError } from '../utils/http.js';
import { verifyJwt } from '../utils/jwt.js';

export async function requireAuth(req, _res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new ApiError(401, 'Missing token');
    const decoded = verifyJwt(token);
    const user = await User.findById(decoded.sub);
    if (!user || user.isSuspended) throw new ApiError(401, 'Invalid token');
    req.user = user;
    next();
  } catch {
    next(new ApiError(401, 'Unauthorized'));
  }
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return next(new ApiError(403, 'Forbidden'));
    next();
  };
}
