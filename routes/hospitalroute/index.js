import express from "express";
import hospitalRoutes from "./hospital.routes.js";

const router = express.Router();

router.use("/", hospitalRoutes);

export default router;

