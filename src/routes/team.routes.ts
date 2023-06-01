import { Express } from "express";
import {
  handleAddTeam,
  handleApplyOnTeam,
  handleGetAllUserTeams,
  handleGetAllTeams,
  handleGetTeam,
  handleGetAllUserApplications,
  handleUpdateTeam,
  handleDeleteTeam,
} from "../controllers/team.controller";
import { authenticateJwt } from "../middlewares/authenticateJwt";
import { schemaValidation } from "../middlewares/validation";
import { yupTeamCreationSchema } from "../validation/teamValidationSchema";

export const teamRoutes = (app: Express) => {
  // Get all teams
  app.get("/team", handleGetAllTeams);

  // Get all given user teams, pass id of user as a Param
  app.get("/team/user", authenticateJwt, handleGetAllUserTeams);

  // Get all of application for given user id
  app.get("/team/applications", authenticateJwt, handleGetAllUserApplications);

  // Create new team
  app.post(
    "/team/",
    [authenticateJwt, schemaValidation(yupTeamCreationSchema)],
    handleAddTeam
  );

  // Apply to team with given team id
  app.post("/team/apply", authenticateJwt, handleApplyOnTeam);

  // Get single team
  app.get("/team/:id", handleGetTeam);

  // Delete team with given id
  app.delete("/team/:id", authenticateJwt, handleDeleteTeam);

  // Update team
  app.put("/team/:id", authenticateJwt, handleUpdateTeam);
};
