import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/user';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: (req) => {
        let token = null;
        if (req && req.signedCookies && req.signedCookies['_SID_']) {
          token = req.signedCookies['_SID_'];
        }
        return token;
      },
      secretOrKey: process.env.JWT_SECRET,
      issuer: 'shoperia',
      audience: 'shoperia-user',
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub)
          // .populate({ path: 'Shop', select: '-__v' })
          .exec();
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);
