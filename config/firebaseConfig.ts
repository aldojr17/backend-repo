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
    console.log(`Error initialize firebase, error: ${error}`);
  }
};

const updateData = async (collectionName: string, uuid: string, user: User) => {
  try {
    const collectionRef = collection(firestoreDB, collectionName);
    const finalData = [];
    const q = query(collectionRef, where("uuid", "==", uuid));

    const docSnap = await getDocs(q);

    docSnap.forEach((doc) => {
      finalData.push(doc.ref);
    });

    if (finalData.length == 0) {
      throw new Error(
        `Data with uuid: ${uuid} not found in collection: ${collectionName}`
      );
    }

    await updateDoc(finalData[0], {
      ...user,
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const insertData = async (collectionName: string, data: any) => {
  let uuid = uuidv4();

  try {
    const document = doc(firestoreDB, collectionName, uuid);
    await setDoc(document, data);

    console.log(`New data inserted with uuid: ${uuid}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const getAllData = async (collectionName: string) => {
  try {
    const collectionRef = collection(firestoreDB, collectionName);
    const finalData = [];
    const q = query(collectionRef);

    const docSnap = await getDocs(q);

    docSnap.forEach((doc) => {
      finalData.push(doc.data());
    });

    return finalData;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const getData = async (collectionName: string, uuid: string) => {
  try {
    const collectionRef = collection(firestoreDB, collectionName);
    const finalData = [];
    const q = query(collectionRef, where("uuid", "==", uuid));

    const docSnap = await getDocs(q);

    docSnap.forEach((doc) => {
      finalData.push(doc.data());
    });

    return finalData[0] || {};
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export { getAllData, getData, initializeFirebaseApp, insertData, updateData };
