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
exports.updateUserData = exports.insertUserData = exports.fetchUserByUUID = exports.fetchAllUser = void 0;
const uuid_1 = require("uuid");
const firebaseConfig_1 = require("../config/firebaseConfig");
const updateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uuid = req.params.uuid || "";
        const user = {
            firstName: req.body["firstName"],
            lastName: req.body["lastName"],
            uuid: uuid,
        };
        console.log(user);
        const newDoc = yield (0, firebaseConfig_1.updateUser)(uuid, user);
        console.log(newDoc);
        res.status(200).send(`User updated a new user`);
    }
    catch (error) {
        res.status(400).send(`User should contain firstName, lastName:`);
    }
});
exports.updateUserData = updateUserData;
const insertUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uuid = (0, uuid_1.v4)();
        const user = {
            firstName: req.body["firstName"],
            lastName: req.body["lastName"],
            uuid: uuid,
        };
        console.log(user);
        const newDoc = yield (0, firebaseConfig_1.uploadProcessedData)(user);
        console.log(newDoc);
        res.status(201).send(`Created a new user`);
    }
    catch (error) {
        res.status(400).send(`User should contain firstName, lastName:`);
    }
});
exports.insertUserData = insertUserData;
const fetchAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDoc = yield (0, firebaseConfig_1.getAllUser)();
        console.log(newDoc);
        res.status(201).send(`user get`);
    }
    catch (error) {
        res.status(400).send(`error`);
    }
});
exports.fetchAllUser = fetchAllUser;
const fetchUserByUUID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uuid = req.params.uuid || "";
        const newDoc = yield (0, firebaseConfig_1.getUser)(uuid);
        console.log(newDoc);
        res.status(201).send(`user get`);
    }
    catch (error) {
        res.status(400).send(`error`);
    }
});
exports.fetchUserByUUID = fetchUserByUUID;
