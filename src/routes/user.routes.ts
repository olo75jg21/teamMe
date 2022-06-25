import { Express, Request, Response } from 'express';

import { handleUserRegister, handleUserLogin } from '../controllers/user.controller';

export const userRoutes = (app: Express) => {
  app.get('/users', (req: Request, res: Response) => {
    res.send('eo');
  })

  app.post('/users/register', handleUserRegister);
  app.post('/users/login', handleUserLogin);
};