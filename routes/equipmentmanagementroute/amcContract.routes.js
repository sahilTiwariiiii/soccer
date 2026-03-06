import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAMCContract,
  deleteAMCContract,
  getAMCContractById,
  getAMCContracts,
  updateAMCContract,
} from "../../controllers/equipmentmanagementcontroller/amcContract.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAMCContract);
router.get("/", authMiddleware, getAMCContracts);
router.get("/:id", authMiddleware, getAMCContractById);
router.put("/:id", authMiddleware, updateAMCContract);
router.delete("/:id", authMiddleware, deleteAMCContract);

export default router;

