import { Express } from 'express'

import {
  handleUserRegister,
  handleUserLogin,
  handleTokenRefresh
} from '../controllers/auth.controller';

import { userValidation } from '../middlewares/validation';

import {
  yupUserRegistrationSchema,
  yupUserLoginSchema
} from '../validation/userValidationSchema';

export const authRoutes = (app: Express) => {
  app.post('/auth/register', userValidation(yupUserRegistrationSchema), handleUserRegister)
  app.post('/auth/login', userValidation(yupUserLoginSchema), handleUserLogin)
  app.post('/auth/refresh', handleTokenRefresh)
}