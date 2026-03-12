import express from "express";
import { applyLeave, getMyLeaves, getLeaveRequests, approveRejectLeave } from "../../controllers/usermanagement/leave.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/apply", applyLeave);
router.get("/my-leaves", getMyLeaves);
router.get("/requests", getLeaveRequests);
router.post("/process", approveRejectLeave);

export default router;
