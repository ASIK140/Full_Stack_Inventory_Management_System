import express from "express";
import {
  createBill,
  getAllBill,
  getBillById,
} from "../controllers/billing.controller.js";

const router = express.Router();

router.post("/", createBill);
router.get("/", getAllBill);
router.get("/:id", getBillById);

export default router;
