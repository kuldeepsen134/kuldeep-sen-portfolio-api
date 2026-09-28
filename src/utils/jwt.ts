import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { JwtAdminPayload } from '../types';

export const signAccessToken = (payload: JwtAdminPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions['expiresIn']
  };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
};

export const signRefreshToken = (payload: JwtAdminPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn']
  };
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
};

export const verifyAccessToken = (token: string): JwtAdminPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtAdminPayload;
};

export const verifyRefreshToken = (token: string): JwtAdminPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtAdminPayload;
};
