"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const authenticateJwt_1 = require("../middlewares/authenticateJwt");
const userRoutes = (app) => {
    app.get('/users/:id', authenticateJwt_1.authenticateJwt, user_controller_1.handleGetOneUser);
    app.get('/users/profile/:id', authenticateJwt_1.authenticateJwt, user_controller_1.handleGetUserProfileData);
};
exports.userRoutes = userRoutes;
