import express from "express";
import { initializeFirebaseApp } from "../config/firebaseConfig";
import {
  fetchAllUser,
  fetchUserByUUID,
  insertUserData,
  updateUserData,
} from "../controller/api";

const PORT = 3000;

const app = express();
app.use(express.json());
initializeFirebaseApp();

app.put("/update-user-data/:uuid", updateUserData);
app.post("/users", insertUserData);
app.get("/users", fetchAllUser);
app.get("/users/:uuid", fetchUserByUUID);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("listen to port : ", PORT);
});

module.exports = app;
