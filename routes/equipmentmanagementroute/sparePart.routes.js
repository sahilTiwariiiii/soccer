import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createSparePart,
  deleteSparePart,
  getSparePartById,
  getSpareParts,
  updateSparePart,
} from "../../controllers/equipmentmanagementcontroller/sparePart.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createSparePart);
router.get("/", authMiddleware, getSpareParts);
router.get("/:id", authMiddleware, getSparePartById);
router.put("/:id", authMiddleware, updateSparePart);
router.delete("/:id", authMiddleware, deleteSparePart);

export default router;

