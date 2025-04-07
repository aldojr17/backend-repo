"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebaseConfig_1 = require("../config/firebaseConfig");
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
(0, firebaseConfig_1.initializeFirebaseApp)();
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", userRoutes_1.default);
// app.put("/update-user-data/:uuid", updateUserData);
// app.get("/fetch-user-data", fetchAllUser);
// app.post("/users", insertUserData);
// app.get("/users/:uuid", fetchUserByUUID);
app.listen(PORT, function (err) {
    if (err)
        console.log(err);
    console.log("listen to port : ", PORT);
});
module.exports = app;
