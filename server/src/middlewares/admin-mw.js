const expressAsyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');

const adminMw = expressAsyncHandler(async (req, res, next) => {
  if (!req.user.admin) throw createHttpError(403, 'You must be an admin to access this route');
  return next();
});

module.exports = adminMw;
