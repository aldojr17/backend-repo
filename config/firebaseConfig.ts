import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
    app = initializeApp(firebaseConfig);
    firestoreDB = getFirestore();

    return app;
  } catch (error) {
    console.log(`Error initialize firebase, error: ${error}`);
  }
};

const getFirestoreDB = () => firestoreDB;

export { getFirestoreDB, initializeFirebaseApp };
