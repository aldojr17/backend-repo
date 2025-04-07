import express from "express";
import { generateToken } from "../controller/tokenApi";

const router = express.Router();

router.get("/generate-access-token", generateToken);

export default router;
