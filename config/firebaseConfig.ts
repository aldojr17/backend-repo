import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

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
    console.log("Error initialize firebase, error: " + error);
  }
};

const uploadProcessedData = async (userData: User) => {
  let uuid = uuidv4();
  try {
    const document = doc(firestoreDB, "users", uuid);
    let userUpdated = await setDoc(document, userData);
    console.log(userUpdated);
    console.log(uuid);
    return userUpdated;
  } catch (error) {
    console.log("Error upload processed data, error: " + error);
  }
};

const getAllUser = async () => {
  try {
    const collectionRef = collection(firestoreDB, "users");
    const finalData = [];
    const q = query(collectionRef);

    const docSnap = await getDocs(q);

    docSnap.forEach((doc) => {
      finalData.push(doc.data());
    });

    return finalData;
  } catch (error) {
    console.log("Error get user, error: " + error);
  }
};

const getUser = async (uuid: string) => {
  try {
    const collectionRef = collection(firestoreDB, "users");
    const finalData = [];
    const q = query(collectionRef, where("uuid", "==", uuid));

    const docSnap = await getDocs(q);

    docSnap.forEach((doc) => {
      finalData.push(doc.data());
    });

    return finalData;
  } catch (error) {
    console.log("Error get user, error: " + error);
  }
};

const updateUser = async (uuid: string, user: User) => {
  try {
    const document = doc(firestoreDB, "users", uuid);
    const dataUpdated = await updateDoc(document, {
      ...user,
    });
    return dataUpdated;
  } catch (error) {
    console.log("Error get user, error: " + error);
  }
};

const getFirebaseApp = () => app;

export {
  getAllUser,
  getFirebaseApp,
  getUser,
  initializeFirebaseApp,
  updateUser,
  uploadProcessedData,
};
