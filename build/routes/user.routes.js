"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const authenticateJwt_1 = require("../middlewares/authenticateJwt");
const userRoutes = (app) => {
    app.post('/users/register', user_controller_1.handleUserRegister);
    app.post('/users/login', user_controller_1.handleUserLogin);
    app.get('/users/getAllUsers', authenticateJwt_1.authenticateJwt, user_controller_1.handleGetAllUsers);
    app.get('/users/getOneUser/:id', authenticateJwt_1.authenticateJwt, user_controller_1.handleGetOneUser);
};
exports.userRoutes = userRoutes;
