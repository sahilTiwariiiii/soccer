import express from "express";
import stockAdjustmentController from "../controllers/stockAdjustment.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, stockAdjustmentController.createStockAdjustment);

router.get("/", authMiddleware, stockAdjustmentController.getStockAdjustments);

router.get("/:id", authMiddleware, stockAdjustmentController.getStockAdjustmentById);

router.patch("/:id/close", authMiddleware, stockAdjustmentController.closeStockAdjustment);

export default router;