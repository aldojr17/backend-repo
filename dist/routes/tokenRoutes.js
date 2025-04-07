"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenApi_1 = require("../controller/tokenApi");
const router = express_1.default.Router();
router.get("/generate-access-token", tokenApi_1.generateToken);
exports.default = router;
