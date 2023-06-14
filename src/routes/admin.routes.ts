import { Express } from "express";

import { authenticateJwt } from "../middlewares/authenticateJwt";
import { checkUserRole } from "../middlewares/checkUserRole";
import {
  handleGetAllUsers,
  handleDeleteUser,
  handleGetPendingTeams,
  handleGetAllTeams,
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
    "/admin/pendingTeams",
    [authenticateJwt, checkUserRole("admin")],
    handleGetPendingTeams
  );

  app.get(
    "/admin/teams",
    [authenticateJwt, checkUserRole("admin")],
    handleGetAllTeams
  );
};
