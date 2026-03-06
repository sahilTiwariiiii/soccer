import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  getDepartments,
  updateDepartment,
} from "../../controllers/corecontroller/department.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createDepartment);
router.get("/", authMiddleware, getDepartments);
router.get("/:id", authMiddleware, getDepartmentById);
router.put("/:id", authMiddleware, updateDepartment);
router.delete("/:id", authMiddleware, deleteDepartment);

export default router;

