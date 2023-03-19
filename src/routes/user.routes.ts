import { Express } from 'express';

import {
  handleGetAllUsers,
  handleGetOneUser
} from '../controllers/user.controller';

export const userRoutes = (app: Express) => {
  app.get('/users/getAllUsers', handleGetAllUsers);
  app.get('/users/getOneUser/:id', handleGetOneUser);
};