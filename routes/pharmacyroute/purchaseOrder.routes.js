import express from "express";
import purchaseOrderController from "../../controllers/pharmacycontroller/purchaseOrder.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddleware, purchaseOrderController.createPurchaseOrder);
router.get("/", authMiddleware, purchaseOrderController.getPurchaseOrders);
router.get("/:id", authMiddleware, purchaseOrderController.getPurchaseOrderById);
router.put("/:id", authMiddleware, purchaseOrderController.updatePurchaseOrder);
router.patch("/:id/approve", authMiddleware, purchaseOrderController.approvePurchaseOrder);
router.patch("/:id/cancel", authMiddleware, purchaseOrderController.cancelPurchaseOrder);

export default router;