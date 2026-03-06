import express from "express";

import globalVitalsRoutes from "./globalVitals.routes.js";
import departmentVitalsRoutes from "./departmentVitals.routes.js";
import visitVitalsRoutes from "./visitVitals.routes.js";

const router = express.Router();

router.use("/global", globalVitalsRoutes);
router.use("/department", departmentVitalsRoutes);
router.use("/visit", visitVitalsRoutes);

export default router;

