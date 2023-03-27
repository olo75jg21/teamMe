import { Express } from 'express';

import {
  handleGetAllUsers,
  handleGetOneUser
} from '../controllers/user.controller';
import { authenticateJwt } from '../middlewares/authenticateJwt';

export const userRoutes = (app: Express) => {
  app.get('/users/getAllUsers', authenticateJwt, handleGetAllUsers);
  app.get('/users/getOneUser/:id', handleGetOneUser);
};