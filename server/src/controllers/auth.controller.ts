import { Request, Response } from 'express';
import { signPayload } from '../utils/jwt.helper';
import expressAsyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
import User from '../models/user';
import { LoginReqDto, RegisterReqDto } from '../dtos/auth.dto';

const createSendToken = (user: any, statusCode: number, req: Request, res: Response) => {
  const token = signPayload({
    sub: user._id,
    email: user.email,
    iss: 'shoperia',
    aud: 'shoperia-user',
  });

  res.cookie('_SID_', token, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    signed: true,
    sameSite: 'lax',
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  const userJSON = user.toJSON();

  // Remove password from output
  delete userJSON.password;

  res.status(statusCode);
  res.json({
    data: {
      token,
      user: userJSON,
    },
    meta: {
      status: statusCode,
    },
  });
  return;
};

class AuthController {
  register = expressAsyncHandler<any, any, RegisterReqDto>(async (req, res) => {
    const { name, email, username, password } = req.body;

    // find users first
    const users = await User.find({ $or: [{ email }, { username }] });

    if (users.length !== 0) {
      const fields: Array<string> = [];
      users.map((user) => {
        if (user.email === email) {
          fields.push('Email');
        }
        if (user.username === username) {
          fields.push('Username');
        }
      });
      const message = `${fields.join(' and ')} ${fields.length > 1 ? 'have' : 'has'} been used`;
      throw createHttpError(409, message);
    }

    // create new user
    const newUser = new User({ name, email, username, password });
    await newUser.save();

    return createSendToken(newUser, 201, req, res);
  });

  login = expressAsyncHandler<any, any, LoginReqDto>(async (req, res) => {
    const { userSession, password } = req.body;

    // find user
    const user = await User.findOne({
      $or: [{ email: userSession }, { username: userSession }],
    }).select('+password');

    if (!user || !(await (user as any).correctPassword(password, user.password))) {
      throw createHttpError(401, 'Incorrect email or password');
    }

    return createSendToken(user, 200, req, res);
  });

  logout = expressAsyncHandler(async (req, res) => {
    res.clearCookie('_SID_', {
      sameSite: 'lax',
    });
    res.status(204);
    res.json({});
    return;
  });
}

// module.exports = AuthController;
// export default AuthController;
export const authController = new AuthController();
