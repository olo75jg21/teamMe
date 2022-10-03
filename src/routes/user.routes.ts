import { Express } from 'express';

import { handleUserRegister, handleUserLogin, handleGetAllUsers, handleGetOneUser } from '../controllers/user.controller';

import { authenticateJwt } from '../middlewares/authenticateJwt';
import { userValidation } from '../middlewares/validation';

import { yupUserRegistrationSchema } from '../validation/userValidationSchema';

export const userRoutes = (app: Express) => {
  app.post('/users/register', userValidation(yupUserRegistrationSchema), handleUserRegister);
  app.post('/users/login', handleUserLogin);
  app.get('/users/getAllUsers', authenticateJwt, handleGetAllUsers);
  app.get('/users/getOneUser/:id', authenticateJwt, handleGetOneUser);
};