import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createReceipt,
  deleteReceipt,
  getReceiptById,
  getReceipts,
  updateReceipt,
} from "../../controllers/corecontroller/patientReceipt.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createReceipt);
router.get("/", authMiddleware, getReceipts);
router.get("/:id", authMiddleware, getReceiptById);
router.put("/:id", authMiddleware, updateReceipt);
router.delete("/:id", authMiddleware, deleteReceipt);

export default router;

