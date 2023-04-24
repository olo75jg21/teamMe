import { Express } from 'express';

import {
  handleGetAllUsers,
  handleGetOneUser,
  handleGetUserProfileData
} from '../controllers/user.controller';
import { authenticateJwt } from '../middlewares/authenticateJwt';

// @TODO change users -> user
export const userRoutes = (app: Express) => {
  app.get('/users/getAllUsers', authenticateJwt, handleGetAllUsers);
  app.get('/users/getOneUser/:id', handleGetOneUser);
  app.get('/user/getProfileData', authenticateJwt, handleGetUserProfileData);
};