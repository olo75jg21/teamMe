import { Express } from "express";

import {
  handleGetOneUser,
  handleGetUserProfileData,
  handleUpdateUserProfile,
} from "../controllers/user.controller";
import { authenticateJwt } from "../middlewares/authenticateJwt";

export const adminRoutes = (app: Express) => {
  app.put("/admin/:id", authenticateJwt, handleUpdateUserProfile);
};
