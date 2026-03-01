import express from "express";
import purchaseOrderItemController from "../controllers/purchaseOrderItem.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, purchaseOrderItemController.createPurchaseOrderItem);
router.get("/", authMiddleware, purchaseOrderItemController.getPurchaseOrderItems);
router.put("/:id", authMiddleware, purchaseOrderItemController.updatePurchaseOrderItem);
router.patch("/:id/receive", authMiddleware, purchaseOrderItemController.receivePurchaseOrderItem);
router.delete("/:id", authMiddleware, purchaseOrderItemController.deletePurchaseOrderItem);

export default router;