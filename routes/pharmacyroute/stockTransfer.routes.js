import express from "express";
import {
  createStockTransfer,
  getStockTransfers,
  getStockTransferById,
  updateStockTransfer,
  approveStockTransfer,
  markInTransit,
  markAsCompleted
} from "../../controllers/pharmacycontroller/stockTransfer.controller.js";



const router = express.Router();


// CRUD + extra workflow
router.post("/", createStockTransfer);
router.get("/", getStockTransfers);
router.get("/:id", getStockTransferById);
router.put("/:id", updateStockTransfer);
router.patch("/:id/approve", approveStockTransfer);
router.patch("/:id/intransit", markInTransit);
router.patch("/:id/complete", markAsCompleted);

export default router;