"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebaseConfig_1 = require("../config/firebaseConfig");
const authMiddleware_1 = require("../middleware/authMiddleware");
const tokenRoutes_1 = __importDefault(require("../routes/tokenRoutes"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
(0, firebaseConfig_1.initializeFirebaseApp)();
const PORT = 3000;
const app = (0, express_1.default)();
app.use(authMiddleware_1.authMiddleware);
app.use(express_1.default.json());
app.use("/", userRoutes_1.default);
app.use("/", tokenRoutes_1.default);
app.listen(PORT, function (err) {
    if (err)
        console.log(err);
    console.log("listen to port : ", PORT);
});
module.exports = app;
