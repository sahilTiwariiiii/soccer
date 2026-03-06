import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createBranch,
  deleteBranch,
  getBranchById,
  getBranches,
  updateBranch,
} from "../../controllers/branchescontroller/branch.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createBranch);
router.get("/", authMiddleware, getBranches);
router.get("/:id", authMiddleware, getBranchById);
router.put("/:id", authMiddleware, updateBranch);
router.delete("/:id", authMiddleware, deleteBranch);

export default router;

