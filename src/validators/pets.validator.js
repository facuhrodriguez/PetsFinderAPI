/* eslint-disable no-unused-expressions */
import { query, body } from 'express-validator';

/**
 * Rules for authLogin validator
 * @returns {import('express-validator').Result}
 */
const petsLostFindAllValidator = () => [
  query('type').optional().isString().custom((type) => {
    if (!type) return 'all';
    return type.toLowerCase();
  }),
];

const publishPetLostValidator = () => [
  body('files').optional(),
  body('name').notEmpty().isString().custom((name) => name.toLowerCase()),
  body('age').optional().isNumeric(),
  body('type').optional().isString().custom((type) => {
    if (!type || (type.toLowerCase() !== 'perro' && type.toLowerCase() !== 'gato')) { return 'otro'; }
    return type.toLowerCase();
  }),
  body('description').notEmpty().isString(),
  body('castrated').notEmpty().isBoolean((castrated) => {
    if (castrated === undefined) return false;
    return castrated;
  }),
  body('extras').notEmpty().isString(),
  body('lastView').notEmpty(),
];

export { petsLostFindAllValidator, publishPetLostValidator };
