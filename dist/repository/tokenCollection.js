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
exports.getAccessToken = exports.generateNewAccessToken = void 0;
const firestore_1 = require("firebase/firestore");
const uuid_1 = require("uuid");
const firebaseConfig_1 = require("../config/firebaseConfig");
let collectionName = "token";
let documentName = "accessToken";
const generateNewAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    let uuid = (0, uuid_1.v4)();
    try {
        const accessTokenRef = (0, firestore_1.doc)((0, firebaseConfig_1.getFirestoreDB)(), collectionName, documentName);
        yield (0, firestore_1.updateDoc)(accessTokenRef, {
            token: uuid,
        });
        return uuid;
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
    }
});
exports.generateNewAccessToken = generateNewAccessToken;
const insertAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    let uuid = (0, uuid_1.v4)();
    try {
        const document = (0, firestore_1.doc)((0, firebaseConfig_1.getFirestoreDB)(), collectionName, documentName);
        yield (0, firestore_1.setDoc)(document, { token: uuid });
        console.log(`New access token inserted with value: ${uuid}`);
        return uuid;
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
});
const getAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessTokenRef = (0, firestore_1.doc)((0, firebaseConfig_1.getFirestoreDB)(), collectionName, documentName);
        const docSnap = yield (0, firestore_1.getDoc)(accessTokenRef);
        let accessToken;
        if (docSnap.exists()) {
            console.log("Access Token:", docSnap.data());
            accessToken = docSnap.data()["token"];
        }
        else {
            console.log("No access token!");
            let newAccessToken = yield insertAccessToken();
            accessToken = newAccessToken;
        }
        return accessToken;
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
});
exports.getAccessToken = getAccessToken;
