import { validationResult } from 'express-validator';

/**
 * Validate all data from the request
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Response}
 */
const validator = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ param, msg }) => {
    if (msg.message) return `${param}: ${msg.message}`;
    return `${param}: Invalid or missing value`;
  });
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    const newErrors = [];
    errorsArray.forEach((error) => {
      if (!newErrors.includes(error)) newErrors.push(error);
    });
    return res.status(400).json({ errors: newErrors });
  }
  return next();
};

export default validator;
