import expressAsyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';

export const validationMw = expressAsyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // res.status(422).json(errors.array());
    // return;
    next(createHttpError(422, { errors: errors.array() }));
  }
  next();
});
