"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../controller/api");
const router = express_1.default.Router();
router.put("/update-user-data/:uuid", api_1.updateUserData);
router.get("/fetch-user-data", api_1.fetchAllUser);
router.post("/users", api_1.insertUserData);
router.get("/users/:uuid", api_1.fetchUserByUUID);
exports.default = router;
