import { body } from 'express-validator';

/**
 * Rules for authLogin validator
 * @returns {import('express-validator').Result}
 */
const authValidator = () => [
  body('userInfo').notEmpty(),
  body('userInfo.name').notEmpty().isString(),
  body('userInfo.email').notEmpty().isEmail(),
];

export default authValidator;
