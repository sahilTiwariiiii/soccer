import express from "express";
import { generatePayroll, getMyPayrolls, getPayrollByMonth, processPayroll } from "../../controllers/usermanagement/payroll.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/generate", generatePayroll);
router.get("/my-payrolls", getMyPayrolls);
router.get("/history", getPayrollByMonth);
router.post("/process", processPayroll);

export default router;
