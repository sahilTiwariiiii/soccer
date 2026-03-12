import express from "express";

import instrumentBatchRoutes from "./instrumentBatch.routes.js";
import instrumentIssueRoutes from "./instrumentIssue.routes.js";
import instrumentMasterRoutes from "./instrumentMaster.routes.js";
import sterilizationCycleRoutes from "./sterilizationCycle.routes.js";

const router = express.Router();

router.use("/batches", instrumentBatchRoutes);
router.use("/issues", instrumentIssueRoutes);
router.use("/instruments", instrumentMasterRoutes);
router.use("/cycles", sterilizationCycleRoutes);

export default router;
