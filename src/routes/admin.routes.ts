import { Express } from "express";

import { handleUpdateUserProfile } from "../controllers/user.controller";
import { authenticateJwt } from "../middlewares/authenticateJwt";
import { checkUserRole } from "../middlewares/checkUserRole";
import { handleGetAllUsers } from "../controllers/admin.controller";

export const adminRoutes = (app: Express) => {
  app.put("/admin/:id", authenticateJwt, handleUpdateUserProfile);
  app.get(
    "/admin/users",
    [authenticateJwt, checkUserRole("admin")],
    handleGetAllUsers
  );
};
