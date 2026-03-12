import express from "express";

import labResultRoutes from "./labResult.routes.js";
import labSampleRoutes from "./labSample.routes.js";

const router = express.Router();

router.use("/results", labResultRoutes);
router.use("/samples", labSampleRoutes);

export default router;
