const createHttpError = require('http-errors');
const passport = require('passport');

const authMw = (req, res, next) => {
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
};

module.exports = authMw;
