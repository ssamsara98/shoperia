import jwt from 'jsonwebtoken';

export const signPayload = (payload: any) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: process.env.NODE_ENV !== 'production' ? '1h' : process.env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (err) {
    throw err;
  }
};

export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    return payload;
  } catch (err) {
    throw err;
  }
};
