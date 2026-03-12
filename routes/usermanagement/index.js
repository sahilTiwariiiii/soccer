import express from "express";

import attendanceRoutes from "./attendance.routes.js";
import authRoutes from "./auth.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import fileUploadRoutes from "./fileUpload.routes.js";
import holidayRoutes from "./holiday.routes.js";
import leaveRoutes from "./leave.routes.js";
import leaveBalanceRoutes from "./leaveBalance.routes.js";
import leavePolicyRoutes from "./leavePolicy.routes.js";
import organizationRoutes from "./organization.routes.js";
import payrollRoutes from "./payroll.routes.js";
import permissionRoutes from "./permission.routes.js";
import permissionGroupRoutes from "./permissionGroup.routes.js";
import regularizationRoutes from "./regularization.routes.js";
import reportRoutes from "./report.routes.js";
import roleRoutes from "./role.routes.js";
import roleGroupRoutes from "./roleGroup.routes.js";
import salaryStructureRoutes from "./salaryStructure.routes.js";
import userRoutes from "./user.routes.js";

const router = express.Router();

router.use("/attendance", attendanceRoutes);
router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/file-upload", fileUploadRoutes);
router.use("/holiday", holidayRoutes);
router.use("/leave", leaveRoutes);
router.use("/leave-balance", leaveBalanceRoutes);
router.use("/leave-policy", leavePolicyRoutes);
router.use("/organization", organizationRoutes);
router.use("/payroll", payrollRoutes);
router.use("/permission", permissionRoutes);
router.use("/permission-group", permissionGroupRoutes);
router.use("/regularization", regularizationRoutes);
router.use("/report", reportRoutes);
router.use("/role", roleRoutes);
router.use("/role-group", roleGroupRoutes);
router.use("/salary-structure", salaryStructureRoutes);
router.use("/user", userRoutes);

export default router;
