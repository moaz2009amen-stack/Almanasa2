import { asyncHandler } from '../utils/http.js';
import { login, registerStudent } from '../services/authService.js';

export const register = asyncHandler(async (req, res) => {
  const data = await registerStudent(req.body);
  res.status(201).json(data);
});

export const loginController = asyncHandler(async (req, res) => {
  const data = await login(req.body);
  res.json(data);
});
