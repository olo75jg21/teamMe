import { Express } from "express";

import { authenticateJwt } from "../middlewares/authenticateJwt";
import { checkUserRole } from "../middlewares/checkUserRole";
import {
  handleGetAllUsers,
  handleDeleteUser,
  handleGetPendingTeams,
  handleGetAllTeams,
  handleDeleteTeam,
  handlePatchTeam,
  handleAcceptTeam,
  handleRejectTeam,
} from "../controllers/admin.controller";

export const adminRoutes = (app: Express) => {
  app.get(
    "/admin/users",
    [authenticateJwt, checkUserRole("admin")],
    handleGetAllUsers
  );

  app.delete(
    "/admin/users/:id",
    [authenticateJwt, checkUserRole("admin")],
    handleDeleteUser
  );

  app.get(
    "/admin/teams",
    [authenticateJwt, checkUserRole("admin")],
    handleGetAllTeams
  );

  app.delete(
    "/admin/teams/:id",
    [authenticateJwt, checkUserRole("admin")],
    handleDeleteTeam
  );

  app.patch(
    "/admin/teams/:id",
    [authenticateJwt, checkUserRole("admin")],
    handlePatchTeam
  );

  app.get(
    "/admin/pendingTeams",
    [authenticateJwt, checkUserRole("admin")],
    handleGetPendingTeams
  );

  app.patch(
    "/admin/pendingTeams/:id/accept",
    [authenticateJwt, checkUserRole("admin")],
    handleAcceptTeam
  );

  app.patch(
    "/admin/pendingTeams/:id/reject",
    [authenticateJwt, checkUserRole("admin")],
    handleRejectTeam
  );
};
