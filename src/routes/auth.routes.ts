import { Express } from 'express'

import {
  handleUserRegister,
  handleUserLogin,
  handleTokenRefresh,
  handleLogout
} from '../controllers/auth.controller';

import { schemaValidation } from '../middlewares/validation';

import {
  yupUserRegistrationSchema,
  yupUserLoginSchema
} from '../validation/userValidationSchema';

export const authRoutes = (app: Express) => {
  app.post('/auth/register', schemaValidation(yupUserRegistrationSchema), handleUserRegister);
  app.post('/auth/login', schemaValidation(yupUserLoginSchema), handleUserLogin);
  app.post('/auth/refresh', handleTokenRefresh);
  app.post('/auth/logout', handleLogout);
}