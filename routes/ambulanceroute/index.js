import express from "express";

import ambulanceMasterRoutes from "./ambulanceMaster.routes.js";
import ambulanceTripRoutes from "./ambulanceTrip.routes.js";
import ambulanceMaintenanceRoutes from "./ambulanceMaintenance.routes.js";
import ambulanceAssignmentRoutes from "./ambulanceAssignment.routes.js";

const router = express.Router();

router.use("/masters", ambulanceMasterRoutes);
router.use("/trips", ambulanceTripRoutes);
router.use("/maintenances", ambulanceMaintenanceRoutes);
router.use("/assignments", ambulanceAssignmentRoutes);

export default router;
