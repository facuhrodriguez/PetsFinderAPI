import { body } from 'express-validator';

const authValidator = () => [
  body('userInfo').notEmpty(),
  body('userInfo.name').notEmpty().isString(),
  body('userInfo.email').notEmpty().isEmail(),
];

export default authValidator;
