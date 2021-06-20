const jwt = require('jsonwebtoken');

module.exports.signPayload = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.NODE_ENV !== 'production' ? '1h' : process.env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (err) {
    throw err;
  }
};

module.exports.verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (err) {
    throw err;
  }
};
