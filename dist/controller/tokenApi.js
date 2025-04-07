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
exports.generateToken = void 0;
const tokenCollection_1 = require("../repository/tokenCollection");
const generateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let accessToken = yield (0, tokenCollection_1.generateNewAccessToken)();
        res.status(200).json({
            data: {
                accessToken: accessToken,
            },
            success: true,
            message: `New access token generated`,
        });
    }
    catch (error) {
        res.status(400).json({
            data: null,
            success: false,
            message: error,
        });
    }
});
exports.generateToken = generateToken;
