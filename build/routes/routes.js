"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const session_controller_1 = require("../controllers/session.controller");
const validateResource_1 = require("../middleware/validateResource");
const user_schema_1 = require("../schema/user.schema");
const session_schema_1 = require("../schema/session.schema");
const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('eo').status(200);
    });
    app.post('/api/users', (0, validateResource_1.validateResources)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    app.post('/api/sessions', (0, validateResource_1.validateResources)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
};
exports.routes = routes;
