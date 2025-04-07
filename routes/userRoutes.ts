import express from "express";
import {
  fetchAllUser,
  fetchUserByUUID,
  insertUserData,
  updateUserData,
} from "../controller/api";

const router = express.Router();

router.put("/update-user-data/:uuid", updateUserData);
router.get("/fetch-user-data", fetchAllUser);

router.post("/users", insertUserData);
router.get("/users/:uuid", fetchUserByUUID);

export default router;
