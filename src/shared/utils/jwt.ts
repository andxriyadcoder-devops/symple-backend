import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { env } from '@/config/env';

export const generateAccessToken = (
  payload: object,
) => {
  const secret: Secret = env.JWT_SECRET;

  const options: SignOptions = {
    expiresIn: '7d',
  };

  return jwt.sign(payload, secret, options);
};

export const verifyAccessToken = (
  token: string,
) => {
  return jwt.verify(token, env.JWT_SECRET);
};