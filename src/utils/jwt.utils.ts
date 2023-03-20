import jwt from 'jsonwebtoken';

import { SERVER_TOKEN_SECRET, SERVER_TOKEN_EXPIRETIME, SERVER_TOKEN_REFRESH, SERVER_TOKEN_REFRESH_EXPIRETIME } from '../config/config';
import { IUser } from '../models/user.model';

export const generateAccessToken = (user: IUser): string => {
  return jwt.sign({ email: user.email }, SERVER_TOKEN_SECRET, { expiresIn: SERVER_TOKEN_EXPIRETIME, algorithm: 'HS256' });
};

export const generateRefreshToken = (user: IUser): string => {
  return jwt.sign({ email: user.email, description: user.description }, SERVER_TOKEN_REFRESH, { expiresIn: SERVER_TOKEN_REFRESH_EXPIRETIME, algorithm: 'HS256' });
};
