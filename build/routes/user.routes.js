"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const authenticateJwt_1 = require("../middlewares/authenticateJwt");
// @TODO change users -> user
const userRoutes = (app) => {
    app.get('/users/getAllUsers', authenticateJwt_1.authenticateJwt, user_controller_1.handleGetAllUsers);
    app.get('/users/getOneUser/:id', user_controller_1.handleGetOneUser);
    app.get('/user/getProfileData', authenticateJwt_1.authenticateJwt, user_controller_1.handleGetUserProfileData);
};
exports.userRoutes = userRoutes;
