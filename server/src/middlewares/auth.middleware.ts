import expressAsyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
import passport from 'passport';

export const authMw = expressAsyncHandler(async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(createHttpError(401));
    }
    req.user = user;
    return next();
  })(req, res, next);
});

// module.exports = authMw;
// export default authMw;
