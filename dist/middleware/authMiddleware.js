"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const tokenCollection_1 = require("../repository/tokenCollection");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("access token checking");
        let accessToken = req.headers["access-token"] || "";
        if (accessToken == "" || accessToken == undefined) {
            throw new Error("access-token is missing from headers");
        }
        let currentAccessToken = yield (0, tokenCollection_1.getAccessToken)();
        console.log(currentAccessToken);
        if (accessToken != currentAccessToken) {
            throw new Error("Invalid access token, please generate again");
        }
        next();
    }
    catch (error) {
        res.status(401).json({
            data: null,
            success: false,
            message: error.message,
        });
    }
});
exports.authMiddleware = authMiddleware;
