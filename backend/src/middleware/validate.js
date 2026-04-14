import { ApiError } from '../utils/http.js';

export function validate(schema) {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) return next(new ApiError(400, error.details.map((d) => d.message).join(', ')));
    req.body = value;
    next();
  };
}
