import { Express } from 'express';
import { 
  handleAddOffert,
  handleGetAllOfferts
} from '../controllers/offert.controller';

export const offertRoutes = (app: Express) => {
  app.post('/offert/addNewOffert', handleAddOffert);
  app.get('/offert/getAll', handleGetAllOfferts);
};