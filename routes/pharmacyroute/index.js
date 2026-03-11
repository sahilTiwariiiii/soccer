import express from "express";

import pharmacyRoutes from "./pharmacy.routes.js";
import medicineRoutes from "./medicine.routes.js";
import pharmacyStockRoutes from "./pharmacystock.route.js";
import pharmacyDispenseRoutes from "./pharmacyDispense.routes.js";
import pharmacyInvoiceRoutes from "./pharmacyInvoice.routes.js";
import supplierRoutes from "./supplier.routes.js";
import grnRoutes from "./grn.routes.js";
import insuranceClaimRoutes from "./insuranceClaim.routes.js";
import prescriptionRoutes from "./prescription.routes.js";
import prescriptionItemRoutes from "./prescriptionItem.routes.js";
import purchaseOrderRoutes from "./purchaseOrder.routes.js";
import purchaseOrderItemRoutes from "./purchaseOrderItem.routes.js";
import stockTransferRoutes from "./stockTransfer.routes.js";
import stockAdjustmentRoutes from "./stockadjustment.route.js";

const router = express.Router();

router.use("/", pharmacyRoutes);
router.use("/medicines", medicineRoutes);
router.use("/stocks", pharmacyStockRoutes);
router.use("/dispenses", pharmacyDispenseRoutes);
router.use("/invoices", pharmacyInvoiceRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/grns", grnRoutes);
router.use("/insurance-claims", insuranceClaimRoutes);
router.use("/prescriptions", prescriptionRoutes);
router.use("/prescription-items", prescriptionItemRoutes);
router.use("/purchase-orders", purchaseOrderRoutes);
router.use("/purchase-order-items", purchaseOrderItemRoutes);
router.use("/stock-transfers", stockTransferRoutes);
router.use("/stock-adjustments", stockAdjustmentRoutes);

export default router;
