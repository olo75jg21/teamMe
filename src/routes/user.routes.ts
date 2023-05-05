import { Express } from 'express';

import {
  handleGetOneUser,
  handleGetUserProfileData
} from '../controllers/user.controller';
import { authenticateJwt } from '../middlewares/authenticateJwt';

export const userRoutes = (app: Express) => {
  app.get('/users/:id', authenticateJwt, handleGetOneUser);
  app.get('/users/profile/:id', authenticateJwt, handleGetUserProfileData);
};