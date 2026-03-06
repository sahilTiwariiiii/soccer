import express from "express";

import equipmentRoutes from "./equipment.routes.js";
import equipmentCategoryRoutes from "./equipmentCategory.routes.js";
import vendorRoutes from "./vendor.routes.js";
import locationRoutes from "./location.routes.js";
import departmentRoutes from "./department.routes.js";
import sparePartRoutes from "./sparePart.routes.js";
import equipmentTransferRoutes from "./equipmentTransfer.routes.js";
import maintenanceScheduleRoutes from "./maintenanceSchedule.routes.js";
import maintenanceLogRoutes from "./maintenanceLog.routes.js";
import amcContractRoutes from "./amcContract.routes.js";
import calibrationRecordRoutes from "./calibrationRecord.routes.js";
import equipmentStatusHistoryRoutes from "./equipmentStatusHistory.routes.js";
import equipmentUsageLogRoutes from "./equipmentUsageLog.routes.js";
import partsUsageLogRoutes from "./partsUsageLog.routes.js";
import equipmentDocumentRoutes from "./equipmentDocument.routes.js";
import breakdownTicketRoutes from "./breakdownTicket.routes.js";
import alertRoutes from "./alert.routes.js";

const router = express.Router();

router.use("/equipments", equipmentRoutes);
router.use("/categories", equipmentCategoryRoutes);
router.use("/vendors", vendorRoutes);
router.use("/locations", locationRoutes);
router.use("/departments", departmentRoutes);
router.use("/spare-parts", sparePartRoutes);
router.use("/transfers", equipmentTransferRoutes);
router.use("/maintenance-schedules", maintenanceScheduleRoutes);
router.use("/maintenance-logs", maintenanceLogRoutes);
router.use("/amc-contracts", amcContractRoutes);
router.use("/calibration-records", calibrationRecordRoutes);
router.use("/status-histories", equipmentStatusHistoryRoutes);
router.use("/usage-logs", equipmentUsageLogRoutes);
router.use("/parts-usage-logs", partsUsageLogRoutes);
router.use("/documents", equipmentDocumentRoutes);
router.use("/breakdown-tickets", breakdownTicketRoutes);
router.use("/alerts", alertRoutes);

export default router;

