import Joi from 'joi';

export const registerSchema = Joi.object({
  phone: Joi.string().min(8).max(20).required(),
  fullName: Joi.string().min(2).max(100).required(),
  password: Joi.string().min(8).max(128).required()
});

export const loginSchema = Joi.object({
  phone: Joi.string().required(),
  password: Joi.string().required()
});
