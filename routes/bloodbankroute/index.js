import express from "express";

import bloodComponentRoutes from "./bloodComponent.routes.js";
import bloodDiscardRoutes from "./bloodDiscard.routes.js";
import bloodDonationRoutes from "./bloodDonation.routes.js";
import bloodDonationCampRoutes from "./bloodDonationCamp.routes.js";
import bloodDonorRoutes from "./bloodDonor.routes.js";
import bloodGroupRoutes from "./bloodGroup.routes.js";
import bloodInventoryRoutes from "./bloodInventory.routes.js";
import bloodIssueRoutes from "./bloodIssue.routes.js";
import bloodRequestRoutes from "./bloodRequest.routes.js";
import bloodScreeningRoutes from "./bloodScreening.routes.js";
import crossMatchRoutes from "./crossMatch.routes.js";

const router = express.Router();

router.use("/components", bloodComponentRoutes);
router.use("/discards", bloodDiscardRoutes);
router.use("/donations", bloodDonationRoutes);
router.use("/camps", bloodDonationCampRoutes);
router.use("/donors", bloodDonorRoutes);
router.use("/groups", bloodGroupRoutes);
router.use("/inventory", bloodInventoryRoutes);
router.use("/issues", bloodIssueRoutes);
router.use("/requests", bloodRequestRoutes);
router.use("/screenings", bloodScreeningRoutes);
router.use("/cross-matches", crossMatchRoutes);

export default router;
