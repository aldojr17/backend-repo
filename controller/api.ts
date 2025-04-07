import { v4 as uuidv4 } from "uuid";
import {
  getAllUser,
  getUser,
  insertData,
  updateData,
} from "../config/firebaseConfig";

const updateUserData = async (req, res) => {
  try {
    const uuid = req.params.uuid || "";

    if (uuid == "") {
      throw new Error("uuid in query params is empty");
    }

    if (req.body["firstName"] == "" || req.body["firstName"] == undefined) {
      throw new Error("firstName is required");
    }

    if (req.body["lastName"] == "" || req.body["lastName"] == undefined) {
      throw new Error("lastName is required");
    }

    const user: User = {
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
    };

    console.log(user);

    await updateData("users", uuid, user);

    res.status(200).json({
      data: {
        ...user,
        uuid: uuid,
      },
      success: true,
      message: `User with uuid: ${uuid} is updated`,
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      success: false,
      message: error.message,
    });
  }
};

const insertUserData = async (req, res) => {
  try {
    let uuid = uuidv4();

    if (req.body["firstName"] == "" || req.body["firstName"] == undefined) {
      throw new Error("firstName is required");
    }

    if (req.body["lastName"] == "" || req.body["lastName"] == undefined) {
      throw new Error("lastName is required");
    }

    const user: User = {
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      uuid: uuid,
    };

    console.log(user);

    await insertData("users", user);

    res.status(201).json({
      data: user,
      success: true,
      message: "User inserted",
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      success: false,
      message: error.message,
    });
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
