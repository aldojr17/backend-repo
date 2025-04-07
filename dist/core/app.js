"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebaseConfig_1 = require("../config/firebaseConfig");
const api_1 = require("../controller/api");
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, firebaseConfig_1.initializeFirebaseApp)();
app.put("/update-user-data/:uuid", api_1.updateUserData);
app.post("/users", api_1.insertUserData);
app.get("/users", api_1.fetchAllUser);
app.get("/users/:uuid", api_1.fetchUserByUUID);
app.listen(PORT, function (err) {
    if (err)
        console.log(err);
    console.log("listen to port : ", PORT);
});
module.exports = app;
