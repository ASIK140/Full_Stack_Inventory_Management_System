import express from "express";
import {
  createBill,
  getAllBill,
  getBillById,
} from "../controllers/billing.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", createBill);
router.get("/", protect, getAllBill);
router.get("/:id", protect, getBillById);

export default router;
