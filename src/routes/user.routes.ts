import { Express } from 'express';

import {
  handleGetAllUsers,
  handleGetOneUser,
  handleGetUserProfileData
} from '../controllers/user.controller';
import { authenticateJwt } from '../middlewares/authenticateJwt';

export const userRoutes = (app: Express) => {
  // @TODO fix naming
  app.get('/users/getAllUsers', authenticateJwt, handleGetAllUsers);
  app.get('/users/getOneUser/:id', handleGetOneUser);
  app.get('/user/getProfileData', authenticateJwt, handleGetUserProfileData);
};