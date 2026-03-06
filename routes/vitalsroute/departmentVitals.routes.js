import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createDepartmentVital,
  deleteDepartmentVital,
  getDepartmentVitalById,
  getDepartmentVitals,
  updateDepartmentVital,
} from "../../controllers/vitalscontroller/departmentVitals.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createDepartmentVital);
router.get("/", authMiddleware, getDepartmentVitals);
router.get("/:id", authMiddleware, getDepartmentVitalById);
router.put("/:id", authMiddleware, updateDepartmentVital);
router.delete("/:id", authMiddleware, deleteDepartmentVital);

export default router;

