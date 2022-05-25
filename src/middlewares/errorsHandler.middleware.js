import { logger } from '../config/config.js';
import AppError from '../view-models/appError.vm.js';

/**
 * @param {Error | AppError} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
export default function errorHandler(err, req, res) {
  logger.error('=========== Request Error ===========', {
    err,
    path: req.path,
    query: req.query,
    body: req.body,
    method: req.method,
  });

  if (err instanceof AppError) {
    res.json({ message: err.message });
    return;
  }

  if (err instanceof Error) {
    res.json({ message: err.message });
    return;
  }

  if (typeof err === 'string') {
    res.json({ message: err });
    return;
  }

  res.json({ message: 'unknown error' });
}
