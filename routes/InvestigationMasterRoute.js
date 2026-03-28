import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import { CreateInvestigationMaster, DeleteInvestigationMaster, GetAllInvestigationMaster, UpdateInvestigationMaster } from '../controllers/InvestigationController.js';

const router=express.Router();

router.post("/", authMiddleware, CreateInvestigationMaster);
router.put("/:id", authMiddleware, UpdateInvestigationMaster);
router.get("/", authMiddleware, GetAllInvestigationMaster);
router.delete("/:id", authMiddleware, DeleteInvestigationMaster);

export default router;