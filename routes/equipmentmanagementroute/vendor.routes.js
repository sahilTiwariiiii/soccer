import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createVendor,
  deleteVendor,
  getVendorById,
  getVendors,
  updateVendor,
} from "../../controllers/equipmentmanagementcontroller/vendor.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createVendor);
router.get("/", authMiddleware, getVendors);
router.get("/:id", authMiddleware, getVendorById);
router.put("/:id", authMiddleware, updateVendor);
router.delete("/:id", authMiddleware, deleteVendor);

export default router;

