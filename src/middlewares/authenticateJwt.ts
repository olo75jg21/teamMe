import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SERVER_TOKEN_SECRET } from '../config/config';

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SERVER_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(404).json({
        message: error,
      });
    } else {
      res.locals.jwt = user;
      next();
    }
  });
};