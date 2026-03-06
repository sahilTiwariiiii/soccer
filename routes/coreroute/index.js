import express from "express";

import departmentRoutes from "./department.routes.js";
import patientRegistrationRoutes from "./patientRegistration.routes.js";
import patientReceiptRoutes from "./patientReceipt.routes.js";
import procedureOrderRoutes from "./procedureOrder.routes.js";

const router = express.Router();

router.use("/departments", departmentRoutes);
router.use("/patients", patientRegistrationRoutes);
router.use("/receipts", patientReceiptRoutes);
router.use("/procedure-orders", procedureOrderRoutes);

export default router;

