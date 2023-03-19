import { Express } from 'express';

import {
  handleUserRegister,
  handleUserLogin,
  handleGetAllUsers,
  handleGetOneUser
} from '../controllers/user.controller';

import { authenticateJwt } from '../middlewares/authenticateJwt';
import { userValidation } from '../middlewares/validation';

import {
  yupUserRegistrationSchema,
  yupUserLoginSchema
} from '../validation/userValidationSchema';

export const userRoutes = (app: Express) => {
  // app.post('/users/register', userValidation(yupUserRegistrationSchema), handleUserRegister);
  // app.post('/users/login', userValidation(yupUserLoginSchema), handleUserLogin);
  app.get('/users/getAllUsers', handleGetAllUsers);
  app.get('/users/getOneUser/:id', handleGetOneUser);
};