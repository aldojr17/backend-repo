import express from "express";
import { initializeFirebaseApp } from "../config/firebaseConfig";
import { authMiddleware } from "../middleware/authMiddleware";
import tokenRoutes from "../routes/tokenRoutes";
import userRoutes from "../routes/userRoutes";

initializeFirebaseApp();

const PORT = 3000;

const app = express();
app.use("/", tokenRoutes);
app.use(authMiddleware);
app.use(express.json());

app.use("/", userRoutes);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("listen to port : ", PORT);
});

module.exports = app;
