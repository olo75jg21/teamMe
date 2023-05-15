import { Express } from 'express';

import {
  handleGetOneUser,
  handleGetUserProfileData,
  handleUpdateUserProfile
} from '../controllers/user.controller';
import { authenticateJwt } from '../middlewares/authenticateJwt';

export const userRoutes = (app: Express) => {
  app.get('/users/profile/:id', authenticateJwt, handleGetUserProfileData);
  app.get('/users/:id', authenticateJwt, handleGetOneUser);
  app.put('/users/:id', authenticateJwt, handleUpdateUserProfile);
};