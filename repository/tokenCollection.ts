import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getFirestoreDB } from "../config/firebaseConfig";

let collectionName = "token";
let documentName = "accessToken";

export const generateNewAccessToken = async () => {
  let uuid = uuidv4();

  try {
    const accessTokenRef = doc(getFirestoreDB(), collectionName, documentName);

    await updateDoc(accessTokenRef, {
      token: uuid,
    });

    return uuid;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const insertAccessToken = async () => {
  let uuid = uuidv4();

  try {
    const document = doc(getFirestoreDB(), collectionName, documentName);
    await setDoc(document, { token: uuid });

    console.log(`New access token inserted with value: ${uuid}`);

    return uuid;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getAccessToken = async () => {
  try {
    const accessTokenRef = doc(getFirestoreDB(), collectionName, documentName);
    const docSnap = await getDoc(accessTokenRef);

    let accessToken;

    if (docSnap.exists()) {
      console.log("Access Token:", docSnap.data());
      accessToken = docSnap.data()["token"];
    } else {
      console.log("No access token!");
      let newAccessToken = await insertAccessToken();
      accessToken = newAccessToken;
    }

    return accessToken;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
