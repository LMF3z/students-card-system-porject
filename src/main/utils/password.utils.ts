import bcrypt from 'bcryptjs';

export const createPasswordHash = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePasswordHash = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
