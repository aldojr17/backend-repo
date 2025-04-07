"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const tokenCollection_1 = require("../repository/tokenCollection");
const authMiddleware = (req, res, next) => {
    try {
        if (req.originalUrl === "/generate-access-token") {
            console.log(req.url);
            next();
        }
        console.log("access token checking");
        let accessToken = req.headers["access-token"] || "";
        if (accessToken == "" || accessToken == undefined) {
            throw new Error("access-token is missing from headers");
        }
        let currentAccessToken = (0, tokenCollection_1.getAccessToken)().then((val) => val);
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
};
exports.authMiddleware = authMiddleware;
