"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectDb_1 = require("./utils/connectDb");
const user_routes_1 = require("./routes/user.routes");
const offert_routes_1 = require("./routes/offert.routes");
const config_1 = require("./config/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
(0, connectDb_1.connect)();
app.use(express_1.default.json());
(0, user_routes_1.userRoutes)(app);
(0, offert_routes_1.offertRoutes)(app);
app.listen(config_1.SERVER_PORT, () => {
    console.log('Server is running on port ' + config_1.SERVER_PORT);
});
