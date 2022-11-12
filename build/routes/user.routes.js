"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const validation_1 = require("../middlewares/validation");
const userValidationSchema_1 = require("../validation/userValidationSchema");
const userRoutes = (app) => {
    app.post('/users/register', (0, validation_1.userValidation)(userValidationSchema_1.yupUserRegistrationSchema), user_controller_1.handleUserRegister);
    app.post('/users/login', (0, validation_1.userValidation)(userValidationSchema_1.yupUserLoginSchema), user_controller_1.handleUserLogin);
    app.get('/users/getAllUsers', user_controller_1.handleGetAllUsers);
    app.get('/users/getOneUser/:id', user_controller_1.handleGetOneUser);
};
exports.userRoutes = userRoutes;
