import { Express } from 'express';
import {
  handleAddTeam,
  handleApplyOnTeam,
  handleGetAllUserTeams,
  handleGetAllTeams,
  handleGetTeam,
  handleGetAllUserApplications,
  handleUpdateTeam,
} from '../controllers/team.controller';
import { authenticateJwt } from '../middlewares/authenticateJwt';
import { schemaValidation } from '../middlewares/validation';
import { yupTeamCreationSchema } from '../validation/teamValidationSchema';

export const teamRoutes = (app: Express) => {
  // Get all offers
  app.get('/offers', handleGetAllTeams);

  // Get all given user offers, pass id of user as a Param
  app.get('/offers/user', authenticateJwt, handleGetAllUserTeams);

  // Get all of application for given user id
  app.get('/offers/applications', handleGetAllUserApplications);

  // Create new offer
  app.post('/offers/new', [authenticateJwt, schemaValidation(yupTeamCreationSchema)], handleAddTeam);

  // Apply for offer with given offer id
  app.post('/offers/apply', authenticateJwt, handleApplyOnTeam);

  // Get single offer
  app.get('/offers/:id', handleGetTeam);

  // Update offer
  app.put('/offers/:id', authenticateJwt, handleUpdateTeam);
};