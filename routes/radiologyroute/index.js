import express from "express";

import radiologyImageRoutes from "./radiologyImage.routes.js";
import radiologyReportRoutes from "./radiologyReport.routes.js";
import radiologyStudyRoutes from "./radiologyStudy.routes.js";

const router = express.Router();

router.use("/images", radiologyImageRoutes);
router.use("/reports", radiologyReportRoutes);
router.use("/studies", radiologyStudyRoutes);

export default router;
