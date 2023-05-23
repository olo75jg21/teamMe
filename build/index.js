"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectDb_1 = require("./utils/connectDb");
const user_routes_1 = require("./routes/user.routes");
const team_routes_1 = require("./routes/team.routes");
const auth_routes_1 = require("./routes/auth.routes");
const socketIO = __importStar(require("socket.io"));
const chat_controller_1 = __importDefault(require("./controllers/chat.controller"));
const config_1 = require("./config/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
(0, connectDb_1.connect)();
app.use(express_1.default.json());
(0, auth_routes_1.authRoutes)(app);
(0, user_routes_1.userRoutes)(app);
(0, team_routes_1.teamRoutes)(app);
const server = app.listen(config_1.SERVER_PORT, () => {
    console.log('Server is running on port ' + config_1.SERVER_PORT);
});
const io = new socketIO.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
// Initialize chat functionality
(0, chat_controller_1.default)(io);
