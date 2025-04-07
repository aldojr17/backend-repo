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
exports.uploadProcessedData = exports.updateUser = exports.initializeFirebaseApp = exports.getUser = exports.getFirebaseApp = exports.getAllUser = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const uuid_1 = require("uuid");
const firebaseConfig = {
    apiKey: "AIzaSyDkpGCJM__o6TJNpQNBPDW0t9MHfqX0Nww",
    authDomain: "backend-repo-7652b.firebaseapp.com",
    databaseURL: "https://backend-repo-7652b-default-rtbd.firebaseio.com",
    projectId: "backend-repo-7652b",
    storageBucket: "backend-repo-7652b.firebasestorage.app",
    messagingSenderId: "176591113131",
    appId: "1:176591113131:web:8b445cb21e1fef2144a0ee",
    measurementId: "G-87QXLP1RB4",
};
let app;
let firestoreDB;
const initializeFirebaseApp = () => {
    try {
        app = (0, app_1.initializeApp)(firebaseConfig);
        firestoreDB = (0, firestore_1.getFirestore)();
        return app;
    }
    catch (error) {
        console.log("Error initialize firebase, error: " + error);
    }
};
exports.initializeFirebaseApp = initializeFirebaseApp;
const uploadProcessedData = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    let uuid = (0, uuid_1.v4)();
    try {
        const document = (0, firestore_1.doc)(firestoreDB, "users", uuid);
        let userUpdated = yield (0, firestore_1.setDoc)(document, userData);
        console.log(userUpdated);
        console.log(uuid);
        return userUpdated;
    }
    catch (error) {
        console.log("Error upload processed data, error: " + error);
    }
});
exports.uploadProcessedData = uploadProcessedData;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionRef = (0, firestore_1.collection)(firestoreDB, "users");
        const finalData = [];
        const q = (0, firestore_1.query)(collectionRef);
        const docSnap = yield (0, firestore_1.getDocs)(q);
        docSnap.forEach((doc) => {
            finalData.push(doc.data());
        });
        return finalData;
    }
    catch (error) {
        console.log("Error get user, error: " + error);
    }
});
exports.getAllUser = getAllUser;
const getUser = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionRef = (0, firestore_1.collection)(firestoreDB, "users");
        const finalData = [];
        const q = (0, firestore_1.query)(collectionRef, (0, firestore_1.where)("uuid", "==", uuid));
        const docSnap = yield (0, firestore_1.getDocs)(q);
        docSnap.forEach((doc) => {
            finalData.push(doc.data());
        });
        return finalData;
    }
    catch (error) {
        console.log("Error get user, error: " + error);
    }
});
exports.getUser = getUser;
const updateUser = (uuid, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const document = (0, firestore_1.doc)(firestoreDB, "users", uuid);
        const dataUpdated = yield (0, firestore_1.updateDoc)(document, Object.assign({}, user));
        return dataUpdated;
    }
    catch (error) {
        console.log("Error get user, error: " + error);
    }
});
exports.updateUser = updateUser;
const getFirebaseApp = () => app;
exports.getFirebaseApp = getFirebaseApp;
