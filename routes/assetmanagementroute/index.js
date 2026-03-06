import express from "express";

import assetMasterRoutes from "./assetMaster.routes.js";
import assetCategoryRoutes from "./assetCategory.routes.js";
import assetSubCategoryRoutes from "./assetSubCategory.routes.js";
import assetVendorRoutes from "./assetVendor.routes.js";
import assetLocationRoutes from "./assetLocation.routes.js";
import assetAssignmentRoutes from "./assetAssignment.routes.js";
import assetMovementRoutes from "./assetMovement.routes.js";
import assetMaintenanceRoutes from "./assetMaintenance.routes.js";
import assetAuditRoutes from "./assetAudit.routes.js";
import assetDocumentRoutes from "./assetDocument.routes.js";
import assetUsageLogRoutes from "./assetUsageLog.routes.js";
import assetDepreciationRoutes from "./assetDepreciation.routes.js";
import assetInsuranceRoutes from "./assetInsurance.routes.js";
import assetDisposalRoutes from "./assetDisposal.routes.js";

const router = express.Router();

router.use("/masters", assetMasterRoutes);
router.use("/categories", assetCategoryRoutes);
router.use("/sub-categories", assetSubCategoryRoutes);
router.use("/vendors", assetVendorRoutes);
router.use("/locations", assetLocationRoutes);
router.use("/assignments", assetAssignmentRoutes);
router.use("/movements", assetMovementRoutes);
router.use("/maintenances", assetMaintenanceRoutes);
router.use("/audits", assetAuditRoutes);
router.use("/documents", assetDocumentRoutes);
router.use("/usage-logs", assetUsageLogRoutes);
router.use("/depreciations", assetDepreciationRoutes);
router.use("/insurances", assetInsuranceRoutes);
router.use("/disposals", assetDisposalRoutes);

export default router;

