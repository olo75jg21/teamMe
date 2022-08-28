import jwt from 'jsonwebtoken';

import { SERVER_TOKEN_SECRET, SERVER_TOKEN_EXPIRETIME } from '../config/config';
import { IUser } from '../models/user.model';

export const signJwt = (user: IUser): string => {
  return jwt.sign({ email: user.email }, SERVER_TOKEN_SECRET, { expiresIn: SERVER_TOKEN_EXPIRETIME, algorithm: 'HS256' });
};

// user.toJSON()