import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createEquipmentDepartment,
  deleteEquipmentDepartment,
  getEquipmentDepartmentById,
  getEquipmentDepartments,
  updateEquipmentDepartment,
} from "../../controllers/equipmentmanagementcontroller/department.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createEquipmentDepartment);
router.get("/", authMiddleware, getEquipmentDepartments);
router.get("/:id", authMiddleware, getEquipmentDepartmentById);
router.put("/:id", authMiddleware, updateEquipmentDepartment);
router.delete("/:id", authMiddleware, deleteEquipmentDepartment);

export default router;

