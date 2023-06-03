import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
};

export const comparePassword = async (password: string, hash: string) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (err) {
    throw err;
  }
};
