import { v4 as uuidv4 } from "uuid";
import {
  getAllData,
  getData,
  insertData,
  updateData,
} from "../config/firebaseConfig";

const updateUserData = async (req, res) => {
  try {
    const uuid = req.params.uuid || "";

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
      message: error,
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
    const users = await getAllData("users");

    console.log(users);

    res.status(200).json({
      data: users,
      success: true,
      message: "Successfully get all user",
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      success: false,
      message: error,
    });
  }
};

const fetchUserByUUID = async (req, res) => {
  try {
    const uuid = req.params.uuid || "";

    const user = await getData("users", uuid);

    console.log(user);
    res.status(200).json({
      data: user,
      success: true,
      message: "Successfully get user",
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      success: false,
      message: error,
    });
  }
};

export { fetchAllUser, fetchUserByUUID, insertUserData, updateUserData };
