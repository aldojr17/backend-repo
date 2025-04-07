import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getFirestoreDB } from "../config/firebaseConfig";

let collectionName = "users";

export const updateUser = async (uuid: string, user: User) => {
  try {
    const collectionRef = collection(getFirestoreDB(), collectionName);
    const finalData = [];
    const q = query(collectionRef, where("uuid", "==", uuid));

    const docSnap = await getDocs(q);

    docSnap.forEach((doc) => {
      finalData.push(doc.ref);
    });

    if (finalData.length == 0) {
      throw new Error(`User with uuid: ${uuid} not found in collection`);
    }

    await updateDoc(finalData[0], {
      ...user,
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export const insertUser = async (data: any) => {
  let uuid = uuidv4();

  try {
    const document = doc(getFirestoreDB(), collectionName, uuid);
    await setDoc(document, data);

    console.log(`New user inserted with uuid: ${uuid}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getAllUser = async () => {
  try {
    const collectionRef = collection(getFirestoreDB(), collectionName);
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

export const getUser = async (uuid: string) => {
  try {
    const collectionRef = collection(getFirestoreDB(), collectionName);
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
