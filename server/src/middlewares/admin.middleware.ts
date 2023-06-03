import expressAsyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';

export const adminMw = expressAsyncHandler(async (req, res, next) => {
  if (!req.user.admin) throw createHttpError(403, 'You must be an admin to access this route');
  return next();
});

// module.exports = adminMw;
// export default adminMw
