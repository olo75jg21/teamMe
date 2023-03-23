import jwt from 'jsonwebtoken';

import { SERVER_TOKEN_SECRET, SERVER_TOKEN_EXPIRETIME, SERVER_TOKEN_REFRESH, SERVER_TOKEN_REFRESH_EXPIRETIME } from '../config/config';

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, SERVER_TOKEN_SECRET, { expiresIn: SERVER_TOKEN_EXPIRETIME, algorithm: 'HS256' });
};

export const generateRefreshToken = (userId: String): string => {
  return jwt.sign({ userId }, SERVER_TOKEN_REFRESH, { expiresIn: SERVER_TOKEN_REFRESH_EXPIRETIME, algorithm: 'HS256' });
};
