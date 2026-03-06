import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createLocation,
  deleteLocation,
  getLocationById,
  getLocations,
  updateLocation,
} from "../../controllers/equipmentmanagementcontroller/location.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createLocation);
router.get("/", authMiddleware, getLocations);
router.get("/:id", authMiddleware, getLocationById);
router.put("/:id", authMiddleware, updateLocation);
router.delete("/:id", authMiddleware, deleteLocation);

export default router;

