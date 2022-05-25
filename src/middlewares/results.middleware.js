import AppError from '../view-models/appError.vm.js';

export default function resultHandler(req, res, next) {
  if (res.result) {
    res.json(res.result);
    res.end();
    return;
  }

  next(new AppError({ message: 'no result', code: 500 }));
}
