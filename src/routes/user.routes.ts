import { Express, Request, Response } from 'express';

import { handleUserRegister, handleUserLogin, handleGetAllUsers, handleGetOneUser } from '../controllers/user.controller';
import { authenticateJwt } from '../middlewares/authenticateJwt';

export const userRoutes = (app: Express) => {
  app.post('/users/register', handleUserRegister);
  app.post('/users/login', handleUserLogin);
  app.get('/users/getAllUsers', authenticateJwt, handleGetAllUsers);
  app.get('/users/getOneUser/:id', authenticateJwt, handleGetOneUser);
};