"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const userRoutes = (app) => {
    app.get('/users/getAllUsers', user_controller_1.handleGetAllUsers);
    app.get('/users/getOneUser/:id', user_controller_1.handleGetOneUser);
};
exports.userRoutes = userRoutes;
