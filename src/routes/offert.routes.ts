import { Express } from 'express';
import { handleAddOffert } from '../controllers/offert.controller';

export const offerRoutes = (app: Express) => {
  app.post('/offert/addNewOffert', handleAddOffert);
};