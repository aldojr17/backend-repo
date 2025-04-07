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
exports.getUser = exports.getAllUser = exports.insertUser = exports.updateUser = void 0;
const firestore_1 = require("firebase/firestore");
const uuid_1 = require("uuid");
const firebaseConfig_1 = require("../config/firebaseConfig");
let collectionName = "users";
const updateUser = (uuid, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionRef = (0, firestore_1.collection)((0, firebaseConfig_1.getFirestoreDB)(), collectionName);
        const finalData = [];
        const q = (0, firestore_1.query)(collectionRef, (0, firestore_1.where)("uuid", "==", uuid));
        const docSnap = yield (0, firestore_1.getDocs)(q);
        docSnap.forEach((doc) => {
            finalData.push(doc.ref);
        });
        if (finalData.length == 0) {
            throw new Error(`User with uuid: ${uuid} not found in collection`);
        }
        yield (0, firestore_1.updateDoc)(finalData[0], Object.assign({}, user));
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
    }
});
exports.updateUser = updateUser;
const insertUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let uuid = (0, uuid_1.v4)();
    try {
        const document = (0, firestore_1.doc)((0, firebaseConfig_1.getFirestoreDB)(), collectionName, uuid);
        yield (0, firestore_1.setDoc)(document, data);
        console.log(`New user inserted with uuid: ${uuid}`);
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
});
exports.insertUser = insertUser;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionRef = (0, firestore_1.collection)((0, firebaseConfig_1.getFirestoreDB)(), collectionName);
        const finalData = [];
        const q = (0, firestore_1.query)(collectionRef);
        const docSnap = yield (0, firestore_1.getDocs)(q);
        docSnap.forEach((doc) => {
            finalData.push(doc.data());
        });
        return finalData;
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
});
exports.getAllUser = getAllUser;
const getUser = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionRef = (0, firestore_1.collection)((0, firebaseConfig_1.getFirestoreDB)(), collectionName);
        const finalData = [];
        const q = (0, firestore_1.query)(collectionRef, (0, firestore_1.where)("uuid", "==", uuid));
        const docSnap = yield (0, firestore_1.getDocs)(q);
        docSnap.forEach((doc) => {
            finalData.push(doc.data());
        });
        return finalData[0] || {};
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
});
exports.getUser = getUser;
