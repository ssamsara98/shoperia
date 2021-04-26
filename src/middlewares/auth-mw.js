const passport = require('passport');

const authMw = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = authMw;
