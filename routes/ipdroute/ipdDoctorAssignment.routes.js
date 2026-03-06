import express from "express";
import {
  assignDoctorToIPD,
  getIPDDoctorAssignments,
  getDoctorsForIPD,
  updateDoctorRole,
  removeDoctorFromIPD,
} from "../../controllers/ipdcontroller/ipdDoctorAssignment.controller.js";

import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddleware, assignDoctorToIPD);

router.get("/", authMiddleware, getIPDDoctorAssignments);

router.get("/ipd/:ipdId", authMiddleware, getDoctorsForIPD);

router.put("/:id", authMiddleware, updateDoctorRole);

router.delete("/:id", authMiddleware, removeDoctorFromIPD);

export default router;