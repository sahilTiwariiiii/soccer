import express from "express";
import { clockIn, clockOut, getAttendanceHistory, regularizeAttendance } from "../../controllers/usermanagement/attendance.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/clock-in", clockIn);
router.post("/clock-out", clockOut);
router.get("/history", getAttendanceHistory);
router.post("/regularize", regularizeAttendance);

export default router;
