import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  logInUser,
  logOutUser,
  updateUser,
} from "../controllers/user.controller.js";
import { adminOnly, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createUser);
router.post("/login", logInUser);
router.get("/logout", protect, logOutUser);
router.get("/", protect, adminOnly, getAllUser);
router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);
export default router;
