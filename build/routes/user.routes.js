"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const userRoutes = (app) => {
    app.get('/users', (req, res) => {
        res.send('eo');
    });
    app.post('/users/register', user_controller_1.handleUserRegister);
    app.post('/users/login', user_controller_1.handleUserLogin);
};
exports.userRoutes = userRoutes;
