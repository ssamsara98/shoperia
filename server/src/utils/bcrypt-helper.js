const bcrypt = require('bcrypt');

module.exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
};

module.exports.comparePassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (err) {
    throw err;
  }
};
