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
exports.updateData = exports.insertData = exports.initializeFirebaseApp = exports.getData = exports.getAllData = void 0;
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
        console.log(`Error initialize firebase, error: ${error}`);
    }
};
exports.initializeFirebaseApp = initializeFirebaseApp;
const updateData = (collectionName, uuid, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionRef = (0, firestore_1.collection)(firestoreDB, collectionName);
        const finalData = [];
        const q = (0, firestore_1.query)(collectionRef, (0, firestore_1.where)("uuid", "==", uuid));
        const docSnap = yield (0, firestore_1.getDocs)(q);
        docSnap.forEach((doc) => {
            finalData.push(doc.ref);
        });
        if (finalData.length == 0) {
            throw new Error(`Data with uuid: ${uuid} not found in collection: ${collectionName}`);
        }
        yield (0, firestore_1.updateDoc)(finalData[0], Object.assign({}, user));
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
    }
});
exports.updateData = updateData;
const insertData = (collectionName, data) => __awaiter(void 0, void 0, void 0, function* () {
    let uuid = (0, uuid_1.v4)();
    try {
        const document = (0, firestore_1.doc)(firestoreDB, collectionName, uuid);
        yield (0, firestore_1.setDoc)(document, data);
        console.log(`New data inserted with uuid: ${uuid}`);
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
});
exports.insertData = insertData;
const getAllData = (collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionRef = (0, firestore_1.collection)(firestoreDB, collectionName);
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
exports.getAllData = getAllData;
const getData = (collectionName, uuid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionRef = (0, firestore_1.collection)(firestoreDB, collectionName);
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
exports.getData = getData;
