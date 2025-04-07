import { v4 as uuidv4 } from "uuid";
import {
  getAllUser,
  getUser,
  updateUser,
  uploadProcessedData,
} from "../config/firebaseConfig";

const updateUserData = async (req, res) => {
  try {
    const uuid = req.params.uuid || "";

    const user: User = {
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
    };

    console.log(user);

    const newDoc = await updateUser(uuid, user);

    console.log(newDoc);
    res.status(200).send(`User updated a new user`);
  } catch (error) {
    res.status(400).send(`User should contain firstName, lastName:`);
  }
};

const insertUserData = async (req, res) => {
  try {
    let uuid = uuidv4();
    const user: User = {
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      uuid: uuid,
    };

    console.log(user);

    const newDoc = await uploadProcessedData(user);

    console.log(newDoc);
    res.status(201).send(`Created a new user`);
  } catch (error) {
    res.status(400).send(`User should contain firstName, lastName:`);
  }
};

const fetchAllUser = async (req, res) => {
  try {
    const newDoc = await getAllUser();

    console.log(newDoc);
    res.status(201).send(`user get`);
  } catch (error) {
    res.status(400).send(`error`);
  }
};

const fetchUserByUUID = async (req, res) => {
  try {
    const uuid = req.params.uuid || "";
    const newDoc = await getUser(uuid);

    console.log(newDoc);
    res.status(201).send(`user get`);
  } catch (error) {
    res.status(400).send(`error`);
  }
};

export { fetchAllUser, fetchUserByUUID, insertUserData, updateUserData };
