import express from "express";
import stockAdjustmentController from "../../controllers/pharmacycontroller/stockadjustment.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddleware, stockAdjustmentController.createStockAdjustment);

router.get("/", authMiddleware, stockAdjustmentController.getStockAdjustments);

router.get("/:id", authMiddleware, stockAdjustmentController.getStockAdjustmentById);

router.patch("/:id/close", authMiddleware, stockAdjustmentController.closeStockAdjustment);

export default router;