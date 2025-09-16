import jwt from 'jsonwebtoken';

export const signToken = (data: any) => {
  const token = jwt.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
  return token;
};

export const validateToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
};
