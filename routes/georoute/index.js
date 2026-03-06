import express from "express";

import countryRoutes from "./country.routes.js";
import stateRoutes from "./state.routes.js";
import cityRoutes from "./city.routes.js";

const router = express.Router();

router.use("/countries", countryRoutes);
router.use("/states", stateRoutes);
router.use("/cities", cityRoutes);

export default router;

