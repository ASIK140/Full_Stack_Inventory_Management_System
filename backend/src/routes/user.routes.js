import express from "express";
import { createUser, logInUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.post("/login", logInUser);

export default router;
