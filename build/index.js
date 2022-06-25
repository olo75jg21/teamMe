"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectDb_1 = require("./utils/connectDb");
const user_routes_1 = require("./routes/user.routes");
const app = (0, express_1.default)();
const port = 5000;
(0, connectDb_1.connect)();
app.use(express_1.default.json());
(0, user_routes_1.userRoutes)(app);
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
